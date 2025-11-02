import { SectionTitle } from '@/components/marketing/SectionTitle';
import { Zap, BarChart3, Shield } from 'lucide-react';

export default function FiturPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Fitur Lengkap IndoTraderXpert" subtitle="Tools untuk trading lebih cerdas" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Copy & Auto-Trade', desc: 'Eksekusi otomatis via MetaAPI' },
            { icon: BarChart3, title: 'Multi-Provider', desc: 'Gabungkan banyak sumber' },
            { icon: Shield, title: 'Risk Control', desc: 'Custom TP/SL dan trailing' },
          ].map((f, i) => (
            <div key={i} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800">
              <f.icon className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
