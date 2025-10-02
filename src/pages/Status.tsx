import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function Status() {
  // In a real implementation, this would fetch from a status API
  const systemStatus = [
    {
      name: "Email Sync Service",
      status: "operational",
      description: "Gmail OAuth and email fetching"
    },
    {
      name: "AI Processing",
      status: "operational",
      description: "Email analysis and summarization"
    },
    {
      name: "Web Application",
      status: "operational",
      description: "Dashboard and user interface"
    },
    {
      name: "Database",
      status: "operational",
      description: "Data storage and retrieval"
    },
    {
      name: "Authentication",
      status: "operational",
      description: "User login and OAuth services"
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === "operational") {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    return <AlertCircle className="w-5 h-5 text-warning" />;
  };

  const getStatusText = (status: string) => {
    if (status === "operational") {
      return <span className="text-success font-medium">Operational</span>;
    }
    return <span className="text-warning font-medium">Degraded Performance</span>;
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">System Status</h1>
            <p className="text-xl text-foreground-muted">
              Current operational status of InBoxt services
            </p>
          </div>

          {/* Overall Status */}
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">All Systems Operational</h2>
              <p className="text-foreground-muted">
                All InBoxt services are running smoothly
              </p>
              <p className="text-sm text-foreground-muted">
                Last updated: {new Date().toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Individual Services */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Service Status</h2>
            
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <Card key={index} className="bg-surface border-border-subtle">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {getStatusIcon(service.status)}
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-foreground-muted">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusText(service.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Performance Metrics</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 text-center space-y-3">
                  <Activity className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-foreground-muted">Uptime (30 days)</div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 text-center space-y-3">
                  <Clock className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-foreground">&lt; 2s</div>
                  <div className="text-sm text-foreground-muted">Avg Response Time</div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border-subtle">
                <CardContent className="p-6 text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-foreground">0</div>
                  <div className="text-sm text-foreground-muted">Incidents (7 days)</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Scheduled Maintenance */}
          <section className="bg-surface rounded-lg p-8 border border-border-subtle space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Scheduled Maintenance</h2>
            <p className="text-foreground-muted">
              No scheduled maintenance at this time. We'll notify you via email at least 48 hours 
              before any planned maintenance windows.
            </p>
          </section>

          {/* Incident History */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Recent Incident History</h2>
            
            <Card className="bg-surface border-border-subtle">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <p className="text-foreground-muted">
                  No incidents reported in the last 30 days
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Subscribe to Updates */}
          <section className="bg-surface rounded-lg p-8 border border-border-subtle space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-foreground">Stay Informed</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Get notified about service disruptions, scheduled maintenance, and system updates.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Subscribe to Status Updates
              </Button>
            </Link>
          </section>

          {/* Support Contact */}
          <div className="text-center space-y-4 text-foreground-muted">
            <p>
              Experiencing issues not reflected here?
            </p>
            <Link to="/contact">
              <Button variant="outline">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
