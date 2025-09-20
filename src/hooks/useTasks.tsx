<<<<<<< HEAD
import { useState, useEffect, useCallback, useTransition } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  description?: string;
  email_link?: string;
  deadline?: Date;
  status: 'pending' | 'completed';
  created_at: Date;
  updated_at: Date;
  completedAt?: Date;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user) {
      console.log('Loading tasks for user:', user.id);
      loadTasks();
    } else {
      console.log('No user found, not loading tasks');
      setIsLoading(false);
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user?.id) {
      console.log('No user ID available for loading tasks');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Loading tasks for user ID:', user.id);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error loading tasks:', error);
        throw error;
      }

      console.log('Raw tasks data from database:', data);

      const mappedTasks: Task[] = (data || []).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        email_link: task.email_link,
        deadline: task.deadline ? new Date(task.deadline) : undefined,
        status: task.status as 'pending' | 'completed',
        created_at: new Date(task.created_at),
        updated_at: new Date(task.updated_at),
        completedAt: task.status === 'completed' ? new Date(task.updated_at) : undefined,
      }));

      console.log('Mapped tasks:', mappedTasks);
      setTasks(mappedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setIsLoading(false);
    }
  }, [user, loadTasks]);

  const toggleComplete = useCallback(async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
=======
  const toggleComplete = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const previousTasks = tasks;

<<<<<<< HEAD
    // Optimistic UI update
    startTransition(() => {
=======
      const { error } = await supabase.functions.invoke('task-operations', {
        body: {
          action: 'update',
          id,
          status: newStatus
        }
      });

      if (error) throw error;

      // Update local state
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d
      setTasks(prev => prev.map(t => 
        t.id === id 
          ? {
              ...t,
              status: newStatus,
<<<<<<< HEAD
              updated_at: new Date(),
              completedAt: newStatus === 'completed' ? new Date() : undefined,
=======
              completedAt: newStatus === 'completed' ? new Date() : undefined
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d
            }
          : t
      ));
    });

    try {
      // Try direct DB update, fallback to edge function
      let updateError = null as any;
      try {
        const { error: dbError } = await supabase
          .from('tasks')
          .update({
            status: newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .eq('user_id', user?.id);
        updateError = dbError;
      } catch (_) {
        const { error: funcError } = await supabase.functions.invoke('task-operations', {
          body: { action: 'update', id, status: newStatus },
        });
        updateError = funcError;
      }

      if (updateError) throw updateError;

      toast({
        title: newStatus === 'completed' ? 'Task completed' : 'Task reopened',
        description: `"${task.title}" has been ${newStatus === 'completed' ? 'marked as complete' : 'reopened'}.`,
      });
    } catch (error) {
<<<<<<< HEAD
      // Rollback on failure
      startTransition(() => setTasks(previousTasks));
      toast({
        title: 'Error',
        description: 'Failed to update task. Please try again.',
        variant: 'destructive',
      });
    }
  }, [tasks, user?.id, startTransition]);
=======
      console.error('Error toggling task:', error);
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('task-operations', {
        body: {
          action: 'delete',
          id
        }
      });

      if (error) throw error;

      // Update local state
      setTasks(prev => prev.filter(t => t.id !== id));

      toast({
        title: "Task deleted",
        description: "Task has been permanently deleted.",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const updateDeadline = async (id: string, deadline: Date) => {
    try {
      const { error } = await supabase.functions.invoke('task-operations', {
        body: {
          action: 'update',
          id,
          deadline: deadline.toISOString().split('T')[0]
        }
      });

      if (error) throw error;

      // Update local state
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, deadline } : t
      ));

      toast({
        title: "Deadline updated",
        description: "Task deadline has been updated.",
      });
    } catch (error) {
      console.error('Error updating deadline:', error);
      toast({
        title: "Error",
        description: "Failed to update deadline.",
        variant: "destructive",
      });
    }
  };

  const pendingTasks = tasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline.getTime() - b.deadline.getTime();
    });

  const completedTasks = tasks
    .filter(task => task.status === 'completed')
    .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));

  return {
    tasks,
    pendingTasks,
    completedTasks,
    isLoading,
    toggleComplete,
    deleteTask,
    updateDeadline,
    loadTasks
  };
}