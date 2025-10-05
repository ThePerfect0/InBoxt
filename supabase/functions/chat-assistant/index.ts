import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { conversationId, message } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate message length
    if (message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Message must be less than 5000 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing chat message for user ${user.id}`);

    // Get or create conversation
    let currentConversationId = conversationId;
    
    if (!currentConversationId) {
      const { data: newConversation, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select()
        .single();

      if (convError) {
        console.error('Error creating conversation:', convError);
        throw new Error('Failed to create conversation');
      }

      currentConversationId = newConversation.id;
    }

    // Get conversation history
    const { data: messages, error: messagesError } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
      throw new Error('Failed to fetch conversation history');
    }

    // Get user's recent email digests for context
    const { data: recentDigests, error: digestsError } = await supabase
      .from('digests')
      .select('date, emails')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(5);

    if (digestsError) {
      console.error('Error fetching digests:', digestsError);
    }

    // Build email context
    let emailContext = '';
    if (recentDigests && recentDigests.length > 0) {
      emailContext = '\n\nRecent Email Summary:\n';
      recentDigests.forEach(digest => {
        const emails = digest.emails as any[];
        if (emails && emails.length > 0) {
          emailContext += `\nDate: ${digest.date}\n`;
          emails.forEach((email: any, idx: number) => {
            emailContext += `${idx + 1}. From: ${email.sender} - ${email.subject}\n   Gist: ${email.gist}\n   Importance: ${email.importance_score}\n`;
            if (email.deadline) {
              emailContext += `   Deadline: ${email.deadline}\n`;
            }
          });
        }
      });
    }

    // Save user message
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        user_id: user.id,
        role: 'user',
        content: message
      });

    // Prepare messages for AI
    const systemPrompt = `You are InBoxt AI, a helpful assistant that helps users manage their emails and tasks. You have access to the user's recent email digests and can provide insights, answer questions, and help with email-related tasks.

Key capabilities:
- Answer questions about their recent emails
- Help identify important emails and deadlines
- Suggest task prioritization
- Provide email summaries and insights
- Assist with email management strategies

Be concise, helpful, and proactive in suggesting actions the user might want to take based on their emails.${emailContext}`;

    const conversationMessages = [
      { role: 'system', content: systemPrompt },
      ...(messages || []).map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ];

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service quota exceeded. Please contact support.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('AI service error');
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    // Save assistant message
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        user_id: user.id,
        role: 'assistant',
        content: assistantMessage
      });

    console.log('Chat message processed successfully');

    return new Response(JSON.stringify({
      success: true,
      conversationId: currentConversationId,
      message: assistantMessage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});