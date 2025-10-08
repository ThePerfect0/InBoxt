import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingButton } from "@/components/PricingButton";
import { Clock, Mail, Shield, Save, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export function Settings() {
  const [digestFrequency, setDigestFrequency] = useState("once");
  const [digestTimes, setDigestTimes] = useState(["08:00"]);
  const [topCount, setTopCount] = useState(5);
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load user settings on mount
  useEffect(() => {
    if (user) {
      loadUserSettings();
    }
  }, [user]);

  const loadUserSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('prefs_check_time, prefs_top_n')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading settings:', error);
        toast({
          title: "Error",
          description: "Failed to load your settings.",
          variant: "destructive",
        });
      } else if (data) {
        const savedTime = data.prefs_check_time || "08:00";
        setDigestTimes([savedTime]);
        setTopCount(data.prefs_top_n || 5);
        // Ensure frequency matches the loaded time
        setDigestFrequency("once");
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    
    try {
      const { error } = await supabase.functions.invoke('settings-save', {
        body: {
          prefs_check_time: digestTimes[0],
          prefs_top_n: topCount
        }
      });

      if (error) {
        throw error;
      }

      setLastSaved(new Date());
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-8">
        <div className="bg-card border border-border-subtle rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Pricing Banner */}
      <PricingButton variant="banner" />
      {/* Email Processing Settings */}
      <div className="bg-card border border-border-subtle rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-heading-sm text-foreground">Email Processing</h2>
            <p className="text-body text-foreground-muted">
              Configure how InBoxt processes your emails
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Multi-frequency Digest */}
          <div className="space-y-4">
            <Label htmlFor="digest-frequency" className="text-body font-medium text-foreground">
              Digest frequency
            </Label>
            <Select value={digestFrequency} onValueChange={(value) => {
              setDigestFrequency(value);
              const defaultTimes = {
                once: ["08:00"],
                twice: ["08:00", "18:00"],
                three: ["08:00", "13:00", "18:00"],
                four: ["08:00", "12:00", "16:00", "20:00"]
              };
              setDigestTimes(defaultTimes[value as keyof typeof defaultTimes] || ["08:00"]);
            }}>
              <SelectTrigger id="digest-frequency" className="w-48" aria-label="Digest frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once daily</SelectItem>
                <SelectItem value="twice">Twice daily</SelectItem>
                <SelectItem value="three">3 times daily</SelectItem>
                <SelectItem value="four">4 times daily</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Time Pickers */}
            <div className="space-y-3">
              {digestTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-foreground-muted" />
                  <Input
                    id={`digest-time-${index}`}
                    name={`digest-time-${index}`}
                    type="time"
                    value={time}
                    onChange={(e) => {
                      const newTimes = [...digestTimes];
                      newTimes[index] = e.target.value;
                      setDigestTimes(newTimes);
                    }}
                    className="w-40"
                    aria-label={`Digest ${index + 1} time`}
                  />
                  <span className="text-sm text-foreground-muted">
                    Digest {index + 1}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-body-sm text-foreground-muted">
              Multiple digests distribute your top emails throughout the day
            </p>
          </div>

          {/* Top N Emails */}
          <div className="space-y-2">
            <Label htmlFor="top-count" className="text-body font-medium text-foreground">
              Number of top emails to show
            </Label>
            <Select value={topCount.toString()} onValueChange={(value) => setTopCount(Number(value))}>
              <SelectTrigger id="top-count" className="w-48" aria-label="Number of top emails">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} email{num !== 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-body-sm text-foreground-muted">
              Only emails with importance ≥ 0.4 that meet this count will be shown
            </p>
          </div>

          {/* Importance Threshold */}
          <div className="space-y-2">
            <Label className="text-body font-medium text-foreground">
              Importance threshold
            </Label>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-foreground-muted">Low (0.4)</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-2/5"></div>
              </div>
              <span className="text-body-sm text-foreground-muted">High (1.0)</span>
            </div>
            <p className="text-body-sm text-foreground-muted">
              Currently set to 0.4 - only emails above this importance score will appear in your digest
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-card border border-border-subtle rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-heading-sm text-foreground">Privacy & Security</h2>
            <p className="text-body text-foreground-muted">
              How we handle your data
            </p>
          </div>
        </div>

        <div className="space-y-4 text-body text-foreground-muted">
          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">90-day data retention</p>
              <p>Email gists and tasks are automatically deleted after 90 days</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Transient email processing</p>
              <p>Full emails are processed temporarily and never stored permanently</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">GDPR & CCPA compliant</p>
              <p>User-controlled data retention and deletion rights</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <Link 
              to="/terms" 
              className="text-sm text-primary hover:underline underline-offset-4 transition-colors inline-flex items-center"
            >
              View full Terms of Service
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border-subtle pt-4 -mx-6 px-6">
        <div className="flex items-center justify-between">
          <div>
            {lastSaved && (
              <p className="text-body-sm text-foreground-muted">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-24"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}