import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        low: "bg-surface-elevated text-foreground-muted border border-border-subtle",
        medium: "bg-warning/20 text-warning border border-warning/30",
        high: "bg-danger/20 text-danger border border-danger/30",
        success: "bg-success/20 text-success border border-success/30",
        overdue: "bg-danger text-white",
        soon: "bg-warning text-white",
        scheduled: "bg-success text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };