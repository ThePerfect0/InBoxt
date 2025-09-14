import { useState, useEffect } from "react";
import { EmailCard } from "@/components/EmailCard";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Settings, History } from "lucide-react";
import { mockEmails } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [emails, setEmails] = useState(mockEmails);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const topEmails = emails
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5); // Top 5 emails

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-card border border-border-subtle rounded-lg">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-24" />
                  <Skeleton className="h-7 w-28" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (topEmails.length === 0) {
    return (
      <EmptyState
        icon={<Mail className="w-8 h-8" />}
        title="Quiet inbox today"
        description="No important emails found in the last 24 hours. Your inbox is all caught up!"
        action={{
          label: "Check Settings",
          onClick: () => navigate("/settings"),
        }}
        secondaryAction={{
          label: "View History", 
          onClick: () => navigate("/history"),
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {topEmails.map((email) => (
        <div key={email.id} className="animate-fade-in">
          <EmailCard email={email} />
        </div>
      ))}
    </div>
  );
}