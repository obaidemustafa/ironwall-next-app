import { Link } from "react-router-dom";
import {
  Shield,
  Target,
  Lock,
  Activity,
  Zap,
  Code2,
  Bug,
  ChevronRight,
  Terminal,
  Cpu,
  Network,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Floating particle component
const FloatingParticle = ({
  delay,
  size,
  x,
}: {
  delay: number;
  size: number;
  x: number;
}) => (
  <div
    className="absolute rounded-full bg-primary/20 animate-float"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }}
  />
);

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-background-secondary overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={4 + Math.random() * 8}
            x={Math.random() * 100}
          />
        ))}
      </div>

      {/* Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-info/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-2xl bg-card/20 sticky top-0">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-info rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary via-primary to-info">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  IRONWALL
                </span>
                <div className="text-[10px] font-medium text-primary tracking-[0.3em] uppercase">
                  Security Research
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-foreground-secondary hover:text-primary transition-colors duration-300"
              >
                Features
              </a>
              <a
                href="#technology"
                className="text-sm text-foreground-secondary hover:text-primary transition-colors duration-300"
              >
                Technology
              </a>
              <a
                href="#stats"
                className="text-sm text-foreground-secondary hover:text-primary transition-colors duration-300"
              >
                Statistics
              </a>
              <a
                href="#"
                className="text-sm text-foreground-secondary hover:text-primary transition-colors duration-300"
              >
                Documentation
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-foreground-secondary hover:text-foreground"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="relative group overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_100%] animate-shimmer" />
                  <span className="relative flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-5xl mx-auto text-center space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-info/20 border border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Next-Gen Vulnerability Research Platform
              </span>
              <ChevronRight className="h-4 w-4 text-primary" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Detect Vulnerabilities</span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
                  Before Attackers Do
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 4 100 4 150 7C200 10 250 6 298 3"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="50%" stopColor="hsl(var(--info))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
              IRONWALL harnesses the power of{" "}
              <span className="text-primary font-semibold">
                intelligent fuzzing
              </span>
              ,{" "}
              <span className="text-info font-semibold">
                symbolic execution
              </span>
              , and{" "}
              <span className="text-success font-semibold">
                AI-driven analysis
              </span>{" "}
              to discover chained vulnerabilities in real-world C/C++ systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="relative group h-14 px-8 text-base font-semibold overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-info opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-3">
                    <Zap className="h-5 w-5" />
                    Start Free Campaign
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold border-white/10 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm"
              >
                <Terminal className="h-5 w-5 mr-3" />
                View Live Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-foreground-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm">Air-gapped Environments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm">Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Terminal Preview */}
        <div className="container mx-auto px-6 mt-20">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative group">
              {/* Glow behind terminal */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-info to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

              {/* Terminal Window */}
              <div className="relative rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-critical/80" />
                    <div className="w-3 h-3 rounded-full bg-warning/80" />
                    <div className="w-3 h-3 rounded-full bg-success/80" />
                  </div>
                  <span className="text-xs text-foreground-muted ml-4 font-mono">
                    ironwall-campaign-001 — zsh
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-3">
                  <div className="flex items-center gap-2 text-success">
                    <span className="text-primary">❯</span>
                    <span className="text-foreground">
                      ironwall scan --target openssl-3.0.8
                    </span>
                  </div>
                  <div className="text-foreground-muted animate-pulse">
                    ⠋ Initializing hybrid analysis engine...
                  </div>
                  <div className="text-info">
                    [AFL++] Corpus seeded with 2,847 inputs
                  </div>
                  <div className="text-info">
                    [angr] Symbolic execution paths: 156
                  </div>
                  <div className="text-warning">
                    [!] Potential CVE-2024-0727 variant detected
                  </div>
                  <div className="text-critical font-semibold">
                    [CRITICAL] Buffer overflow in ssl/handshake.c:247
                  </div>
                  <div className="text-success mt-4">
                    ✓ Exploit chain verified • PoC generated • Report ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-24 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: 50000,
                suffix: "+",
                label: "Vulnerabilities Detected",
                icon: Bug,
              },
              {
                value: 99.7,
                suffix: "%",
                label: "Detection Accuracy",
                icon: Target,
              },
              {
                value: 500,
                suffix: "+",
                label: "Active Campaigns",
                icon: Activity,
              },
              { value: 24, suffix: "/7", label: "Monitoring", icon: Eye },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-info/10 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-foreground-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 text-info text-sm font-medium mb-6">
              <Code2 className="h-4 w-4" />
              Core Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Proactive Security Research
              </span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Comprehensive tools for vulnerability discovery, analysis, and
              verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Hybrid Analysis Engine",
                description:
                  "Combines AFL++ fuzzing with angr symbolic execution for maximum coverage and precision.",
                color: "primary",
              },
              {
                icon: Network,
                title: "Chain Detection",
                description:
                  "Automatically identifies vulnerability chains that lead to exploitable conditions.",
                color: "info",
              },
              {
                icon: Terminal,
                title: "PoC Generation",
                description:
                  "Auto-generates proof-of-concept exploits with detailed attack vectors.",
                color: "warning",
              },
              {
                icon: Eye,
                title: "Real-time Monitoring",
                description:
                  "Live dashboards with campaign progress, coverage metrics, and finding alerts.",
                color: "success",
              },
              {
                icon: Lock,
                title: "Isolated Execution",
                description:
                  "Air-gapped sandbox environments for safe exploit verification.",
                color: "critical",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Insights",
                description:
                  "Machine learning models that prioritize findings by exploitability score.",
                color: "restricted",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-${feature.color}/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-${feature.color}/10 text-${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section
        id="technology"
        className="py-32 bg-gradient-to-b from-background-secondary/50 to-background"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                Technology Stack
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built on Cutting-Edge
                <br />
                <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  Research Technology
                </span>
              </h2>
              <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                Our hybrid approach combines the best of fuzzing and symbolic
                execution, powered by modern AI models for intelligent
                vulnerability prioritization.
              </p>

              <div className="space-y-6">
                {[
                  { name: "AFL++ Fuzzer", progress: 95 },
                  { name: "angr Symbolic Execution", progress: 88 },
                  { name: "Constraint-based Synthesis", progress: 82 },
                  { name: "ML Exploit Scoring", progress: 90 },
                ].map((tech, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {tech.name}
                      </span>
                      <span className="text-sm text-primary">
                        {tech.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-all duration-1000"
                        style={{ width: `${tech.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-info/20 rounded-3xl blur-3xl" />
              <div className="relative p-8 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Bug, label: "CVE Detection", value: "Real-time" },
                    { icon: Shield, label: "Coverage", value: "99.7%" },
                    { icon: Zap, label: "Speed", value: "10x Faster" },
                    { icon: Lock, label: "Security", value: "Air-gapped" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors"
                    >
                      <item.icon className="h-8 w-8 text-primary mb-3" />
                      <div className="text-sm text-foreground-muted mb-1">
                        {item.label}
                      </div>
                      <div className="text-xl font-bold text-white">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-info/10 to-primary/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />

            <div className="relative px-8 py-20 md:px-16 md:py-24 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Secure Your Systems?
              </h2>
              <p className="text-xl text-foreground-secondary max-w-2xl mx-auto mb-10">
                Join leading security researchers using IRONWALL to discover
                vulnerabilities before they become exploits.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-base font-semibold"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Start Your First Campaign
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-base font-semibold border-white/10 hover:border-primary/50"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background-secondary/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-info">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">IRONWALL</span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Research-grade vulnerability detection for modern security
                teams.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Platform
              </h4>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
            <p className="text-sm text-foreground-muted">
              © 2025 IRONWALL. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
