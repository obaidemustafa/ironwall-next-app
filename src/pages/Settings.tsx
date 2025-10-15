import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-foreground-secondary">Configure platform preferences and security options</p>
        </div>

        {/* General Settings */}
        <div className="stat-card space-y-6">
          <h2 className="text-xl font-semibold">General Configuration</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-foreground-muted">Enable dark theme for reduced eye strain</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Real-time Notifications</Label>
                <p className="text-sm text-foreground-muted">Receive alerts for critical findings</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save Reports</Label>
                <p className="text-sm text-foreground-muted">Automatically save scan reports</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="stat-card space-y-6">
          <h2 className="text-xl font-semibold">API & Integration</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="api-key"
                  type="password"
                  value="••••••••••••••••"
                  readOnly
                  className="mono bg-background-secondary"
                />
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Actions */}
        <div className="flex items-center gap-3">
          <Button className="glow-effect">Save Changes</Button>
          <Button variant="outline">Reset to Defaults</Button>
        </div>
      </main>
    </div>
  );
}
