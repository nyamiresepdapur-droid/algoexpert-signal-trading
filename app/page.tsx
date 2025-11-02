'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/marketing/SectionTitle';
import { FeatureItem } from '@/components/marketing/FeatureItem';
import { Progress } from '@/components/ui/progress';
import {
  Zap,
  BarChart3,
  Shield,
  TrendingUp,
  Target,
  Bot,
  Cloud,
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  Brain,
  Repeat,
  XCircle,
  Users,
  DollarSign,
  Clock,
  Flame,
  Heart,
  Star,
  Trophy,
  Rocket
} from 'lucide-react';
import performanceData from '@/data/performance/weekly-10weeks.json';

export default function Home() {
  const { summary } = performanceData;
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-blue opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-8 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>{t.hero.launchingSoon}</span>
            </div>

            <div className="mb-8">
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6 leading-tight max-w-4xl mx-auto">
                {t.hero.title}
                <br />
                <span className="text-gradient">{t.hero.titleGradient}</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
              <Card className="bg-red-500/5 border-red-500/30 p-4">
                <div className="text-3xl mb-2">🤑</div>
                <div className="font-bold text-red-400 mb-1">{t.hero.greed}</div>
                <div className="text-sm text-gray-400">{t.hero.greedText}</div>
              </Card>
              <Card className="bg-orange-500/5 border-orange-500/30 p-4">
                <div className="text-3xl mb-2">😰</div>
                <div className="font-bold text-orange-400 mb-1">{t.hero.fear}</div>
                <div className="text-sm text-gray-400">{t.hero.fearText}</div>
              </Card>
              <Card className="bg-yellow-500/5 border-yellow-500/30 p-4">
                <div className="text-3xl mb-2">😤</div>
                <div className="font-bold text-yellow-400 mb-1">{t.hero.revenge}</div>
                <div className="text-sm text-gray-400">{t.hero.revengeText}</div>
              </Card>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold text-lg px-8 py-6">
                  {t.nav.joinWaitlist}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400">
              <Users className="w-4 h-4" />
              <span><strong>247</strong> {t.hero.socialProof}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-red-950/20 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-sm text-red-400 mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.problem.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4">
              {t.problem.title} 😬
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.problem.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-red-950/30 to-slate-900/50 border-red-500/30 p-6 hover:scale-105 transition-transform">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-400">{t.problem.greedTrap}</h3>
              </div>
              <div className="bg-red-950/30 rounded-lg p-4 mb-3 border border-red-500/20">
                <p className="text-gray-300 leading-relaxed text-sm italic">
                  {t.problem.greedStory}
                </p>
              </div>
              <div className="text-sm text-gray-500 italic flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                {t.problem.greedNote}
              </div>
              <div className="mt-4 pt-4 border-t border-red-500/20">
                <div className="text-xs text-gray-500 mb-2">{t.problem.greedLoss.split(' ')[0]}:</div>
                <Progress value={85} className="h-2 bg-slate-800" />
                <div className="text-xs text-red-400 mt-1 text-right">{t.problem.greedLoss}</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-950/30 to-slate-900/50 border-orange-500/30 p-6 hover:scale-105 transition-transform">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-orange-400">{t.problem.fearClose}</h3>
              </div>
              <div className="bg-orange-950/30 rounded-lg p-4 mb-3 border border-orange-500/20">
                <p className="text-gray-300 leading-relaxed text-sm italic">
                  {t.problem.fearStory}
                </p>
              </div>
              <div className="text-sm text-gray-500 italic flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                {t.problem.fearNote}
              </div>
              <div className="mt-4 pt-4 border-t border-orange-500/20">
                <div className="text-xs text-gray-500 mb-2">{t.problem.fearMiss.split(' ')[0]} {t.problem.fearMiss.split(' ')[1]}:</div>
                <Progress value={95} className="h-2 bg-slate-800" />
                <div className="text-xs text-orange-400 mt-1 text-right">{t.problem.fearMiss}</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-950/30 to-slate-900/50 border-yellow-500/30 p-6 hover:scale-105 transition-transform">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400">{t.problem.revengeSpiral}</h3>
              </div>
              <div className="bg-yellow-950/30 rounded-lg p-4 mb-3 border border-yellow-500/20">
                <p className="text-gray-300 leading-relaxed text-sm italic">
                  {t.problem.revengeStory}
                </p>
              </div>
              <div className="text-sm text-gray-500 italic flex items-center gap-2">
                <Flame className="w-4 h-4 text-yellow-400" />
                {t.problem.revengeNote}
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <div className="text-xs text-gray-500 mb-2">{t.problem.revengeResult.split(' ')[0]} {t.problem.revengeResult.split(' ')[1]}:</div>
                <Progress value={100} className="h-2 bg-slate-800" />
                <div className="text-xs text-yellow-400 mt-1 text-right">{t.problem.revengeResult}</div>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-8 text-center">
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              {t.problem.summaryTitle}
            </h3>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              {t.problem.summaryText}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
              <div className="text-center">
                
                <div className="text-4xl font-bold text-red-400 mb-2">{t.problem.greedLabel}</div>
                <div className="text-sm text-gray-400">{t.problem.greedSub}</div>
                <div className="mt-3">
                  <Progress value={90} className="h-2 bg-slate-700" />
                  <div className="text-xs text-red-300 mt-1">{t.problem.greedAffected}</div>
                </div>
              </div>
              <div className="text-center">
                
                <div className="text-4xl font-bold text-orange-400 mb-2">{t.problem.fearLabel}</div>
                <div className="text-sm text-gray-400">{t.problem.fearSub}</div>
                <div className="mt-3">
                  <Progress value={85} className="h-2 bg-slate-700" />
                  <div className="text-xs text-orange-300 mt-1">{t.problem.fearAffected}</div>
                </div>
              </div>
              <div className="text-center">
                
                <div className="text-4xl font-bold text-yellow-400 mb-2">{t.problem.revengeLabel}</div>
                <div className="text-sm text-gray-400">{t.problem.revengeSub}</div>
                <div className="mt-3">
                  <Progress value={75} className="h-2 bg-slate-700" />
                  <div className="text-xs text-yellow-300 mt-1">{t.problem.revengeAffected}</div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">This is costing you THOUSANDS every month </span>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-green-950/20" id="solution">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-400 mb-6">
              <CheckCircle className="w-4 h-4" />
              <span>{t.solution.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-6">
              {t.solution.title}
              <br />
              <span className="text-gradient">{t.solution.titleGradient}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              {t.solution.subtitle}
              <strong className="text-green-400"> {t.solution.subtitleBold}</strong> {t.solution.subtitleEnd}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
              <Rocket className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">🤖 {t.solution.ctaBadge}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-red-950/20 to-slate-900 border-red-500/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-400">{t.solution.manualTitle}</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.manualEmotional}</div>
                    <div className="text-sm text-gray-400">{t.solution.manualEmotionalDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.manualInconsistent}</div>
                    <div className="text-sm text-gray-400">{t.solution.manualInconsistentDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.manualRevenge}</div>
                    <div className="text-sm text-gray-400">{t.solution.manualRevengeDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.manualPosition}</div>
                    <div className="text-sm text-gray-400">{t.solution.manualPositionDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.manualMissed}</div>
                    <div className="text-sm text-gray-400">{t.solution.manualMissedDesc}</div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-red-500/20 text-center">
                
                <div className="text-red-400 font-bold text-lg">{t.solution.manualResult}</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-950/20 to-slate-900 border-green-500/50 p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">AUTOMATED</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">{t.solution.automatedTitle}</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.automatedZero}</div>
                    <div className="text-sm text-gray-400">{t.solution.automatedZeroDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.automatedConsistency}</div>
                    <div className="text-sm text-gray-400">{t.solution.automatedConsistencyDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.automatedDiscipline}</div>
                    <div className="text-sm text-gray-400">{t.solution.automatedDisciplineDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.automatedSizing}</div>
                    <div className="text-sm text-gray-400">{t.solution.automatedSizingDesc}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">{t.solution.automatedExecution}</div>
                    <div className="text-sm text-gray-400">{t.solution.automatedExecutionDesc}</div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-green-500/20 text-center">
                
                <div className="text-green-400 font-bold text-lg">{t.solution.automatedResult}</div>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900 border-blue-500/50 p-8 text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              
              <Brain className="w-10 h-10 text-blue-400" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-100">
                {t.solution.mathTitle}
              </h3>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.solution.mathSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="bg-green-500/5 border-green-500/30 p-6">
                
                <div className="text-5xl font-bold text-green-400 mb-2">80%+</div>
                <div className="text-sm text-gray-400 mb-3">{t.solution.winRate}</div>
                <Progress value={80} className="h-3 mb-2" />
                <div className="text-xs text-gray-500">{t.solution.winRateDesc}</div>
              </Card>
              <Card className="bg-yellow-500/5 border-yellow-500/30 p-6">
                
                <div className="text-5xl font-bold text-yellow-400 mb-2">35,220+</div>
                <div className="text-sm text-gray-400 mb-3">{t.solution.pips}</div>
                <Progress value={95} className="h-3 mb-2" />
                <div className="text-xs text-gray-500">{t.solution.pipsDesc}</div>
              </Card>
              <Card className="bg-blue-500/5 border-blue-500/30 p-6">
                
                <div className="text-5xl font-bold text-blue-400 mb-2">3.75:1</div>
                <div className="text-sm text-gray-400 mb-3">{t.solution.riskReward}</div>
                <Progress value={75} className="h-3 mb-2" />
                <div className="text-xs text-gray-500">{t.solution.riskRewardDesc}</div>
              </Card>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <Star className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Your signals were probably always good. You just needed to <strong className="text-green-400">execute them without emotion</strong> 🎯</span>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-purple-500/5 to-slate-900 border-purple-500/30 p-8 text-center">
              
              <h3 className="text-2xl font-bold text-purple-400 mb-3">Manual Trader</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Consistency Rate</div>
                  <Progress value={30} className="h-3 mb-1" />
                  <div className="text-xs text-red-400">Only 30% of trades follow the plan</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Emotional Control</div>
                  <Progress value={20} className="h-3 mb-1" />
                  <div className="text-xs text-red-400">20% control under pressure</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Availability</div>
                  <Progress value={40} className="h-3 mb-1" />
                  <div className="text-xs text-red-400">Miss 60% of signals (sleep/work)</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/5 to-slate-900 border-green-500/30 p-8 text-center">
              
              <h3 className="text-2xl font-bold text-green-400 mb-3">AlgoXpertHub</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Consistency Rate</div>
                  <Progress value={100} className="h-3 mb-1" />
                  <div className="text-xs text-green-400">100% of trades follow the plan</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Emotional Control</div>
                  <Progress value={100} className="h-3 mb-1" />
                  <div className="text-xs text-green-400">Zero emotions, pure logic</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Availability</div>
                  <Progress value={100} className="h-3 mb-1" />
                  <div className="text-xs text-green-400">24/7 execution, never miss signals</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            <SectionTitle
              title={t.howItWorks.title}
              subtitle={t.howItWorks.subtitle}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-900/50 border-slate-700 p-8 text-center hover:scale-105 transition-transform">
              
              <div className="w-16 h-16 rounded-full gradient-purple-blue flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Choose Your Signals 🎯</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step1Desc}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
                <Trophy className="w-3 h-3" />
                {t.howItWorks.step1Badge}
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 p-8 text-center hover:scale-105 transition-transform">
              
              <div className="w-16 h-16 rounded-full gradient-purple-blue flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Set Your Risk Rules 🛡️</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step2Desc}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                <Lock className="w-3 h-3" />
                {t.howItWorks.step2Badge}
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 p-8 text-center hover:scale-105 transition-transform">
              
              <div className="w-16 h-16 rounded-full gradient-purple-blue flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Let AI Execute 🚀</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step3Desc}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-400">
                <Zap className="w-3 h-3" />
                {t.howItWorks.step3Badge}
              </div>
            </Card>
          </div>

          <div className="text-center mb-12">
            
            <SectionTitle
              title={t.performance.title}
              subtitle={t.performance.subtitle}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-700 p-6 hover:border-green-500/50 hover:scale-105 transition-all">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">Multi-Pair Forex</h3>
                  <p className="text-sm text-gray-500">37 Currency Pairs</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly Pips</span>
                  <span className="text-green-400 font-bold">67,971</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly Trades</span>
                  <span className="text-gray-300 font-bold">2,922</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Style</span>
                  <span className="text-gray-300 font-bold">High Volume</span>
                </div>
              </div>
              <Progress value={85} className="h-2 mb-2" />
              <p className="text-sm text-gray-400">Diversified across 37 pairs with consistent performance</p>
            </Card>

            <Card className="bg-slate-900/50 border-yellow-500/50 p-6 relative overflow-hidden hover:scale-105 transition-transform">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded animate-pulse">BEST WR</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">Gold High-Frequency</h3>
                  <p className="text-sm text-gray-500">XAUUSD Aggressive</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Winrate</span>
                  <span className="text-yellow-400 font-bold">93.48%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Weekly Pips</span>
                  <span className="text-gray-300 font-bold">5,230</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Signals/Day</span>
                  <span className="text-gray-300 font-bold">6-12</span>
                </div>
              </div>
              <Progress value={93} className="h-2 mb-2" />
              <p className="text-sm text-gray-400">High-frequency with 90%+ winrate executed perfectly</p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 p-6 hover:border-blue-500/50 hover:scale-105 transition-all">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">Gold Standard</h3>
                  <p className="text-sm text-gray-500">XAUUSD Conservative</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Winrate</span>
                  <span className="text-blue-400 font-bold">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly Pips</span>
                  <span className="text-gray-300 font-bold">15,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Signals/Day</span>
                  <span className="text-gray-300 font-bold">2-4</span>
                </div>
              </div>
              <Progress value={85} className="h-2 mb-2" />
              <p className="text-sm text-gray-400">Conservative strategy with steady, reliable growth</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            <SectionTitle
              title={t.features.title}
              subtitle={t.features.subtitle}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureItem
              icon={Brain}
              title="Emotion-Free Trading"
              description="AI executes signals exactly as intended. No fear, no greed, no revenge. Just pure discipline."
            />
            <FeatureItem
              icon={Target}
              title="Perfect Position Sizing"
              description="Calculates lot size based on your risk % and balance. Never over-leverage again."
            />
            <FeatureItem
              icon={Shield}
              title="Strict Risk Management"
              description="Pre-set risk per trade enforced 100% of the time. Your rules, never broken."
            />
            <FeatureItem
              icon={Zap}
              title="Instant Execution"
              description="Signals executed in milliseconds via MetCloud Cloud. No delays, no missed entries."
            />
            <FeatureItem
              icon={BarChart3}
              title="Smart TP Management"
              description="Dynamic TP allocations (30-30-40%) maximize profits without manual intervention."
            />
            <FeatureItem
              icon={Cloud}
              title="24/7 Automation"
              description="Never miss a signal while sleeping, working, or living your life."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-purple-950/20" id="waitlist">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-6 animate-pulse">
              <Flame className="w-4 h-4" />
              <span>🔥 {t.waitlist.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              {t.waitlist.title}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t.waitlist.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">⏰ {t.waitlist.urgency}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/50 p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center animate-bounce">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-100 mb-4">
                  Join Our Telegram Community
                </h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Get exclusive updates, early access notifications, and connect with fellow traders automating their success.
                </p>
                <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-bold text-xl px-12 py-8 shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105">
                    <Rocket className="mr-3 w-6 h-6" />
                    {t.nav.joinWaitlist}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-purple-300">
                  <Users className="w-4 h-4" />
                  <span>247 traders already joined</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-bold text-gray-100 mb-2">Priority Access</h4>
              <p className="text-sm text-gray-400">
                Get early access when we launch
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-lg font-bold text-gray-100 mb-2">Exclusive Pricing</h4>
              <p className="text-sm text-gray-400">
                50% off first 3 months for early members
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">👑</div>
              <h4 className="text-lg font-bold text-gray-100 mb-2">VIP Support</h4>
              <p className="text-sm text-gray-400">
                Direct support from day one
              </p>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-green-950/30 to-slate-900 border-green-500/30 p-8 text-center mt-8">
            <h4 className="text-2xl font-bold text-green-400 mb-3">You Already Know What To Do</h4>
            <p className="text-lg text-gray-300 leading-relaxed">
              The signals work. The analysis works. You just need to execute without emotions.
              <strong className="text-green-400"> Stop fighting yourself. Automate.</strong>
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
