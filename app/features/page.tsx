import { SectionTitle } from '@/components/marketing/SectionTitle';
import { FeatureItem } from '@/components/marketing/FeatureItem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Zap,
  BarChart3,
  Shield,
  TrendingUp,
  Settings,
  Lock,
  Smartphone,
  RefreshCw,
  Target,
  Filter,
  Bell,
  Cloud,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Powerful Features"
          subtitle="Everything you need for professional copy trading"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <FeatureItem
            icon={Zap}
            title="Auto-Trade Execution"
            description="Automatic trade execution to your MT4/MT5 account via MetaAPI Cloud. No manual intervention needed."
          />
          <FeatureItem
            icon={BarChart3}
            title="Multi-Source Aggregation"
            description="Aggregate signals from multiple sources: Telegram VIP groups and premium signal applications in one unified dashboard."
          />
          <FeatureItem
            icon={Shield}
            title="Advanced Risk Management"
            description="Custom position sizing (fixed lot, risk %, balance %), TP allocations, and SL management."
          />
          <FeatureItem
            icon={TrendingUp}
            title="Real-Time Performance"
            description="Track your performance with detailed analytics, equity curves, and comprehensive metrics."
          />
          <FeatureItem
            icon={Settings}
            title="Flexible Configuration"
            description="Choose from multiple position sizing methods, TP allocation strategies, and SL management options."
          />
          <FeatureItem
            icon={Lock}
            title="Secure & Encrypted"
            description="Bank-level encryption for your MetaAPI credentials. Your data is always protected."
          />
          <FeatureItem
            icon={Cloud}
            title="Cloud-Based"
            description="No software installation required. Access your dashboard from anywhere, anytime."
          />
          <FeatureItem
            icon={Bell}
            title="Smart Notifications"
            description="Real-time alerts for trade execution, performance milestones, and important events."
          />
          <FeatureItem
            icon={Target}
            title="Verified Signals"
            description="80% winrate over 10 weeks. 35,220+ pips cumulative. 3.75:1 risk:reward ratio."
          />
        </div>

        <div className="mb-20">
          <SectionTitle
            title="Position Sizing Methods"
            subtitle="Choose the method that matches your risk tolerance"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Fixed Lot Size</h3>
              <p className="text-sm text-gray-400 mb-4">
                Trade with a fixed lot size (e.g., 0.01, 0.1, 1.0) regardless of account balance.
                Simple and predictable.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Example:</strong> Always trade 0.1 lot per signal
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6 border-2 border-yellow-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                Recommended
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Risk Percent</h3>
              <p className="text-sm text-gray-400 mb-4">
                Risk a percentage of your account balance per trade based on stop loss distance.
                Most professional approach.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Formula:</strong> Lot = (Balance × Risk%) / (SL Pips × Pip Value)
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Balance Percent</h3>
              <p className="text-sm text-gray-400 mb-4">
                Use a percentage of your account balance per trade (e.g., 5%, 10%).
                Scales with your account.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Formula:</strong> Lot = (Balance × Balance%) / Entry Price
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            title="Take Profit Management"
            subtitle="Advanced TP allocation strategies"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Dynamic Auto Trailing</h3>
              <p className="text-sm text-gray-400 mb-4">
                Automatically trail stop loss when profit reaches a percentage of target TP.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Example:</strong> At 50% TP, move SL to breakeven and trail by 50%
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Set Breakeven (BEP)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Move stop loss to entry price when profit reaches a percentage of target TP.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Example:</strong> At 50% TP, move SL to entry (no loss)
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Close by Percentage</h3>
              <p className="text-sm text-gray-400 mb-4">
                Close a percentage of the position at specific profit levels.
              </p>
              <div className="text-xs text-gray-500 bg-slate-800/50 p-3 rounded border border-slate-700">
                <strong className="text-gray-400">Example:</strong> Close 50% at 50% TP, 50% at 100% TP
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            title="Stop Loss Management"
            subtitle="Protect your capital with intelligent SL strategies"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Fixed Pips</h3>
              <p className="text-sm text-gray-400 mb-4">
                Use a fixed stop loss distance for all trades. Standard: 25 pips (based on verified data).
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">ATR Multiplier</h3>
              <p className="text-sm text-gray-400 mb-4">
                Calculate stop loss based on Average True Range (market volatility). Adapts to market conditions.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Risk Percent</h3>
              <p className="text-sm text-gray-400 mb-4">
                Calculate stop loss distance based on account risk percentage. Consistent risk per trade.
              </p>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border-yellow-400/30 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">Ready to Start Copy Trading?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join 500+ traders who trust AlgoXpertHub for verified signals and advanced risk management
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                View Pricing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/performance">
              <Button size="lg" variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                View Performance
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
