import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity, Cpu, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
            <p className="text-foreground-secondary">Real-time vulnerability detection overview</p>
          </div>
          <Button size="lg" className="glow-effect">
            New Scan Campaign
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            label="Coverage"
            value="87.3%"
            icon={Activity}
            trend={{ value: 12, direction: "up" }}
          />
          <StatCard
            label="Execution Rate"
            value="4.2K/s"
            icon={Cpu}
            trend={{ value: 8, direction: "up" }}
          />
          <StatCard
            label="Crashes/min"
            value="18"
            icon={AlertTriangle}
            trend={{ value: 3, direction: "down" }}
          />
          <StatCard
            label="Verified Exploits"
            value="24"
            icon={CheckCircle}
            trend={{ value: 15, direction: "up" }}
          />
        </div>

        {/* Active Scans */}
        <div className="stat-card">
          <h2 className="text-xl font-semibold mb-4">Active Scan Campaigns</h2>
          <div className="space-y-3">
            {[
              { name: "openssl-heap-analysis", status: "critical", progress: 78 },
              { name: "libpng-format-fuzzing", status: "warning", progress: 45 },
              { name: "zlib-boundary-checks", status: "info", progress: 92 },
            ].map((scan) => (
              <div key={scan.name} className="p-4 rounded-lg bg-background-secondary border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="mono text-sm font-medium text-foreground">{scan.name}</span>
                    <StatusBadge
                      status={scan.status as any}
                      label={scan.status.toUpperCase()}
                    />
                  </div>
                  <span className="text-sm text-foreground-muted">{scan.progress}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                    style={{ width: `${scan.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Findings */}
        <div className="stat-card">
          <h2 className="text-xl font-semibold mb-4">Recent High-Priority Findings</h2>
          <div className="space-y-2">
            {[
              { id: "CVE-2024-0001", type: "Heap Overflow", severity: "critical", target: "openssl-3.0.8" },
              { id: "CVE-2024-0002", type: "Use-After-Free", severity: "critical", target: "libpng-1.6.37" },
              { id: "CVE-2024-0003", type: "Format String", severity: "warning", target: "zlib-1.2.11" },
            ].map((finding) => (
              <div key={finding.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <StatusBadge status={finding.severity as any} label={finding.severity.toUpperCase()} />
                  <div>
                    <p className="text-sm font-medium mono">{finding.id}</p>
                    <p className="text-xs text-foreground-muted">{finding.type} in {finding.target}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
