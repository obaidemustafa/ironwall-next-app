import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Chrome, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast({
        title: "OTP Sent!",
        description: `Please check your email (${formData.email}) for the verification code.`,
      });

      // Move to OTP verification step
      setStep("verify");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // Save token and user data
      localStorage.setItem("ironwall_token", data.token);
      localStorage.setItem("ironwall_user", JSON.stringify(data.user));

      toast({
        title: "Account verified!",
        description: "Welcome to IronWall. Redirecting to dashboard...",
      });

      // Redirect to dashboard
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: unknown) {
      console.error("Verification error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Invalid OTP. Please try again.";
      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast({
        title: "OTP Resent!",
        description: "Please check your email for the new verification code.",
      });
    } catch (error: unknown) {
      console.error("Resend error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Please try again.";
      toast({
        title: "Failed to resend",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Coming soon",
      description: "Google signup will be available soon.",
    });
  };

  // OTP Verification Step
  if (step === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background p-6">
        <div className="w-full max-w-md">
          <div className="stat-card space-y-6 shadow-2xl">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow mb-2">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-semibold">Verify Your Email</h1>
              <p className="text-sm text-foreground-muted">
                We sent a 6-digit code to {formData.email}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex flex-col items-center space-y-6">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                onClick={handleVerifyOTP}
                className="w-full"
                size="lg"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Create Account"
                )}
              </Button>

              <div className="text-center text-sm text-foreground-muted">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-primary hover:underline font-medium disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep("register");
                  setOtp("");
                }}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to registration
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Step
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background p-6">
      <div className="w-full max-w-md">
        <div className="stat-card space-y-6 shadow-2xl">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow mb-2">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold">Create an Account</h1>
            <p className="text-sm text-foreground-muted">
              Join the IronWall research platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-foreground-muted">
                Minimum 6 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-foreground-muted">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <Chrome className="h-4 w-4" />
            Google
          </Button>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <span className="text-foreground-muted">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
