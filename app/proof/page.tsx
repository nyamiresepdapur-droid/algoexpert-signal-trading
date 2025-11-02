import { SectionTitle } from '@/components/marketing/SectionTitle';
import { WeeklyChart } from '@/components/marketing/WeeklyChart';
import { MonthlyChart } from '@/components/marketing/MonthlyChart';
import { AlertCircle } from 'lucide-react';
import weeklyData from '@/data/performance/weekly.json';
import octoberData from '@/data/performance/october.json';
import septemberData from '@/data/performance/september.json';

export default function ProofPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Performa Trading Real" subtitle="Transparansi penuh statistik" />
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
          <p className="text-sm text-gray-300"><strong className="text-yellow-400">Disclaimer:</strong> Bukan nasihat investasi. Hasil lampau tidak menjamin hasil masa depan.</p>
        </div>
        <div className="space-y-8 mb-8"><WeeklyChart data={weeklyData} /></div>
        <div className="grid md:grid-cols-2 gap-8">
          <MonthlyChart data={octoberData} title="Performa Oktober 2024" />
          <MonthlyChart data={septemberData} title="Performa September 2024" />
        </div>
      </div>
    </div>
  );
}
