import { SectionTitle } from '@/components/marketing/SectionTitle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic',
    monthlyPrice: '$15',
    yearlyPrice: '$150',
    description: 'Random daily signals from all categories',
    providers: 'Random Daily',
    features: [
      'Random signal daily (Pair, Gold, or Crypto Spot)',
      'Diversified portfolio exposure',
      'Advanced position sizing (risk %, balance %)',
      'Dynamic TP allocations',
      'Custom SL management',
      'Performance dashboard',
      'Email support',
      'Real-time Telegram notifications',
      'MetCloud for Forex (~$10/mo, no VPS needed)',
      'Exchange API for Crypto (Binance/Bybit)',
      'Unlimited Account MT5/MT4'
    ],
    highlighted: false
  },
  {
    name: 'Pro',
    monthlyPrice: '$25',
    yearlyPrice: '$250',
    description: 'Full Pair signals + Crypto Spot trading',
    providers: 'Pair + Crypto Spot',
    features: [
      'All Pair signals (Multi-Pair Forex: 37 pairs)',
      'Crypto Spot signals (50+ pairs, 66.48% WR)',
      'MetCloud for Forex (~$10/mo, no VPS)',
      'Binance/Bybit API for Crypto (5min setup)',
      'Diversify with multiple trading strategies',
      'All Basic plan features',
      'Unlimited Account MT5/MT4',
      'Advanced risk management per provider',
      'Provider performance comparison',
      'Priority email support',
      'Real-time Telegram notifications',
      'Advanced analytics & reporting'
    ],
    highlighted: true
  },
  {
    name: 'VIP',
    monthlyPrice: '$45',
    yearlyPrice: '$450',
    description: 'All signals: Pair, Gold, Crypto Spot & Futures',
    providers: 'All Signals',
    features: [
      'All Pair signals (Multi-Pair Forex: 37 pairs)',
      'Gold signals (HF: 93%+ WR + Standard: 85% WR)',
      'Crypto Spot (50+ pairs, 66.48% WR, 8,529% profit)',
      'Crypto Futures (67.04% WR, 25,578% profit, 2x vs Spot)',
      'MetCloud for Forex (~$10/mo, no VPS)',
      'Binance/Bybit API for Crypto (instant setup)',
      'Maximum portfolio diversification',
      'All Pro plan features',
      'Unlimited Account MT5/MT4',
      'Advanced risk management per provider',
      'Priority email support',
      '24/7 VIP support',
      'Advanced analytics & reporting',
      'Early access to new signals'
    ],
    highlighted: false,
    badge: 'Best Value'
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Join Waitlist • Launching Soon</span>
          </div>
          <SectionTitle
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that fits your trading style"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-12 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            Early Access Available
          </h3>
          <p className="text-gray-400 mb-4">
            Join our waitlist to get early access and special launch pricing
          </p>
          <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
              Join Waitlist for Early Access
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 ${
                plan.highlighted
                  ? 'gradient-purple-blue-dark border-purple-500 border-2 scale-105'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  {plan.badge}
                </div>
              )}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 mb-3">
                  {plan.providers}
                </div>
                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.monthlyPrice}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    or <span className="text-green-400 font-semibold">{plan.yearlyPrice}/year</span>
                    <span className="block text-xs text-green-400 mt-1">(Save ${(parseInt(plan.monthlyPrice.slice(1)) * 12) - parseInt(plan.yearlyPrice.slice(1))})</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900'
                      : 'bg-slate-700 hover:bg-slate-600 text-gray-100'
                  }`}
                >
                  Join Waitlist
                </Button>
              </a>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Monthly vs Yearly</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-300 font-semibold mb-2">Monthly Billing</h4>
                <p className="text-sm text-gray-400">
                  Pay month-to-month with no long-term commitment. Cancel anytime. Perfect for testing and short-term usage.
                </p>
              </div>
              <div>
                <h4 className="text-gray-300 font-semibold mb-2">Yearly Billing (VIP)</h4>
                <p className="text-sm text-gray-400">
                  Save money with annual commitment. Get the best value with VIP plan at $400/year (equivalent to $33/month).
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h3 className="text-xl font-bold text-gray-100 mb-4">What's Included in All Plans</h3>
            <ul className="space-y-2">
              {[
                'Cloud-based signal execution',
                'MetaAPI integration',
                'Performance tracking dashboard',
                'Verified signals (80% winrate)',
                'Secure & encrypted',
                'Email notifications',
                'Mobile-friendly interface'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">Still Have Questions?</h3>
          <p className="text-gray-400 mb-6">
            Join our waitlist to get early access and exclusive pricing when we launch
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
              <Button className="gradient-purple-blue hover:opacity-90 text-white font-semibold">
                Join Waitlist
              </Button>
            </a>
            <a href="/faq">
              <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                View FAQ
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
