import { Navigation } from "@/components/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="stat-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Terms of Service</h1>
          <p className="text-foreground-muted text-sm mb-8">Last updated: October 15, 2025</p>
          
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 pr-4">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  By accessing and using IRONWALL, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to these Terms of Service, you must not use this platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Use License & Restrictions</h2>
                <h3 className="text-lg font-medium mb-2">2.1 Authorized Use</h3>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  IRONWALL is a defensive security research tool. You may only use this platform to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Test applications you own or have explicit written authorization to test</li>
                  <li>Conduct security research in controlled, isolated environments</li>
                  <li>Improve the security posture of your organization's software</li>
                </ul>

                <h3 className="text-lg font-medium mb-2 mt-4">2.2 Prohibited Activities</h3>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  You explicitly agree NOT to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Target systems without proper authorization</li>
                  <li>Use IRONWALL for malicious purposes or unauthorized penetration testing</li>
                  <li>Attempt to exploit vulnerabilities in production systems</li>
                  <li>Share or distribute exploit code without responsible disclosure</li>
                  <li>Bypass security controls or access restrictions</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Ethical Requirements</h2>
                <p className="text-foreground-secondary leading-relaxed mb-3">
                  All users must adhere to strict ethical guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground-secondary ml-4">
                  <li>Obtain proper authorization before testing any system</li>
                  <li>Conduct all experiments in isolated, air-gapped environments</li>
                  <li>Follow responsible disclosure practices for discovered vulnerabilities</li>
                  <li>Maintain confidentiality of sensitive security information</li>
                  <li>Report any misuse of the platform immediately</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Account Responsibilities</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for 
                  all activities that occur under your account. You must immediately notify us of any unauthorized 
                  use of your account or any other breach of security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Data and Artifacts</h2>
                <h3 className="text-lg font-medium mb-2">5.1 Your Data</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  You retain ownership of all data, scan results, and artifacts generated through your use of 
                  IRONWALL. We do not claim any intellectual property rights over your content.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-4">5.2 Platform Data</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  We may collect anonymized, aggregated data about platform usage to improve our services. This 
                  data will not contain personally identifiable information or specific vulnerability details.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  IRONWALL is provided "as is" without warranty of any kind. We do not guarantee that the service 
                  will be uninterrupted, secure, or error-free. The platform is a research tool and should not be 
                  solely relied upon for production security decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  In no event shall IRONWALL be liable for any indirect, incidental, special, consequential, or 
                  punitive damages resulting from your use or inability to use the service. This includes, but is 
                  not limited to, damages for loss of data, unauthorized access, or security breaches.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Compliance with Laws</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  You agree to comply with all applicable local, state, national, and international laws and 
                  regulations in your use of IRONWALL. This includes, but is not limited to, laws regarding 
                  computer fraud, unauthorized access, data protection, and export controls.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  We reserve the right to terminate or suspend your account immediately, without prior notice, 
                  if you breach these Terms of Service or engage in prohibited activities. Upon termination, 
                  your right to use the platform will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Modifications to Terms</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  We reserve the right to modify these terms at any time. We will provide notice of significant 
                  changes by posting a notice on the platform or sending you an email. Your continued use of 
                  IRONWALL after such modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  These Terms shall be governed by and construed in accordance with applicable laws, without 
                  regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  For questions about these Terms of Service, please contact:
                </p>
                <div className="mt-3 p-4 rounded-lg bg-background-secondary">
                  <p className="text-sm">
                    <strong>Email:</strong> legal@ironwall.dev<br />
                    <strong>Support:</strong> support@ironwall.dev
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
