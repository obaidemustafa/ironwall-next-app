import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Lock,
  Shield,
  Camera,
  Trash2,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  createdAt?: string;
}

// Helper to update user in localStorage and dispatch event
const updateStoredUser = (userData: UserData) => {
  localStorage.setItem("ironwall_user", JSON.stringify(userData));
  // Dispatch custom event to notify Navigation component
  window.dispatchEvent(new Event("ironwall_user_updated"));
};

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("ironwall_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("ironwall_token");
            localStorage.removeItem("ironwall_user");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
        setFormData((prev) => ({
          ...prev,
          username: data.username || "",
          email: data.email || "",
        }));
        // Update localStorage
        updateStoredUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("avatar", file);

      const token = localStorage.getItem("ironwall_token") || "";

      const response = await fetch(`${API_BASE_URL}/api/auth/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Update local state
      const updatedUser = { ...user, avatar: data.avatar };
      setUser(updatedUser);

      // Update localStorage and notify other components
      updateStoredUser(updatedUser);

      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteAvatar = async () => {
    setIsUploading(true);

    try {
      const token = localStorage.getItem("ironwall_token") || "";

      const response = await fetch(`${API_BASE_URL}/api/auth/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // Update local state
      const updatedUser = { ...user, avatar: { url: "", publicId: "" } };
      setUser(updatedUser);

      // Update localStorage and notify other components
      updateStoredUser(updatedUser);

      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: "Failed to remove avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.username || !formData.email) {
      toast({
        title: "Missing fields",
        description: "Username and email are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("ironwall_token") || "";

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // Update local state
      setUser(data.user);

      // Update localStorage and notify other components
      updateStoredUser(data.user);

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error: unknown) {
      console.error("Save error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again.";
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!formData.currentPassword || !formData.newPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      const token = localStorage.getItem("ironwall_token") || "";

      const response = await fetch(`${API_BASE_URL}/api/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password change failed");
      }

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("Password change error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getInitials = (username?: string) => {
    if (!username) return "U";
    return username
      .split(/[_\s]/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            User Profile
          </h1>
          <p className="text-foreground-secondary text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <Card className="stat-card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Camera className="h-5 w-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Profile Picture
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-border">
                  <AvatarImage src={user?.avatar?.url} alt="Profile" />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-info text-white">
                    {getInitials(user?.username)}
                  </AvatarFallback>
                </Avatar>

                {/* Upload Overlay */}
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                  ) : (
                    <Camera className="h-8 w-8 text-white" />
                  )}
                </button>
              </div>

              {/* Upload Controls */}
              <div className="flex flex-col gap-3 flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                <div className="text-sm text-foreground-muted">
                  <p className="mb-2">
                    Upload a profile picture to personalize your account.
                  </p>
                  <p className="text-xs">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                    variant="outline"
                    size="sm"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </>
                    )}
                  </Button>

                  {user?.avatar?.url && (
                    <Button
                      onClick={handleDeleteAvatar}
                      disabled={isUploading}
                      variant="ghost"
                      size="sm"
                      className="text-critical hover:text-critical hover:bg-critical/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Information */}
          <Card className="stat-card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-info/10 text-info">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Profile Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-background-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-background-secondary"
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="glow-effect w-full sm:w-auto"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
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
              <h2 className="text-lg sm:text-xl font-semibold">
                Change Password
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="bg-background-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-background-secondary"
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
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
              <h2 className="text-lg sm:text-xl font-semibold">
                Account Status
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Account Type</span>
                <span className="px-3 py-1 rounded-lg bg-restricted/10 text-restricted text-xs font-medium w-fit capitalize">
                  {user?.role || "User"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Member Since</span>
                <span className="mono text-sm text-foreground-muted">
                  {formatDate(user?.createdAt)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-background-secondary">
                <span className="text-sm font-medium">Email</span>
                <span className="mono text-sm text-foreground-muted">
                  {user?.email}
                </span>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="stat-card p-4 sm:p-6 border-critical/20">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-critical">
              Danger Zone
            </h2>
            <p className="text-sm text-foreground-secondary mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
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
