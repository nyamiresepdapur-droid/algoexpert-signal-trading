'use client';

import { SectionTitle } from '@/components/marketing/SectionTitle';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Zap, Shield, Target, Award, Calendar, Bitcoin, Rocket } from 'lucide-react';
import multiPairData from '@/data/providers/multi-pair-forex.json';
import goldHighFreqData from '@/data/providers/gold-high-frequency.json';
import goldStandardData from '@/data/providers/gold-standard.json';
import cryptoSpotData from '@/data/providers/crypto-spot.json';
import cryptoFuturesData from '@/data/providers/crypto-futures.json';

export default function PerformancePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Real Trading Performance"
          subtitle="Verified results from our 5 elite signal providers"
        />

        <Tabs defaultValue="multi-pair" className="mb-12">
          <TabsList className="grid w-full grid-cols-5 bg-slate-900 border border-slate-800 p-1">
            <TabsTrigger value="multi-pair" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600">
              Multi-Pair Forex
            </TabsTrigger>
            <TabsTrigger value="gold-hf" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500">
              Gold HF
            </TabsTrigger>
            <TabsTrigger value="gold-std" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600">
              Gold Std
            </TabsTrigger>
            <TabsTrigger value="crypto-spot" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600">
              Crypto Spot
            </TabsTrigger>
            <TabsTrigger value="crypto-futures" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600">
              Crypto Futures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="multi-pair" className="mt-8">
            <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-100">Multi-Pair Forex</h2>
                  <p className="text-gray-400">37 currency pairs • 30min & 1hour timeframes</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-4">October 2025 Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Total Trades</div>
                      <div className="text-3xl font-bold text-green-400">
                        {multiPairData.performance.october2025.totalTrades.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">22 trading days</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Net Pips</div>
                      <div className="text-3xl font-bold text-green-400">
                        +{multiPairData.performance.october2025.netPips.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">3,089 pips/day avg</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Avg Pips/Trade</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {multiPairData.performance.october2025.avgPipsPerTrade}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Consistent profits</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Trades/Day</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {multiPairData.performance.october2025.avgTradesPerDay}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">High volume</div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-4">September 2025 Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Total Trades</div>
                      <div className="text-3xl font-bold text-green-400">
                        {multiPairData.performance.september2025.totalTrades.toLocaleString()}
                      </div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Net Pips</div>
                      <div className="text-3xl font-bold text-green-400">
                        +{multiPairData.performance.september2025.netPips.toLocaleString()}
                      </div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4 col-span-2">
                      <div className="text-sm text-gray-400 mb-1">Avg Pips/Trade</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {multiPairData.performance.september2025.avgPipsPerTrade}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-100 mb-4">Top 10 Performing Pairs - October 2025</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-3">30min Timeframe</div>
                    <div className="space-y-2">
                      {multiPairData.topPairs30min.map((pair, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-3 rounded-lg hover:border-green-500/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-500 w-6">#{idx + 1}</span>
                            <span className="font-semibold text-gray-200">{pair.pair}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">{pair.trades} trades</span>
                            <span className="text-sm font-bold text-green-400">+{pair.pips.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-3">1hour Timeframe</div>
                    <div className="space-y-2">
                      {multiPairData.topPairs1hour.map((pair, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-3 rounded-lg hover:border-green-500/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-500 w-6">#{idx + 1}</span>
                            <span className="font-semibold text-gray-200">{pair.pair}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">{pair.trades} trades</span>
                            <span className="text-sm font-bold text-green-400">+{pair.pips.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="gold-hf" className="mt-8">
            <Card className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border-yellow-500/30 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-yellow-400 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-100">Gold High-Frequency</h2>
                  <p className="text-gray-400">XAUUSD Aggressive • 6-12 signals/day • 93%+ winrate</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm text-gray-400">Winrate</div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {goldHighFreqData.performance.weekly.winrate}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {goldHighFreqData.performance.weekly.totalWins}W / {goldHighFreqData.performance.weekly.totalLosses}L
                  </div>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm text-gray-400">Weekly Pips</div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">
                    +{goldHighFreqData.performance.weekly.netPips.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Last 6 days tracked</div>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm text-gray-400">Avg/Trade</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-100">
                    {goldHighFreqData.performance.weekly.avgPipsPerTrade} pips
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Consistent wins</div>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm text-gray-400">Risk:Reward</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-100">
                    {goldHighFreqData.performance.weekly.riskRewardRatio}:1
                  </div>
                  <div className="text-xs text-gray-500 mt-1">50 pips SL</div>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm text-gray-400">Profit Factor</div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {goldHighFreqData.performance.weekly.profitFactor}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Excellent ratio</div>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-100 mb-4">6-Day Performance Breakdown</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {goldHighFreqData.performance.daily.map((day, idx) => (
                    <Card key={idx} className="bg-slate-900/80 border-slate-700 p-4 hover:border-yellow-400/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm text-gray-400">{day.day}</div>
                          <div className="text-2xl font-bold text-yellow-400">+{day.pips}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-400">{day.winrate}%</div>
                          <div className="text-xs text-gray-500">{day.profits}W/{day.losses}L</div>
                        </div>
                      </div>
                      {day.trades && (
                        <div className="flex flex-wrap gap-1">
                          {day.trades.slice(0, 6).map((trade, tidx) => (
                            <span
                              key={tidx}
                              className={`text-xs px-2 py-1 rounded ${
                                trade.pips > 0
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {trade.pips > 0 ? '+' : ''}{trade.pips}
                            </span>
                          ))}
                          {day.trades.length > 6 && (
                            <span className="text-xs px-2 py-1 text-gray-500">
                              +{day.trades.length - 6} more
                            </span>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-slate-900/50 border-slate-800 p-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Trading Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Signals per day</div>
                      <div className="font-semibold text-gray-100">{goldHighFreqData.features.signalsPerDay}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Profit target range</div>
                      <div className="font-semibold text-gray-100">{goldHighFreqData.features.avgProfitTarget}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Stop loss</div>
                      <div className="font-semibold text-gray-100">{goldHighFreqData.features.stopLoss}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Trading style</div>
                      <div className="font-semibold text-gray-100">{goldHighFreqData.features.tradingStyle}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="gold-std" className="mt-8">
            <Card className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/30 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-100">Gold Standard</h2>
                  <p className="text-gray-400">XAUUSD Conservative • 2-4 signals/day • 85% winrate</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-4">Monthly Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Net Pips</div>
                      <div className="text-3xl font-bold text-blue-400">
                        +{goldStandardData.performance.monthly.netPips.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Monthly total</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Winrate</div>
                      <div className="text-3xl font-bold text-blue-400">
                        {goldStandardData.performance.monthly.winrate}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {goldStandardData.performance.monthly.totalWins}W / {goldStandardData.performance.monthly.totalLosses}L
                      </div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Total Trades</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {goldStandardData.performance.monthly.totalTrades}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">22 trading days</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Avg/Trade</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {goldStandardData.performance.monthly.avgPipsPerTrade}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Pips per trade</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Risk:Reward</div>
                      <div className="text-2xl font-bold text-gray-100">
                        {goldStandardData.performance.monthly.riskRewardRatio}:1
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Balanced approach</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Max Drawdown</div>
                      <div className="text-2xl font-bold text-green-400">
                        {goldStandardData.performance.monthly.maxDrawdown}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Low risk</div>
                    </Card>
                    <Card className="bg-slate-900/80 border-slate-700 p-4">
                      <div className="text-sm text-gray-400 mb-1">Profit Factor</div>
                      <div className="text-2xl font-bold text-green-400">
                        {goldStandardData.performance.monthly.profitFactor}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Strong performance</div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-4">Weekly Averages</h3>
                  <Card className="bg-slate-900/80 border-slate-700 p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <span className="text-gray-400">Avg Trades/Week</span>
                        <span className="text-xl font-bold text-gray-100">{goldStandardData.performance.weekly.avgTrades}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <span className="text-gray-400">Avg Pips/Week</span>
                        <span className="text-xl font-bold text-blue-400">+{goldStandardData.performance.weekly.avgPips.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <span className="text-gray-400">Avg Winrate</span>
                        <span className="text-xl font-bold text-blue-400">{goldStandardData.performance.weekly.avgWinrate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Consistency</span>
                        <span className="text-xl font-bold text-green-400">{goldStandardData.performance.weekly.consistency}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/80 border-slate-700 p-6 mt-4">
                    <h4 className="text-lg font-semibold text-gray-100 mb-4">Risk Management</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Risk per trade</span>
                        <span className="text-gray-100 font-semibold">{goldStandardData.riskManagement.recommendedRiskPerTrade}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Max daily drawdown</span>
                        <span className="text-gray-100 font-semibold">{goldStandardData.riskManagement.maxDailyDrawdown}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Position sizing</span>
                        <span className="text-gray-100 font-semibold">{goldStandardData.riskManagement.positionSizing}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stop loss type</span>
                        <span className="text-gray-100 font-semibold">{goldStandardData.riskManagement.stopLossType}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Trading Features</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Signals per day</div>
                    <div className="font-semibold text-gray-100 text-lg">{goldStandardData.features.signalsPerDay}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Profit target range</div>
                    <div className="font-semibold text-gray-100 text-lg">{goldStandardData.features.avgProfitTarget}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Stop loss</div>
                    <div className="font-semibold text-gray-100 text-lg">{goldStandardData.features.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Trading style</div>
                    <div className="font-semibold text-gray-100 text-lg">{goldStandardData.features.tradingStyle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Max concurrent trades</div>
                    <div className="font-semibold text-gray-100 text-lg">{goldStandardData.features.maxConcurrentTrades}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Breakeven strategy</div>
                    <div className="font-semibold text-green-400 text-lg">
                      {goldStandardData.features.breakevenStrategy ? '✓ Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="crypto-spot" className="mt-8">
            <Card className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-500/30 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Bitcoin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-100">Crypto Spot Trading</h2>
                  <p className="text-gray-400">50+ pairs • 66.48% winrate • 1,068 verified trades • 2+ years data</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className="text-3xl font-bold text-orange-400">
                    +{cryptoSpotData.performance.overall.totalProfit}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">8,529.90% cumulative</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Winrate</div>
                  <div className="text-3xl font-bold text-orange-400">
                    {cryptoSpotData.performance.overall.winrate}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cryptoSpotData.performance.overall.totalWins}W / {cryptoSpotData.performance.overall.totalLosses}L
                  </div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Avg/Trade</div>
                  <div className="text-2xl font-bold text-gray-100">
                    +{cryptoSpotData.performance.overall.avgProfitPerTrade}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Per trade profit</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Risk:Reward</div>
                  <div className="text-2xl font-bold text-gray-100">
                    {cryptoSpotData.performance.overall.riskRewardRatio}:1
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Expectancy +{cryptoSpotData.performance.overall.expectancy}%</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Profit Factor</div>
                  <div className="text-2xl font-bold text-green-400">
                    {cryptoSpotData.performance.overall.profitFactor}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Solid returns</div>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-100 mb-4">Top 8 Performing Coins (2+ years verified data)</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {cryptoSpotData.topPerformers.map((coin, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-4 rounded-lg hover:border-orange-500/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 w-6">#{idx + 1}</span>
                        <span className="font-semibold text-gray-200">{coin.coin}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{coin.trades} trades</span>
                        <span className="text-sm font-bold text-orange-400">+{coin.profit}%</span>
                        <span className="text-sm text-green-400">{coin.winrate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-slate-900/50 border-slate-800 p-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Trading Features</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Signals per day</div>
                    <div className="font-semibold text-gray-100 text-lg">{cryptoSpotData.features.signalsPerDay}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Trading style</div>
                    <div className="font-semibold text-gray-100 text-lg">{cryptoSpotData.features.tradingStyle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Avg hold time</div>
                    <div className="font-semibold text-gray-100 text-lg">{cryptoSpotData.features.avgHoldTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Stop loss</div>
                    <div className="font-semibold text-gray-100 text-lg">{cryptoSpotData.features.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Take profit</div>
                    <div className="font-semibold text-gray-100 text-lg">{cryptoSpotData.features.takeProfit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Exchanges</div>
                    <div className="font-semibold text-gray-100 text-sm">{cryptoSpotData.features.supportedExchanges.join(', ')}</div>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="crypto-futures" className="mt-8">
            <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/30 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-purple-500 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-100">Crypto Futures Trading</h2>
                  <p className="text-gray-400">67.04% winrate • 1,590 verified trades • 2x profit vs Spot • 2+ years data</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className="text-3xl font-bold text-purple-400">
                    +{cryptoFuturesData.performance.overall.totalProfit}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">25,578.85% cumulative</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Winrate</div>
                  <div className="text-3xl font-bold text-purple-400">
                    {cryptoFuturesData.performance.overall.winrate}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cryptoFuturesData.performance.overall.totalWins}W / {cryptoFuturesData.performance.overall.totalLosses}L
                  </div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Avg/Trade</div>
                  <div className="text-2xl font-bold text-gray-100">
                    +{cryptoFuturesData.performance.overall.avgProfitPerTrade}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">2x vs Spot (7.99%)</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Risk:Reward</div>
                  <div className="text-2xl font-bold text-gray-100">
                    {cryptoFuturesData.performance.overall.riskRewardRatio}:1
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Expectancy +{cryptoFuturesData.performance.overall.expectancy}%</div>
                </Card>
                <Card className="bg-slate-900/80 border-slate-700 p-4">
                  <div className="text-sm text-gray-400 mb-1">Profit Factor</div>
                  <div className="text-2xl font-bold text-green-400">
                    {cryptoFuturesData.performance.overall.profitFactor}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Excellent ratio</div>
                </Card>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Top Performing Pairs</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {cryptoFuturesData.topPairs.map((pair, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-4 rounded-lg hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 w-6">#{idx + 1}</span>
                        <span className="font-semibold text-gray-200">{pair.pair}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{pair.trades} trades</span>
                        <span className="text-sm font-bold text-purple-400">+{pair.profit}%</span>
                        <span className="text-sm text-green-400">{pair.winrate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Trading Strategies</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {cryptoFuturesData.tradingStrategies.map((strategy, idx) => (
                    <Card key={idx} className="bg-slate-900/80 border-slate-700 p-4">
                      <h4 className="font-bold text-gray-100 mb-3">{strategy.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Timeframe:</span>
                          <span className="text-gray-200">{strategy.timeframe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Leverage:</span>
                          <span className="text-gray-200">{strategy.leverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Hold time:</span>
                          <span className="text-gray-200">{strategy.avgHoldTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Profit:</span>
                          <span className="text-green-400">{strategy.profitTarget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Stop loss:</span>
                          <span className="text-red-400">{strategy.stopLoss}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Features & Risk Management</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-md font-semibold text-gray-200 mb-3">Trading Features</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Signals per day</span>
                        <span className="text-gray-100">{cryptoFuturesData.features.signalsPerDay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trading style</span>
                        <span className="text-gray-100">{cryptoFuturesData.features.tradingStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Take profit</span>
                        <span className="text-gray-100">{cryptoFuturesData.features.takeProfit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trailing stop</span>
                        <span className="text-green-400">{cryptoFuturesData.features.trailingStop ? '✓ Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-md font-semibold text-gray-200 mb-3">Risk Management</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk per trade</span>
                        <span className="text-gray-100">{cryptoFuturesData.riskManagement.recommendedRiskPerTrade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max daily DD</span>
                        <span className="text-gray-100">{cryptoFuturesData.riskManagement.maxDailyDrawdown}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max leverage</span>
                        <span className="text-gray-100">{cryptoFuturesData.riskManagement.maxLeverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Position sizing</span>
                        <span className="text-gray-100">{cryptoFuturesData.riskManagement.positionSizing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">Ready to Start?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our waitlist to get early access to all 5 elite signal providers. Choose the plan that fits your trading style.
          </p>
          <a href="/#waitlist">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg transition-opacity">
              Join Waitlist Now
            </button>
          </a>
        </Card>
      </div>
    </div>
  );
}
