import { useState, useEffect } from "react";
import { EmailCard } from "@/components/EmailCard";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

interface DigestHistory {
  date: string;
  emails: EmailDigest[];
}

export function History() {
  const [history, setHistory] = useState<DigestHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      // Load digests from the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('digests')
        .select('date, emails')
        .eq('user_id', user?.id)
        .gte('date', sixMonthsAgoStr)
        .order('date', { ascending: false })
        .limit(180); // Up to ~6 months

      if (error) throw error;

      const historyData: DigestHistory[] = (data || []).map(digest => ({
        date: new Date(digest.date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        emails: Array.isArray(digest.emails) ? digest.emails as unknown as EmailDigest[] : []
      })).filter(d => d.emails.length > 0);

      setHistory(historyData);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="bg-card border border-border-subtle rounded-lg p-6 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-8 h-8" />}
        title="No digest history"
        description="Your email digests will appear here after they are processed. Check back tomorrow for your first digest."
      />
    );
  }

  return (
    <div className="space-y-8">
      {history.map((digest, index) => (
        <div key={digest.date} className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-foreground-muted" />
            <h2 className="text-heading-sm text-foreground">{digest.date}</h2>
            <span className="text-body-sm text-foreground-muted">
              {digest.emails.length} email{digest.emails.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-4">
            {digest.emails.map((email) => (
              <div 
                key={email.email_id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EmailCard
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}