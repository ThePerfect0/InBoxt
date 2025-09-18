import { useState } from "react";
import { Calendar, ExternalLink, MoreHorizontal, Check, RotateCcw, Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Chip } from "./ui/chip";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  gist: string;
  emailUrl: string;
  deadline?: Date;
  completed: boolean;
  completedAt?: Date;
}

interface TaskRowProps {
  task: Task;
  onToggleComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUpdateDeadline?: (id: string, deadline: Date) => void;
}

export function TaskRow({ task, onToggleComplete, onDelete, onUpdateDeadline }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getDeadlineVariant = (deadline: Date | undefined, completed: boolean) => {
    if (completed) return "success";
    if (!deadline) return "default";
    
    const now = new Date();
    const diffInHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 0) return "overdue";
    if (diffInHours < 24) return "soon";
    return "scheduled";
  };

  const getDeadlineLabel = (deadline: Date | undefined, completed: boolean) => {
    if (completed) return "Completed";
    if (!deadline) return "No deadline";
    
    const now = new Date();
    const diffInHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 0) {
      const diffInDays = Math.abs(Math.floor(diffInHours / 24));
      return diffInDays === 0 ? "Overdue" : `${diffInDays}d overdue`;
    }
    
    if (diffInHours < 1) return "Due soon";
    if (diffInHours < 24) return `Due in ${Math.floor(diffInHours)}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Due in ${diffInDays}d`;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No deadline";
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const handleToggleComplete = () => {
    onToggleComplete?.(task.id);
    toast({
      title: task.completed ? "Task restored" : "Task completed",
      description: task.completed 
        ? `"${task.title}" has been restored to pending.`
        : `"${task.title}" has been marked as completed.`,
    });
  };

  const handleDelete = () => {
    onDelete?.(task.id);
    toast({
      title: "Task deleted",
      description: `"${task.title}" has been deleted.`,
    });
  };

  return (
    <div className={`p-4 bg-card border border-border-subtle rounded-lg hover:bg-card-hover transition-all duration-150 ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-3">
        {/* Complete Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleComplete}
          className="mt-0.5 flex-shrink-0"
        >
          {task.completed ? (
            <RotateCcw className="h-4 w-4 text-success" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-body font-medium text-foreground truncate-1 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.title}
            </h3>
            
            <Chip 
              variant={getDeadlineVariant(task.deadline, task.completed)}
              className="flex-shrink-0 ml-2"
            >
              {getDeadlineLabel(task.deadline, task.completed)}
            </Chip>
          </div>

          <p className={`text-body text-foreground-muted truncate-2 mb-3 ${
            task.completed ? 'line-through' : ''
          }`}>
            {task.gist}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(task.emailUrl, '_blank')}
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1.5" />
                View Email
              </Button>
              
              {task.deadline && (
                <div className="flex items-center gap-1 text-caption">
                  <Calendar className="h-3 w-3" />
                  {formatDate(task.deadline)}
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit deadline
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(task.emailUrl, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-danger">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}