'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';

interface MonthData {
  symbol: string;
  timeframe: string;
  profitPips: number;
}

interface MonthlyChartProps {
  data: MonthData[];
  title: string;
}

export function MonthlyChart({ data, title }: MonthlyChartProps) {
  const [filter, setFilter] = useState<string>('All');

  const filteredData = filter === 'All' ? data : data.filter((item) => item.timeframe === filter);

  const chartData = filteredData.map((item) => ({
    name: `${item.symbol} (${item.timeframe})`,
    pips: item.profitPips,
  }));

  const totalPips = filteredData.reduce((sum, item) => sum + item.profitPips, 0);

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {['All', '30m', '1h'].map((tf) => (
          <Button
            key={tf}
            size="sm"
            variant={filter === tf ? 'default' : 'outline'}
            onClick={() => setFilter(tf)}
            className={
              filter === tf
                ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-500'
                : 'border-slate-700 text-gray-300 hover:bg-slate-800'
            }
          >
            {tf}
          </Button>
        ))}
      </div>
      <div className="text-right">
        <div className={`text-2xl font-bold ${totalPips >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalPips >= 0 ? '+' : ''}{totalPips} pips
        </div>
        <div className="text-xs text-gray-500">Total Net</div>
      </div>
    </div>
  );

  return (
    <ChartCard title={title} footer={footer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e5e7eb' }}
          />
          <Bar dataKey="pips" name="Profit/Loss (pips)">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.pips >= 0 ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
