import { SectionTitle } from '@/components/marketing/SectionTitle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Get in Touch"
          subtitle="We're here to help with any questions about AlgoXpertHub"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-100">Email Support</h3>
                <p className="text-gray-400 text-sm">Get help from our team</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">General Inquiries</p>
                <a href="mailto:support@algoxperthub.com" className="text-lg text-purple-400 hover:text-purple-300">
                  support@algoxperthub.com
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Sales & Partnerships</p>
                <a href="mailto:sales@algoxperthub.com" className="text-lg text-purple-400 hover:text-purple-300">
                  sales@algoxperthub.com
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Technical Support</p>
                <a href="mailto:tech@algoxperthub.com" className="text-lg text-purple-400 hover:text-purple-300">
                  tech@algoxperthub.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-100">Live Chat</h3>
                <p className="text-gray-400 text-sm">Chat with our support team</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">
                Join our Telegram community for instant support and updates
              </p>
              <a href="https://t.me/algoxperthub" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Telegram
                </Button>
              </a>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-gray-400 mb-2">Response Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Typically within 2-4 hours</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-slate-900/80 border-slate-700 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Support Hours</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">Email Support</p>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-gray-400">Monday - Friday</p>
                  <p className="text-gray-400">9:00 AM - 6:00 PM (GMT+7)</p>
                  <p className="text-sm text-gray-500 mt-1">Response within 24-48 hours</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">Telegram Community</p>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-green-400 mt-1" />
                <div>
                  <p className="text-gray-400">24/7 Community Support</p>
                  <p className="text-gray-400">Active members & team</p>
                  <p className="text-sm text-gray-500 mt-1">Fastest response time</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">VIP Support</p>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-400 mt-1" />
                <div>
                  <p className="text-gray-400">24/7 Priority Support</p>
                  <p className="text-gray-400">Dedicated account manager</p>
                  <p className="text-sm text-gray-500 mt-1">VIP plan members only</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Frequently Asked Topics</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/faq">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                <h4 className="font-semibold text-gray-200 mb-2">Getting Started</h4>
                <p className="text-sm text-gray-400">Setup guides for Forex and Crypto</p>
              </div>
            </Link>
            <Link href="/faq">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                <h4 className="font-semibold text-gray-200 mb-2">MetCloud Setup</h4>
                <p className="text-sm text-gray-400">Connect MT4/MT5 without VPS</p>
              </div>
            </Link>
            <Link href="/faq">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                <h4 className="font-semibold text-gray-200 mb-2">Crypto API Setup</h4>
                <p className="text-sm text-gray-400">Binance and Bybit integration</p>
              </div>
            </Link>
            <Link href="/faq">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                <h4 className="font-semibold text-gray-200 mb-2">Pricing & Plans</h4>
                <p className="text-sm text-gray-400">Choose the right plan for you</p>
              </div>
            </Link>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">Ready to Start Trading?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our waitlist to get early access and exclusive pricing
          </p>
          <Link href="/#waitlist">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold px-8 py-3">
              Join Waitlist Now
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
