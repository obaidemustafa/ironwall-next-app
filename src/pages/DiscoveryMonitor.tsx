import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/StatCard";
import { SeverityChart } from "@/components/SeverityChart";
import { Activity, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscoveryMonitor() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Discovery Monitor</h1>
            <p className="text-foreground-secondary text-sm sm:text-base">Live fuzzing campaign visualization</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="px-3 sm:px-4 py-2 rounded-lg bg-success/10 border border-success/20 text-success text-xs sm:text-sm font-medium flex items-center gap-2 flex-1 sm:flex-initial">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="hidden sm:inline">Running for </span>00:05:23
            </div>
            <Button variant="outline" size="sm">Pause</Button>
            <Button variant="destructive" size="sm">Stop</Button>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            label="Code Coverage"
            value="87.3%"
            icon={Target}
            trend={{ value: 12, direction: "up" }}
          />
          <StatCard
            label="Executions/sec"
            value="4.2K"
            icon={Zap}
            trend={{ value: 8, direction: "up" }}
          />
          <StatCard
            label="Crashes/min"
            value="18"
            icon={Activity}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 stat-card">
            <h2 className="text-xl font-semibold mb-6">Severity Distribution</h2>
            <div className="relative">
              <SeverityChart />
            </div>
          </div>

          {/* Live Feed */}
          <div className="stat-card">
            <h2 className="text-xl font-semibold mb-4">Live Event Feed</h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {[
                { time: "00:05:21", event: "New crash detected", type: "critical" },
                { time: "00:05:18", event: "Coverage increased", type: "success" },
                { time: "00:05:15", event: "Path explored", type: "info" },
                { time: "00:05:12", event: "Primitive extracted", type: "warning" },
                { time: "00:05:09", event: "New crash detected", type: "critical" },
                { time: "00:05:06", event: "Coverage increased", type: "success" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-background-secondary transition-colors">
                  <span className="mono text-xs text-foreground-muted whitespace-nowrap">{item.time}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.type === "critical"
                          ? "bg-critical"
                          : item.type === "warning"
                          ? "bg-warning"
                          : item.type === "success"
                          ? "bg-success"
                          : "bg-info"
                      }`}
                    />
                    <span className="text-sm text-foreground-secondary">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="stat-card">
          <h2 className="text-xl font-semibold mb-4">Campaign Configuration</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-foreground-muted mb-1">Target Binary</p>
              <p className="mono text-sm font-medium">openssl-3.0.8</p>
            </div>
            <div>
              <p className="text-sm text-foreground-muted mb-1">Fuzzer Engine</p>
              <p className="mono text-sm font-medium">AFL++ + angr</p>
            </div>
            <div>
              <p className="text-sm text-foreground-muted mb-1">Environment</p>
              <p className="mono text-sm font-medium">Ubuntu 22.04 / glibc 2.35</p>
            </div>
            <div>
              <p className="text-sm text-foreground-muted mb-1">Seed Count</p>
              <p className="mono text-sm font-medium">2,847 inputs</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
