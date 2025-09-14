import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: ReactNode;
  count?: number;
  className?: string;
  sticky?: boolean;
}

export function SectionHeader({ children, count, className, sticky = false }: SectionHeaderProps) {
  return (
    <div className={cn(
      "py-3 px-4 bg-surface-elevated border-b border-border-subtle",
      sticky && "sticky top-0 z-10",
      className
    )}>
      <div className="flex items-center justify-between">
        <h2 className="text-heading-sm text-foreground">
          {children}
        </h2>
        {count !== undefined && (
          <span className="text-caption bg-muted px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}