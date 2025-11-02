'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/lib/toast-helpers';
import {
  BookOpen,
  Plus,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from 'lucide-react';

interface JournalEntry {
  id: string;
  signal_id: string;
  followed: boolean;
  lot_size: number;
  actual_entry: number;
  actual_exit: number;
  actual_profit: number;
  notes: string;
  created_at: string;
  signal: {
    pair: string;
    direction: string;
    entry_price: number;
    signal_time: string;
  };
}

export function TradingJournal() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedSignalId, setSelectedSignalId] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [actualEntry, setActualEntry] = useState('');
  const [actualExit, setActualExit] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user) {
      loadJournalEntries();
      loadAvailableSignals();
    }
  }, [user]);

  const loadJournalEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('user_signal_journal')
        .select(`
          *,
          signal:trading_signals(pair, direction, entry_price, signal_time)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast.error('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSignals = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_signals')
        .select('*')
        .order('signal_time', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSignals(data || []);
    } catch (error: any) {
      console.error('Error loading signals:', error);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSignalId || !lotSize || !actualEntry || !actualExit) {
      toast.error('Error', 'Please fill in all required fields');
      return;
    }

    const entry = parseFloat(actualEntry);
    const exit = parseFloat(actualExit);
    const lot = parseFloat(lotSize);
    const profit = (exit - entry) * lot * 100;

    try {
      const { error } = await supabase.from('user_signal_journal').insert({
        user_id: user?.id,
        signal_id: selectedSignalId,
        followed: true,
        lot_size: lot,
        actual_entry: entry,
        actual_exit: exit,
        actual_profit: profit,
        notes,
      });

      if (error) throw error;

      toast.success('Success', 'Journal entry added successfully');
      setDialogOpen(false);
      resetForm();
      loadJournalEntries();
    } catch (error: any) {
      toast.error('Error', error.message);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const { error } = await supabase
        .from('user_signal_journal')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Success', 'Entry deleted successfully');
      loadJournalEntries();
    } catch (error: any) {
      toast.error('Error', error.message);
    }
  };

  const resetForm = () => {
    setSelectedSignalId('');
    setLotSize('');
    setActualEntry('');
    setActualExit('');
    setNotes('');
  };

  const stats = {
    totalTrades: entries.length,
    wins: entries.filter((e) => e.actual_profit > 0).length,
    losses: entries.filter((e) => e.actual_profit < 0).length,
    totalProfit: entries.reduce((sum, e) => sum + e.actual_profit, 0),
    winRate:
      entries.length > 0
        ? ((entries.filter((e) => e.actual_profit > 0).length / entries.length) * 100).toFixed(1)
        : '0.0',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-100">Trading Journal</h3>
            <p className="text-sm text-gray-400">Track your trading performance</p>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Add Journal Entry</DialogTitle>
              <DialogDescription className="text-gray-400">
                Record a trade you took based on a signal
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEntry} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Signal</Label>
                <select
                  value={selectedSignalId}
                  onChange={(e) => setSelectedSignalId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-gray-100"
                >
                  <option value="">Select a signal</option>
                  {signals.map((signal) => (
                    <option key={signal.id} value={signal.id}>
                      {signal.pair} - {signal.direction} @ {signal.entry_price} (
                      {new Date(signal.signal_time).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Lot Size</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700"
                  placeholder="0.01"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Entry Price</Label>
                  <Input
                    type="number"
                    step="any"
                    value={actualEntry}
                    onChange={(e) => setActualEntry(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700"
                    placeholder="1.0850"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Exit Price</Label>
                  <Input
                    type="number"
                    step="any"
                    value={actualExit}
                    onChange={(e) => setActualExit(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700"
                    placeholder="1.0880"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Notes (Optional)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-slate-800 border-slate-700"
                  placeholder="What went well? What could be improved?"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold"
              >
                Add Entry
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Total Trades</div>
          <div className="text-2xl font-bold text-gray-100">{stats.totalTrades}</div>
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
          <div className="text-2xl font-bold text-cyan-400">{stats.winRate}%</div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="text-sm text-gray-400 mb-1">Total P/L</div>
          <div
            className={`text-2xl font-bold ${
              stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            ${stats.totalProfit.toFixed(2)}
          </div>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800/50">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Pair</TableHead>
                <TableHead className="text-gray-400">Direction</TableHead>
                <TableHead className="text-gray-400">Lot Size</TableHead>
                <TableHead className="text-gray-400">Entry</TableHead>
                <TableHead className="text-gray-400">Exit</TableHead>
                <TableHead className="text-gray-400">Profit/Loss</TableHead>
                <TableHead className="text-gray-400">Result</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    Loading journal entries...
                  </TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No journal entries yet. Start tracking your trades!
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id} className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell className="text-gray-300 text-sm">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-100">
                      {entry.signal.pair}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {entry.signal.direction === 'BUY' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span
                          className={
                            entry.signal.direction === 'BUY'
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {entry.signal.direction}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{entry.lot_size}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">
                      {entry.actual_entry.toFixed(5)}
                    </TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">
                      {entry.actual_exit.toFixed(5)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          entry.actual_profit >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        ${entry.actual_profit.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {entry.actual_profit >= 0 ? (
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30 flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          WIN
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/10 text-red-400 border-red-500/30 flex items-center gap-1 w-fit">
                          <XCircle className="w-3 h-3" />
                          LOSS
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteEntry(entry.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
