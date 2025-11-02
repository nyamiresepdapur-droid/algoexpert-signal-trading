import { Card } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Shield, Info, DollarSign, Target } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Risk Disclaimer</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-3">HIGH RISK WARNING</h3>
              <p className="text-gray-200 font-semibold leading-relaxed mb-3">
                Trading Forex, Cryptocurrencies, Gold, and other leveraged financial instruments involves substantial risk of loss
                and is not suitable for all investors. You can lose more than your initial investment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                AlgoXpertHub is a TECHNOLOGY PLATFORM ONLY. We are NOT investment advisors, brokers, or financial planners.
                We do NOT provide investment advice or financial recommendations. All trading decisions are YOUR responsibility.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-400" />
              1. Nature of Service
            </h2>
            <div className="space-y-3 ml-8">
              <h3 className="text-lg font-semibold text-gray-200">1.1 Technology Platform</h3>
              <p>
                AlgoXpertHub is a software platform that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Aggregates trading signals from multiple third-party sources</li>
                <li>Routes signals to your connected trading accounts (MT4/MT5 via MetCloud, Binance, Bybit)</li>
                <li>Executes trades automatically based on your configured risk parameters</li>
                <li>Tracks and displays trading performance metrics</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">1.2 NOT Investment Services</h3>
              <Card className="bg-yellow-500/5 border-yellow-500/30 p-4">
                <p className="font-semibold text-yellow-400 mb-2">We are NOT:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                  <li>An investment advisor or financial planner</li>
                  <li>A broker, dealer, or financial institution</li>
                  <li>A fund manager or portfolio manager</li>
                  <li>A registered financial services provider</li>
                </ul>
              </Card>

              <h3 className="text-lg font-semibold text-gray-200 mt-4">1.3 Signal Sources</h3>
              <p>
                The trading signals on our platform originate from third-party signal providers. We aggregate these signals
                but DO NOT create, verify, or endorse the trading strategies behind them. We are NOT responsible for the
                accuracy, profitability, or performance of these signals.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-red-400" />
              2. Trading Risks
            </h2>
            <div className="space-y-4 ml-8">
              <Card className="bg-red-500/5 border-red-500/30 p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">UNDERSTAND THESE RISKS BEFORE TRADING</h3>
                <p className="text-gray-300">
                  Trading carries substantial risk. You should carefully consider whether trading is suitable for you
                  based on your financial situation, experience, and risk tolerance.
                </p>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.1 Capital Loss Risk</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Total Loss Possible:</strong> You can lose 100% of your invested capital</li>
                  <li><strong>No Guarantees:</strong> There is no guarantee of profit or protection against losses</li>
                  <li><strong>Market Volatility:</strong> Prices can change rapidly and unpredictably</li>
                  <li><strong>Gap Risk:</strong> Markets can gap beyond stop loss levels, causing larger losses</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.2 Leverage Risk</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Amplified Losses:</strong> Leverage magnifies both profits AND losses</li>
                  <li><strong>Crypto Futures (5-20x):</strong> Can lose your entire margin in minutes</li>
                  <li><strong>Forex (up to 1:100):</strong> Small price moves = large account impact</li>
                  <li><strong>Margin Calls:</strong> Positions may be liquidated automatically if margin is insufficient</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.3 Market-Specific Risks</h3>

                <Card className="bg-slate-900/50 border-slate-700 p-4 mb-3">
                  <h4 className="font-semibold text-orange-400 mb-2">Forex Markets</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 ml-4">
                    <li>Currency volatility from economic events and central bank policies</li>
                    <li>Liquidity gaps during major news releases</li>
                    <li>Rollover/swap fees for overnight positions</li>
                    <li>Broker spread variations during volatile periods</li>
                  </ul>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 p-4 mb-3">
                  <h4 className="font-semibold text-purple-400 mb-2">Cryptocurrency Markets</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 ml-4">
                    <li>Extreme price volatility (10-30% daily swings common)</li>
                    <li>24/7 markets with no circuit breakers</li>
                    <li>Regulatory uncertainty and sudden policy changes</li>
                    <li>Exchange security risks (hacks, outages, delisting)</li>
                    <li>Futures liquidation cascades during high volatility</li>
                  </ul>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">Gold (XAUUSD)</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 ml-4">
                    <li>Price influenced by multiple global factors (USD strength, inflation, geopolitics)</li>
                    <li>Large pip movements during volatile sessions</li>
                    <li>Wide spreads during low liquidity hours</li>
                  </ul>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.4 Technical & Execution Risks</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Slippage:</strong> Orders may execute at worse prices than signal prices</li>
                  <li><strong>System Failures:</strong> Internet, API, or platform outages can impact trading</li>
                  <li><strong>Latency:</strong> Signal delays can result in missed entries or worse prices</li>
                  <li><strong>Broker/Exchange Issues:</strong> Third-party platform problems are outside our control</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-400" />
              3. Performance Disclaimers
            </h2>
            <div className="space-y-4 ml-8">
              <Card className="bg-orange-500/5 border-orange-500/30 p-4">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Past Performance Does NOT Guarantee Future Results</h3>
                <p className="text-gray-300">
                  This is the most important disclaimer. Historical performance data, no matter how impressive,
                  does NOT predict or guarantee future profitability.
                </p>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.1 Historical Performance Data</h3>
                <p>All performance metrics displayed on our platform represent:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Real Historical Data:</strong> Actual results from real market conditions and live trading</li>
                  <li><strong>Specific Time Period:</strong> Performance during a particular market environment</li>
                  <li><strong>Specific Conditions:</strong> May not reflect current market conditions or volatility</li>
                  <li><strong>Aggregated Results:</strong> Combined performance from multiple signal sources</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.2 Individual Results Will Vary</h3>
                <p>Your actual trading results may differ significantly due to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Timing:</strong> When you start using the platform affects results</li>
                  <li><strong>Market Conditions:</strong> Bull vs bear markets, volatility levels</li>
                  <li><strong>Risk Settings:</strong> Position sizing, leverage, stop loss configuration</li>
                  <li><strong>Execution:</strong> Broker/exchange differences, slippage, latency</li>
                  <li><strong>Account Size:</strong> Smaller accounts may face proportionally higher costs</li>
                  <li><strong>Signal Selection:</strong> Which pairs/providers you choose to trade</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.3 Performance Metrics Explained</h3>
                <div className="space-y-2 ml-4">
                  <p><strong>Win Rate (e.g., 80%):</strong> Percentage of trades that were profitable. Does NOT indicate profit size or risk:reward ratio.</p>
                  <p><strong>Profit Factor (e.g., 11.72):</strong> Gross profit divided by gross loss. Historical metric, not a guarantee.</p>
                  <p><strong>Drawdown:</strong> Peak-to-trough decline. Future drawdowns may exceed historical levels.</p>
                  <p><strong>Total Pips/Profit:</strong> Cumulative results over a specific period. Does not account for compounding effects or varying position sizes.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.4 Hypothetical vs. Actual Results</h3>
                <p>Some displayed results may include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Signals tracked but not executed by all users</li>
                  <li>Aggregated performance from multiple accounts</li>
                  <li>Results that do not reflect real trading costs (spreads, commissions, slippage)</li>
                </ul>
                <p className="mt-2">
                  <strong>Your actual results will likely be lower</strong> due to execution costs and market conditions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              4. Financial Considerations
            </h2>
            <div className="space-y-4 ml-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.1 Only Risk What You Can Afford to Lose</h3>
                <Card className="bg-red-500/5 border-red-500/30 p-4">
                  <p className="text-gray-300 font-semibold">
                    DO NOT trade with money you need for living expenses, debt payments, retirement, or emergencies.
                    Trading capital should be "risk capital" - money you can afford to lose completely.
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.2 Costs and Fees</h3>
                <p>Your trading costs include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>AlgoXpertHub Subscription:</strong> $15-$45/month depending on plan</li>
                  <li><strong>MetCloud (for Forex):</strong> ~$10/month</li>
                  <li><strong>Broker Spreads:</strong> Bid-ask spread on every trade</li>
                  <li><strong>Trading Commissions:</strong> Charged by some brokers/exchanges</li>
                  <li><strong>Slippage:</strong> Difference between expected and actual execution price</li>
                  <li><strong>Overnight Fees:</strong> Rollover/funding rates for positions held overnight</li>
                </ul>
                <p className="mt-3">
                  These costs reduce your net profitability and must be factored into your trading plan.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.3 Tax Implications</h3>
                <p>
                  Trading profits may be subject to taxation in your jurisdiction. Consult a tax professional regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Capital gains tax on profitable trades</li>
                  <li>Reporting requirements for crypto transactions</li>
                  <li>Deductibility of trading losses</li>
                  <li>Record keeping obligations</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              5. Your Responsibilities
            </h2>
            <div className="space-y-4 ml-8">
              <Card className="bg-blue-500/5 border-blue-500/30 p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">You Are Responsible For:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>All trading decisions and their outcomes</li>
                  <li>Understanding the instruments you trade (Forex, Crypto Spot, Crypto Futures, Gold)</li>
                  <li>Understanding leverage and margin requirements</li>
                  <li>Setting appropriate risk management parameters</li>
                  <li>Monitoring your trading account and positions</li>
                  <li>Maintaining sufficient margin to avoid liquidations</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Conducting your own due diligence and research</li>
                </ul>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">5.1 Education Required</h3>
                <p>Before using this platform, you should:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Understand basic trading concepts and terminology</li>
                  <li>Know how leverage affects your positions</li>
                  <li>Be familiar with technical analysis and risk management</li>
                  <li>Read and understand your broker/exchange's terms and conditions</li>
                  <li>Practice with demo accounts before trading live</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">5.2 Recommended Risk Management</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Risk no more than 1-2% of capital per trade</li>
                  <li>Use appropriate stop losses on all positions</li>
                  <li>Start with lower leverage (5-10x max for futures)</li>
                  <li>Diversify across multiple instruments/pairs</li>
                  <li>Never go all-in on a single trade</li>
                  <li>Keep sufficient funds for margin requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">6. Limitation of Liability</h2>
            <div className="space-y-3 ml-8">
              <Card className="bg-yellow-500/5 border-yellow-500/30 p-4">
                <p className="text-gray-300 font-semibold mb-2">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>We are NOT liable for any trading losses or loss of capital</li>
                  <li>We are NOT liable for lost profits or missed opportunities</li>
                  <li>We are NOT liable for signal errors, delays, or inaccuracies</li>
                  <li>We are NOT liable for third-party service failures (MetCloud, exchanges, brokers)</li>
                  <li>We are NOT liable for system downtime or technical issues</li>
                  <li>We make NO warranties or guarantees regarding profitability</li>
                </ul>
              </Card>
              <p className="mt-4">
                By using AlgoXpertHub, you agree to hold us harmless from any losses or damages arising from your trading activities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Regulatory Status</h2>
            <div className="space-y-3 ml-8">
              <p>
                AlgoXpertHub operates as a technology service provider. We are not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Registered with any financial regulatory authority</li>
                <li>Licensed to provide investment advice or financial services</li>
                <li>Subject to financial services regulations applicable to brokers or advisors</li>
              </ul>
              <p className="mt-3">
                It is YOUR responsibility to ensure that using our platform is legal in your jurisdiction and that
                you comply with all applicable laws and regulations.
              </p>
            </div>
          </section>

          <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 p-6 mt-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Final Acknowledgment</h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  BY USING ALGOXPERTHUB, YOU ACKNOWLEDGE THAT:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>You have read and understood this Risk Disclaimer in its entirety</li>
                  <li>You understand that trading is risky and you can lose money</li>
                  <li>You accept full responsibility for all trading decisions and outcomes</li>
                  <li>You understand this is a technology platform, NOT investment advice</li>
                  <li>You agree that past performance does NOT guarantee future results</li>
                  <li>You will only trade with money you can afford to lose</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-3 font-semibold">
                  If you do not accept these terms and risks, DO NOT use this platform.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
