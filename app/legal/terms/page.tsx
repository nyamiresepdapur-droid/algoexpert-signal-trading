import { Card } from '@/components/ui/card';
import { AlertTriangle, Shield, FileText, Clock } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Important Notice</h3>
              <p className="text-gray-300 leading-relaxed">
                AlgoXpertHub is a <strong>technology platform only</strong>. We are NOT an investment advisor, broker, or financial institution.
                We do NOT provide investment advice, financial recommendations, or guaranteed returns. All trading involves substantial risk of loss.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              1. Acceptance of Terms
            </h2>
            <div className="space-y-3 ml-8">
              <p>
                By accessing or using AlgoXpertHub ("the Platform"), you agree to be bound by these Terms of Service.
                If you do not agree to these terms, you must not use the Platform.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the Platform after changes
                are posted constitutes your acceptance of the modified terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              2. Nature of Service
            </h2>
            <div className="space-y-3 ml-8">
              <h3 className="text-lg font-semibold text-gray-200">2.1 Technology Platform Only</h3>
              <p>
                AlgoXpertHub is a <strong>technology platform</strong> that provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Signal aggregation and routing services</li>
                <li>Automated trade execution tools via MetCloud and exchange APIs</li>
                <li>Performance tracking and analytics</li>
                <li>Risk management configuration tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">2.2 NOT Investment Services</h3>
              <p>We explicitly DO NOT provide:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Investment advice or financial recommendations</li>
                <li>Portfolio management services</li>
                <li>Broker or dealer services</li>
                <li>Guaranteed returns or profit promises</li>
                <li>Financial planning or advisory services</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">2.3 Performance Data</h3>
              <p>
                All performance data displayed on our platform represents <strong>actual historical trading results</strong> from
                real market conditions. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Past performance does NOT guarantee future results</li>
                <li>Individual results may vary significantly</li>
                <li>Performance data is provided for informational purposes only</li>
                <li>Your actual trading results may differ due to market conditions, execution timing, slippage, and other factors</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              3. Risk Disclosure
            </h2>
            <div className="space-y-3 ml-8">
              <Card className="bg-red-500/5 border-red-500/30 p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">HIGH RISK WARNING</h3>
                <p className="text-gray-300 leading-relaxed">
                  Trading Forex, Cryptocurrencies, Gold, and other financial instruments carries a high level of risk
                  and may not be suitable for all investors. You can lose your entire investment.
                </p>
              </Card>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">3.1 Understanding Risks</h3>
              <p>Before using this platform, you must understand and accept that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Total Loss Risk:</strong> You can lose 100% of your invested capital</li>
                <li><strong>Leverage Risk:</strong> Leveraged trading (especially crypto futures 5-20x) amplifies both gains AND losses</li>
                <li><strong>Market Risk:</strong> Markets can move against your positions rapidly and without warning</li>
                <li><strong>Slippage Risk:</strong> Actual execution prices may differ from signal prices</li>
                <li><strong>Technical Risk:</strong> System failures, internet outages, or API issues can impact trading</li>
                <li><strong>Liquidity Risk:</strong> Some markets may have limited liquidity causing price gaps</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">3.2 Your Responsibility</h3>
              <p>By using this platform, you acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All trading decisions are YOUR sole responsibility</li>
                <li>You should only trade with money you can afford to lose</li>
                <li>You understand the instruments you are trading (Forex, Crypto Spot, Crypto Futures, Gold)</li>
                <li>You have read and understood the risks associated with leveraged trading</li>
                <li>You are responsible for your own due diligence and research</li>
                <li>You understand that signals are NOT guarantees of profit</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">3.3 No Guaranteed Returns</h3>
              <p>
                We make NO guarantees, warranties, or promises regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Future profitability or performance</li>
                <li>Specific win rates or profit targets</li>
                <li>Elimination of trading losses</li>
                <li>Consistency of results</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">4. User Obligations</h2>
            <div className="space-y-3 ml-8">
              <h3 className="text-lg font-semibold text-gray-200">4.1 Eligibility</h3>
              <p>You must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age (or legal age in your jurisdiction)</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from trading by your local laws or regulations</li>
                <li>Have your own brokerage/exchange accounts</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">4.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>Securing your API keys and trading account access</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">4.3 Proper Use</h3>
              <p>You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the platform for illegal activities</li>
                <li>Attempt to reverse engineer or hack the platform</li>
                <li>Share your account with others</li>
                <li>Manipulate or abuse the service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Subscription and Payment</h2>
            <div className="space-y-3 ml-8">
              <h3 className="text-lg font-semibold text-gray-200">5.1 Plans</h3>
              <p>We offer three subscription plans:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Basic:</strong> $15/month - Random daily signals</li>
                <li><strong>Pro:</strong> $25/month - All Forex pairs + Crypto Spot</li>
                <li><strong>VIP:</strong> $45/month - All signals (Forex + Gold + Crypto Spot + Futures)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">5.2 Additional Costs</h3>
              <p>You are responsible for additional costs:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>MetCloud subscription (~$10/month) for Forex trading</li>
                <li>Trading commissions and spreads from your broker/exchange</li>
                <li>Any fees charged by payment processors</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">5.3 Cancellation</h3>
              <p>
                You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period.
                No refunds for partial months.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">6. Limitation of Liability</h2>
            <div className="space-y-3 ml-8">
              <Card className="bg-yellow-500/5 border-yellow-500/30 p-4">
                <p className="text-gray-300 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALGOXPERTHUB SHALL NOT BE LIABLE FOR ANY:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-gray-300">
                  <li>Trading losses or loss of capital</li>
                  <li>Lost profits or missed opportunities</li>
                  <li>Signal errors, delays, or inaccuracies</li>
                  <li>System downtime or technical failures</li>
                  <li>Third-party service failures (MetCloud, exchanges, brokers)</li>
                  <li>Indirect, consequential, or punitive damages</li>
                </ul>
              </Card>

              <p className="mt-4">
                Our total liability to you for any claims arising from your use of the Platform shall not exceed
                the amount you paid to us in the past 3 months.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Third-Party Services</h2>
            <div className="space-y-3 ml-8">
              <p>The Platform integrates with third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>MetCloud:</strong> For MT4/MT5 connectivity</li>
                <li><strong>Binance/Bybit:</strong> For cryptocurrency trading</li>
                <li><strong>Telegram:</strong> For signal delivery</li>
              </ul>
              <p className="mt-3">
                We are not responsible for the performance, security, or availability of these third-party services.
                You must comply with their respective terms of service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">8. Data and Privacy</h2>
            <div className="space-y-3 ml-8">
              <p>
                Your use of the Platform is subject to our Privacy Policy. We collect and process data to provide our services,
                including API keys (encrypted), trading history, and performance metrics.
              </p>
              <p>
                We NEVER have withdrawal access to your accounts. API keys are stored encrypted and used only for reading
                account data and executing trades.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">9. Termination</h2>
            <div className="space-y-3 ml-8">
              <p>We reserve the right to terminate or suspend your access to the Platform:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For violation of these Terms</li>
                <li>For fraudulent or illegal activity</li>
                <li>For non-payment of fees</li>
                <li>At our sole discretion with or without cause</li>
              </ul>
              <p className="mt-3">
                Upon termination, you must immediately cease using the Platform and disconnect all API integrations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">10. Governing Law</h2>
            <div className="space-y-3 ml-8">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Indonesia,
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Platform shall be resolved through
                binding arbitration in Jakarta, Indonesia.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">11. Contact Information</h2>
            <div className="space-y-3 ml-8">
              <p>If you have questions about these Terms, please contact us:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Email:</strong> legal@algoxperthub.com</li>
                <li><strong>Support:</strong> support@algoxperthub.com</li>
                <li><strong>Address:</strong> Jakarta, Indonesia</li>
              </ul>
            </div>
          </section>

          <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30 p-6 mt-8">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Acknowledgment</h3>
                <p className="text-gray-300 leading-relaxed">
                  BY USING ALGOXPERTHUB, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
                  YOU UNDERSTAND THAT TRADING IS RISKY AND THAT THIS IS A TECHNOLOGY PLATFORM, NOT AN INVESTMENT SERVICE.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
