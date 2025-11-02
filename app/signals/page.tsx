'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignalDashboard } from '@/components/signals/SignalDashboard';
import { RiskCalculator } from '@/components/signals/RiskCalculator';
import { TradingJournal } from '@/components/signals/TradingJournal';
import { PerformanceAnalytics } from '@/components/signals/PerformanceAnalytics';
import {
  Activity,
  Calculator,
  BookOpen,
  BarChart3,
} from 'lucide-react';

export default function SignalsPage() {

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Trading Signals Hub</h1>
            <p className="text-gray-400">
              Professional trading signals, risk management, and performance analytics
            </p>
          </div>

          <Tabs defaultValue="signals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-900">
              <TabsTrigger value="signals" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Signals</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Risk Calc</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Journal</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signals">
              <SignalDashboard />
            </TabsContent>

            <TabsContent value="calculator">
              <RiskCalculator />
            </TabsContent>

            <TabsContent value="journal">
              <TradingJournal />
            </TabsContent>

            <TabsContent value="analytics">
              <PerformanceAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
