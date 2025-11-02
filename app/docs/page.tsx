import { SectionTitle } from '@/components/marketing/SectionTitle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Zap, Bitcoin, TrendingUp, Settings, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Documentation"
          subtitle="Complete guides to get started with AlgoXpertHub"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-6 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Quick Start</h3>
            <p className="text-gray-400 text-sm mb-4">Get up and running in 10 minutes</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Account setup</li>
              <li>• Choose your plan</li>
              <li>• Connect trading accounts</li>
              <li>• Start receiving signals</li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30 p-6 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Forex Trading</h3>
            <p className="text-gray-400 text-sm mb-4">Setup MT4/MT5 with MetCloud</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• MetCloud account setup</li>
              <li>• Connect MT4/MT5</li>
              <li>• Select currency pairs</li>
              <li>• Risk management settings</li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30 p-6 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-4">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Crypto Trading</h3>
            <p className="text-gray-400 text-sm mb-4">Connect Binance or Bybit API</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Create API keys</li>
              <li>• Configure permissions</li>
              <li>• Choose Spot or Futures</li>
              <li>• Set leverage & risk</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100">Getting Started</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-200 mb-2">1. Join Waitlist</h4>
                <p className="text-gray-400">
                  Sign up for early access at the bottom of our homepage. You'll receive updates and exclusive launch pricing.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-200 mb-2">2. Choose Your Plan</h4>
                <p className="text-gray-400 mb-2">
                  Select the plan that fits your trading style:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Basic ($15/mo): Random daily signals (Pair, Gold, or Crypto)</li>
                  <li>Pro ($25/mo): All Forex pairs + Crypto Spot (50+ pairs)</li>
                  <li>VIP ($45/mo): Everything (Forex + Gold + Crypto Spot + Futures)</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-200 mb-2">3. Setup Trading Accounts</h4>
                <p className="text-gray-400 mb-2">
                  For Forex: Create MetCloud account (~$10/mo, replaces VPS)<br />
                  For Crypto: Generate API keys from Binance or Bybit (free, 5-min setup)
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-200 mb-2">4. Configure Risk Settings</h4>
                <p className="text-gray-400">
                  Set your position sizing (1-5% recommended), leverage (if using Futures), and stop loss management. Our platform provides presets for beginners.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100">Forex Setup (MetCloud)</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Step 1: Create MetCloud Account</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Visit MetCloud website</li>
                  <li>Sign up for an account (~$10/month)</li>
                  <li>This replaces the need for expensive VPS ($20-50/month)</li>
                </ol>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Step 2: Connect MT4/MT5</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Log in to your broker account (Exness, IC Markets, etc.)</li>
                  <li>Get your MT4/MT5 account number and password</li>
                  <li>Connect it to MetCloud</li>
                  <li>Copy your MetCloud API token</li>
                </ol>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Step 3: Add to AlgoXpertHub</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Go to Settings in AlgoXpertHub dashboard</li>
                  <li>Add your MetCloud API token</li>
                  <li>Select which Forex pairs to trade (37 available)</li>
                  <li>Done! Signals will auto-execute 24/7</li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100">Crypto Setup (Binance/Bybit)</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Step 1: Create API Keys</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-300 mb-2">For Binance:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-400 text-sm">
                      <li>Log in to Binance</li>
                      <li>Go to API Management</li>
                      <li>Create new API key</li>
                      <li>Enable "Spot Trading" or "Futures Trading" permission</li>
                      <li>Copy API Key and Secret Key</li>
                    </ol>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300 mb-2">For Bybit:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-400 text-sm">
                      <li>Log in to Bybit</li>
                      <li>Go to API page</li>
                      <li>Create API key with Trading permission</li>
                      <li>Copy API Key and Secret</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Step 2: Configure in AlgoXpertHub</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Go to Settings → Crypto Accounts</li>
                  <li>Add your API keys (stored securely, encrypted)</li>
                  <li>Choose Spot or Futures trading</li>
                  <li>Select leverage (for Futures: 5x, 10x, or 20x)</li>
                  <li>Set position size (recommended: 1-2% per trade)</li>
                </ol>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Security Best Practices</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Enable IP whitelist on exchange (restrict to our servers)</li>
                  <li>Do NOT enable withdrawal permission</li>
                  <li>Start with small position sizes to test</li>
                  <li>Use 2FA on your exchange account</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100">Risk Management Settings</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Position Sizing</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><span className="text-green-400">• Conservative:</span> 1% per trade</li>
                  <li><span className="text-yellow-400">• Moderate:</span> 2% per trade (recommended)</li>
                  <li><span className="text-red-400">• Aggressive:</span> 5% per trade (high risk)</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Leverage Settings</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><span className="text-green-400">• Forex:</span> No leverage (spot) or 1:100</li>
                  <li><span className="text-orange-400">• Crypto Spot:</span> No leverage</li>
                  <li><span className="text-purple-400">• Crypto Futures:</span> 5x, 10x, or 20x</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Take Profit Strategy</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• 40% at TP1 (54% hit rate)</li>
                  <li>• 30% at TP2 (22% hit rate)</li>
                  <li>• 30% at TP3 (18% hit rate)</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-200 mb-3">Stop Loss Management</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Dynamic ATR-based SL</li>
                  <li>• Move to breakeven at TP1</li>
                  <li>• Trailing stop available</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100">Security & Best Practices</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-400 mb-2">✓ DO</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Enable 2FA on all accounts</li>
                  <li>• Start with demo/small capital</li>
                  <li>• Use recommended position sizes (1-2%)</li>
                  <li>• Monitor performance regularly</li>
                  <li>• Whitelist our IP addresses</li>
                  <li>• Keep API keys secure</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-400 mb-2">✗ DON'T</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Give withdrawal permission to API</li>
                  <li>• Use &gt;5% position size</li>
                  <li>• Over-leverage (&gt;20x)</li>
                  <li>• Share your API keys</li>
                  <li>• Trade without stop loss</li>
                  <li>• Ignore risk management</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-6 text-center">
            <HelpCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-3">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              Check our FAQ or contact support
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/faq">
                <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                  View FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-6 text-center">
            <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-3">Ready to Start?</h3>
            <p className="text-gray-400 mb-4">
              Join the waitlist for early access
            </p>
            <Link href="/#waitlist">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold">
                Join Waitlist Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
