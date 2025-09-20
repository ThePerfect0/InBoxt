/// <reference path="../deno-env.d.ts" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchGmailEmails, refreshGmailToken } from '../shared/gmail.ts';
import { extractGist, calculateImportance, extractDeadline } from '../shared/openrouter.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProcessingStats {
  emailsFetched: number;
  emailsProcessed: number;
  aiCalls: number;
  errors: number;
  processingTimeMs: number;
}

interface ProcessedEmail {
  email_id: string;
  gist: string;
  sender: string;
  subject: string;
  link: string;
  importance_score: number;
  deadline: string | null;
  processed_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify required secrets
    const requiredSecrets = ['OPENROUTER_API_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
    for (const secret of requiredSecrets) {
      if (!Deno.env.get(secret)) {
        console.error(`Missing required secret: ${secret}`);
        return new Response(JSON.stringify({
          success: false,
          error: `Configuration error: ${secret} not found`
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const { access_token } = await req.json();
    
    if (!access_token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Access token required'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get current user from access token
    const { data: { user }, error: userError } = await supabase.auth.getUser(access_token);
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Authentication failed'
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Starting initial fetch for user: ${user.email}`);
    const startTime = Date.now();
    
    // Get user preferences
    const { data: userData } = await supabase
      .from('users')
      .select('prefs_top_n')
      .eq('id', user.id)
      .single();

    const topN = userData?.prefs_top_n || 5;

    // Get Gmail tokens from user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('gmail_access_token, gmail_refresh_token')
      .eq('user_id', user.id)
      .single();

    if (!profile?.gmail_refresh_token && !profile?.gmail_access_token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Gmail not connected'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stats: ProcessingStats = {
      emailsFetched: 0,
      emailsProcessed: 0,
      aiCalls: 0,
      errors: 0,
      processingTimeMs: 0
    };

    try {
      // Fetch emails from Gmail
      console.log('Fetching emails from Gmail...');
      let accessToken = profile.gmail_access_token;
      let gmailEmails;
      try {
        gmailEmails = await fetchGmailEmails(accessToken);
      } catch (err) {
        console.warn('Initial Gmail fetch failed, attempting token refresh...', err);
        if (profile.gmail_refresh_token) {
          const newAccess = await refreshGmailToken(profile.gmail_refresh_token);
          if (newAccess) {
            accessToken = newAccess;
            // Persist new access token
            await supabase
              .from('user_profiles')
              .update({ gmail_access_token: newAccess })
              .eq('user_id', user.id);
            // Retry fetch
            gmailEmails = await fetchGmailEmails(accessToken);
          } else {
            throw new Error('Failed to refresh Gmail access token');
          }
        } else {
          throw err;
        }
      }
      stats.emailsFetched = gmailEmails.length;
      
      console.log(`Fetched ${gmailEmails.length} emails`);

      if (gmailEmails.length === 0) {
        // Create empty digest for today
        const today = new Date().toISOString().split('T')[0];
        await supabase.from('digests').insert({
          user_id: user.id,
          date: today,
          emails: []
        });

        stats.processingTimeMs = Date.now() - startTime;
        
        return new Response(JSON.stringify({
          success: true,
          message: 'No emails found',
          stats
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Process emails with AI
      console.log('Processing emails with AI...');
      const processedEmails: ProcessedEmail[] = [];
      
      for (const email of gmailEmails) {
        try {
          console.log(`Processing email from ${email.sender}: ${email.subject}`);
          
          // Extract gist
          const gistResult = await extractGist(email.text);
          stats.aiCalls++;
          
          // Calculate importance
          const importanceResult = await calculateImportance(email.text, email.sender, email.subject);
          stats.aiCalls++;
          
          // Extract deadline
          const deadlineResult = await extractDeadline(email.text, email.subject);
          stats.aiCalls++;
          
          const processedEmail: ProcessedEmail = {
            email_id: email.id,
            gist: gistResult?.gist || email.snippet || 'Unable to summarize',
            sender: email.sender,
            subject: email.subject,
            link: `https://mail.google.com/mail/u/0/#inbox/${email.id}`,
            importance_score: importanceResult?.importance || 0.5,
            deadline: deadlineResult?.deadline ?? null,
            processed_at: new Date().toISOString()
          };
          
          processedEmails.push(processedEmail);
          stats.emailsProcessed++;
          
          console.log(`Processed email: importance=${processedEmail.importance_score}, deadline=${processedEmail.deadline}`);
          
        } catch (error) {
          console.error(`Error processing email ${email.id}:`, error);
          stats.errors++;
          
          // Add fallback email
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
        .slice(0, topN);
      
      console.log(`Filtered ${processedEmails.length} emails to ${filteredEmails.length} with importance >= 0.4, taking top ${rankedEmails.length}`);

      // Save digest to database
      const today = new Date().toISOString().split('T')[0];
      const { error: insertError } = await supabase
        .from('digests')
        .insert({
          user_id: user.id,
          date: today,
          emails: rankedEmails
        });

      if (insertError) {
        console.error('Error saving digest:', insertError);
        throw insertError;
      }

      stats.processingTimeMs = Date.now() - startTime;
      
      console.log(`Initial fetch completed for ${user.email}:`, stats);
      
      return new Response(JSON.stringify({
        success: true,
        message: `Processed ${rankedEmails.length} emails`,
        digest: {
          date: today,
          emailCount: rankedEmails.length,
          totalFetched: gmailEmails.length
        },
        stats
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Processing error:', error);
      stats.processingTimeMs = Date.now() - startTime;
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        stats
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Fatal error in initial-fetch:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});