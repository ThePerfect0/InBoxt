import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Terms() {
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
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-foreground-muted">Last updated: January 2025</p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-foreground-secondary">
              Welcome to InBoxt. By accessing or using our email digest service, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our platform.
            </p>
          </section>

          {/* 1. Acceptance of Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                By creating an account, signing in, or using any part of InBoxt's services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these terms, you must not access or use our services.
              </p>
            </div>
          </section>

          {/* 2. Description of Service */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                InBoxt is an AI-powered email digest service that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Connects to your email account with your explicit consent</li>
                <li>Analyzes and summarizes your emails using artificial intelligence</li>
                <li>Identifies and prioritizes important emails based on configurable criteria</li>
                <li>Generates daily email digests with concise summaries (gists)</li>
                <li>Allows you to save emails as actionable tasks</li>
                <li>Provides searchable history of past digests</li>
                <li>Offers customizable settings for digest frequency, importance thresholds, and data retention</li>
              </ul>
              <p>
                We provide read-only access to your email. InBoxt does not send, reply to, or delete any of your emails.
              </p>
            </div>
          </section>

          {/* 3. Account Registration and Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Account Registration and Security</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>3.1 Account Creation:</strong> You may sign up using email/password or via Google OAuth. You must provide 
                accurate and complete information during registration.
              </p>
              <p>
                <strong>3.2 Email Access:</strong> To use InBoxt, you must grant us read-only access to your email account. 
                You can revoke this access at any time through your email provider's security settings.
              </p>
              <p>
                <strong>3.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account 
                credentials. Notify us immediately of any unauthorized access.
              </p>
              <p>
                <strong>3.4 Age Requirement:</strong> You must be at least 18 years old or the age of majority in your jurisdiction 
                to use InBoxt.
              </p>
            </div>
          </section>

          {/* 4. Email Processing and AI */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Email Processing and AI</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>4.1 AI Processing:</strong> InBoxt uses third-party AI services (OpenRouter API) to analyze and summarize 
                your emails. Email content is processed transiently and not stored by the AI provider beyond processing.
              </p>
              <p>
                <strong>4.2 Data Storage:</strong> We store only:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email summaries (gists) generated by AI</li>
                <li>Email metadata (sender, subject, timestamp, importance score)</li>
                <li>Tasks you create from emails</li>
                <li>Your account preferences and settings</li>
              </ul>
              <p>
                <strong>4.3 Full Email Content:</strong> We do not store complete email bodies on our servers. Emails are processed 
                in real-time during digest generation.
              </p>
              <p>
                <strong>4.4 AI Limitations:</strong> While our AI strives for accuracy, automated summaries may occasionally miss 
                context or misinterpret content. You should review important emails directly.
              </p>
            </div>
          </section>

          {/* 5. User Responsibilities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. User Responsibilities</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use InBoxt only for lawful purposes and in compliance with all applicable laws</li>
                <li>Not attempt to access, tamper with, or interfere with our systems or other users' accounts</li>
                <li>Not use automated tools (bots, scrapers) to access the service beyond normal usage</li>
                <li>Not reverse engineer, decompile, or attempt to extract our source code</li>
                <li>Not use InBoxt for any commercial purpose without explicit written permission</li>
                <li>Respect the intellectual property rights of InBoxt and third parties</li>
              </ul>
            </div>
          </section>

          {/* 6. Data Retention and Deletion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Data Retention and Deletion</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>6.1 Retention Period:</strong> By default, we retain email digests and tasks for 90 days. You can adjust 
                this in Settings (30, 60, or 90 days).
              </p>
              <p>
                <strong>6.2 Data Deletion:</strong> You can delete individual tasks or digests at any time. To delete all your data, 
                use the "Delete all my data" option in Settings.
              </p>
              <p>
                <strong>6.3 Account Termination:</strong> If you delete your account, all associated data (digests, tasks, preferences) 
                will be permanently deleted within 30 days.
              </p>
              <p>
                <strong>6.4 Backup Retention:</strong> Backups may retain deleted data for up to 30 additional days for disaster recovery purposes.
              </p>
            </div>
          </section>

          {/* 7. Privacy and Data Protection */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Privacy and Data Protection</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>7.1 Compliance:</strong> InBoxt complies with GDPR (General Data Protection Regulation) and CCPA 
                (California Consumer Privacy Act) requirements.
              </p>
              <p>
                <strong>7.2 Your Rights:</strong> Under GDPR/CCPA, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your data (via Settings → Export Data)</li>
                <li>Rectify inaccurate data (edit tasks, update preferences)</li>
                <li>Delete your data (individual items or complete account)</li>
                <li>Restrict processing (disconnect email, adjust settings)</li>
                <li>Data portability (export your summaries and tasks)</li>
              </ul>
              <p>
                <strong>7.3 Email Security:</strong> Your email credentials are encrypted and stored securely. We use industry-standard 
                encryption (TLS/SSL) for data transmission.
              </p>
              <p>
                <strong>7.4 Third-Party Sharing:</strong> We do not sell, rent, or share your personal data with third parties for 
                marketing purposes. AI processing is done via secure API calls to trusted providers.
              </p>
            </div>
          </section>

          {/* 8. Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Intellectual Property</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>8.1 InBoxt Ownership:</strong> All rights, title, and interest in InBoxt's platform, including its design, 
                code, logos, and AI models, are owned by InBoxt and protected by intellectual property laws.
              </p>
              <p>
                <strong>8.2 Your Content:</strong> You retain all rights to your emails and content. By using InBoxt, you grant us 
                a limited license to process your emails solely for providing the service.
              </p>
              <p>
                <strong>8.3 Generated Summaries:</strong> AI-generated email summaries are considered derivative works of your content. 
                You own these summaries and can export or delete them at any time.
              </p>
            </div>
          </section>

          {/* 9. Service Availability and Modifications */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Service Availability and Modifications</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>9.1 Availability:</strong> We strive to provide reliable service but do not guarantee uninterrupted access. 
                Scheduled maintenance will be communicated in advance when possible.
              </p>
              <p>
                <strong>9.2 Service Changes:</strong> We may modify, suspend, or discontinue features with reasonable notice. 
                Major changes affecting core functionality will be announced via email.
              </p>
              <p>
                <strong>9.3 Email Provider Limits:</strong> Service availability may be affected by rate limits or changes imposed 
                by your email provider (Gmail, Outlook, etc.).
              </p>
            </div>
          </section>

          {/* 10. Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Limitation of Liability</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>10.1 Service Provided "As Is":</strong> InBoxt is provided on an "as is" and "as available" basis without 
                warranties of any kind, express or implied.
              </p>
              <p>
                <strong>10.2 No Liability for Damages:</strong> To the maximum extent permitted by law, InBoxt shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Missed important emails due to AI filtering or scoring inaccuracies</li>
                <li>Data loss resulting from email provider issues or service disruptions</li>
                <li>Indirect, incidental, or consequential damages arising from service use</li>
                <li>Errors or inaccuracies in AI-generated summaries</li>
                <li>Unauthorized access to your account due to compromised credentials</li>
              </ul>
              <p>
                <strong>10.3 User Responsibility:</strong> You acknowledge that InBoxt is a supplementary tool and should not replace 
                direct email review for critical matters.
              </p>
            </div>
          </section>

          {/* 11. Indemnification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Indemnification</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                You agree to indemnify and hold harmless InBoxt, its officers, employees, and partners from any claims, damages, 
                losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your violation of these Terms of Service</li>
                <li>Your misuse of the platform or unauthorized access</li>
                <li>Your violation of applicable laws or third-party rights</li>
                <li>Inaccurate information provided during registration</li>
              </ul>
            </div>
          </section>

          {/* 12. Termination */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Termination</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>12.1 Your Right to Terminate:</strong> You may terminate your account at any time through Settings. 
                Data deletion will follow the schedule outlined in Section 6.
              </p>
              <p>
                <strong>12.2 Our Right to Terminate:</strong> We may suspend or terminate your account if you violate these terms, 
                engage in fraudulent activity, or misuse the service. We will provide notice when reasonably possible.
              </p>
              <p>
                <strong>12.3 Effect of Termination:</strong> Upon termination, your right to use InBoxt ceases immediately. 
                Provisions regarding data deletion, liability limitations, and indemnification survive termination.
              </p>
            </div>
          </section>

          {/* 13. Dispute Resolution */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Dispute Resolution</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                <strong>13.1 Informal Resolution:</strong> Before filing any legal claim, you agree to first contact us at 
                support@inboxt.com to attempt informal resolution.
              </p>
              <p>
                <strong>13.2 Arbitration:</strong> Any disputes not resolved informally shall be settled through binding arbitration 
                in accordance with commercial arbitration rules, rather than through court litigation.
              </p>
              <p>
                <strong>13.3 Class Action Waiver:</strong> You agree to resolve disputes individually and waive participation in 
                class actions, collective actions, or representative proceedings.
              </p>
            </div>
          </section>

          {/* 14. Governing Law */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Governing Law</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the United States, without 
                regard to conflict of law principles. For international users, local data protection laws (GDPR, etc.) also apply.
              </p>
            </div>
          </section>

          {/* 15. Changes to Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">15. Changes to Terms</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                We may update these Terms of Service from time to time. Material changes will be notified via:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notification to your registered address</li>
                <li>In-app notification upon next login</li>
                <li>Update to the "Last updated" date at the top of this page</li>
              </ul>
              <p>
                Continued use of InBoxt after changes constitutes acceptance of the revised terms. If you disagree with changes, 
                you must discontinue use and may delete your account.
              </p>
            </div>
          </section>

          {/* 16. Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">16. Contact Information</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                For questions, concerns, or requests regarding these Terms of Service, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: support@inboxt.com</li>
                <li>Privacy Requests: privacy@inboxt.com</li>
                <li>GDPR/CCPA Compliance Officer: compliance@inboxt.com</li>
              </ul>
            </div>
          </section>

          {/* 17. Severability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">17. Severability</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
                eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </div>
          </section>

          {/* 18. Entire Agreement */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">18. Entire Agreement</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and InBoxt 
                regarding the use of our service, superseding any prior agreements or understandings.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="space-y-4 border-t border-border-subtle pt-8">
            <div className="bg-surface rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Acknowledgment</h3>
              <p className="text-foreground-secondary">
                By using InBoxt, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                If you have any questions or concerns, please contact us before using the service.
              </p>
              <p className="text-foreground-muted text-sm">
                Thank you for choosing InBoxt. We're committed to helping you manage your inbox efficiently and securely.
              </p>
            </div>
          </section>

          {/* Back to top */}
          <div className="text-center pt-8">
            <Link to="/">
              <Button variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
