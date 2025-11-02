'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, AlertCircle, TrendingUp, Shield } from 'lucide-react';

export function RiskCalculator() {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercentage, setRiskPercentage] = useState<string>('2');
  const [entryPrice, setEntryPrice] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [accountCurrency, setAccountCurrency] = useState<string>('USD');
  const [pairType, setPairType] = useState<string>('FOREX');

  const [result, setResult] = useState<{
    riskAmount: number;
    lotSize: number;
    pips: number;
    recommendedLot: number;
  } | null>(null);

  const calculateLotSize = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);

    if (!balance || !risk || !entry || !sl) {
      return;
    }

    const riskAmount = (balance * risk) / 100;
    let pips = Math.abs(entry - sl);
    let lotSize = 0;
    let recommendedLot = 0;

    if (pairType === 'FOREX') {
      pips = pips * 10000;
      const pipValue = 10;
      lotSize = riskAmount / (pips * pipValue);
      recommendedLot = Math.floor(lotSize * 100) / 100;
    } else if (pairType === 'GOLD') {
      const pipValue = 10;
      lotSize = riskAmount / (pips * pipValue);
      recommendedLot = Math.floor(lotSize * 100) / 100;
    } else if (pairType === 'CRYPTO') {
      pips = ((Math.abs(entry - sl) / entry) * 100).toFixed(2) as any;
      lotSize = riskAmount / Math.abs(entry - sl);
      recommendedLot = Math.floor(lotSize * 1000) / 1000;
    }

    setResult({
      riskAmount,
      lotSize,
      pips: parseFloat(pips.toString()),
      recommendedLot,
    });
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-100">Risk Management Calculator</h3>
          <p className="text-sm text-gray-400">Calculate optimal position size for your trades</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Account Balance</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                className="bg-slate-800 border-slate-700"
                placeholder="10000"
              />
              <Select value={accountCurrency} onValueChange={setAccountCurrency}>
                <SelectTrigger className="w-[100px] bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Risk per Trade (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={riskPercentage}
              onChange={(e) => setRiskPercentage(e.target.value)}
              className="bg-slate-800 border-slate-700"
              placeholder="2"
            />
            <p className="text-xs text-gray-500">Recommended: 1-2% per trade</p>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Pair Type</Label>
            <Select value={pairType} onValueChange={setPairType}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="FOREX">Forex</SelectItem>
                <SelectItem value="GOLD">Gold/Commodities</SelectItem>
                <SelectItem value="CRYPTO">Crypto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Entry Price</Label>
            <Input
              type="number"
              step="any"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="bg-slate-800 border-slate-700"
              placeholder="1.0850"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Stop Loss Price</Label>
            <Input
              type="number"
              step="any"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="bg-slate-800 border-slate-700"
              placeholder="1.0830"
            />
          </div>

          <Button
            onClick={calculateLotSize}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Position Size
          </Button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Risk Amount</span>
                  <span className="text-lg font-bold text-yellow-400">
                    {accountCurrency} {result.riskAmount.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {riskPercentage}% of {accountCurrency} {accountBalance}
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Stop Loss Distance</span>
                  <span className="text-lg font-bold text-red-400">
                    {result.pips.toFixed(pairType === 'CRYPTO' ? 2 : 1)}{' '}
                    {pairType === 'CRYPTO' ? '%' : 'pips'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Distance from entry to stop loss
                </div>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">
                    Recommended Position Size
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {result.recommendedLot} {pairType === 'CRYPTO' ? 'units' : 'lots'}
                </div>
                <div className="text-xs text-gray-400">
                  Based on your risk parameters
                </div>
              </Card>

              <Alert className="bg-blue-500/10 border-blue-500/30">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400 text-xs">
                  <strong>Pro Tip:</strong> Always use this position size or lower. Never risk
                  more than you can afford to lose.
                </AlertDescription>
              </Alert>

              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <div className="text-xs text-gray-400 mb-2">Quick Reference</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Conservative (1%):</span>
                    <span className="text-gray-300 font-semibold">
                      {(result.recommendedLot * 0.5).toFixed(2)} lots
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Moderate (2%):</span>
                    <span className="text-gray-300 font-semibold">
                      {result.recommendedLot.toFixed(2)} lots
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Aggressive (3%):</span>
                    <span className="text-gray-300 font-semibold">
                      {(result.recommendedLot * 1.5).toFixed(2)} lots
                    </span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="bg-slate-800/30 border-slate-700 p-8 flex flex-col items-center justify-center h-full">
              <TrendingUp className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Enter your trade parameters to calculate the optimal position size
              </p>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
}
