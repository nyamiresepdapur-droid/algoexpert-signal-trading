'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/lib/toast-helpers';
import {
  ArrowLeft,
  Save,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Info,
  Settings,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface Signal {
  id: string;
  signal_provider: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry_price: number;
  stop_loss: number;
  take_profit_1: number;
  take_profit_2?: number;
  take_profit_3?: number;
  status: string;
  signal_time: string;
  notes?: string;
}

interface SignalSettings {
  id?: string;
  is_enabled: boolean;
  custom_take_profit_1?: number;
  custom_take_profit_2?: number;
  custom_take_profit_3?: number;
  custom_stop_loss?: number;
  custom_risk_reward?: number;
  use_ai_trailing: boolean;
  trailing_type?: 'fixed_pips' | 'percentage' | 'atr_based';
  trailing_distance?: number;
  trailing_step?: number;
}

export default function SignalSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const signalId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [signal, setSignal] = useState<Signal | null>(null);
  const [settings, setSettings] = useState<SignalSettings>({
    is_enabled: true,
    use_ai_trailing: false,
  });
  const [hasCustomSettings, setHasCustomSettings] = useState(false);

  useEffect(() => {
    if (user && signalId) {
      loadData();
    }
  }, [user, signalId]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load signal
      const { data: signalData, error: signalError } = await supabase
        .from('trading_signals')
        .select('*')
        .eq('id', signalId)
        .single();

      if (signalError) throw signalError;
      if (!signalData) throw new Error('Signal not found');

      setSignal(signalData);

      // Load existing settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('user_signal_settings')
        .select('*')
        .eq('user_id', user?.id)
        .eq('signal_id', signalId)
        .maybeSingle();

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }

      if (settingsData) {
        setSettings({
          is_enabled: settingsData.is_enabled ?? true,
          custom_take_profit_1: settingsData.custom_take_profit_1
            ? parseFloat(settingsData.custom_take_profit_1.toString())
            : undefined,
          custom_take_profit_2: settingsData.custom_take_profit_2
            ? parseFloat(settingsData.custom_take_profit_2.toString())
            : undefined,
          custom_take_profit_3: settingsData.custom_take_profit_3
            ? parseFloat(settingsData.custom_take_profit_3.toString())
            : undefined,
          custom_stop_loss: settingsData.custom_stop_loss
            ? parseFloat(settingsData.custom_stop_loss.toString())
            : undefined,
          custom_risk_reward: settingsData.custom_risk_reward
            ? parseFloat(settingsData.custom_risk_reward.toString())
            : undefined,
          use_ai_trailing: settingsData.use_ai_trailing ?? false,
          trailing_type: settingsData.trailing_type || undefined,
          trailing_distance: settingsData.trailing_distance
            ? parseFloat(settingsData.trailing_distance.toString())
            : undefined,
          trailing_step: settingsData.trailing_step
            ? parseFloat(settingsData.trailing_step.toString())
            : undefined,
        });
        setHasCustomSettings(true);
        if (settingsData.id) {
          setSettings((prev) => ({ ...prev, id: settingsData.id }));
        }
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Error', error.message || 'Failed to load signal');
      router.push('/signals');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !signal) return;

    try {
      setSaving(true);

      const settingsData = {
        user_id: user.id,
        signal_id: signalId,
        is_enabled: settings.is_enabled,
        custom_take_profit_1: settings.custom_take_profit_1 || null,
        custom_take_profit_2: settings.custom_take_profit_2 || null,
        custom_take_profit_3: settings.custom_take_profit_3 || null,
        custom_stop_loss: settings.custom_stop_loss || null,
        custom_risk_reward: settings.custom_risk_reward || null,
        use_ai_trailing: settings.use_ai_trailing,
        trailing_type: settings.trailing_type || null,
        trailing_distance: settings.trailing_distance || null,
        trailing_step: settings.trailing_step || null,
      };

      if (hasCustomSettings && settings.id) {
        // Update existing
        const { error } = await supabase
          .from('user_signal_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
        toast.success('Settings updated successfully');
      } else {
        // Insert new
        const { error } = await supabase
          .from('user_signal_settings')
          .insert([settingsData]);

        if (error) throw error;
        toast.success('Settings saved successfully');
        setHasCustomSettings(true);
      }
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast.error('Error', error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const calculateRiskReward = () => {
    if (!signal) return null;

    const entry = settings.custom_stop_loss
      ? signal.entry_price
      : signal.entry_price;
    const sl = settings.custom_stop_loss || signal.stop_loss;
    const tp1 = settings.custom_take_profit_1 || signal.take_profit_1;

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp1 - entry);

    if (risk === 0) return null;
    return (reward / risk).toFixed(2);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-gray-400">Loading...</div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!signal) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-red-400">Signal not found</div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const rr = calculateRiskReward();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/signals')}
              className="text-gray-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">
                Customize Signal Settings
              </h1>
              <p className="text-gray-400">
                {signal.pair} • {signal.signal_provider}
              </p>
            </div>
          </div>

          {/* Signal Overview */}
          <Card className="bg-slate-900/50 border-slate-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    signal.direction === 'BUY'
                      ? 'bg-green-500/10'
                      : 'bg-red-500/10'
                  }`}
                >
                  {signal.direction === 'BUY' ? (
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-100">
                    {signal.direction} {signal.pair}
                  </div>
                  <div className="text-sm text-gray-400">
                    Entry: {signal.entry_price.toLocaleString()}
                  </div>
                </div>
              </div>
              <Badge
                className={
                  signal.status === 'ACTIVE'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                }
              >
                {signal.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                <div className="text-lg font-bold text-red-400">
                  {signal.stop_loss.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">TP1</div>
                <div className="text-lg font-bold text-green-400">
                  {signal.take_profit_1.toLocaleString()}
                </div>
              </div>
              {signal.take_profit_2 && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">TP2</div>
                  <div className="text-lg font-bold text-green-400">
                    {signal.take_profit_2.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Settings Form */}
          <Card className="bg-slate-900/50 border-slate-800 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-100">Custom Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Enable/Disable */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-100">Enable Signal</div>
                  <div className="text-sm text-gray-400">
                    Use custom settings for this signal
                  </div>
                </div>
                <Switch
                  checked={settings.is_enabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, is_enabled: checked })
                  }
                />
              </div>

              {/* Custom Take Profits */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-gray-400" />
                  <Label className="text-gray-300 font-semibold">
                    Custom Take Profit Levels
                  </Label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">TP1</Label>
                    <Input
                      type="number"
                      step="any"
                      value={settings.custom_take_profit_1 || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          custom_take_profit_1: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder={signal.take_profit_1.toString()}
                      className="bg-slate-800 border-slate-700 text-gray-100"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Default: {signal.take_profit_1}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">TP2</Label>
                    <Input
                      type="number"
                      step="any"
                      value={settings.custom_take_profit_2 || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          custom_take_profit_2: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder={signal.take_profit_2?.toString() || 'N/A'}
                      className="bg-slate-800 border-slate-700 text-gray-100"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Default: {signal.take_profit_2 || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">TP3</Label>
                    <Input
                      type="number"
                      step="any"
                      value={settings.custom_take_profit_3 || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          custom_take_profit_3: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder={signal.take_profit_3?.toString() || 'N/A'}
                      className="bg-slate-800 border-slate-700 text-gray-100"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Default: {signal.take_profit_3 || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Stop Loss */}
              <div>
                <Label className="text-gray-300 font-semibold mb-2 block">
                  Custom Stop Loss
                </Label>
                <Input
                  type="number"
                  step="any"
                  value={settings.custom_stop_loss || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      custom_stop_loss: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder={signal.stop_loss.toString()}
                  className="bg-slate-800 border-slate-700 text-gray-100"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Default: {signal.stop_loss}
                </div>
              </div>

              {/* Risk Reward Display */}
              {rr && (
                <Alert className="bg-blue-500/10 border-blue-500/30">
                  <Info className="w-4 h-4 text-blue-400" />
                  <AlertDescription className="text-blue-300">
                    Current Risk:Reward Ratio: <strong>1:{rr}</strong>
                  </AlertDescription>
                </Alert>
              )}

              {/* AI Trailing */}
              <div className="border-t border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="text-gray-300 font-semibold">AI Trailing Stop</Label>
                    <div className="text-sm text-gray-400">
                      Enable dynamic trailing stop loss
                    </div>
                  </div>
                  <Switch
                    checked={settings.use_ai_trailing}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, use_ai_trailing: checked })
                    }
                  />
                </div>

                {settings.use_ai_trailing && (
                  <div className="space-y-4 bg-slate-800/50 p-4 rounded-lg">
                    <div>
                      <Label className="text-gray-400 text-sm">Trailing Type</Label>
                      <Select
                        value={settings.trailing_type || 'fixed_pips'}
                        onValueChange={(value: 'fixed_pips' | 'percentage' | 'atr_based') =>
                          setSettings({ ...settings, trailing_type: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="fixed_pips">Fixed Pips</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="atr_based">ATR Based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400 text-sm">Trailing Distance</Label>
                        <Input
                          type="number"
                          step="any"
                          value={settings.trailing_distance || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              trailing_distance: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                            })
                          }
                          placeholder="e.g. 20 pips or 2%"
                          className="bg-slate-700 border-slate-600 text-gray-100"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Trailing Step</Label>
                        <Input
                          type="number"
                          step="any"
                          value={settings.trailing_step || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              trailing_step: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                            })
                          }
                          placeholder="e.g. 5 pips"
                          className="bg-slate-700 border-slate-600 text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/signals')}
              className="border-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

