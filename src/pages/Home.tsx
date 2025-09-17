import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    question: "How does InBoxt determine email importance?",
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
      content: "InBoxt cut my email triage time in half. I only see what matters and everything else just fades away.",
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
      <header className="border-b border-border-subtle">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">InBoxt</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/auth')}
            className="text-foreground-muted hover:text-foreground"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center bg-surface-elevated rounded-full px-4 py-2 text-sm text-foreground-muted mb-6">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Smart butler for your inbox
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Daily AI digest of your
              <span className="text-primary block">most important emails</span>
            </h1>
            
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Cut email triage time in half. Get only your top priority emails summarized daily, 
              with the ability to save important items as actionable tasks.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth?mode=signup')}
              className="text-lg px-8 py-3 h-auto"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3 h-auto"
            >
              Sign In
            </Button>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="bg-surface-elevated rounded-lg border border-border-subtle p-6 max-w-3xl mx-auto">
            <div className="bg-surface rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-foreground-muted">
                <span>Today — December 13, 2024</span>
                <span>Top 5 emails</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-lg p-4 border border-border-subtle">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                      {i === 1 ? 'JD' : i === 2 ? 'SM' : 'TR'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium truncate">
                          {i === 1 ? 'Meeting follow-up required' : i === 2 ? 'Q4 budget review' : 'Client feedback request'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${i === 1 ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                          {i === 1 ? 'High' : 'Medium'}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted mb-2">
                        {i === 1 ? 'John needs your input on the project timeline by tomorrow morning.' : 
                         i === 2 ? 'Sarah sent the Q4 budget documents for your review and approval.' : 
                         'Team lead is requesting feedback on the new feature implementation.'}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Open Email
                        </Button>
                        <Button size="sm" className="text-xs">
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
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to tame your inbox
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              InBoxt focuses on what matters most, helping you stay productive without the overwhelm.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="bg-background border-border-subtle hover:bg-card-hover transition-colors">
                <CardContent className="p-6">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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
            {HOW_IT_WORKS.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-foreground-muted">{step.description}</p>
                {index < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-foreground-muted" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Trusted by professionals who value their time
          </h2>
          
          <div className="relative">
            <div className="bg-background rounded-lg p-8 border border-border-subtle max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-warning fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-foreground mb-6 italic">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-foreground-muted">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-primary' : 'bg-foreground-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-foreground-muted">
              Everything you need to know about InBoxt
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
            Join thousands of professionals who've already transformed their email workflow with InBoxt.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth?mode=signup')}
              className="text-lg px-8 py-3 h-auto"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3 h-auto"
            >
              Sign In
            </Button>
          </div>
          
          <p className="text-sm text-foreground-muted mt-6">
            No credit card required • 14-day free trial • Cancel anytime
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
                <span className="font-bold text-lg">InBoxt</span>
              </div>
              <p className="text-foreground-muted text-sm">
                Your smart butler for email management. Focus on what matters most.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-subtle mt-8 pt-8 text-center text-sm text-foreground-muted">
            <p>&copy; 2024 InBoxt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}