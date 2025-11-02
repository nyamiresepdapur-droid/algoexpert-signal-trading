'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/lib/toast-helpers';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Save,
  X,
  RefreshCw,
  Filter,
} from 'lucide-react';

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

export default function AdminSignalsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalProviders, setSignalProviders] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);
  const [formData, setFormData] = useState({
    signal_provider: '',
    pair: '',
    direction: 'BUY' as 'BUY' | 'SELL',
    entry_price: '',
    stop_loss: '',
    take_profit_1: '',
    take_profit_2: '',
    take_profit_3: '',
    notes: '',
  });

  useEffect(() => {
    checkAdminAndLoad();
  }, [user]);

  const checkAdminAndLoad = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
        toast.error('Access Denied', 'You do not have admin privileges');
        router.push('/dashboard');
        return;
      }

      setIsAdmin(true);
      await Promise.all([loadSignals(), loadSignalProviders()]);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Error', error.message);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadSignals = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_signals')
        .select('*')
        .order('signal_time', { ascending: false })
        .limit(100);

      if (error) throw error;
      setSignals(data || []);
    } catch (error: any) {
      toast.error('Failed to load signals', error.message);
    }
  };

  const loadSignalProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('signal_providers')
        .select('*')
        .where('is_active', true)
        .order('name');

      if (error) throw error;
      setSignalProviders(data || []);
    } catch (error: any) {
      console.error('Error loading providers:', error);
    }
  };

  const handleCreate = () => {
    setEditingSignal(null);
    setFormData({
      signal_provider: '',
      pair: '',
      direction: 'BUY',
      entry_price: '',
      stop_loss: '',
      take_profit_1: '',
      take_profit_2: '',
      take_profit_3: '',
      notes: '',
    });
    setShowDialog(true);
  };

  const handleEdit = (signal: Signal) => {
    setEditingSignal(signal);
    setFormData({
      signal_provider: signal.signal_provider,
      pair: signal.pair,
      direction: signal.direction,
      entry_price: signal.entry_price.toString(),
      stop_loss: signal.stop_loss.toString(),
      take_profit_1: signal.take_profit_1.toString(),
      take_profit_2: signal.take_profit_2?.toString() || '',
      take_profit_3: signal.take_profit_3?.toString() || '',
      notes: signal.notes || '',
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signal?')) return;

    try {
      const { error } = await supabase
        .from('trading_signals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Signal deleted');
      loadSignals();
    } catch (error: any) {
      toast.error('Failed to delete signal', error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const signalData = {
        signal_provider: formData.signal_provider,
        pair: formData.pair.toUpperCase(),
        direction: formData.direction,
        entry_price: parseFloat(formData.entry_price),
        stop_loss: parseFloat(formData.stop_loss),
        take_profit_1: parseFloat(formData.take_profit_1),
        take_profit_2: formData.take_profit_2 ? parseFloat(formData.take_profit_2) : null,
        take_profit_3: formData.take_profit_3 ? parseFloat(formData.take_profit_3) : null,
        notes: formData.notes || null,
        status: 'PENDING',
        signal_time: new Date().toISOString(),
        source_type: 'admin',
        admin_user_id: user?.id,
      };

      if (editingSignal) {
        const { error } = await supabase
          .from('trading_signals')
          .update(signalData)
          .eq('id', editingSignal.id);

        if (error) throw error;
        toast.success('Signal updated');
      } else {
        const { error } = await supabase
          .from('trading_signals')
          .insert([signalData]);

        if (error) throw error;
        toast.success('Signal created');
      }

      setShowDialog(false);
      loadSignals();
    } catch (error: any) {
      toast.error('Failed to save signal', error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      ACTIVE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      WIN: 'bg-green-500/10 text-green-400 border-green-500/30',
      LOSS: 'bg-red-500/10 text-red-400 border-red-500/30',
      CANCELLED: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    };
    return colors[status] || colors.PENDING;
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/dashboard')}
              className="text-gray-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Manage Signals</h1>
              <p className="text-gray-400">Create and manage trading signals</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={loadSignals}
              variant="outline"
              className="border-slate-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Push Signal
            </Button>
          </div>
        </div>

        {/* Signals List */}
        <Card className="bg-slate-900/50 border-slate-800">
          <div className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800">
                    <TableHead className="text-gray-400">Time</TableHead>
                    <TableHead className="text-gray-400">Provider</TableHead>
                    <TableHead className="text-gray-400">Pair</TableHead>
                    <TableHead className="text-gray-400">Direction</TableHead>
                    <TableHead className="text-gray-400">Entry</TableHead>
                    <TableHead className="text-gray-400">SL</TableHead>
                    <TableHead className="text-gray-400">TP1</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signals.map((signal) => (
                    <TableRow key={signal.id} className="border-slate-800">
                      <TableCell className="text-gray-300 text-sm">
                        {new Date(signal.signal_time).toLocaleString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell className="text-gray-300 text-sm">
                        {signal.signal_provider}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-200">
                        {signal.pair}
                      </TableCell>
                      <TableCell>
                        {signal.direction === 'BUY' ? (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            BUY
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-400 border-red-500/30">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            SELL
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">{signal.entry_price}</TableCell>
                      <TableCell className="text-red-400">{signal.stop_loss}</TableCell>
                      <TableCell className="text-green-400">{signal.take_profit_1}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(signal.status)}>
                          {signal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(signal)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(signal.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {signals.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No signals yet. Click "Push Signal" to create one.
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-100">
                {editingSignal ? 'Edit Signal' : 'Push New Signal'}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingSignal
                  ? 'Update signal details'
                  : 'Create a new trading signal for all users'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signal_provider" className="text-gray-300">
                    Signal Provider *
                  </Label>
                  <Select
                    value={formData.signal_provider}
                    onValueChange={(value) =>
                      setFormData({ ...formData, signal_provider: value })
                    }
                    required
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-gray-100">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {signalProviders.map((provider) => (
                        <SelectItem
                          key={provider.id}
                          value={provider.name}
                          className="text-gray-100"
                        >
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="pair" className="text-gray-300">
                    Trading Pair *
                  </Label>
                  <Input
                    id="pair"
                    value={formData.pair}
                    onChange={(e) =>
                      setFormData({ ...formData, pair: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. XAUUSD, BTCUSDT"
                    required
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="direction" className="text-gray-300">
                  Direction *
                </Label>
                <Select
                  value={formData.direction}
                  onValueChange={(value: 'BUY' | 'SELL') =>
                    setFormData({ ...formData, direction: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="BUY" className="text-gray-100">
                      BUY
                    </SelectItem>
                    <SelectItem value="SELL" className="text-gray-100">
                      SELL
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entry_price" className="text-gray-300">
                    Entry Price *
                  </Label>
                  <Input
                    id="entry_price"
                    type="number"
                    step="any"
                    value={formData.entry_price}
                    onChange={(e) =>
                      setFormData({ ...formData, entry_price: e.target.value })
                    }
                    required
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="stop_loss" className="text-gray-300">
                    Stop Loss *
                  </Label>
                  <Input
                    id="stop_loss"
                    type="number"
                    step="any"
                    value={formData.stop_loss}
                    onChange={(e) =>
                      setFormData({ ...formData, stop_loss: e.target.value })
                    }
                    required
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="take_profit_1" className="text-gray-300">
                    Take Profit 1 *
                  </Label>
                  <Input
                    id="take_profit_1"
                    type="number"
                    step="any"
                    value={formData.take_profit_1}
                    onChange={(e) =>
                      setFormData({ ...formData, take_profit_1: e.target.value })
                    }
                    required
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="take_profit_2" className="text-gray-300">
                    Take Profit 2
                  </Label>
                  <Input
                    id="take_profit_2"
                    type="number"
                    step="any"
                    value={formData.take_profit_2}
                    onChange={(e) =>
                      setFormData({ ...formData, take_profit_2: e.target.value })
                    }
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="take_profit_3" className="text-gray-300">
                    Take Profit 3
                  </Label>
                  <Input
                    id="take_profit_3"
                    type="number"
                    step="any"
                    value={formData.take_profit_3}
                    onChange={(e) =>
                      setFormData({ ...formData, take_profit_3: e.target.value })
                    }
                    className="bg-slate-800 border-slate-700 text-gray-100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-gray-300">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or instructions..."
                  rows={3}
                  className="bg-slate-800 border-slate-700 text-gray-100"
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="border-slate-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {editingSignal ? 'Update' : 'Create'} Signal
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

