import { Navigation } from "@/components/Navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";

export default function ScanHistory() {
  const scans = [
    {
      id: "campaign_001",
      target: "openssl-3.0.8",
      status: "critical",
      findings: 12,
      date: "2025-10-14 14:32",
    },
    {
      id: "campaign_002",
      target: "libpng-1.6.37",
      status: "warning",
      findings: 8,
      date: "2025-10-14 12:15",
    },
    {
      id: "campaign_003",
      target: "zlib-1.2.11",
      status: "info",
      findings: 3,
      date: "2025-10-14 09:45",
    },
    {
      id: "campaign_004",
      target: "curl-8.1.2",
      status: "success",
      findings: 0,
      date: "2025-10-13 16:20",
    },
    {
      id: "campaign_005",
      target: "nginx-1.24.0",
      status: "critical",
      findings: 15,
      date: "2025-10-13 11:30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Campaign History</h1>
            <p className="text-foreground-secondary">
              Browse and analyze past vulnerability campaigns
            </p>
          </div>
          <Button className="glow-effect">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
              <Input
                placeholder="Search by campaign ID or target..."
                className="pl-10 bg-background-secondary"
              />
            </div>
            <Button variant="outline">Filter by Severity</Button>
            <Button variant="outline">Filter by Date</Button>
          </div>
        </div>

        {/* Table */}
        <div className="stat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Campaign ID
                  </th>
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Target Binary
                  </th>
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Status
                  </th>
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Findings
                  </th>
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Date
                  </th>
                  <th className="pb-3 text-sm font-medium text-foreground-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, i) => (
                  <tr
                    key={scan.id}
                    className="border-b border-border last:border-0 hover:bg-background-secondary transition-colors"
                  >
                    <td className="py-4 mono text-sm">{scan.id}</td>
                    <td className="py-4 mono text-sm font-medium">
                      {scan.target}
                    </td>
                    <td className="py-4">
                      <StatusBadge
                        status={scan.status as any}
                        label={scan.status.toUpperCase()}
                      />
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium">
                        {scan.findings}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-foreground-muted mono">
                      {scan.date}
                    </td>
                    <td className="py-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
