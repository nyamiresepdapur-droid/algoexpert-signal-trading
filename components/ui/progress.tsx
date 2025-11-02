'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-slate-700',
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
