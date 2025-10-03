import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Privacy() {
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
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-foreground-muted">Last updated: January 2025</p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-foreground-secondary">
              At InBoxt, your privacy is paramount. This Privacy Policy explains how we collect, use, protect, and 
              handle your personal information when you use our AI-powered email digest service.
            </p>
            <p className="text-foreground-secondary">
              By using InBoxt, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>1.1 Account Information:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address (for account creation and authentication)</li>
                <li>Name (if provided via Google OAuth)</li>
                <li>Profile picture URL (if using Google sign-in)</li>
                <li>Authentication tokens (OAuth tokens for email access)</li>
              </ul>

              <p><strong>1.2 Email Data:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email metadata: sender, recipient, subject, timestamp</li>
                <li>AI-generated email summaries (gists)</li>
                <li>Importance scores calculated by our AI</li>
                <li>Email thread IDs and message IDs</li>
              </ul>
              <p className="text-sm text-foreground-muted">
                <strong>Important:</strong> We do NOT store full email bodies or attachments on our servers.
              </p>

              <p><strong>1.3 Usage Data:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Login timestamps and authentication events</li>
                <li>Feature usage (pages visited, actions taken)</li>
                <li>Device information (browser type, operating system)</li>
                <li>IP addresses (for security and fraud prevention)</li>
              </ul>

              <p><strong>1.4 User-Created Content:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tasks created from emails</li>
                <li>Custom notes or deadlines added to tasks</li>
                <li>User preferences and settings</li>
              </ul>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To provide email digest generation, importance scoring, and task management</li>
                <li><strong>AI Processing:</strong> To analyze and summarize emails using third-party AI services (OpenRouter API)</li>
                <li><strong>Authentication:</strong> To verify your identity and maintain secure access to your account</li>
                <li><strong>Communication:</strong> To send service updates, security alerts, and respond to support requests</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and improve AI accuracy and features</li>
                <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or security threats</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </div>
          </section>

          {/* 3. Data Sharing and Third Parties */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Data Sharing and Third Parties</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>3.1 Third-Party Services:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>OpenRouter API:</strong> Email content is sent to OpenRouter for AI processing (importance scoring and summarization). 
                OpenRouter does not store email content beyond processing time.</li>
                <li><strong>Google OAuth:</strong> Authentication services provided by Google. We receive only your email address, name, 
                and profile picture (if you choose to share).</li>
                <li><strong>Supabase:</strong> Our database and authentication infrastructure provider, compliant with GDPR and SOC 2.</li>
              </ul>

              <p><strong>3.2 We DO NOT:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sell your personal data to third parties</li>
                <li>Share your email content for marketing purposes</li>
                <li>Provide your data to advertisers</li>
                <li>Use your emails to train AI models (except for your personal importance scoring)</li>
              </ul>

              <p><strong>3.3 Legal Disclosures:</strong></p>
              <p>
                We may disclose your information if required by law, court order, or government regulation, or to protect 
                the rights, property, or safety of InBoxt, our users, or others.
              </p>
            </div>
          </section>

          {/* 4. Data Storage and Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Storage and Security</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>4.1 Data Retention:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email summaries and tasks are retained for 90 days by default (configurable to 30 or 60 days)</li>
                <li>Account information is retained until you delete your account</li>
                <li>Deleted data is purged from active systems within 30 days</li>
                <li>Backup systems may retain data for an additional 30 days for disaster recovery</li>
              </ul>

              <p><strong>4.2 Security Measures:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS/SSL encryption for all data transmission</li>
                <li>OAuth 2.0 for secure email access (we never store your email password)</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication for our internal systems</li>
                <li>Automated monitoring for security threats</li>
              </ul>

              <p><strong>4.3 Data Location:</strong></p>
              <p>
                Your data is stored on secure servers located in the United States, operated by our infrastructure 
                provider Supabase. Data may be processed in other jurisdictions where our service providers operate.
              </p>
            </div>
          </section>

          {/* 5. Your Privacy Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Your Privacy Rights</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>5.1 GDPR Rights (EU/EEA Users):</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Access:</strong> Export all your data in JSON format via Settings</li>
                <li><strong>Right to Rectification:</strong> Update your account information and preferences</li>
                <li><strong>Right to Erasure:</strong> Delete all your data using "Delete all my data" in Settings</li>
                <li><strong>Right to Restrict Processing:</strong> Disconnect email access to pause processing</li>
                <li><strong>Right to Data Portability:</strong> Download your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Opt out of certain data processing activities</li>
              </ul>

              <p><strong>5.2 CCPA Rights (California Users):</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of data sales (we do not sell your data)</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>

              <p><strong>5.3 Exercising Your Rights:</strong></p>
              <p>
                To exercise any of these rights, you can use the self-service options in Settings or contact us at 
                anuragaryan34@gmail.com. We will respond to requests within 30 days.
              </p>
            </div>
          </section>

          {/* 6. Email Access and Permissions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Email Access and Permissions</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>6.1 OAuth Permissions:</strong></p>
              <p>
                InBoxt requests read-only access to your Gmail account using Google OAuth. This permission allows us to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Read email messages for analysis and summarization</li>
                <li>Access email metadata (sender, subject, date)</li>
                <li>Retrieve your email address and basic profile information</li>
              </ul>

              <p><strong>6.2 What We CANNOT Do:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send emails from your account</li>
                <li>Reply to emails on your behalf</li>
                <li>Delete or modify your emails</li>
                <li>Access emails in other accounts you may have</li>
              </ul>

              <p><strong>6.3 Revoking Access:</strong></p>
              <p>
                You can revoke InBoxt's access to your Gmail at any time through your Google Account settings 
                (myaccount.google.com → Security → Third-party apps with account access). This immediately prevents 
                InBoxt from accessing your emails.
              </p>
            </div>
          </section>

          {/* 7. Cookies and Tracking */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Cookies and Tracking</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p><strong>7.1 Essential Cookies:</strong></p>
              <p>
                We use essential cookies to maintain your login session and remember your preferences. These cookies 
                are necessary for the service to function.
              </p>

              <p><strong>7.2 Analytics:</strong></p>
              <p>
                We may use anonymized analytics to understand how users interact with InBoxt and improve the service. 
                No personally identifiable information is included in analytics data.
              </p>

              <p><strong>7.3 Managing Cookies:</strong></p>
              <p>
                You can control cookies through your browser settings. Note that disabling essential cookies may 
                affect the functionality of InBoxt.
              </p>
            </div>
          </section>

          {/* 8. Children's Privacy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Children's Privacy</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                InBoxt is not intended for users under 18 years of age (or the age of majority in their jurisdiction). 
                We do not knowingly collect personal information from children. If you believe a child has provided us 
                with personal information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* 9. Data Breach Notification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Data Breach Notification</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                In the unlikely event of a data breach affecting your personal information, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notify affected users within 72 hours of discovery</li>
                <li>Provide details about the nature and scope of the breach</li>
                <li>Explain remediation steps taken</li>
                <li>Offer guidance on protecting your account</li>
                <li>Report to relevant data protection authorities as required by law</li>
              </ul>
            </div>
          </section>

          {/* 10. International Data Transfers */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. International Data Transfers</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                Your data may be transferred to and processed in countries outside your country of residence, including 
                the United States. We ensure appropriate safeguards are in place to protect your data in accordance with 
                this Privacy Policy and applicable data protection laws.
              </p>
            </div>
          </section>

          {/* 11. Changes to Privacy Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Changes to This Privacy Policy</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated via:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notification to your registered address</li>
                <li>In-app notification upon next login</li>
                <li>Update to the "Last updated" date at the top of this page</li>
              </ul>
              <p>
                Continued use of InBoxt after changes constitutes acceptance of the revised policy.
              </p>
            </div>
          </section>

          {/* 12. Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Contact Us</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:anuragaryan34@gmail.com" className="text-primary hover:underline">anuragaryan34@gmail.com</a>
              </p>
              <p>
                <strong>Privacy Rights Requests:</strong> Use the subject line "Privacy Request" for faster processing
              </p>
              <p className="text-sm text-foreground-muted">
                We will respond to all privacy-related inquiries within 30 days.
              </p>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-border-subtle">
            <p className="text-sm text-foreground-muted text-center">
              Related: <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> • 
              {' '}<Link to="/security" className="text-primary hover:underline">Security</Link> • 
              {' '}<Link to="/gdpr" className="text-primary hover:underline">GDPR Compliance</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
