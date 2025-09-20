import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserData {
  profile: any;
  digests: any[];
  tasks: any[];
  preferences: any;
}

interface UseUserDataReturn {
  userData: UserData | null;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
  clearUserData: () => void;
}

export function useUserData(): UseUserDataReturn {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();

  const loadUserData = useCallback(async () => {
    if (!user?.id) {
      setUserData(null);
      return;
    }

    setIsLoading(true);
    console.log('Loading user data for:', user.id);

    try {
      // Load user profile and preferences
      const [profileResult, digestsResult, tasksResult, userPrefsResult] = await Promise.allSettled([
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
        
        supabase
          .from('digests')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', (() => {
            const d = new Date();
            d.setMonth(d.getMonth() - 6);
            return d.toISOString().split('T')[0];
          })())
          .order('date', { ascending: false })
          .limit(180), // Up to ~6 months of digests
        
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()
      ]);

      const profile = profileResult.status === 'fulfilled' ? profileResult.value.data : null;
      const digests = digestsResult.status === 'fulfilled' ? digestsResult.value.data || [] : [];
      const tasks = tasksResult.status === 'fulfilled' ? tasksResult.value.data || [] : [];
      const preferences = userPrefsResult.status === 'fulfilled' ? userPrefsResult.value.data : null;

      // Log any errors
      [profileResult, digestsResult, tasksResult, userPrefsResult].forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Error loading user data part ${index}:`, result.reason);
        }
      });

      const newUserData: UserData = {
        profile,
        digests,
        tasks,
        preferences
      };

      setUserData(newUserData);
      console.log('User data loaded successfully:', {
        profileExists: !!profile,
        digestsCount: digests.length,
        tasksCount: tasks.length,
        preferencesExists: !!preferences
      });

      // Store in localStorage for offline access
      try {
        localStorage.setItem(`userData_${user.id}`, JSON.stringify(newUserData));
      } catch (err) {
        console.warn('Failed to cache user data in localStorage:', err);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
      
      // Try to load from localStorage as fallback
      try {
        const cachedData = localStorage.getItem(`userData_${user.id}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserData(parsedData);
          console.log('Loaded user data from cache');
        }
      } catch (cacheError) {
        console.error('Failed to load cached user data:', cacheError);
      }

      toast({
        title: "Data Loading Issue",
        description: "Some data may not be up to date. Please refresh the page if issues persist.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const refreshUserData = useCallback(async () => {
    await loadUserData();
  }, [loadUserData]);

  const clearUserData = useCallback(() => {
    setUserData(null);
    if (user?.id) {
      try {
        localStorage.removeItem(`userData_${user.id}`);
      } catch (err) {
        console.warn('Failed to clear cached user data:', err);
      }
    }
  }, [user?.id]);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      clearUserData();
    }
  }, [user, loadUserData, clearUserData]);

  // Set up real-time subscriptions for data changes
  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up real-time subscriptions for user:', user.id);

    const subscriptions = [
      // Subscribe to task changes
      supabase
        .channel('tasks_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'tasks',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('Task change detected:', payload);
            // Refresh tasks data
            refreshUserData();
          }
        )
        .subscribe(),

      // Subscribe to digest changes
      supabase
        .channel('digests_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'digests',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('Digest change detected:', payload);
            // Refresh digests data
            refreshUserData();
          }
        )
        .subscribe(),

      // Subscribe to user profile changes
      supabase
        .channel('user_profiles_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_profiles',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('Profile change detected:', payload);
            // Refresh profile data
            refreshUserData();
          }
        )
        .subscribe()
    ];

    return () => {
      console.log('Cleaning up real-time subscriptions');
      subscriptions.forEach(subscription => {
        supabase.removeChannel(subscription);
      });
    };
  }, [user?.id, refreshUserData]);

  return {
    userData,
    isLoading,
    refreshUserData,
    clearUserData
  };
}
