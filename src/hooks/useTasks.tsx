import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

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

  const toggleComplete = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newStatus = task.status === 'completed' ? 'pending' : 'completed';

      const { error } = await supabase.functions.invoke('task-operations', {
        body: {
          action: 'update',
          id,
          status: newStatus
        }
      });

      if (error) throw error;

      // Update local state
      setTasks(prev => prev.map(t => 
        t.id === id 
          ? { 
              ...t, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date() : undefined
            }
          : t
      ));

      toast({
        title: newStatus === 'completed' ? "Task completed" : "Task reopened",
        description: `"${task.title}" has been ${newStatus === 'completed' ? 'marked as complete' : 'reopened'}.`,
      });
    } catch (error) {
      console.error('Error toggling task:', error);
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

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