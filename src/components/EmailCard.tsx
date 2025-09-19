import { ExternalLink, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Chip } from "./ui/chip";
import { Avatar } from "./ui/avatar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  gist: string;
  importance: number;
  timestamp: Date;
  emailUrl: string;
}

interface EmailCardProps {
  email: Email;
}

export function EmailCard({ email }: EmailCardProps) {
  const getImportanceVariant = (importance: number) => {
    if (importance < 0.4) return "low";
    if (importance < 0.7) return "medium";
    return "high";
  };

  const getImportanceLabel = (importance: number) => {
    if (importance < 0.4) return "Low";
    if (importance < 0.7) return "Medium";
    return "High";
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleSaveToTasks = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('task-operations', {
        body: {
          action: 'create',
          title: email.subject,
          description: email.gist,
          email_link: email.emailUrl,
          created_from_digest_date: new Date().toISOString().split('T')[0]
        }
      });

      if (error) throw error;

      toast({
        title: "✅ Added to tasks",
        description: `"${email.subject}" has been saved to your tasks.`,
      });
    } catch (error) {
      console.error('Error saving to tasks:', error);
      toast({
        title: "Error",
        description: "Failed to save email to tasks. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-6 bg-card border border-border-subtle rounded-lg hover:bg-card-hover hover:shadow-lg hover:scale-[1.01] transition-all duration-200 group" role="article" aria-label={`Email from ${email.from.name}: ${email.subject}`}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0">
          {email.from.avatar ? (
            <img 
              src={email.from.avatar} 
              alt={email.from.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center w-full h-full">
              {getInitials(email.from.name)}
            </div>
          )}
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">
                {email.from.name}
              </span>
              <span className="text-caption">
                {getRelativeTime(email.timestamp)}
              </span>
            </div>
            <Chip 
              variant={getImportanceVariant(email.importance)}
              className="flex-shrink-0"
            >
              {getImportanceLabel(email.importance)}
            </Chip>
          </div>

          <h3 className="text-body font-medium text-foreground line-clamp-2 mb-3 leading-snug">
            {email.subject}
          </h3>

          <p className="text-body text-foreground-muted line-clamp-2 mb-4 leading-relaxed">
            {email.gist}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(email.emailUrl, '_blank')}
              className="text-xs hover:scale-105 transition-transform duration-150"
              aria-label={`Open email "${email.subject}" in Gmail`}
            >
              <ExternalLink className="h-3 w-3 mr-1.5" />
              Open Email
            </Button>
            
            <Button
              size="sm"
              onClick={handleSaveToTasks}
              className="text-xs hover:scale-105 transition-transform duration-150"
              aria-label={`Save email "${email.subject}" to tasks`}
            >
              <Plus className="h-3 w-3 mr-1.5" />
              Save to Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}