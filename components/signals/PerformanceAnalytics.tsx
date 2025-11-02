'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, BarChart3, Award, Target } from 'lucide-react';

interface PerformanceData {
  totalSignals: number;
  winRate: number;
  avgPips: number;
  bestPair: string;
  worstPair: string;
  monthlyData: any[];
  pairPerformance: any[];
  providerPerformance: any[];
}

export function PerformanceAnalytics() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformanceData();
  }, []);

  const loadPerformanceData = async () => {
    try {
      const { data: signals, error } = await supabase
        .from('trading_signals')
        .select('*')
        .in('status', ['WIN', 'LOSS']);

      if (error) throw error;

      const monthlyMap = new Map();
      const pairMap = new Map();
      const providerMap = new Map();

      signals.forEach((signal: any) => {
        const month = new Date(signal.signal_time).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });

        if (!monthlyMap.has(month)) {
          monthlyMap.set(month, { wins: 0, losses: 0, pips: 0 });
        }
        const monthData = monthlyMap.get(month);
        if (signal.status === 'WIN') {
          monthData.wins++;
          monthData.pips += signal.result_pips || 0;
        } else {
          monthData.losses++;
          monthData.pips += signal.result_pips || 0;
        }

        if (!pairMap.has(signal.pair)) {
          pairMap.set(signal.pair, { wins: 0, losses: 0, total: 0, pips: 0 });
        }
        const pairData = pairMap.get(signal.pair);
        pairData.total++;
        if (signal.status === 'WIN') {
          pairData.wins++;
        } else {
          pairData.losses++;
        }
        pairData.pips += signal.result_pips || 0;

        if (!providerMap.has(signal.signal_provider)) {
          providerMap.set(signal.signal_provider, { wins: 0, losses: 0, total: 0 });
        }
        const providerData = providerMap.get(signal.signal_provider);
        providerData.total++;
        if (signal.status === 'WIN') {
          providerData.wins++;
        } else {
          providerData.losses++;
        }
      });

      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]: any) => ({
          month,
          wins: data.wins,
          losses: data.losses,
          pips: data.pips,
          winRate: ((data.wins / (data.wins + data.losses)) * 100).toFixed(1),
        }))
        .reverse()
        .slice(0, 6);

      const pairPerformance = Array.from(pairMap.entries())
        .map(([pair, data]: any) => ({
          pair,
          winRate: ((data.wins / data.total) * 100).toFixed(1),
          total: data.total,
          pips: data.pips,
        }))
        .sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

      const providerPerformance = Array.from(providerMap.entries())
        .map(([provider, data]: any) => ({
          provider,
          winRate: ((data.wins / data.total) * 100).toFixed(1),
          wins: data.wins,
          losses: data.losses,
          total: data.total,
        }))
        .sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

      const totalWins = signals.filter((s: any) => s.status === 'WIN').length;
      const totalLosses = signals.filter((s: any) => s.status === 'LOSS').length;
      const winRate = ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1);
      const avgPips =
        signals.reduce((sum: number, s: any) => sum + (s.result_pips || 0), 0) /
        signals.length;

      setData({
        totalSignals: signals.length,
        winRate: parseFloat(winRate),
        avgPips: avgPips,
        bestPair: pairPerformance[0]?.pair || 'N/A',
        worstPair: pairPerformance[pairPerformance.length - 1]?.pair || 'N/A',
        monthlyData,
        pairPerformance,
        providerPerformance,
      });
    } catch (error) {
      console.error('Error loading performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800 p-8 text-center">
        <div className="text-gray-400">Loading performance analytics...</div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-slate-900/50 border-slate-800 p-8 text-center">
        <div className="text-gray-400">No performance data available</div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-purple-400/10 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-100">Performance Analytics</h3>
          <p className="text-sm text-gray-400">Track signal performance and trends</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Win Rate</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{data.winRate}%</div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Avg Pips</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {data.avgPips >= 0 ? '+' : ''}
            {data.avgPips.toFixed(1)}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Best Pair</span>
          </div>
          <div className="text-lg font-bold text-yellow-400">{data.bestPair}</div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Total Signals</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{data.totalSignals}</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h4 className="text-lg font-semibold text-gray-100 mb-4">Monthly Performance</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
              <Legend />
              <Bar dataKey="wins" fill="#10b981" name="Wins" />
              <Bar dataKey="losses" fill="#ef4444" name="Losses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h4 className="text-lg font-semibold text-gray-100 mb-4">Cumulative Pips</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
              <Line
                type="monotone"
                dataKey="pips"
                stroke="#22d3ee"
                strokeWidth={2}
                name="Total Pips"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h4 className="text-lg font-semibold text-gray-100 mb-4">Top Performing Pairs</h4>
          <div className="space-y-3">
            {data.pairPerformance.slice(0, 5).map((pair, index) => (
              <div
                key={pair.pair}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-100">{pair.pair}</div>
                    <div className="text-xs text-gray-500">{pair.total} signals</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={`${
                      parseFloat(pair.winRate) >= 70
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : parseFloat(pair.winRate) >= 50
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}
                  >
                    {pair.winRate}% WR
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">
                    {pair.pips >= 0 ? '+' : ''}
                    {pair.pips} pips
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h4 className="text-lg font-semibold text-gray-100 mb-4">Provider Performance</h4>
          <div className="space-y-3">
            {data.providerPerformance.map((provider, index) => (
              <div
                key={provider.provider}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-100">{provider.provider}</div>
                    <div className="text-xs text-gray-500">
                      {provider.wins}W / {provider.losses}L
                    </div>
                  </div>
                </div>
                <Badge
                  className={`${
                    parseFloat(provider.winRate) >= 70
                      ? 'bg-green-500/10 text-green-400 border-green-500/30'
                      : parseFloat(provider.winRate) >= 50
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {provider.winRate}% WR
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
