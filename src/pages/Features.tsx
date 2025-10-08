import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Clock, Target, CheckSquare, Shield, Zap, Search, History, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Features() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Powerful Features</h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              InBoxt combines AI intelligence with intuitive design to help you manage your inbox effortlessly
            </p>
          </div>

          {/* Core Features */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-foreground text-center">Core Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">AI-Powered Email Analysis</h3>
                  <p className="text-foreground-muted">
                    Our advanced AI analyzes sender relationships, content urgency, keywords, and your interaction patterns 
                    to determine email importance with precision.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Smart Filtering</h3>
                  <p className="text-foreground-muted">
                    Only emails with importance score ≥ 0.4 appear in your digest. Configure daily limits (1-10 emails) 
                    to focus on what truly matters.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Daily Email Digest</h3>
                  <p className="text-foreground-muted">
                    Receive concise summaries of your most important emails every morning. Each email includes a 
                    clear gist to understand context at a glance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Task Conversion</h3>
                  <p className="text-foreground-muted">
                    Convert important emails into actionable tasks with one click. Track deadlines, mark as complete, 
                    and manage your email-driven workload efficiently.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Natural Language Search</h3>
                  <p className="text-foreground-muted">
                    Find any email or task instantly using natural language queries. Search by sender, subject, 
                    content, or time period without complex filters.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <History className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Digest History</h3>
                  <p className="text-foreground-muted">
                    Access your complete digest history with searchable archives. Review past summaries and track 
                    how your inbox has evolved over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Privacy & Security Features */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-foreground text-center">Privacy & Security</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">90-Day Auto-Delete</h3>
                  <p className="text-foreground-muted">
                    Your data is automatically deleted after 90 days (configurable to 30 or 60 days). We respect 
                    your privacy and only keep what you need.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Read-Only Access</h3>
                  <p className="text-foreground-muted">
                    InBoxt only requires read-only access to your email. We never send, reply to, or delete any 
                    of your emails. Your inbox remains untouched.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">GDPR & CCPA Compliant</h3>
                  <p className="text-foreground-muted">
                    Full compliance with international data protection regulations. Export your data or delete 
                    your account anytime with complete data removal.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Encrypted Storage</h3>
                  <p className="text-foreground-muted">
                    Email credentials are encrypted at rest. All data transmission uses industry-standard TLS/SSL 
                    encryption. Your security is our priority.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Customization Features */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-foreground text-center">Customization</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Flexible Scheduling</h3>
                  <p className="text-foreground-muted">
                    Choose your preferred daily check time. Set when InBoxt should analyze your inbox and prepare 
                    your digest.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Configurable Limits</h3>
                  <p className="text-foreground-muted">
                    Adjust how many important emails you want to see daily (1-10). Fine-tune importance thresholds 
                    to match your workflow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What We Store */}
          <section className="space-y-6 bg-surface rounded-lg p-8 border border-border-subtle">
            <h2 className="text-2xl font-semibold text-foreground text-center">What We Store</h2>
            <div className="space-y-4 text-foreground-secondary max-w-3xl mx-auto">
              <p><strong>We only store:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-generated email summaries (gists) - not full email content</li>
                <li>Email metadata: sender, subject, timestamp, importance score</li>
                <li>Tasks you create from emails</li>
                <li>Your account preferences and settings</li>
              </ul>
              <p className="text-sm text-foreground-muted mt-4">
                <strong>We do NOT store:</strong> Full email bodies, attachments, or email provider credentials beyond 
                encrypted OAuth tokens.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-foreground">Ready to experience intelligent email management?</h2>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
