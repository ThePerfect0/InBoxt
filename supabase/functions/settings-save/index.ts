import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SettingsUpdateRequest {
  prefs_check_time: string;
  prefs_top_n: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with user context
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    );

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { prefs_check_time, prefs_top_n }: SettingsUpdateRequest = await req.json();

    // Validate input
    if (!prefs_check_time || typeof prefs_check_time !== 'string') {
      return new Response(JSON.stringify({ error: 'Valid check time is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!prefs_top_n || typeof prefs_top_n !== 'number' || prefs_top_n < 1 || prefs_top_n > 10) {
      return new Response(JSON.stringify({ error: 'Top N must be between 1 and 10' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(prefs_check_time)) {
      return new Response(JSON.stringify({ error: 'Invalid time format. Use HH:MM' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Updating settings for user ${user.id}: check_time=${prefs_check_time}, top_n=${prefs_top_n}`);

    // Update user preferences
    const { data, error } = await supabase
      .from('users')
      .update({
        prefs_check_time,
        prefs_top_n,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user settings:', error);
      return new Response(JSON.stringify({ error: 'Failed to update settings' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Settings updated successfully for user:', user.id);

    return new Response(JSON.stringify({
      success: true,
      data: {
        prefs_check_time: data.prefs_check_time,
        prefs_top_n: data.prefs_top_n,
        updated_at: data.updated_at
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in settings-save function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});