import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Calendar, Shield } from "lucide-react";

export function Profile() {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-heading-lg text-foreground mb-1">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-body text-foreground-muted">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Account Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-heading-sm text-foreground">Account Information</h2>
            <p className="text-body text-foreground-muted">Your account details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-surface rounded-lg">
            <Mail className="w-5 h-5 text-foreground-muted mt-0.5" />
            <div>
              <p className="text-body-sm font-medium text-foreground">Email Address</p>
              <p className="text-body text-foreground-muted">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-surface rounded-lg">
            <Calendar className="w-5 h-5 text-foreground-muted mt-0.5" />
            <div>
              <p className="text-body-sm font-medium text-foreground">Member Since</p>
              <p className="text-body text-foreground-muted">
                {user?.created_at ? formatDate(user.created_at) : 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-surface rounded-lg">
            <Shield className="w-5 h-5 text-foreground-muted mt-0.5" />
            <div>
              <p className="text-body-sm font-medium text-foreground">Account ID</p>
              <p className="text-body-sm text-foreground-muted font-mono">{user?.id}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
