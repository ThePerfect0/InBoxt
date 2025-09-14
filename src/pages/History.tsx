import { useState, useEffect } from "react";
import { EmailCard } from "@/components/EmailCard";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { mockHistoryEmails } from "@/lib/mockData";

export function History() {
  const [historyData, setHistoryData] = useState(mockHistoryEmails);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Month Navigator Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        {/* Section Headers and Email Cards */}
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <SectionHeader sticky>
              <Skeleton className="h-5 w-40" />
            </SectionHeader>
            {Array.from({ length: 2 }).map((_, i) => (
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
        ))}
      </div>
    );
  }

  if (historyData.length === 0) {
    return (
      <EmptyState
        icon={<HistoryIcon className="w-8 h-8" />}
        title="No email history"
        description="Your email digest history will appear here once you start receiving daily summaries."
        action={{
          label: "Go to Dashboard",
          onClick: () => window.location.href = "/dashboard",
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Month Navigator */}
      <div className="flex items-center justify-between">
        <h2 className="text-heading-md text-foreground">
          {formatMonth(currentMonth)}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* History Sections */}
      <div className="space-y-6">
        {historyData.map((section, sectionIndex) => (
          <div key={section.date} className="space-y-4">
            <SectionHeader 
              sticky
              count={section.emails.length}
            >
              {section.date}
            </SectionHeader>
            
            <div className="space-y-4">
              {section.emails.map((email, emailIndex) => (
                <div 
                  key={email.id} 
                  className="animate-fade-in"
                  style={{ 
                    animationDelay: `${(sectionIndex * 3 + emailIndex) * 100}ms` 
                  }}
                >
                  <EmailCard email={email} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="secondary">
          Load Older
        </Button>
      </div>
    </div>
  );
}