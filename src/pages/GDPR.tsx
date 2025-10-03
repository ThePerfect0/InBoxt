import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Download, Trash2, Edit, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function GDPR() {
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
            <h1 className="text-4xl font-bold text-foreground">GDPR Compliance</h1>
            <p className="text-foreground-muted">
              InBoxt is committed to compliance with the General Data Protection Regulation (GDPR) and respecting 
              your data protection rights.
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Our GDPR Commitment</h2>
            <p className="text-foreground-secondary">
              The GDPR is a comprehensive data protection law that applies to EU/EEA residents. InBoxt fully complies 
              with GDPR requirements, ensuring that your personal data is processed lawfully, fairly, and transparently.
            </p>
          </section>

          {/* Your GDPR Rights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your GDPR Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Access</h3>
                  <p className="text-foreground-muted">
                    You have the right to access all personal data we hold about you. Export your data anytime 
                    through Settings → Export Data.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      Export My Data
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Edit className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Rectification</h3>
                  <p className="text-foreground-muted">
                    You can correct or update inaccurate personal data through your account settings or by 
                    contacting us.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      Update My Info
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Erasure</h3>
                  <p className="text-foreground-muted">
                    You can request deletion of all your personal data. Use "Delete all my data" in Settings 
                    for immediate removal.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      Delete My Data
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Restrict Processing</h3>
                  <p className="text-foreground-muted">
                    You can limit how we process your data by disconnecting email access or adjusting your settings.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      Manage Processing
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Data Portability</h3>
                  <p className="text-foreground-muted">
                    Download your data in a structured, machine-readable format (JSON) to transfer to another service.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      Download Data
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Right to Object</h3>
                  <p className="text-foreground-muted">
                    You can object to certain data processing activities. Contact us to exercise this right 
                    for specific processing.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Legal Basis for Processing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Legal Basis for Processing</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>We process your personal data under the following legal bases:</p>
              
              <div className="space-y-4">
                <div>
                  <p><strong>1. Consent (Article 6(1)(a)):</strong></p>
                  <p className="text-foreground-muted ml-4">
                    You explicitly consent to email access when connecting your Gmail account via OAuth.
                  </p>
                </div>

                <div>
                  <p><strong>2. Contract Performance (Article 6(1)(b)):</strong></p>
                  <p className="text-foreground-muted ml-4">
                    Processing is necessary to provide the email digest service you've signed up for.
                  </p>
                </div>

                <div>
                  <p><strong>3. Legitimate Interests (Article 6(1)(f)):</strong></p>
                  <p className="text-foreground-muted ml-4">
                    We process data to improve our service, prevent fraud, and ensure security, balancing 
                    our interests with your rights.
                  </p>
                </div>

                <div>
                  <p><strong>4. Legal Obligations (Article 6(1)(c)):</strong></p>
                  <p className="text-foreground-muted ml-4">
                    We process data when required by law, such as responding to legal requests or court orders.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Processing Principles */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">GDPR Data Processing Principles</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>InBoxt adheres to all six GDPR data processing principles:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Lawfulness, Fairness, and Transparency:</strong> We process data legally, fairly, and with full disclosure</li>
                <li><strong>Purpose Limitation:</strong> Data is collected only for specified, legitimate purposes</li>
                <li><strong>Data Minimization:</strong> We collect only what's necessary (summaries, not full emails)</li>
                <li><strong>Accuracy:</strong> You can update your data anytime to ensure accuracy</li>
                <li><strong>Storage Limitation:</strong> Data is auto-deleted after 30-90 days (configurable)</li>
                <li><strong>Integrity and Confidentiality:</strong> AES-256 encryption and strict access controls protect your data</li>
              </ul>
            </div>
          </section>

          {/* Data Protection Officer */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Data Protection Contact</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                For GDPR-related inquiries, data protection concerns, or to exercise your rights, contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:anuragaryan34@gmail.com?subject=GDPR Request" className="text-primary hover:underline">anuragaryan34@gmail.com</a>
              </p>
              <p className="text-sm text-foreground-muted">
                Use the subject line "GDPR Request" for faster processing. We will respond within 30 days as required by GDPR.
              </p>
            </div>
          </section>

          {/* International Transfers */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">International Data Transfers</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                Your data may be transferred to and processed in the United States. We ensure adequate safeguards 
                are in place for international transfers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard Contractual Clauses (SCCs) with data processors</li>
                <li>Infrastructure providers (Supabase) with GDPR compliance certifications</li>
                <li>Equivalent data protection measures as required under GDPR Article 46</li>
              </ul>
            </div>
          </section>

          {/* Data Breach Notification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Data Breach Notification</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                In accordance with GDPR Article 33 and 34, in the event of a data breach:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will notify the relevant supervisory authority within 72 hours of discovery</li>
                <li>Affected individuals will be notified without undue delay if the breach poses a high risk</li>
                <li>Notifications will include the nature of the breach, likely consequences, and remediation measures</li>
              </ul>
            </div>
          </section>

          {/* Supervisory Authority */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Right to Lodge a Complaint</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                If you believe your GDPR rights have been violated, you have the right to lodge a complaint with a 
                supervisory authority in your EU member state. We encourage you to contact us first so we can 
                address your concerns directly.
              </p>
            </div>
          </section>

          {/* Automated Decision Making */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Automated Decision-Making and Profiling</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                InBoxt uses AI to score email importance, but this does not constitute automated decision-making with 
                legal or significant effects under GDPR Article 22. You always retain control over which emails to 
                read and which to ignore.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Updates to GDPR Compliance</h2>
            <div className="space-y-3 text-foreground-secondary">
              <p>
                We regularly review and update our GDPR compliance measures. Material changes will be communicated 
                via email and reflected in our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-border-subtle">
            <p className="text-sm text-foreground-muted text-center">
              Related: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> • 
              {' '}<Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> • 
              {' '}<Link to="/security" className="text-primary hover:underline">Security</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
