'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { createClient } from '@supabase/supabase-js';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WaitlistFormProps {
  defaultPlan?: 'starter' | 'pro' | 'vip';
}

export function WaitlistForm({ defaultPlan = 'pro' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [plan, setPlan] = useState(defaultPlan);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            name: name || null,
            telegram_username: telegram,
            interested_plan: plan,
          },
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          window.open('https://t.me/AlgoExpertHub', '_blank');
        }, 500);
        setEmail('');
        setName('');
        setTelegram('');
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="bg-green-500/10 border-green-500/30 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-100 mb-2">You're on the list!</h3>
        <p className="text-gray-400 mb-4">
          We'll notify you via email when AlgoXpertHub launches. Get ready for verified signals with 80% winrate!
        </p>
        <p className="text-yellow-400 font-semibold mb-6">
          Redirecting to our Telegram channel...
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => window.open('https://t.me/AlgoExpertHub', '_blank')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Open Telegram Channel
          </Button>
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
          >
            Add Another
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-300 mb-2 block">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="bg-slate-800 border-slate-700 text-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-gray-300 mb-2 block">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="bg-slate-800 border-slate-700 text-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="telegram" className="text-gray-300 mb-2 block">
            Telegram Username <span className="text-red-500">*</span>
          </Label>
          <Input
            id="telegram"
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            required
            className="bg-slate-800 border-slate-700 text-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Required to join our Telegram channel for updates
          </p>
        </div>

        <div>
          <Label className="text-gray-300 mb-3 block">Interested Plan</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'basic', label: 'Basic', price: '$15', desc: 'Random Daily' },
              { value: 'pro', label: 'Pro', price: '$25', desc: 'Pair + Crypto Spot' },
              { value: 'vip', label: 'VIP', price: '$45', desc: 'All Signals' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPlan(option.value as any)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  plan === option.value
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="text-sm font-semibold text-gray-100">{option.label}</div>
                <div className="text-xs text-gray-400">{option.price}/mo</div>
                <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full gradient-purple-blue hover:opacity-90 text-white font-semibold text-lg h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Joining Waitlist...
            </>
          ) : (
            'Join Waitlist'
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By joining, you'll be notified when we launch. No spam, we promise.
        </p>
      </form>
    </Card>
  );
}
