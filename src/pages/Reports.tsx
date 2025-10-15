import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

export default function Reports() {
  const reports = [
    { id: "report_001", title: "Q4 2024 Vulnerability Assessment", date: "2025-10-14", findings: 47, status: "Ready" },
    { id: "report_002", title: "OpenSSL Security Audit", date: "2025-10-12", findings: 12, status: "Ready" },
    { id: "report_003", title: "Critical Infrastructure Review", date: "2025-10-08", findings: 23, status: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Reports & Governance</h1>
            <p className="text-foreground-secondary">Export findings and manage audit trails</p>
          </div>
          <Button className="glow-effect">
            Generate New Report
          </Button>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {reports.map((report) => (
            <div key={report.id} className="stat-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-info/10 text-info">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-foreground-muted">
                      <span className="mono">{report.id}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.findings} findings</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Logs */}
        <div className="stat-card">
          <h2 className="text-xl font-semibold mb-4">Recent Audit Events</h2>
          <div className="space-y-2">
            {[
              { time: "2025-10-14 15:30", user: "admin", action: "Report generated", status: "success" },
              { time: "2025-10-14 14:20", user: "researcher_01", action: "Scan initiated", status: "success" },
              { time: "2025-10-14 12:15", user: "analyst_03", action: "Export requested", status: "success" },
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <span className="mono text-sm text-foreground-muted">{event.time}</span>
                  <span className="text-sm font-medium">{event.user}</span>
                  <span className="text-sm text-foreground-secondary">{event.action}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs font-medium">
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
