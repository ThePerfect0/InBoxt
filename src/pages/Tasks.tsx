import { useState } from "react";
import { TaskRow } from "@/components/TaskRow";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckSquare } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

export function Tasks() {
  const { 
    pendingTasks, 
    completedTasks, 
    isLoading, 
    toggleComplete, 
    deleteTask, 
    updateDeadline 
  } = useTasks();
  const [activeTab, setActiveTab] = useState("pending");

  const renderTaskList = (taskList: any[]) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-card border border-border-subtle rounded-lg">
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="h-7 w-7" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (taskList.length === 0) {
      const isCompleted = activeTab === "completed";
      return (
        <EmptyState
          icon={<CheckSquare className="w-8 h-8" />}
          title={isCompleted ? "No completed tasks" : "No pending tasks"}
          description={
            isCompleted 
              ? "Completed tasks will appear here once you mark them as done."
              : "Tasks you save from emails will appear here. Start by saving some emails as tasks from your dashboard."
          }
          action={
            !isCompleted ? {
              label: "Go to Dashboard",
              onClick: () => window.location.href = "/dashboard",
            } : undefined
          }
        />
      );
    }

    return (
      <div className="space-y-4">
        {taskList.map((task, index) => (
          <div 
            key={task.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TaskRow
              task={{
                ...task,
                completed: task.status === 'completed',
                completedAt: task.completedAt,
                gist: task.description || '',
                emailUrl: task.email_link || ''
              }}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onUpdateDeadline={updateDeadline}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:w-96">
          <TabsTrigger value="pending">
            Pending
            {!isLoading && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {pendingTasks.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {!isLoading && (
              <span className="ml-2 px-2 py-0.5 bg-success text-white text-xs rounded-full">
                {completedTasks.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {renderTaskList(pendingTasks)}
        </TabsContent>

        <TabsContent value="completed">
          {renderTaskList(completedTasks)}
        </TabsContent>
      </Tabs>
    </div>
  );
}