import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "TBD",
      description: "Perfect for trying out InBoxt",
      features: [
        "Up to 3 daily emails",
        "AI-powered summaries",
        "Basic task management",
        "30-day data retention",
        "Email search",
        "Gmail integration"
      ],
      limitations: [
        "Limited AI analysis",
        "Basic support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "TBD",
      description: "For professionals who need more",
      features: [
        "Up to 10 daily emails",
        "Advanced AI summaries",
        "Full task management",
        "90-day data retention",
        "Priority email search",
        "Gmail & Outlook integration",
        "Custom importance thresholds",
        "Priority support"
      ],
      limitations: [],
      cta: "Coming Soon",
      highlighted: true
    },
    {
      name: "Premium",
      price: "TBD",
      description: "For power users and teams",
      features: [
        "Unlimited daily emails",
        "Advanced AI with learning",
        "Team task management",
        "Unlimited data retention",
        "Advanced search & filters",
        "All email providers",
        "Custom workflows",
        "API access",
        "Dedicated support",
        "Team collaboration features"
      ],
      limitations: [],
      cta: "Coming Soon",
      highlighted: false
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Simple, Transparent Pricing</h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Choose the plan that fits your email workflow. Pricing details coming soon.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border-subtle'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4 pt-8">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">{plan.price}</div>
                    <p className="text-foreground-muted">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pb-8">
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-primary hover:bg-primary-hover' 
                        : ''
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                    disabled={plan.cta === "Coming Soon"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <section className="space-y-8 pt-12">
            <h2 className="text-3xl font-semibold text-foreground text-center">Pricing FAQs</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">When will pricing be available?</h3>
                <p className="text-foreground-muted">
                  We're currently in beta and finalizing our pricing structure. All features are currently 
                  available for free during the beta period.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Can I upgrade or downgrade anytime?</h3>
                <p className="text-foreground-muted">
                  Yes, once pricing is live, you'll be able to change your plan at any time. Changes will 
                  be prorated and reflected in your next billing cycle.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">What payment methods do you accept?</h3>
                <p className="text-foreground-muted">
                  We'll accept all major credit cards and support monthly and annual billing options with 
                  discounts for annual subscriptions.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Is there a free trial?</h3>
                <p className="text-foreground-muted">
                  The Free plan will always be available with core features. Pro and Premium plans will 
                  offer a 14-day free trial once launched.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="text-center space-y-4 pt-8 bg-surface rounded-lg p-8 border border-border-subtle">
            <h2 className="text-2xl font-bold text-foreground">Have questions about pricing?</h2>
            <p className="text-foreground-muted">
              We're here to help you find the right plan for your needs.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
