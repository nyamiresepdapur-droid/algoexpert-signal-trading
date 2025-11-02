import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AlgoXpertHub - Copy Verified Forex Signals with 80% Winrate',
  description: '35,000+ Pips in 10 Weeks | 3.75:1 Risk:Reward Ratio | Professional copy trading platform with advanced risk management',
  keywords: 'forex, crypto, copy trading, signals, MetaAPI, automated trading, risk management',
  openGraph: {
    title: 'AlgoXpertHub - Copy Verified Forex Signals with 80% Winrate',
    description: '35,000+ Pips in 10 Weeks | 3.75:1 Risk:Reward Ratio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script id="ALGOXPERT-ANALYTICS" dangerouslySetInnerHTML={{ __html: '' }} />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <LanguageProvider>
                <Header />
                {children}
                <Footer />
                <Toaster position="top-right" richColors />
              </LanguageProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
