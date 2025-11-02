'use client';

import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Activity,
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  User,
  Settings,
  Crown,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockSignals = [
  {
    pair: 'EURUSD',
    direction: 'BUY',
    entry: '1.0850',
    tp: '1.0900',
    sl: '1.0820',
    source: 'Provider A',
    time: '10:35',
  },
  {
    pair: 'XAUUSD',
    direction: 'SELL',
    entry: '2045.50',
    tp: '2035.00',
    sl: '2055.00',
    source: 'Provider B',
    time: '10:28',
  },
  {
    pair: 'GBPUSD',
    direction: 'BUY',
    entry: '1.2650',
    tp: '1.2700',
    sl: '1.2620',
    source: 'Provider C',
    time: '10:15',
  },
  {
    pair: 'USDJPY',
    direction: 'SELL',
    entry: '149.80',
    tp: '149.30',
    sl: '150.20',
    source: 'Provider A',
    time: '09:45',
  },
];

const mockChartData = [
  { day: 'Sen', profit: 145 },
  { day: 'Sel', profit: 89 },
  { day: 'Rab', profit: 167 },
  { day: 'Kam', profit: 52 },
  { day: 'Jum', profit: 125 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-slate-950">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
              <span className="font-bold text-slate-900">IX</span>
            </div>
            <span className="font-bold text-gray-100">IndoTraderXpert</span>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-yellow-400/10 text-yellow-400">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/signals" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <Activity className="w-5 h-5" />
              <span>Signals & Trades</span>
            </Link>
            <Link href="/providers" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <TrendingUp className="w-5 h-5" />
              <span>Providers</span>
            </Link>
            <Link href="/subscription" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <Crown className="w-5 h-5" />
              <span>Subscription</span>
            </Link>
            <Link href="/accounts" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <Wallet className="w-5 h-5" />
              <span>Accounts</span>
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <Settings className="w-5 h-5" />
              <span>Risk Settings</span>
            </Link>
            <Link href="/profile" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-800">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard Demo</h1>
              <p className="text-gray-400">Preview read-only untuk menampilkan UI platform</p>
            </div>

            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <strong className="text-yellow-400">Mode Demo:</strong> Ini adalah preview UI saja.
                Untuk menggunakan platform secara penuh, silakan daftar dan pilih paket yang sesuai.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Total Profit</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-500">+578 pips</div>
                <div className="text-xs text-gray-500 mt-1">Minggu ini</div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Win Rate</span>
                  <Activity className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400">87%</div>
                <div className="text-xs text-gray-500 mt-1">25 trades</div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Active Signals</span>
                  <TrendingDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-100">12</div>
                <div className="text-xs text-gray-500 mt-1">Provider aktif</div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-6">Sinyal Live</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">Pair</th>
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">Arah</th>
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">Entry</th>
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">TP</th>
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">SL</th>
                        <th className="text-left py-3 px-2 text-sm text-gray-400 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockSignals.map((signal, idx) => (
                        <tr key={idx} className="border-b border-slate-800/50">
                          <td className="py-3 px-2">
                            <div className="font-medium text-gray-200">{signal.pair}</div>
                            <div className="text-xs text-gray-500">{signal.time}</div>
                          </td>
                          <td className="py-3 px-2">
                            <Badge
                              className={
                                signal.direction === 'BUY'
                                  ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                              }
                            >
                              {signal.direction}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-300">{signal.entry}</td>
                          <td className="py-3 px-2 text-sm text-green-500">{signal.tp}</td>
                          <td className="py-3 px-2 text-sm text-red-500">{signal.sl}</td>
                          <td className="py-3 px-2">
                            <Button size="sm" disabled className="bg-slate-800 text-gray-500 cursor-not-allowed">
                              Trade
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * Tombol trade disabled di mode demo
                </p>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-6">Performa Mingguan</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="profit" fill="#22c55e" name="Profit (pips)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Status Akun</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-200 mb-1">MetaAPI Connection</div>
                    <div className="text-sm text-gray-500">Hubungkan akun MT5 untuk auto-trade</div>
                  </div>
                  <Badge className="bg-red-500/10 text-red-500">Belum Terhubung</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-200 mb-1">Subscription Plan</div>
                    <div className="text-sm text-gray-500">Upgrade untuk fitur lengkap</div>
                  </div>
                  <Badge className="bg-yellow-400/10 text-yellow-400">Demo Mode</Badge>
                </div>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold" disabled>
                  Hubungkan MetaAPI (Demo)
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
