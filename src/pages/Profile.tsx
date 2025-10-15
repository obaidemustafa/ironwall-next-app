import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Shield } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@ironwall.dev",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">User Profile</h1>
          <p className="text-foreground-secondary text-sm sm:text-base">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="stat-card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-info/10 text-info">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background-secondary"
                />
              </div>

              <div className="pt-2">
                <Button onClick={handleSave} className="glow-effect w-full sm:w-auto">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="stat-card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-restricted/10 text-restricted">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">Change Password</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="bg-background-secondary"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="bg-background-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-background-secondary"
                />
              </div>

              <div className="pt-2">
                <Button onClick={handlePasswordChange} variant="outline" className="w-full sm:w-auto">
                  Update Password
                </Button>
              </div>
            </div>
          </Card>

          {/* Account Status */}
          <Card className="stat-card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-success/10 text-success">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">Account Status</h2>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Account Type</span>
                <span className="px-3 py-1 rounded-lg bg-restricted/10 text-restricted text-xs font-medium w-fit">
                  Administrator
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Member Since</span>
                <span className="mono text-sm text-foreground-muted">October 15, 2025</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Last Login</span>
                <span className="mono text-sm text-foreground-muted">2 hours ago</span>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="stat-card p-4 sm:p-6 border-critical/20">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-critical">Danger Zone</h2>
            <p className="text-sm text-foreground-secondary mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="w-full sm:w-auto">
              Delete Account
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
