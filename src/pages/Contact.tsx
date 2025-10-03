import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
            <p className="text-xl text-foreground-muted">
              Have questions, feedback, or need support? We're here to help.
            </p>
          </div>

          {/* Primary Contact */}
          <Card className="bg-surface border-border-subtle">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Email Us</h2>
              <p className="text-foreground-muted">
                For general inquiries, support, or feedback, reach out to us at:
              </p>
              <a 
                href="mailto:anuragaryan34@gmail.com"
                className="inline-block text-primary hover:underline text-lg font-medium"
              >
                anuragaryan34@gmail.com
              </a>
              <p className="text-sm text-foreground-muted">
                We typically respond within 24-48 hours
              </p>
            </CardContent>
          </Card>

          {/* Contact Categories */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground text-center">What can we help you with?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">General Support</h3>
                  <p className="text-foreground-muted">
                    Questions about using InBoxt, troubleshooting issues, or account management.
                  </p>
                  <a href="mailto:anuragaryan34@gmail.com?subject=Support Request">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Feature Requests & Feedback</h3>
                  <p className="text-foreground-muted">
                    Share your ideas for new features or improvements to InBoxt.
                  </p>
                  <a href="mailto:anuragaryan34@gmail.com?subject=Feature Request">
                    <Button variant="outline" className="w-full">
                      Send Feedback
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Security & Privacy</h3>
                  <p className="text-foreground-muted">
                    Questions or concerns about data security, privacy, or compliance.
                  </p>
                  <a href="mailto:anuragaryan34@gmail.com?subject=Security Inquiry">
                    <Button variant="outline" className="w-full">
                      Security Team
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle hover:bg-card-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Business Inquiries</h3>
                  <p className="text-foreground-muted">
                    Partnerships, press inquiries, or enterprise solutions.
                  </p>
                  <a href="mailto:anuragaryan34@gmail.com?subject=Business Inquiry">
                    <Button variant="outline" className="w-full">
                      Contact Us
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Reference */}
          <section className="bg-surface rounded-lg p-8 border border-border-subtle space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-foreground">Before You Reach Out</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Your question might already be answered in our FAQ section or documentation. 
              Check these resources first for quicker assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/#faq">
                <Button variant="outline">
                  View FAQ
                </Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline">
                  Terms of Service
                </Button>
              </Link>
              <Link to="/privacy">
                <Button variant="outline">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </section>

          {/* Response Time */}
          <div className="text-center space-y-4 text-foreground-muted">
            <p className="text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 hours during business days.
            </p>
            <p className="text-sm">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
            <p className="text-sm">
              For urgent security issues, please mark your email with "URGENT - SECURITY" in the subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
