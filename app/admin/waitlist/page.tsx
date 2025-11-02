'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Users,
  Mail,
  Calendar,
  TrendingUp,
  Download,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  telegram_username: string | null;
  interested_plan: 'starter' | 'pro' | 'vip';
  created_at: string;
  notified: boolean;
}

export default function AdminWaitlistPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    starter: 0,
    pro: 0,
    vip: 0,
    today: 0,
    thisWeek: 0
  });

  const ADMIN_PASSWORD = 'algoxpert2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Incorrect password!');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEntries(data || []);

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats = {
        total: data?.length || 0,
        starter: data?.filter(e => e.interested_plan === 'starter').length || 0,
        pro: data?.filter(e => e.interested_plan === 'pro').length || 0,
        vip: data?.filter(e => e.interested_plan === 'vip').length || 0,
        today: data?.filter(e => new Date(e.created_at) >= today).length || 0,
        thisWeek: data?.filter(e => new Date(e.created_at) >= weekAgo).length || 0
      };

      setStats(stats);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Email', 'Name', 'Telegram', 'Plan', 'Joined Date', 'Notified'];
    const rows = entries.map(e => [
      e.email,
      e.name || '',
      e.telegram_username || '',
      e.interested_plan,
      new Date(e.created_at).toLocaleDateString(),
      e.notified ? 'Yes' : 'No'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
        <Card className="w-full max-w-md bg-slate-900/50 border-slate-800 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-100 mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">Enter password to view waitlist</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="bg-slate-800 border-slate-700 text-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-purple-blue hover:opacity-90 text-white font-semibold"
            >
              Login
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Password: algoxpert2025
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Waitlist Dashboard</h1>
          <p className="text-gray-400">Manage and track your pre-launch signups</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-gray-100">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-400">Total Signups</p>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-gray-100">{stats.today}</span>
            </div>
            <p className="text-sm text-gray-400">Today</p>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-gray-100">{stats.thisWeek}</span>
            </div>
            <p className="text-sm text-gray-400">This Week</p>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-gray-100">
                {stats.starter + stats.pro + stats.vip}
              </span>
            </div>
            <p className="text-sm text-gray-400">With Plan Interest</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{stats.starter}</div>
              <div className="text-sm text-gray-400">Starter Plan</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.total > 0 ? Math.round((stats.starter / stats.total) * 100) : 0}%
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{stats.pro}</div>
              <div className="text-sm text-gray-400">Pro Plan</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.total > 0 ? Math.round((stats.pro / stats.total) * 100) : 0}%
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.vip}</div>
              <div className="text-sm text-gray-400">VIP Plan</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.total > 0 ? Math.round((stats.vip / stats.total) * 100) : 0}%
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-100">All Entries</h2>
            <div className="flex gap-3">
              <Button
                onClick={loadData}
                variant="outline"
                className="border-slate-700 text-gray-300 hover:bg-slate-800"
              >
                Refresh
              </Button>
              <Button
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Telegram
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Notified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      No entries yet
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">{entry.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {entry.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {entry.telegram_username || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.interested_plan === 'starter'
                              ? 'bg-blue-500/10 text-blue-400'
                              : entry.interested_plan === 'pro'
                              ? 'bg-purple-500/10 text-purple-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}
                        >
                          {entry.interested_plan.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {entry.notified ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600" />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-slate-700 text-gray-400 hover:bg-slate-800"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
