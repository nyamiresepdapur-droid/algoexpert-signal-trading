'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import { Stat } from './Stat';

interface DayData {
  label: string;
  profit: number;
  loss: number;
}

interface WeeklyData {
  days: DayData[];
  totals: {
    profit: number;
    loss: number;
    net: number;
  };
}

interface WeeklyChartProps {
  data: WeeklyData;
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const footer = (
    <div className="grid grid-cols-3 gap-4">
      <Stat label="Total Profit" value={`${data.totals.profit} pips`} valueColor="text-green-500" />
      <Stat label="Total Loss" value={`${data.totals.loss} pips`} valueColor="text-red-500" />
      <Stat label="Net Profit" value={`${data.totals.net} pips`} valueColor="text-yellow-400" />
    </div>
  );

  return (
    <ChartCard title="Performa Mingguan" footer={footer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.days}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e5e7eb' }}
          />
          <Legend />
          <Bar dataKey="profit" fill="#22c55e" name="Profit (pips)" />
          <Bar dataKey="loss" fill="#ef4444" name="Loss (pips)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
