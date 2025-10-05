import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateTaskRequest {
  action: 'create';
  title: string;
  description?: string;
  deadline?: string;
  email_link?: string;
  created_from_digest_date?: string;
}

interface UpdateTaskRequest {
  action: 'update';
  id: string;
  deadline?: string;
  status?: 'pending' | 'completed';
}

interface DeleteTaskRequest {
  action: 'delete';
  id: string;
}

type TaskRequest = CreateTaskRequest | UpdateTaskRequest | DeleteTaskRequest;

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

    const request: TaskRequest = await req.json();

    switch (request.action) {
      case 'create':
        return await createTask(supabase, user.id, request);
      case 'update':
        return await updateTask(supabase, user.id, request);
      case 'delete':
        return await deleteTask(supabase, user.id, request);
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in task-operations function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createTask(supabase: any, userId: string, request: CreateTaskRequest) {
  const { title, description, deadline, email_link, created_from_digest_date } = request;

  // Validate required fields
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Task title is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate title length
  if (title.length > 500) {
    return new Response(JSON.stringify({ error: 'Title must be less than 500 characters' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate description length if provided
  if (description && description.length > 5000) {
    return new Response(JSON.stringify({ error: 'Description must be less than 5000 characters' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate email_link is a valid URL if provided
  if (email_link) {
    try {
      const url = new URL(email_link);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid email link URL' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // Validate deadline format and date validity if provided
  if (deadline) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
      return new Response(JSON.stringify({ error: 'Invalid deadline format. Use YYYY-MM-DD' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Validate that it's a valid date
    const dateObj = new Date(deadline);
    if (isNaN(dateObj.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid deadline date' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  console.log(`Creating task for user ${userId}: ${title}`);

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title: title.trim(),
      description: description?.trim() || null,
      deadline: deadline || null,
      email_link: email_link || null,
      created_from_digest_date: created_from_digest_date || null,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    return new Response(JSON.stringify({ error: 'Failed to create task' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log('Task created successfully:', data.id);

  return new Response(JSON.stringify({
    success: true,
    data
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateTask(supabase: any, userId: string, request: UpdateTaskRequest) {
  const { id, deadline, status } = request;

  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'Task ID is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate deadline format and date validity if provided
  if (deadline) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
      return new Response(JSON.stringify({ error: 'Invalid deadline format. Use YYYY-MM-DD' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Validate that it's a valid date
    const dateObj = new Date(deadline);
    if (isNaN(dateObj.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid deadline date' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // Validate status if provided
  if (status && !['pending', 'completed'].includes(status)) {
    return new Response(JSON.stringify({ error: 'Invalid status. Use "pending" or "completed"' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log(`Updating task ${id} for user ${userId}`);

  const updateData: any = {};
  if (deadline !== undefined) updateData.deadline = deadline;
  if (status !== undefined) updateData.status = status;

  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', userId) // Ensure user can only update their own tasks
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    if (error.details?.includes('0 rows')) {
      return new Response(JSON.stringify({ error: 'Task not found or access denied' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to update task' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log('Task updated successfully:', id);

  return new Response(JSON.stringify({
    success: true,
    data
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function deleteTask(supabase: any, userId: string, request: DeleteTaskRequest) {
  const { id } = request;

  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'Task ID is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log(`Deleting task ${id} for user ${userId}`);

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userId); // Ensure user can only delete their own tasks

  if (error) {
    console.error('Error deleting task:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete task' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log('Task deleted successfully:', id);

  return new Response(JSON.stringify({
    success: true,
    message: 'Task deleted successfully'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}