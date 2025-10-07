import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PricingButtonProps {
  variant?: "banner" | "subtle";
  className?: string;
}

export function PricingButton({ variant = "subtle", className = "" }: PricingButtonProps) {
  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 rounded-lg p-2">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Upgrade to Pro
              </h3>
              <p className="text-xs text-foreground-muted">
                Get unlimited digests, advanced AI features, and priority support
              </p>
            </div>
          </div>
          <Button 
            asChild 
            size="sm"
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Link to="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button 
      asChild 
      variant="ghost" 
      size="sm"
      className={`text-foreground-muted hover:text-foreground ${className}`}
    >
      <Link to="/pricing" className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Upgrade
      </Link>
    </Button>
  );
}
