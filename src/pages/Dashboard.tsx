import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { EmailCard } from "@/components/EmailCard";
import { EmptyState } from "@/components/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { useInitialFetch } from "@/hooks/useInitialFetch";
import { InitialFetchOverlay } from "@/components/InitialFetchOverlay";
import { ConnectEmailDialog } from "@/components/ConnectEmailDialog";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface EmailDigest {
  email_id: string;
  gist: string;
  sender: string;
  subject: string;
  link: string;
  importance_score: number;
  deadline?: string;
  processed_at: string;
}

export function Dashboard() {
  const [emails, setEmails] = useState<EmailDigest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGmailConnection, setHasGmailConnection] = useState(false);
  const { user } = useAuth();
  const { 
    isProcessing, 
    showConnectDialog, 
    setShowConnectDialog, 
    handleGmailConnected,
    digestFetchComplete
  } = useInitialFetch();

  useEffect(() => {
    if (!user) return;

    const loadTodaysDigest = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        console.log('Loading today\'s digest for:', today);
        
        // Get today's digest
        const { data: digest } = await supabase
          .from('digests')
          .select('emails')
          .eq('user_id', user.id)
          .eq('date', today)
          .maybeSingle();

        // Check if user has Gmail connection
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('gmail_refresh_token')
          .eq('user_id', user.id)
          .maybeSingle();

        setHasGmailConnection(!!profile?.gmail_refresh_token);
        const digestEmails = Array.isArray(digest?.emails) ? (digest.emails as unknown as EmailDigest[]) : [];
        setEmails(digestEmails);
        
        if (digestEmails.length > 0) {
          console.log('Dashboard rendered with data:', digestEmails.length, 'emails');
        }
      } catch (error) {
        console.error('Error loading digest:', error);
        setEmails([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodaysDigest();
  }, [user, digestFetchComplete]);

  const handleConnectGmail = () => {
    setShowConnectDialog(true);
  };

  // Show initial fetch overlay if processing
  if (isProcessing) {
    return (
      <InitialFetchOverlay
        show={true}
        onComplete={() => {
          // Don't reload page, just re-fetch digest data
          console.log('Initial fetch overlay completed');
        }}
        onError={(error) => console.error('Initial fetch error:', error)}
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="py-3 px-4">
          <h2 className="text-heading-lg text-foreground">Today's Digest</h2>
          <p className="text-body text-foreground-muted">Loading your important emails...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card border border-border-subtle rounded-lg p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show connect email state if no Gmail connection
  if (!hasGmailConnection) {
    return (
      <div className="space-y-6">
        <div className="py-3 px-4">
          <h2 className="text-heading-lg text-foreground">Welcome to InBoxt</h2>
          <p className="text-body text-foreground-muted">Connect your Gmail to start receiving intelligent email digests</p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-heading-sm font-semibold text-foreground mb-2">
              Connect Gmail to begin
            </h3>
            <p className="text-body text-foreground-muted mb-6 max-w-md mx-auto">
              InBoxt uses AI to analyze your emails and create personalized daily digests with only the most important messages.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleConnectGmail} className="gap-2">
                <Mail className="w-4 h-4" />
                Connect Gmail
              </Button>
              <Button variant="outline" asChild>
                <Link to="/settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <ConnectEmailDialog
          open={showConnectDialog}
          onClose={() => setShowConnectDialog(false)}
          onConnected={handleGmailConnected}
        />
      </div>
    );
  }

  // Show empty state if no emails for today
  if (emails.length === 0) {
    return (
      <div className="space-y-6">
        <div className="py-3 px-4">
          <h2 className="text-heading-lg text-foreground">Today's Digest</h2>
          <p className="text-body text-foreground-muted">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <EmptyState
          icon={<Mail className="w-8 h-8" />}
          title="No important emails today"
          description="You're all caught up! We'll check for new emails and update your digest throughout the day."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="py-3 px-4">
        <h2 className="text-heading-lg text-foreground">Today's Digest</h2>
        <p className="text-body text-foreground-muted">
          {`${emails.length} important ${emails.length === 1 ? 'email' : 'emails'} • ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}`}
        </p>
      </div>
      
      <div className="space-y-4">
        {emails.map((email) => (
          <EmailCard
            key={email.email_id}
            email={{
              id: email.email_id,
              from: {
                name: email.sender,
                email: email.sender
              },
              subject: email.subject,
              gist: email.gist,
              emailUrl: email.link,
              importance: email.importance_score,
              timestamp: new Date(email.processed_at)
            }}
          />
        ))}
      </div>

      <ConnectEmailDialog
        open={showConnectDialog}
        onClose={() => setShowConnectDialog(false)}
        onConnected={handleGmailConnected}
      />
    </div>
  );
}