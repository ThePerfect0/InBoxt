import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Mail, 
  Clock, 
  Target, 
  CheckSquare, 
  Search, 
  Shield, 
  ArrowRight,
  Zap,
  Users,
  Star,
  ChevronDown
} from 'lucide-react';
import inboxtLogo from "@/assets/inboxt-logo.png";

const FEATURES = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "AI-powered email filtering",
    description: "Only emails with importance score ≥ 0.4 appear in your digest. Smart filtering that learns what matters."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Configurable daily limits",
    description: "Choose how many important emails to see (1-10). Focus on what truly needs your attention."
  },
  {
    icon: <CheckSquare className="w-6 h-6" />,
    title: "Save emails as tasks",
    description: "Convert important emails into actionable tasks with one click. Manage deadlines efficiently."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy-first: 90-day retention",
    description: "Your data is automatically deleted after 90 days. GDPR/CCPA compliant."
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Connect Gmail",
    description: "Securely connect your Gmail account with OAuth authentication",
    icon: <Mail className="w-8 h-8" />
  },
  {
    step: 2,
    title: "AI analyzes emails",
    description: "Our AI processes and scores emails by importance (threshold ≥ 0.4)",
    icon: <Zap className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Daily digest & tasks",
    description: "Review your important emails and save them as actionable tasks",
    icon: <CheckSquare className="w-8 h-8" />
  }
];

const FAQ_ITEMS = [
  {
    question: "How does InBoxt-Digest determine email importance?",
    answer: "Our AI analyzes sender relationships, content urgency, keywords, and your interaction patterns to score email importance. The system learns from your behavior to improve accuracy over time."
  },
  {
    question: "Is my email data secure and private?",
    answer: "Yes. We only store email summaries and metadata, never full email content. All data is encrypted and automatically deleted after 90 days. We're GDPR and CCPA compliant."
  },
  {
    question: "Which email providers are supported?",
    answer: "Currently we support Gmail with OAuth authentication. Outlook and other providers are coming soon."
  },
  {
    question: "Can I customize my digest preferences?",
    answer: "Yes. You can set your daily check time and choose how many emails to see (1-10). All emails must meet our 0.4 importance threshold."
  }
];

export function Home() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content: "InBoxt-Digest cut my email triage time in half. I only see what matters and everything else just fades away.",
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      content: "Finally, an inbox that works for me instead of against me. The task conversion feature is brilliant.",
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "Consultant",
      content: "The natural language search is a game-changer. I can find any email or task instantly.",
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-subtle sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <img 
                src={inboxtLogo} 
                alt="InBoxt Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <h1 className="text-lg sm:text-xl font-bold text-foreground">InBoxt-Digest</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/features" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Pricing</Link>
              <a href="#faq" className="text-sm text-foreground-muted hover:text-foreground transition-colors">FAQ</a>
              <Link to="/auth" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Sign in</Link>
            </nav>
            
            {/* Mobile Sign In Button */}
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="md:hidden text-foreground-muted hover:text-foreground"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="inline-flex items-center bg-surface-elevated rounded-full px-4 py-2 text-xs sm:text-sm text-foreground-muted">
                <Zap className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>Smart butler for your inbox</span>
              </div>
            </div>
            
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
              Your top 5 emails,
              <span className="text-primary block mt-2">summarized every morning</span>
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-foreground-muted mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
              AI-powered email intelligence that shows you only what matters. 
              Turn important emails into actionable tasks instantly.
            </p>
            
            {/* Security Badge */}
            <div className="text-xs sm:text-sm text-foreground-muted mb-6 sm:mb-8 flex items-center justify-center gap-2 px-4 flex-wrap">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-center">Read-only Gmail access • 90-day retention • Revoke anytime</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Button 
                size="lg" 
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto bg-primary hover:bg-primary-hover text-primary-foreground font-semibold w-full sm:w-auto"
              >
                <Link to="/auth?mode=signup" className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Get started with Google</span>
                  <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Link>
              </Button>
              <Button variant="link" asChild className="text-foreground-muted hover:text-foreground text-base sm:text-lg">
                <Link to="/auth">Sign in</Link>
              </Button>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="bg-surface-elevated rounded-xl border border-border-subtle p-3 sm:p-4 max-w-4xl mx-auto">
              <div className="bg-surface rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm text-foreground-muted px-2">
                  <span>Today — December 13, 2024</span>
                  <span>Top 3 emails</span>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background rounded-lg p-4 sm:p-6 border border-border-subtle hover:bg-card-hover transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                        {i === 1 ? 'JD' : i === 2 ? 'SM' : 'TR'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start sm:items-center gap-2 mb-2 flex-col sm:flex-row">
                          <span className="text-sm sm:text-base font-semibold text-foreground">
                            {i === 1 ? 'Meeting follow-up required' : i === 2 ? 'Q4 budget review' : 'Client feedback request'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${i === 1 ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                            {i === 1 ? 'High' : 'Medium'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground-muted mb-3 line-clamp-2">
                          {i === 1 ? 'John needs your input on the project timeline by tomorrow morning.' : 
                           i === 2 ? 'Sarah sent the Q4 budget documents for your review and approval.' : 
                           'Team lead is requesting feedback on the new feature implementation.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" variant="outline" className="text-xs hover:scale-105 transition-transform w-full sm:w-auto">
                            Open Email
                          </Button>
                          <Button size="sm" className="text-xs hover:scale-105 transition-transform w-full sm:w-auto">
                            Save to Tasks
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Everything you need to tame your inbox
            </h2>
            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto">
              InBoxt-Digest focuses on what matters most, helping you stay productive without the overwhelm.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "AI-powered filtering",
                description: "Smart importance scoring ≥ 0.4 threshold for relevance"
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Daily limits",
                description: "Choose 1-10 emails focus on priority content"
              },
              {
                icon: <CheckSquare className="w-6 h-6" />,
                title: "Task conversion",
                description: "One-click email to actionable task transformation"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "90-day retention",
                description: "Auto-delete GDPR compliant privacy protection"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-background border-border-subtle hover:bg-card-hover hover:scale-105 transition-all duration-200">
                <CardContent className="p-5 sm:p-6">
                  <div className="text-primary mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground-muted leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/privacy" className="text-primary hover:underline text-sm">
              What data we store
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get started in 3 simple steps
          </h2>
          <p className="text-lg text-foreground-muted mb-12">
            Set up your intelligent email digest in under 5 minutes
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Connect Gmail",
                description: "Secure OAuth authentication read-only access",
                icon: <Mail className="w-8 h-8" />
              },
              {
                step: 2,
                title: "AI analyzes",
                description: "Importance scoring filters relevant content",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: 3,
                title: "Daily digest",
                description: "Review summaries save as tasks",
                icon: <CheckSquare className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-foreground-muted text-sm">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-foreground-muted" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Link to="/privacy" className="text-primary hover:underline text-sm">
              What data we store
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Real testimonial from our beta users
          </h2>
          
          <div className="relative">
            <div className="bg-background rounded-lg p-8 border border-border-subtle max-w-2xl mx-auto">
              <blockquote className="text-lg text-foreground mb-6 italic">
                "InBoxt-Digest cut my email triage time in half. I only see what matters and everything else just fades away. The task conversion feature is brilliant for staying organized."
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-foreground">Sarah Chen</div>
                  <div className="text-sm text-foreground-muted">Startup Founder, YC S23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-foreground-muted">
              Everything you need to know about InBoxt-Digest
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-surface rounded-lg border border-border-subtle px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground-muted pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to reclaim your inbox?
          </h2>
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who've already transformed their email workflow with InBoxt-Digest.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="text-lg px-8 py-4 h-auto bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
            >
              <Link to="/auth?mode=signup">
                <Mail className="w-5 h-5 mr-2" />
                Get started with Google
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="link" asChild className="text-foreground-muted hover:text-foreground text-lg">
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
          
          <p className="text-sm text-foreground-muted mt-6">
            Read-only Gmail access • 90-day retention • Revoke anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">InBoxt-Digest</span>
              </div>
              <p className="text-foreground-muted text-sm">
                Your smart butler for email management. Focus on what matters most.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/status" className="hover:text-foreground transition-colors">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/gdpr" className="hover:text-foreground transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-subtle mt-8 pt-8 text-center text-sm text-foreground-muted">
            <p>&copy; 2025 InBoxt-Digest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}