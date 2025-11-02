'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Activity,
  Zap,
} from 'lucide-react';

export default function ProvidersPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [tradingAccounts, setTradingAccounts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [providersData, subscriptionsData, accountsData] = await Promise.all([
        supabase
          .from('signal_providers')
          .select('*')
          .eq('is_active', true)
          .order('name'),
        supabase
          .from('user_signal_subscriptions')
          .select('*')
          .eq('user_id', user?.id),
        supabase
          .from('trading_accounts')
          .select('*')
          .eq('user_id', user?.id)
          .eq('is_active', true)
          .eq('is_verified', true),
      ]);

      setProviders(providersData.data || []);
      setSubscriptions(subscriptionsData.data || []);
      setTradingAccounts(accountsData.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSubscription = (providerId: string) => {
    return subscriptions.find((sub) => sub.provider_id === providerId);
  };

  const handleSubscribe = async (providerId: string, accountId: string) => {
    if (!accountId) {
      setError('Please select a trading account');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.from('user_signal_subscriptions').insert({
        user_id: user?.id,
        provider_id: providerId,
        trading_account_id: accountId,
        is_active: true,
        auto_execute: true,
      });

      if (error) throw error;

      setSuccess('Successfully subscribed to provider!');
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribe = async (subscriptionId: string) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('user_signal_subscriptions')
        .delete()
        .eq('id', subscriptionId);

      if (error) throw error;

      setSuccess('Successfully unsubscribed!');
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (subscriptionId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_signal_subscriptions')
        .update({ is_active: !currentStatus })
        .eq('id', subscriptionId);

      if (error) throw error;
      await loadData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleToggleAutoExecute = async (subscriptionId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_signal_subscriptions')
        .update({ auto_execute: !currentStatus })
        .eq('id', subscriptionId);

      if (error) throw error;
      await loadData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
        </div>
      </ProtectedRoute>
    );
  }

  if (tradingAccounts.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                No Verified Trading Accounts
              </h3>
              <p className="text-gray-400 mb-6">
                You need a verified trading account to subscribe to signal providers
              </p>
              <Button
                onClick={() => (window.location.href = '/accounts')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
              >
                Connect Trading Account
              </Button>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Signal Providers</h1>
            <p className="text-gray-400">Subscribe to signal providers for automated trading</p>
          </div>

          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => {
              const subscription = getSubscription(provider.id);
              const [selectedAccount, setSelectedAccount] = useState(
                subscription?.trading_account_id || ''
              );

              return (
                <Card
                  key={provider.id}
                  className={`bg-slate-900/50 p-6 ${
                    subscription
                      ? 'border-2 border-yellow-400'
                      : 'border border-slate-800'
                  }`}
                >
                  {subscription && (
                    <div className="mb-4">
                      <Badge className="bg-yellow-400 text-slate-900 font-semibold">
                        Subscribed
                      </Badge>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-100 mb-1">{provider.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{provider.telegram_channel}</p>
                    <Badge className="bg-blue-500/10 text-blue-400 capitalize">
                      {provider.asset_class}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-300 mb-4">{provider.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Win Rate</p>
                      <p className="text-lg font-bold text-green-400">
                        {provider.performance_stats?.winrate || 0}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Signals</p>
                      <p className="text-lg font-bold text-gray-100">
                        {provider.performance_stats?.total_trades || 0}
                      </p>
                    </div>
                  </div>

                  {subscription ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-sm text-gray-300">Active</span>
                        <Switch
                          checked={subscription.is_active}
                          onCheckedChange={() =>
                            handleToggleActive(subscription.id, subscription.is_active)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-sm text-gray-300">
                          <Zap className="w-4 h-4 inline mr-1" />
                          Auto-Execute
                        </span>
                        <Switch
                          checked={subscription.auto_execute}
                          onCheckedChange={() =>
                            handleToggleAutoExecute(subscription.id, subscription.auto_execute)
                          }
                        />
                      </div>

                      <Button
                        onClick={() => handleUnsubscribe(subscription.id)}
                        disabled={saving}
                        variant="outline"
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue placeholder="Select trading account" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {tradingAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.account_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() => handleSubscribe(provider.id, selectedAccount)}
                        disabled={saving || !selectedAccount}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 bg-blue-500/5 border-blue-500/20 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              How It Works
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                  <span className="text-yellow-400 font-semibold">1</span>
                </div>
                <div>
                  <strong>Subscribe:</strong> Choose a provider and select your trading account
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                  <span className="text-yellow-400 font-semibold">2</span>
                </div>
                <div>
                  <strong>Auto-Execute:</strong> Trades are automatically executed when signals arrive
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                  <span className="text-yellow-400 font-semibold">3</span>
                </div>
                <div>
                  <strong>Risk Management:</strong> Your configured risk settings are applied to every trade
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                  <span className="text-yellow-400 font-semibold">4</span>
                </div>
                <div>
                  <strong>Monitor:</strong> Track all trades and performance in real-time
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
