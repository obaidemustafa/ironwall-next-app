import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast({
        title: "Missing fields",
        description: "Please enter your email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and user data
      localStorage.setItem("ironwall_token", data.token);
      localStorage.setItem("ironwall_user", JSON.stringify(data.user));

      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      });

      // Redirect to dashboard
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Coming soon",
      description: "Google login will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background p-6">
      <div className="w-full max-w-md">
        <div className="stat-card space-y-6 shadow-2xl">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow mb-2">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold">IRONWALL Console</h1>
            <p className="text-sm text-foreground-muted">
              Secure access to vulnerability detection platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="bg-background-secondary border-border"
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
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
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <Chrome className="h-4 w-4" />
            Google
          </Button>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <span className="text-foreground-muted">
              Don't have an account?{" "}
            </span>
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-foreground-muted pt-4 border-t border-border">
            Authorized users only. All actions are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
