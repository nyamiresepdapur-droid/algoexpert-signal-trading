'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Eye,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  status: 'PENDING' | 'ACTIVE' | 'WIN' | 'LOSS' | 'CANCELLED';
  result_pips?: number;
  result_profit_percent?: number;
  signal_time: string;
  closed_time?: string;
  notes?: string;
}

export function SignalDashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [pairFilter, setPairFilter] = useState<string>('');
  const [providerFilter, setProviderFilter] = useState<string>('ALL');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  useEffect(() => {
    loadSignals();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('trading_signals_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'trading_signals',
        },
        (payload: any) => {
          console.log('Signal change received:', payload);
          // Reload signals on any change
          loadSignals();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterSignals();
  }, [signals, statusFilter, pairFilter, providerFilter]);

  const loadSignals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trading_signals')
        .select('*')
        .order('signal_time', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSignals(data || []);
    } catch (error) {
      console.error('Error loading signals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSignals = () => {
    let filtered = [...signals];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    if (providerFilter !== 'ALL') {
      filtered = filtered.filter((s) => s.signal_provider === providerFilter);
    }

    if (pairFilter) {
      filtered = filtered.filter((s) =>
        s.pair.toLowerCase().includes(pairFilter.toLowerCase())
      );
    }

    setFilteredSignals(filtered);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      WIN: 'bg-green-500/10 text-green-400 border-green-500/30',
      LOSS: 'bg-red-500/10 text-red-400 border-red-500/30',
      PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      CANCELLED: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    };

    const icons = {
      ACTIVE: <Clock className="w-3 h-3" />,
      WIN: <CheckCircle className="w-3 h-3" />,
      LOSS: <XCircle className="w-3 h-3" />,
      PENDING: <AlertCircle className="w-3 h-3" />,
      CANCELLED: <XCircle className="w-3 h-3" />,
    };

    return (
      <Badge className={`${styles[status as keyof typeof styles]} flex items-center gap-1`}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  const getDirectionIcon = (direction: string) => {
    return direction === 'BUY' ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    });
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const uniqueProviders = Array.from(new Set(signals.map((s) => s.signal_provider)));

  const stats = {
    total: signals.length,
    active: signals.filter((s) => s.status === 'ACTIVE').length,
    wins: signals.filter((s) => s.status === 'WIN').length,
    losses: signals.filter((s) => s.status === 'LOSS').length,
    winRate:
      signals.filter((s) => s.status === 'WIN' || s.status === 'LOSS').length > 0
        ? (
            (signals.filter((s) => s.status === 'WIN').length /
              signals.filter((s) => s.status === 'WIN' || s.status === 'LOSS').length) *
            100
          ).toFixed(1)
        : '0.0',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Total Signals</div>
          <div className="text-2xl font-bold text-gray-100">{stats.total}</div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Active</div>
          <div className="text-2xl font-bold text-blue-400">{stats.active}</div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Wins</div>
          <div className="text-2xl font-bold text-green-400">{stats.wins}</div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Losses</div>
          <div className="text-2xl font-bold text-red-400">{stats.losses}</div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-yellow-400">{stats.winRate}%</div>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by pair (e.g., XAUUSD, BTCUSDT)"
              value={pairFilter}
              onChange={(e) => setPairFilter(e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="WIN">Win</SelectItem>
              <SelectItem value="LOSS">Loss</SelectItem>
            </SelectContent>
          </Select>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Filter by provider" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="ALL">All Providers</SelectItem>
              {uniqueProviders.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={loadSignals}
            variant="outline"
            size="icon"
            className="border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800/50">
                <TableHead className="text-gray-400">Time</TableHead>
                <TableHead className="text-gray-400">Provider</TableHead>
                <TableHead className="text-gray-400">Pair</TableHead>
                <TableHead className="text-gray-400">Direction</TableHead>
                <TableHead className="text-gray-400">Entry</TableHead>
                <TableHead className="text-gray-400">SL</TableHead>
                <TableHead className="text-gray-400">TP1</TableHead>
                <TableHead className="text-gray-400">TP2</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Result</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    Loading signals...
                  </TableCell>
                </TableRow>
              ) : filteredSignals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    No signals found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSignals.map((signal) => (
                  <TableRow
                    key={signal.id}
                    className="border-slate-800 hover:bg-slate-800/30"
                  >
                    <TableCell className="text-gray-300 text-sm">
                      {formatTime(signal.signal_time)}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {signal.signal_provider}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-100">
                      {signal.pair}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDirectionIcon(signal.direction)}
                        <span
                          className={
                            signal.direction === 'BUY' ? 'text-green-400' : 'text-red-400'
                          }
                        >
                          {signal.direction}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">
                      {formatPrice(signal.entry_price)}
                    </TableCell>
                    <TableCell className="text-red-400 font-mono text-sm">
                      {formatPrice(signal.stop_loss)}
                    </TableCell>
                    <TableCell className="text-green-400 font-mono text-sm">
                      {formatPrice(signal.take_profit_1)}
                    </TableCell>
                    <TableCell className="text-green-400 font-mono text-sm">
                      {signal.take_profit_2 ? formatPrice(signal.take_profit_2) : '-'}
                    </TableCell>
                    <TableCell>{getStatusBadge(signal.status)}</TableCell>
                    <TableCell>
                      {signal.result_pips !== null && signal.result_pips !== undefined ? (
                        <span
                          className={`font-semibold ${
                            signal.result_pips >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {signal.result_pips >= 0 ? '+' : ''}
                          {signal.result_pips} pips
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSignal(signal);
                            setShowDetailDialog(true);
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Signal Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSignal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-gray-100 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    selectedSignal.direction === 'BUY' 
                      ? 'bg-green-500/10' 
                      : 'bg-red-500/10'
                  }`}>
                    {getDirectionIcon(selectedSignal.direction)}
                  </div>
                  {selectedSignal.pair} Signal Details
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedSignal.signal_provider} • {formatTime(selectedSignal.signal_time)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Signal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Direction</div>
                    <div className={`text-lg font-bold ${
                      selectedSignal.direction === 'BUY' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedSignal.direction}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Status</div>
                    {getStatusBadge(selectedSignal.status)}
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Entry Price</div>
                    <div className="text-lg font-bold text-gray-100">
                      {formatPrice(selectedSignal.entry_price)}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                    <div className="text-lg font-bold text-red-400">
                      {formatPrice(selectedSignal.stop_loss)}
                    </div>
                  </div>
                </div>

                {/* Take Profits */}
                <div>
                  <div className="text-sm font-semibold text-gray-300 mb-3">Take Profit Levels</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">TP1</div>
                      <div className="text-lg font-bold text-green-400">
                        {formatPrice(selectedSignal.take_profit_1)}
                      </div>
                    </div>
                    {selectedSignal.take_profit_2 && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">TP2</div>
                        <div className="text-lg font-bold text-green-400">
                          {formatPrice(selectedSignal.take_profit_2)}
                        </div>
                      </div>
                    )}
                    {selectedSignal.take_profit_3 && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">TP3</div>
                        <div className="text-lg font-bold text-green-400">
                          {formatPrice(selectedSignal.take_profit_3)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedSignal.notes && (
                  <div>
                    <div className="text-sm font-semibold text-gray-300 mb-2">Notes</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-gray-300">
                      {selectedSignal.notes}
                    </div>
                  </div>
                )}

                {/* Result */}
                {selectedSignal.result_pips !== null && selectedSignal.result_pips !== undefined && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Result</div>
                    <div className={`text-2xl font-bold ${
                      selectedSignal.result_pips >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedSignal.result_pips >= 0 ? '+' : ''}
                      {selectedSignal.result_pips} pips
                    </div>
                    {selectedSignal.result_profit_percent && (
                      <div className="text-sm text-gray-400 mt-1">
                        ({selectedSignal.result_profit_percent}% profit)
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <Button
                    onClick={() => {
                      setShowDetailDialog(false);
                      window.location.href = `/signals/${selectedSignal.id}/settings`;
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize Settings
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailDialog(false)}
                    className="border-slate-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
