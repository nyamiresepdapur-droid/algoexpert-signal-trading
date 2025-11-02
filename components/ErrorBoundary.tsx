'use client';

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-red-500/30 p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Something went wrong
            </h2>

            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page or go back to the dashboard.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-slate-950 rounded text-xs text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>

              <Button
                onClick={() => window.location.href = '/dashboard'}
                variant="outline"
                className="border-slate-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="bg-slate-900 border-red-500/30 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>

        <Button
          onClick={reset}
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </Card>
    </div>
  );
}
