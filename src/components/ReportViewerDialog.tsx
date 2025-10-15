import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/StatusBadge";

interface ReportViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    id: string;
    title: string;
    date: string;
    findings: number;
  };
}

export function ReportViewerDialog({ open, onOpenChange, report }: ReportViewerDialogProps) {
  const vulnerabilities = [
    {
      id: "CVE-2024-001",
      title: "Buffer Overflow in SSL Handshake",
      severity: "critical",
      description: "A buffer overflow vulnerability exists in the SSL handshake mechanism.",
      location: "src/ssl/handshake.c:247",
      cvss: "9.8",
      cwe: "CWE-120",
      remediation: "Update to OpenSSL 3.0.9 or apply security patch",
    },
    {
      id: "CVE-2024-002",
      title: "Use-After-Free in Memory Allocator",
      severity: "critical",
      description: "Memory is accessed after being freed, potentially leading to code execution.",
      location: "src/mem/allocator.c:891",
      cvss: "8.1",
      cwe: "CWE-416",
      remediation: "Implement proper memory lifecycle management",
    },
    {
      id: "INFO-2024-003",
      title: "Information Disclosure via Error Messages",
      severity: "info",
      description: "Verbose error messages may expose sensitive system information.",
      location: "src/error/handler.c:45",
      cvss: "3.7",
      cwe: "CWE-209",
      remediation: "Sanitize error messages in production builds",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold">{report.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-sm pt-2">
            <span className="mono text-foreground-muted">{report.id}</span>
            <span>•</span>
            <span>{report.date}</span>
            <span>•</span>
            <span>{report.findings} findings</span>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="summary" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="summary">Executive Summary</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(90vh-16rem)] px-6">
            <TabsContent value="summary" className="space-y-6 pb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Assessment Overview</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-foreground-secondary">
                    This security assessment identified {report.findings} potential vulnerabilities across
                    the target application. The assessment utilized hybrid fuzzing techniques combining
                    AFL++ with symbolic execution to achieve deep code coverage.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card p-4">
                  <p className="text-xs text-foreground-muted mb-1">Critical</p>
                  <p className="text-2xl font-semibold text-critical">12</p>
                </div>
                <div className="stat-card p-4">
                  <p className="text-xs text-foreground-muted mb-1">Warning</p>
                  <p className="text-2xl font-semibold text-warning">28</p>
                </div>
                <div className="stat-card p-4">
                  <p className="text-xs text-foreground-muted mb-1">Info</p>
                  <p className="text-2xl font-semibold text-info">45</p>
                </div>
                <div className="stat-card p-4">
                  <p className="text-xs text-foreground-muted mb-1">Restricted</p>
                  <p className="text-2xl font-semibold text-restricted">15</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Risk Assessment</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-critical/5 border border-critical/20">
                    <span className="text-sm font-medium">Overall Risk Level</span>
                    <StatusBadge status="critical" label="High" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                    <span className="text-sm font-medium">Exploitability Score</span>
                    <span className="mono text-sm font-semibold">8.7/10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                    <span className="text-sm font-medium">Code Coverage Achieved</span>
                    <span className="mono text-sm font-semibold">87.3%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vulnerabilities" className="space-y-4 pb-6">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="stat-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={vuln.severity as any} label={vuln.severity.toUpperCase()} />
                        <h4 className="font-semibold text-lg">{vuln.title}</h4>
                      </div>
                      <p className="text-sm text-foreground-secondary mb-2">{vuln.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="mono text-foreground-muted">{vuln.id}</span>
                        <span className="mono text-foreground-muted">{vuln.cwe}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground-muted mb-1">CVSS Score</p>
                      <p className="text-2xl font-bold text-critical">{vuln.cvss}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-foreground-muted mb-1">Location</p>
                    <code className="text-sm mono bg-background-secondary px-2 py-1 rounded">
                      {vuln.location}
                    </code>
                  </div>
                  
                  <div>
                    <p className="text-xs text-foreground-muted mb-1">Remediation</p>
                    <p className="text-sm text-foreground-secondary">{vuln.remediation}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pb-6">
              <div className="stat-card p-5">
                <h3 className="text-lg font-semibold mb-4">Test Environment</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-foreground-muted mb-1">Target Binary</p>
                    <code className="text-sm mono">openssl-3.0.8</code>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted mb-1">Operating System</p>
                    <code className="text-sm mono">Ubuntu 22.04 LTS</code>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted mb-1">Compiler Flags</p>
                    <code className="text-sm mono">-O2 -fstack-protector-strong</code>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted mb-1">Allocator</p>
                    <code className="text-sm mono">glibc 2.35</code>
                  </div>
                </div>
              </div>

              <div className="stat-card p-5">
                <h3 className="text-lg font-semibold mb-4">Methodology</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ul className="space-y-2">
                    <li>High-throughput coverage-guided fuzzing using AFL++</li>
                    <li>Selective symbolic execution with angr for constraint solving</li>
                    <li>Automated crash triage and primitive extraction</li>
                    <li>Multi-step exploit chain synthesis and verification</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4 pb-6">
              <div className="stat-card p-5">
                <h3 className="text-lg font-semibold mb-4">Immediate Actions Required</h3>
                <div className="space-y-3">
                  {[
                    "Patch all critical vulnerabilities within 72 hours",
                    "Deploy additional input validation for SSL handshake routines",
                    "Implement comprehensive memory safety checks",
                    "Enable Address Sanitizer (ASan) in testing environments",
                  ].map((action, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background-secondary">
                      <div className="h-6 w-6 rounded-full bg-critical/10 text-critical flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-foreground-secondary">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stat-card p-5">
                <h3 className="text-lg font-semibold mb-4">Long-term Security Measures</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ul className="space-y-2">
                    <li>Integrate continuous fuzzing into CI/CD pipeline</li>
                    <li>Establish regular security audits (quarterly)</li>
                    <li>Implement defense-in-depth strategies with multiple mitigation layers</li>
                    <li>Maintain up-to-date dependency scanning and patch management</li>
                    <li>Conduct security training for development team</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
