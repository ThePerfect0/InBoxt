import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchGmailEmails, refreshGmailToken } from '../shared/gmail.ts';
import { extractGist, calculateImportance, extractDeadline } from '../shared/openrouter.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface User {
  id: string;
  email: string;
  prefs_check_time: string;
  prefs_top_n: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting daily digest run at:', new Date().toISOString());

    // Get current UTC time
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinutes = now.getUTCMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

    console.log('Current UTC time:', currentTime);

    // Find users whose digest time matches current time (within a 5-minute window)
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, prefs_check_time, prefs_top_n');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      throw usersError;
    }

    console.log(`Found ${users?.length || 0} total users`);

    // Filter users who are due for digest based on their preferred time
    const dueUsers = users?.filter(user => {
      const userTime = user.prefs_check_time || '08:00';
      const [userHour, userMin] = userTime.split(':').map(Number);
      
      // Check if user's time is within 5 minutes of current time
      const userTotalMinutes = userHour * 60 + userMin;
      const currentTotalMinutes = currentHour * 60 + currentMinutes;
      
      return Math.abs(userTotalMinutes - currentTotalMinutes) <= 5;
    }) || [];

    console.log(`Found ${dueUsers.length} users due for digest`);

    const results = [];

    // Process each due user
    for (const user of dueUsers) {
      console.log(`Processing user: ${user.email}`);
      
      try {
        const digestResult = await processUserDigest(supabase, user);
        results.push({
          userId: user.id,
          email: user.email,
          status: 'success',
          emailsProcessed: digestResult.emailsProcessed,
          message: digestResult.message
        });
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        results.push({
          userId: user.id,
          email: user.email,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('Daily digest run completed:', results);

    return new Response(JSON.stringify({
      success: true,
      processedUsers: results.length,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Fatal error in daily digest:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processUserDigest(supabase: any, user: User) {
  console.log(`Starting digest processing for ${user.email}`);
  
  // Check if digest already exists for today
  const today = new Date().toISOString().split('T')[0];
  const { data: existingDigest } = await supabase
    .from('digests')
    .select('id')
    .eq('user_id', user.id)
    .eq('date', today)
    .single();

  if (existingDigest) {
    console.log(`Digest already exists for ${user.email} on ${today}`);
    return { emailsProcessed: 0, message: 'Digest already exists for today' };
  }

  // Get Gmail emails for user
  const gmailEmails = await fetchUserGmailEmails(supabase, user);
  
  if (gmailEmails.length === 0) {
    console.log(`No Gmail access or emails found for ${user.email}`);
    // Create empty digest for tracking
    await supabase.from('digests').insert({
      user_id: user.id,
      date: today,
      emails: []
    });
    
    return { emailsProcessed: 0, message: 'No emails found or Gmail not connected' };
  }

  // Process emails with AI
  console.log(`Processing ${gmailEmails.length} emails with AI for ${user.email}`);
  const processedEmails = [];
  
  for (const email of gmailEmails) {
    try {
      console.log(`Processing email ${email.id} from ${email.sender}`);
      
      // Extract gist
      const gistResult = await extractGist(email.text);
      const gist = gistResult?.gist || email.snippet || 'Unable to summarize';
      
      // Calculate importance
      const importanceResult = await calculateImportance(email.text, email.sender, email.subject);
      const importance = importanceResult?.importance || 0.5;
      
      // Extract deadline
      const deadlineResult = await extractDeadline(email.text, email.subject);
      const deadline = deadlineResult?.deadline;
      
      processedEmails.push({
        email_id: email.id,
        gist,
        sender: email.sender,
        subject: email.subject,
        link: `https://mail.google.com/mail/u/0/#inbox/${email.id}`,
        importance_score: importance,
        deadline: deadline,
        processed_at: new Date().toISOString()
      });
      
      console.log(`Processed email ${email.id} - importance: ${importance}, deadline: ${deadline}`);
      
    } catch (error) {
      console.error(`Error processing email ${email.id}:`, error);
      
      // Fallback processing
      processedEmails.push({
        email_id: email.id,
        gist: email.snippet || 'Unable to process',
        sender: email.sender,
        subject: email.subject,
        link: `https://mail.google.com/mail/u/0/#inbox/${email.id}`,
        importance_score: 0.3,
        deadline: null,
        processed_at: new Date().toISOString()
      });
    }
  }
  
  // Filter by importance threshold (0.4+) then sort and take top N
  const filteredEmails = processedEmails.filter(email => email.importance_score >= 0.4);
  const rankedEmails = filteredEmails
    .sort((a, b) => b.importance_score - a.importance_score)
    .slice(0, user.prefs_top_n);
  
  console.log(`Filtered ${processedEmails.length} emails to ${filteredEmails.length} with importance >= 0.4, taking top ${rankedEmails.length}`);

  // Save digest to database
  const { error: insertError } = await supabase
    .from('digests')
    .insert({
      user_id: user.id,
      date: today,
      emails: rankedEmails
    });

  if (insertError) {
    console.error(`Error saving digest for ${user.email}:`, insertError);
    throw insertError;
  }

  console.log(`Successfully processed ${rankedEmails.length} emails for ${user.email}`);
  
  return { 
    emailsProcessed: rankedEmails.length, 
    message: `Processed ${rankedEmails.length} emails with AI ranking` 
  };
}

async function fetchUserGmailEmails(supabase: any, user: User) {
  console.log(`Fetching Gmail emails for ${user.email}`);
  
  try {
    // Get stored OAuth tokens from user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('gmail_access_token, gmail_refresh_token')
      .eq('user_id', user.id)
      .single();

    if (!profile?.gmail_refresh_token) {
      console.log(`No Gmail tokens found for ${user.email}`);
      return [];
    }

    let accessToken = profile.gmail_access_token;
    
    // Refresh token if needed
    if (!accessToken) {
      console.log('Refreshing Gmail access token...');
      accessToken = await refreshGmailToken(profile.gmail_refresh_token);
      
      if (!accessToken) {
        console.error('Failed to refresh Gmail token');
        return [];
      }

      // Update stored access token
      await supabase
        .from('user_profiles')
        .update({ gmail_access_token: accessToken })
        .eq('user_id', user.id);
    }

    // Fetch emails from Gmail API
    const emails = await fetchGmailEmails(accessToken);
    console.log(`Fetched ${emails.length} emails from Gmail for ${user.email}`);
    
    return emails;
    
  } catch (error) {
    console.error(`Error fetching Gmail emails for ${user.email}:`, error);
    return [];
  }
}