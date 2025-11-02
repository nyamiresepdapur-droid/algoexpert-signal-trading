import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

interface PriceTableProps {
  plans: Plan[];
}

export function PriceTable({ plans }: PriceTableProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`relative p-8 ${
            plan.highlighted
              ? 'bg-slate-800 border-yellow-400 border-2 scale-105'
              : 'bg-slate-900/50 border-slate-800'
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
          )}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
              <span className="text-gray-400">/{plan.period}</span>
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
          <Link href="/pricing">
            <Button
              className={`w-full ${
                plan.highlighted
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900'
                  : 'bg-slate-700 hover:bg-slate-600 text-gray-100'
              }`}
            >
              Choose Plan
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
