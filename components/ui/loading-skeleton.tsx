import { Card } from './card';

export function SignalSkeleton() {
  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-slate-800" />
          <div className="flex-1">
            <div className="h-6 bg-slate-800 rounded w-32 mb-2" />
            <div className="h-4 bg-slate-800 rounded w-48" />
          </div>
        </div>
        <div className="w-24 h-10 bg-slate-800 rounded" />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="h-3 bg-slate-800 rounded w-12 mb-2" />
            <div className="h-4 bg-slate-800 rounded w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TradeSkeleton() {
  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-slate-800" />
          <div className="flex-1">
            <div className="h-6 bg-slate-800 rounded w-40 mb-2" />
            <div className="h-4 bg-slate-800 rounded w-56" />
          </div>
        </div>
        <div>
          <div className="h-8 bg-slate-800 rounded w-24 mb-2" />
          <div className="h-4 bg-slate-800 rounded w-16 ml-auto" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="h-3 bg-slate-800 rounded w-12 mb-2" />
            <div className="h-4 bg-slate-800 rounded w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProviderSkeleton() {
  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
      <div className="mb-4">
        <div className="h-6 bg-slate-800 rounded w-48 mb-2" />
        <div className="h-4 bg-slate-800 rounded w-32 mb-3" />
        <div className="h-5 bg-slate-800 rounded w-20" />
      </div>
      <div className="h-16 bg-slate-800 rounded mb-4" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="h-3 bg-slate-800 rounded w-16 mb-2" />
          <div className="h-6 bg-slate-800 rounded w-12" />
        </div>
        <div>
          <div className="h-3 bg-slate-800 rounded w-20 mb-2" />
          <div className="h-6 bg-slate-800 rounded w-16" />
        </div>
      </div>
      <div className="h-10 bg-slate-800 rounded w-full" />
    </Card>
  );
}

export function AccountSkeleton() {
  return (
    <Card className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
      <div className="mb-4">
        <div className="h-6 bg-slate-800 rounded w-40 mb-2" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-slate-800 rounded w-20" />
          <div className="h-5 bg-slate-800 rounded w-20" />
          <div className="h-5 bg-slate-800 rounded w-16" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-800 rounded w-24" />
          <div className="h-4 bg-slate-800 rounded w-32" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-slate-800 rounded w-20" />
          <div className="h-4 bg-slate-800 rounded w-28" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-9 bg-slate-800 rounded flex-1" />
        <div className="h-9 bg-slate-800 rounded w-12" />
      </div>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-24 mb-3" />
            <div className="h-8 bg-slate-800 rounded w-20 mb-2" />
            <div className="h-3 bg-slate-800 rounded w-16" />
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-800 p-6 animate-pulse">
            <div className="h-6 bg-slate-800 rounded w-48 mb-4" />
            <div className="h-64 bg-slate-800 rounded" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-slate-900/50 rounded-lg animate-pulse">
          <div className="w-12 h-12 bg-slate-800 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-800 rounded w-1/2" />
          </div>
          <div className="w-24 h-8 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
}
