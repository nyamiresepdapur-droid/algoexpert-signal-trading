import { Card } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ChartCard({ title, children, footer }: ChartCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-6">{title}</h3>
      <div className="mb-4">{children}</div>
      {footer && <div className="pt-4 border-t border-slate-800">{footer}</div>}
    </Card>
  );
}
