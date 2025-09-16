import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { InitialFetchOverlay } from '@/components/InitialFetchOverlay';
import { ConnectEmailDialog } from '@/components/ConnectEmailDialog';
import { useToast } from '@/hooks/use-toast';

export function useInitialFetch() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [hasProcessedOAuth, setHasProcessedOAuth] = useState(false);
  const { user, session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || !session || hasProcessedOAuth) return;

    const handleOAuthSession = async () => {
      try {
        // Check if this is an OAuth session with provider token
        const providerToken = session.provider_token;
        const providerRefreshToken = session.provider_refresh_token;
        
        if (providerToken && session.user.app_metadata.provider === 'google') {
          console.log('OAuth session detected, storing tokens and running initial fetch');
          
          // Store Gmail tokens in user profile
          await supabase
            .from('user_profiles')
            .upsert({
              user_id: user.id,
              gmail_access_token: providerToken,
              gmail_refresh_token: providerRefreshToken
            });

          // Run initial fetch
          setIsProcessing(true);
          
          const { error } = await supabase.functions.invoke('initial-fetch', {
            body: { access_token: session.access_token }
          });

          if (error) {
            console.error('Initial fetch failed:', error);
            toast({
              title: "Failed to process emails",
              description: "We couldn't process your emails. Please try again in Settings.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Digest ready!",
              description: "Your first email digest has been generated.",
            });
          }
          
          setIsProcessing(false);
          setHasProcessedOAuth(true);
        } else {
          // Email/password signup - show connect dialog for new users
          const signupTime = new Date(user.created_at).getTime();
          const now = Date.now();
          const isNewUser = (now - signupTime) < 60000; // Less than 1 minute ago
          
          if (isNewUser) {
            setShowConnectDialog(true);
          }
        }
      } catch (error) {
        console.error('Error handling OAuth session:', error);
        setIsProcessing(false);
      }
    };

    handleOAuthSession();
  }, [user, session, hasProcessedOAuth, toast]);

  const handleGmailConnected = async () => {
    setShowConnectDialog(false);
    setIsProcessing(true);
    
    try {
      const { error } = await supabase.functions.invoke('initial-fetch', {
        body: { access_token: session?.access_token }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Gmail connected!",
        description: "Your first email digest has been generated.",
      });
    } catch (error) {
      console.error('Initial fetch after Gmail connection failed:', error);
      toast({
        title: "Connection successful",
        description: "Gmail connected! Your digest will be ready shortly.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    showConnectDialog,
    setShowConnectDialog,
    handleGmailConnected
  };
}