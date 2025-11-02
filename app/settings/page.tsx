'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Loader2,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Target,
  DollarSign,
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [positionSizingMethod, setPositionSizingMethod] = useState('risk_percent');
  const [positionSizingValue, setPositionSizingValue] = useState(0.01);
  const [maxRiskPerTrade, setMaxRiskPerTrade] = useState(1.0);
  const [maxDailyRisk, setMaxDailyRisk] = useState(5.0);
  const [tpAllocationStrategy, setTpAllocationStrategy] = useState('dynamic');
  const [tp1, setTp1] = useState(30);
  const [tp2, setTp2] = useState(30);
  const [tp3, setTp3] = useState(40);
  const [slMethod, setSlMethod] = useState('signal');
  const [slValue, setSlValue] = useState(0);
  const [maxOpenTrades, setMaxOpenTrades] = useState(5);

  useEffect(() => {
    if (user) {
      loadAccounts();
    }
  }, [user]);

  useEffect(() => {
    if (selectedAccountId) {
      loadSettings();
    }
  }, [selectedAccountId]);

  const loadAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true);

      if (error) throw error;

      setAccounts(data || []);
      if (data && data.length > 0) {
        setSelectedAccountId(data[0].id);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('risk_settings')
        .select('*')
        .eq('trading_account_id', selectedAccountId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data);
        setPositionSizingMethod(data.position_sizing_method);
        setPositionSizingValue(parseFloat(data.position_sizing_value));
        setMaxRiskPerTrade(parseFloat(data.max_risk_per_trade));
        setMaxDailyRisk(parseFloat(data.max_daily_risk));
        setTpAllocationStrategy(data.tp_allocation_strategy);
        setTp1(data.tp_allocations.tp1);
        setTp2(data.tp_allocations.tp2);
        setTp3(data.tp_allocations.tp3);
        setSlMethod(data.sl_method);
        setSlValue(parseFloat(data.sl_value || 0));
        setMaxOpenTrades(data.max_open_trades);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (tp1 + tp2 + tp3 !== 100) {
      setError('TP allocations must total 100%');
      setSaving(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('risk_settings')
        .upsert({
          id: settings?.id,
          user_id: user?.id,
          trading_account_id: selectedAccountId,
          position_sizing_method: positionSizingMethod,
          position_sizing_value: positionSizingValue,
          max_risk_per_trade: maxRiskPerTrade,
          max_daily_risk: maxDailyRisk,
          tp_allocation_strategy: tpAllocationStrategy,
          tp_allocations: { tp1, tp2, tp3 },
          sl_method: slMethod,
          sl_value: slValue,
          max_open_trades: maxOpenTrades,
          is_active: true,
        });

      if (error) throw error;

      setSuccess('Risk settings saved successfully!');
      await loadSettings();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
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

  if (accounts.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                No Trading Accounts Connected
              </h3>
              <p className="text-gray-400 mb-6">
                You need to connect a trading account before configuring risk settings
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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Risk Management</h1>
            <p className="text-gray-400">Configure your trading risk parameters</p>
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

          <Card className="bg-slate-900/50 border-slate-800 p-6 mb-6">
            <Label className="text-gray-300 mb-2 block">Select Trading Account</Label>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name} ({account.account_type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <form onSubmit={handleSave} className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-100">Position Sizing</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Method</Label>
                  <Select value={positionSizingMethod} onValueChange={setPositionSizingMethod}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="fixed_lot">Fixed Lot Size</SelectItem>
                      <SelectItem value="risk_percent">Risk Percentage</SelectItem>
                      <SelectItem value="balance_percent">Balance Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">
                    Value: {positionSizingValue}
                    {positionSizingMethod === 'fixed_lot'
                      ? ' lots'
                      : positionSizingMethod === 'risk_percent'
                      ? '% risk'
                      : '% of balance'}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={positionSizingValue}
                    onChange={(e) => setPositionSizingValue(parseFloat(e.target.value))}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-100">Risk Limits</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Max Risk Per Trade: {maxRiskPerTrade}%</Label>
                  <Slider
                    value={[maxRiskPerTrade]}
                    onValueChange={(value) => setMaxRiskPerTrade(value[0])}
                    max={10}
                    step={0.5}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Max Daily Risk: {maxDailyRisk}%</Label>
                  <Slider
                    value={[maxDailyRisk]}
                    onValueChange={(value) => setMaxDailyRisk(value[0])}
                    max={20}
                    step={1}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Max Open Trades: {maxOpenTrades}</Label>
                  <Slider
                    value={[maxOpenTrades]}
                    onValueChange={(value) => setMaxOpenTrades(value[0])}
                    min={1}
                    max={20}
                    step={1}
                    className="py-4"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-100">Take Profit Strategy</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Strategy</Label>
                  <Select value={tpAllocationStrategy} onValueChange={setTpAllocationStrategy}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="dynamic">Dynamic (30-30-40)</SelectItem>
                      <SelectItem value="fixed">Fixed (Equal Split)</SelectItem>
                      <SelectItem value="custom">Custom Allocation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tpAllocationStrategy === 'custom' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">TP1: {tp1}%</Label>
                      <Input
                        type="number"
                        value={tp1}
                        onChange={(e) => setTp1(parseInt(e.target.value))}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">TP2: {tp2}%</Label>
                      <Input
                        type="number"
                        value={tp2}
                        onChange={(e) => setTp2(parseInt(e.target.value))}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">TP3: {tp3}%</Label>
                      <Input
                        type="number"
                        value={tp3}
                        onChange={(e) => setTp3(parseInt(e.target.value))}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Total: {tp1 + tp2 + tp3}% {tp1 + tp2 + tp3 !== 100 && '(Must equal 100%)'}
                </p>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-100">Stop Loss Method</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Method</Label>
                  <Select value={slMethod} onValueChange={setSlMethod}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="signal">Use Signal SL</SelectItem>
                      <SelectItem value="atr">ATR Based</SelectItem>
                      <SelectItem value="fixed_pips">Fixed Pips</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {slMethod !== 'signal' && (
                  <div className="space-y-2">
                    <Label className="text-gray-300">
                      {slMethod === 'atr' ? 'ATR Multiplier' : 'Pips'}
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={slValue}
                      onChange={(e) => setSlValue(parseFloat(e.target.value))}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                )}
              </div>
            </Card>

            <Alert className="bg-yellow-500/10 border-yellow-500/30">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400 text-sm">
                These settings will apply to all new trades on the selected account. Test with small
                positions first.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Risk Settings'
              )}
            </Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
