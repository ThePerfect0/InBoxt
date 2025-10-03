import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Database, Key, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Security() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Security First</h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Your email security and privacy are our top priorities. Learn how we protect your data.
            </p>
          </div>

          {/* Security Pillars */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-foreground text-center">Our Security Commitment</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">End-to-End Encryption</h3>
                  <p className="text-foreground-muted">
                    All data transmission uses TLS/SSL encryption. Your email credentials are encrypted at rest 
                    using industry-standard AES-256 encryption.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Read-Only Access</h3>
                  <p className="text-foreground-muted">
                    InBoxt only requests read-only permissions. We cannot send, reply to, or delete any of 
                    your emails. Your inbox remains completely untouched.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Minimal Data Storage</h3>
                  <p className="text-foreground-muted">
                    We only store email summaries and metadata - never full email content or attachments. 
                    Data is automatically deleted after 90 days.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">OAuth Authentication</h3>
                  <p className="text-foreground-muted">
                    We use OAuth 2.0 for email access - we never see or store your email password. 
                    Revoke access anytime through your email provider's settings.
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
                    Full compliance with international data protection regulations. Export or delete your 
                    data anytime with complete removal from all systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Regular Security Audits</h3>
                  <p className="text-foreground-muted">
                    Our infrastructure undergoes regular security audits and penetration testing to ensure 
                    the highest level of protection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Data Processing */}
          <section className="space-y-6 bg-surface rounded-lg p-8 border border-border-subtle">
            <h2 className="text-2xl font-semibold text-foreground text-center">How We Process Your Emails</h2>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Email Fetching</h3>
                  <p className="text-foreground-muted">
                    We fetch emails using read-only OAuth tokens. Your credentials are never exposed to our servers. 
                    All connections use encrypted HTTPS/TLS protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">AI Analysis</h3>
                  <p className="text-foreground-muted">
                    Emails are processed transiently by our AI service (OpenRouter API) for importance scoring and 
                    summarization. The AI provider does not store your email content beyond processing time.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Secure Storage</h3>
                  <p className="text-foreground-muted">
                    Only AI-generated summaries and metadata are stored in our encrypted database. Full email 
                    bodies are never stored. Data is automatically purged based on your retention settings (30-90 days).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Access Control</h3>
                  <p className="text-foreground-muted">
                    Only you can access your data. Our staff cannot view your email summaries without explicit 
                    authorization for support purposes (with your consent).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-foreground text-center">Your Security Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Revoke Access Anytime</h3>
                  <p className="text-foreground-muted">
                    Revoke InBoxt's access to your email through your Google Account settings instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Delete All Data</h3>
                  <p className="text-foreground-muted">
                    Use the "Delete all my data" option in Settings to permanently remove all your information.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Export Your Data</h3>
                  <p className="text-foreground-muted">
                    Download all your summaries, tasks, and preferences in JSON format anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Audit Trail</h3>
                  <p className="text-foreground-muted">
                    View when and how your data is accessed through your account activity log.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Best Practices */}
          <section className="space-y-6 bg-surface rounded-lg p-8 border border-border-subtle">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Best Practices for Your Security</h2>
                <ul className="space-y-3 text-foreground-muted">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Enable two-factor authentication (2FA) on your email account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use a strong, unique password for your InBoxt account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Regularly review connected apps in your Google Account settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Keep your browser and operating system updated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Never share your account credentials with anyone</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-foreground">Questions About Security?</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              We're committed to transparency. If you have any security concerns or questions, 
              please don't hesitate to contact us.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Security Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
