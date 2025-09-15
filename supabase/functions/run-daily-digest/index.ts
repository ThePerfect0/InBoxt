import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

  // Get Gmail access token for user (if available)
  const gmailEmails = await fetchGmailEmails(user);
  
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

  // Process and rank emails (placeholder - AI ranking will be added later)
  const processedEmails = gmailEmails
    .slice(0, user.prefs_top_n)
    .map((email, index) => ({
      email_id: email.id,
      gist: email.snippet || 'Email content preview', // Placeholder gist
      sender: email.sender,
      subject: email.subject,
      link: `https://mail.google.com/mail/u/0/#inbox/${email.id}`,
      importance_score: Math.random(), // Placeholder importance score
      processed_at: new Date().toISOString()
    }));

  // Save digest to database
  const { error: insertError } = await supabase
    .from('digests')
    .insert({
      user_id: user.id,
      date: today,
      emails: processedEmails
    });

  if (insertError) {
    console.error(`Error saving digest for ${user.email}:`, insertError);
    throw insertError;
  }

  console.log(`Successfully processed ${processedEmails.length} emails for ${user.email}`);
  
  return { 
    emailsProcessed: processedEmails.length, 
    message: `Processed ${processedEmails.length} emails` 
  };
}

async function fetchGmailEmails(user: User) {
  // Placeholder implementation for Gmail API integration
  // This will be expanded when OAuth tokens are properly stored
  
  console.log(`Attempting to fetch Gmail emails for ${user.email}`);
  
  // For now, return mock data to test the pipeline
  // In production, this would:
  // 1. Get stored OAuth tokens from Supabase
  // 2. Call Gmail API to fetch recent emails
  // 3. Parse email headers and content
  // 4. Return structured email data
  
  const mockEmails = [
    {
      id: 'mock_email_1',
      sender: 'john@example.com',
      subject: 'Project Update Required',
      snippet: 'Hi, we need your input on the quarterly project timeline...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: 'mock_email_2',
      sender: 'sarah@company.com',
      subject: 'Budget Review Meeting',
      snippet: 'Please review the attached budget documents before our meeting...',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
    },
    {
      id: 'mock_email_3',
      sender: 'team@startup.io',
      subject: 'Customer Feedback Summary',
      snippet: 'This week\'s customer feedback highlights several improvement areas...',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
    }
  ];

  // Only return mock emails in development/testing
  if (Deno.env.get('ENVIRONMENT') !== 'production') {
    console.log(`Returning ${mockEmails.length} mock emails for testing`);
    return mockEmails;
  }

  // In production, would implement actual Gmail API calls here
  console.log('Gmail integration not yet configured for production');
  return [];
}