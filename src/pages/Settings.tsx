import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Mail, Shield, Save, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function Settings() {
  const [dailyTime, setDailyTime] = useState("08:00");
  const [topCount, setTopCount] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setLastSaved(new Date());
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
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
          {/* Daily Check Time */}
          <div>
            <label className="block text-body font-medium text-foreground mb-2">
              Daily check time
            </label>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-foreground-muted" />
              <input
                type="time"
                value={dailyTime}
                onChange={(e) => setDailyTime(e.target.value)}
                className="px-3 py-2 bg-input border border-border-subtle rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <p className="text-body-sm text-foreground-muted mt-1">
              InBoxt will scan your emails at this time every day
            </p>
          </div>

          {/* Top N Emails */}
          <div>
            <label className="block text-body font-medium text-foreground mb-2">
              Number of top emails to show
            </label>
            <div className="flex items-center gap-3">
              <select
                value={topCount}
                onChange={(e) => setTopCount(Number(e.target.value))}
                className="px-3 py-2 bg-input border border-border-subtle rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} email{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-body-sm text-foreground-muted mt-1">
              Only the most important emails will be shown in your daily digest
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
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
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