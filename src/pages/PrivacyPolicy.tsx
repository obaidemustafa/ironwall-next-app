import { Navigation } from "@/components/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="stat-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Privacy Policy</h1>
          <p className="text-foreground-muted text-sm mb-8">Last updated: October 15, 2025</p>
          
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 pr-4">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  IRONWALL ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our 
                  vulnerability detection and exploit validation platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Name and email address</li>
                  <li>Organization details</li>
                  <li>Account credentials</li>
                  <li>Profile information</li>
                </ul>

                <h3 className="text-lg font-medium mb-2 mt-4">2.2 Technical Data</h3>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  We automatically collect certain information when you use IRONWALL:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Scan configurations and results</li>
                  <li>Vulnerability reports and artifacts</li>
                  <li>Usage statistics and analytics</li>
                  <li>System logs and audit trails</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>Send technical notices and security alerts</li>
                  <li>Respond to your comments and questions</li>
                  <li>Detect, prevent, and address security incidents</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4 mt-3">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure storage with access controls</li>
                  <li>Regular security audits and assessments</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  We retain your information for as long as necessary to provide our services and comply with 
                  legal obligations. Scan results and vulnerability reports are retained according to your 
                  organization's retention policies or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your information</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  IRONWALL integrates with third-party services for specific functionality. We ensure that 
                  all third-party providers comply with data protection standards equivalent to our own.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-3 p-4 rounded-lg bg-background-secondary">
                  <p className="text-sm">
                    <strong>Email:</strong> privacy@ironwall.dev<br />
                    <strong>Address:</strong> IRONWALL Security Research Lab
                  </p>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
