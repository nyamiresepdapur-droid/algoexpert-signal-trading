import { SectionTitle } from '@/components/marketing/SectionTitle';
import { FAQItem, FAQ } from '@/components/marketing/FAQItem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';

const faqs: FAQ[] = [
  {
    question: 'What is AlgoXpertHub?',
    answer: 'AlgoXpertHub is an AI-powered cloud platform that automatically copies trading signals from multiple sources (Telegram groups and premium signal applications) to your MetaTrader (MT4/MT5) account. We aggregate verified signals with 80% winrate and execute them automatically with advanced risk management.'
  },
  {
    question: 'How does the signal copying work?',
    answer: 'Our AI reads signals from multiple sources including Telegram groups and premium signal applications, interprets them in real-time, and executes trades automatically on your MT4/MT5 account via MetaAPI Cloud. You can customize position sizing, take profit allocations, and stop loss management.'
  },
  {
    question: 'What setup is required for Forex and Crypto?',
    answer: 'For Forex: You need MetCloud (~$10/month) to connect MT4/MT5 - no VPS required! For Crypto: Simply create API keys from Binance or Bybit (5-minute setup). Both are cloud-based solutions.'
  },
  {
    question: 'What is MetCloud and why not VPS?',
    answer: 'MetCloud is a cloud service (~$10/month) that connects your MetaTrader account to our platform. It eliminates the need for expensive VPS ($20-50/month). Everything runs in the cloud 24/7 automatically.'
  },
  {
    question: 'Can I use my existing broker?',
    answer: 'Yes! As long as your broker offers MT4 or MT5, you can connect it through MetaAPI. We support 150+ brokers including Exness, IC Markets, Pepperstone, FXTM, and many more.'
  },
  {
    question: 'How do I get early access?',
    answer: 'Join our waitlist on the homepage. When we launch, waitlist members will receive early access invitations with special launch pricing. We are launching soon and prioritizing waitlist members first.'
  },
  {
    question: 'How much does it cost?',
    answer: 'Basic: $15/month (random daily signals). Pro: $25/month (all Forex pairs + Crypto Spot). VIP: $45/month (everything: Forex + Gold + Crypto Spot + Futures). Additional: MetCloud ~$10/month for Forex. Crypto only needs free API keys.'
  },
  {
    question: 'What crypto signals do you provide?',
    answer: '50+ cryptocurrency pairs with 66.48% winrate verified over 2+ years (1,068 trades for Spot, 1,590 for Futures). Includes top performers like EVAAUSDT (100% WR), RNDRUSDT (93.33% WR). Both Spot and Futures trading available.'
  },
  {
    question: 'What is the difference between Crypto Spot and Futures?',
    answer: 'Spot: Lower risk, no leverage, 66.48% WR, 7.99% avg profit. Futures: Higher profit (16.09% avg, 2x vs Spot), 67.04% WR, uses 5-10x leverage. Futures contributes 75% of total crypto profits.'
  },
  {
    question: 'What is the verified performance?',
    answer: 'Our signals come from a master source tracked over 10 consecutive weeks (July 28 - October 24, 2025): 35,220 total pips, 80.08% winrate, 502 trades (402 wins, 100 losses), 3.75:1 risk:reward ratio. Zero maximum drawdown. All data is documented and verifiable.'
  },
  {
    question: 'What risk management features are included?',
    answer: 'You can choose from 3 position sizing methods (fixed lot, risk %, balance %), 3 TP allocation strategies (dynamic trailing, breakeven, close by %), and 3 SL management options (fixed pips, ATR multiplier, risk %). Full customization to match your risk tolerance.'
  },
  {
    question: 'How many signals will I receive per day?',
    answer: 'It depends on your plan. Starter plan gets up to 5 signals per day. Pro and VIP plans get unlimited signals. On average, we process 50-70 signals per week based on our verified data.'
  },
  {
    question: 'Can I choose which pairs to trade?',
    answer: 'Yes, with Pro and VIP plans. You can select specific currency pairs (EUR/USD, GBP/USD, etc.) and choose which signal sources (Telegram groups, premium apps) and providers to follow. Starter plan trades all signals from our verified sources.'
  },
  {
    question: 'Is my data and capital safe?',
    answer: 'Yes. We use bank-level encryption for all credentials. Your MetaAPI tokens are stored securely. We never have direct access to your trading account or funds. You maintain full control through your broker.'
  },
  {
    question: 'Do I need to keep my computer running?',
    answer: 'No. AlgoXpertHub is 100% cloud-based. Signals are monitored and executed 24/5 from our servers via MetaAPI Cloud. Your trades happen automatically even when your devices are off.'
  },
  {
    question: 'Can I manage multiple trading accounts?',
    answer: 'Yes, with the VIP plan. You can connect up to 5 MetaAPI accounts and manage them all from a single dashboard. Each account can have different risk settings.'
  },
  {
    question: 'What happens if I want to cancel?',
    answer: 'You can cancel anytime from your dashboard. No questions asked, no cancellation fees. Your subscription will remain active until the end of your billing period.'
  },
  {
    question: 'When will AlgoXpertHub launch?',
    answer: 'We are currently in pre-launch waitlist mode. Join the waitlist to be notified when we officially launch. Early waitlist members get exclusive pricing and priority access.'
  },
  {
    question: 'What support do you provide?',
    answer: 'Starter plan includes email support (24-48h response). Pro plan gets priority support (12-24h). VIP plan includes 24/7 premium support with a dedicated account manager and priority handling.'
  },
  {
    question: 'Do you provide trading advice or guarantees?',
    answer: 'No. AlgoXpertHub is a technology platform for signal aggregation and automated execution. We do not provide investment advice or financial recommendations. Past performance does not guarantee future results. Trading involves risk of loss.'
  },
  {
    question: 'Can I use this for demo accounts?',
    answer: 'Yes! You can connect both demo and live MetaAPI accounts. We recommend starting with a demo account to test your risk settings before going live.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about AlgoXpertHub"
        />

        <FAQItem faqs={faqs} />

        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-100 mb-3">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6">
              Join our waitlist or reach out to our team
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
                <Button className="gradient-purple-blue hover:opacity-90 text-white font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </a>
              <a href="mailto:support@algoxperthub.com">
                <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
