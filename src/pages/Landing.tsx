import { Link } from "react-router-dom";
import { Shield, Target, Lock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background-secondary">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/30 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                IRONWALL
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#about"
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#research"
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                Research Goals
              </a>
              <a
                href="#docs"
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                Documentation
              </a>
              <Link to="/login">
                <Button variant="default">Access Console</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Activity className="h-4 w-4 animate-pulse" />
              Research-Grade Vulnerability Detection
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Proactive Defense through
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Active Campaigns
              </span>
            </h1>

            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              IRONWALL detects chained vulnerabilities in real-world C/C++
              systems before attackers do. Launch campaigns to continuously
              monitor and verify exploits.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/login">
                <Button size="lg" className="glow-effect">
                  Access Console
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-24 bg-background-secondary/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card group hover:shadow-xl transition-all duration-300">
              <div className="p-3 rounded-xl bg-info/10 text-info w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mission</h3>
              <p className="text-foreground-secondary leading-relaxed">
                Identify exploitable vulnerabilities through intelligent fuzzing
                and symbolic execution before they reach production.
              </p>
            </div>

            <div className="stat-card group hover:shadow-xl transition-all duration-300">
              <div className="p-3 rounded-xl bg-restricted/10 text-restricted w-fit mb-4 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Technology</h3>
              <p className="text-foreground-secondary leading-relaxed">
                Hybrid approach combining AFL++, angr, and constraint-based
                exploit synthesis with automated verification.
              </p>
            </div>

            <div className="stat-card group hover:shadow-xl transition-all duration-300">
              <div className="p-3 rounded-xl bg-success/10 text-success w-fit mb-4 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ethics</h3>
              <p className="text-foreground-secondary leading-relaxed">
                Strictly authorized testing in isolated environments with
                responsible disclosure and comprehensive audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary/30 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
            <p>© 2025 IRONWALL. Research Platform.</p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
