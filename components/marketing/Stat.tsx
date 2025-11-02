interface StatProps {
  label: string;
  value: string | number;
  sub?: string;
  valueColor?: string;
}

export function Stat({ label, value, sub, valueColor = 'text-yellow-400' }: StatProps) {
  return (
    <div className="text-center">
      <div className={`text-3xl md:text-4xl font-bold ${valueColor} mb-2`}>{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}
