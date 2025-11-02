import { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-yellow-400/50 transition-colors">
      <div className="w-14 h-14 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-yellow-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
