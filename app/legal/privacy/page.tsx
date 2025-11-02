import { Card } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Your Privacy Matters</h3>
              <p className="text-gray-300 leading-relaxed">
                AlgoXpertHub is committed to protecting your privacy and securing your data. This Privacy Policy explains
                how we collect, use, and protect your information when you use our platform.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-400" />
              1. Information We Collect
            </h2>
            <div className="space-y-4 ml-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">1.1 Account Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number (optional)</li>
                  <li><strong>Authentication:</strong> Password (hashed), login timestamps</li>
                  <li><strong>Subscription Data:</strong> Plan type, billing information, payment method</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">1.2 Trading Account Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>MetCloud Tokens:</strong> API tokens for MT4/MT5 connectivity (encrypted)</li>
                  <li><strong>Exchange API Keys:</strong> Binance/Bybit API keys and secrets (encrypted)</li>
                  <li><strong>Account IDs:</strong> Trading account identifiers</li>
                  <li><strong>Trading Preferences:</strong> Risk settings, pair selections, leverage preferences</li>
                </ul>
                <Card className="bg-green-500/5 border-green-500/30 p-4 mt-3">
                  <p className="text-sm text-gray-300">
                    <strong>Security Note:</strong> All API keys and tokens are encrypted using industry-standard AES-256 encryption.
                    We NEVER store passwords or secrets in plain text. We NEVER have withdrawal access to your accounts.
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">1.3 Trading Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Trade History:</strong> Executed trades, entry/exit prices, profit/loss</li>
                  <li><strong>Performance Metrics:</strong> Win rate, profit factor, drawdown statistics</li>
                  <li><strong>Signal Delivery:</strong> Signals received, execution status, timestamps</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">1.4 Usage Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Platform Usage:</strong> Pages visited, features used, time spent</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                  <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-400" />
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 ml-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.1 Service Delivery</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Execute trades automatically via MetCloud and exchange APIs</li>
                  <li>Deliver trading signals from our aggregated sources</li>
                  <li>Track and display your trading performance</li>
                  <li>Manage your risk settings and trade execution preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.2 Account Management</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process subscription payments and billing</li>
                  <li>Send important account notifications and updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Verify your identity and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.3 Platform Improvement</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Analyze usage patterns to improve features</li>
                  <li>Monitor system performance and reliability</li>
                  <li>Conduct research and development for new services</li>
                  <li>Aggregate anonymized performance statistics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.4 Communications</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Send service announcements and platform updates</li>
                  <li>Notify you of important changes to our Terms or Privacy Policy</li>
                  <li>Send marketing communications (you can opt-out anytime)</li>
                  <li>Respond to your support requests</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-blue-400" />
              3. Data Security
            </h2>
            <div className="space-y-4 ml-8">
              <Card className="bg-blue-500/5 border-blue-500/30 p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Bank-Level Security</h3>
                <p className="text-gray-300">
                  We implement industry-leading security measures to protect your data at all times.
                </p>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.1 Encryption</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Data in Transit:</strong> All connections use TLS 1.3 encryption (HTTPS)</li>
                  <li><strong>Data at Rest:</strong> Sensitive data encrypted using AES-256</li>
                  <li><strong>API Keys:</strong> Encrypted with separate encryption keys, never logged</li>
                  <li><strong>Passwords:</strong> Hashed using bcrypt with salt</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.2 Access Controls</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Multi-factor authentication (2FA) available for all accounts</li>
                  <li>Role-based access control (RBAC) for internal systems</li>
                  <li>API keys restricted to trading permissions only (NO withdrawals)</li>
                  <li>Regular access audits and monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.3 Infrastructure Security</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Hosted on secure cloud infrastructure (Supabase)</li>
                  <li>Automated backups every 24 hours</li>
                  <li>DDoS protection and rate limiting</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>24/7 monitoring and incident response</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.4 What We NEVER Do</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>NEVER request withdrawal API permissions</li>
                  <li>NEVER store credit card numbers (handled by payment processor)</li>
                  <li>NEVER sell your personal data to third parties</li>
                  <li>NEVER log your API keys or passwords in plain text</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-400" />
              4. Data Sharing and Disclosure
            </h2>
            <div className="space-y-4 ml-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.1 Third-Party Services</h3>
                <p className="mb-2">We share limited data with trusted service providers:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>MetCloud:</strong> API tokens for MT4/MT5 connectivity</li>
                  <li><strong>Binance/Bybit:</strong> API keys for cryptocurrency trading</li>
                  <li><strong>Payment Processors:</strong> Billing information for subscription processing</li>
                  <li><strong>Telegram:</strong> User IDs for signal delivery (optional)</li>
                  <li><strong>Analytics:</strong> Anonymized usage data for platform improvement</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.2 Legal Requirements</h3>
                <p className="mb-2">We may disclose your information if required by law:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>To prevent fraud or abuse of our services</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.3 Aggregated Data</h3>
                <p>
                  We may share aggregated, anonymized performance statistics (e.g., overall platform win rate, total trades)
                  for marketing purposes. This data cannot be used to identify individual users.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Your Rights</h2>
            <div className="space-y-4 ml-8">
              <p>You have the following rights regarding your personal data:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Access</h4>
                  <p className="text-sm text-gray-400">Request a copy of your personal data</p>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Correction</h4>
                  <p className="text-sm text-gray-400">Update or correct inaccurate data</p>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Deletion</h4>
                  <p className="text-sm text-gray-400">Request deletion of your account and data</p>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Export</h4>
                  <p className="text-sm text-gray-400">Download your trading data in CSV format</p>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Opt-Out</h4>
                  <p className="text-sm text-gray-400">Unsubscribe from marketing emails</p>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Portability</h4>
                  <p className="text-sm text-gray-400">Transfer your data to another service</p>
                </Card>
              </div>

              <p className="mt-4">
                To exercise these rights, contact us at: <strong>privacy@algoxperthub.com</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-400" />
              6. Cookies and Tracking
            </h2>
            <div className="space-y-4 ml-8">
              <p>We use cookies and similar tracking technologies:</p>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">6.1 Essential Cookies</h3>
                <p className="text-sm text-gray-400 mb-2">Required for platform functionality (cannot be disabled):</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">6.2 Analytics Cookies</h3>
                <p className="text-sm text-gray-400 mb-2">Help us understand how you use the platform (can be disabled):</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                  <li>Page views and feature usage</li>
                  <li>Performance monitoring</li>
                  <li>Error tracking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">6.3 Preference Cookies</h3>
                <p className="text-sm text-gray-400">Remember your settings and preferences</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Data Retention</h2>
            <div className="space-y-3 ml-8">
              <p>We retain your data for different periods based on data type:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Data:</strong> Until you request deletion or 2 years after account closure</li>
                <li><strong>Trading Data:</strong> 5 years for regulatory compliance and tax purposes</li>
                <li><strong>API Keys:</strong> Deleted immediately upon account deletion or API disconnection</li>
                <li><strong>Usage Logs:</strong> 90 days for security and debugging purposes</li>
                <li><strong>Support Tickets:</strong> 3 years for quality assurance</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">8. International Data Transfers</h2>
            <div className="space-y-3 ml-8">
              <p>
                Your data may be processed in countries outside your residence. We ensure adequate protection through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard contractual clauses approved by regulatory authorities</li>
                <li>Data processing agreements with all third-party providers</li>
                <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">9. Children's Privacy</h2>
            <div className="space-y-3 ml-8">
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                personal information from minors. If you believe we have inadvertently collected such data,
                please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">10. Changes to This Privacy Policy</h2>
            <div className="space-y-3 ml-8">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes via:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notification to your registered email address</li>
                <li>Prominent notice on our platform</li>
                <li>Updated "Last modified" date at the top of this page</li>
              </ul>
              <p className="mt-3">
                Your continued use of the platform after changes take effect constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">11. Contact Us</h2>
            <div className="space-y-3 ml-8">
              <p>For privacy-related questions or concerns, contact us:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Privacy Officer:</strong> privacy@algoxperthub.com</li>
                <li><strong>General Support:</strong> support@algoxperthub.com</li>
                <li><strong>Address:</strong> Jakarta, Indonesia</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
