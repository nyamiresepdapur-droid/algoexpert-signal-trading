import { SectionTitle } from '@/components/marketing/SectionTitle';
import { PriceTable, Plan } from '@/components/marketing/PriceTable';

const plans: Plan[] = [
  {
    name: 'Basic',
    price: 'Rp 225K',
    period: 'bulan',
    features: [
      'Signal random harian (Pair, Gold, atau Crypto Spot)',
      'Eksposur portfolio yang beragam',
      'Advanced position sizing (risk %, balance %)',
      'Dynamic TP allocations',
      'Custom SL management',
      'Performance dashboard',
      'Email support',
      'Real-time Telegram notifications',
      'MetCloud untuk Forex (~$10/bulan, tanpa VPS)',
      'API Exchange untuk Crypto (Binance/Bybit)',
      'Unlimited Account MT5/MT4'
    ]
  },
  {
    name: 'Pro',
    price: 'Rp 375K',
    period: 'bulan',
    highlighted: true,
    features: [
      'Semua signal Pair (Multi-Pair Forex: 37 pair)',
      'Signal Crypto Spot (50+ pair, 66.48% WR)',
      'MetCloud untuk Forex (~$10/bulan, tanpa VPS)',
      'API Binance/Bybit untuk Crypto (setup 5 menit)',
      'Diversifikasi dengan multiple strategi',
      'Semua fitur Basic plan',
      'Unlimited Account MT5/MT4',
      'Advanced risk management per provider',
      'Perbandingan performa provider',
      'Priority email support',
      'Real-time Telegram notifications',
      'Advanced analytics & reporting'
    ]
  },
  {
    name: 'VIP',
    price: 'Rp 675K',
    period: 'bulan',
    features: [
      'Semua signal Pair (Multi-Pair Forex: 37 pair)',
      'Signal Gold (HF: 93%+ WR + Standard: 85% WR)',
      'Crypto Spot (50+ pair, 66.48% WR, 8,529% profit)',
      'Crypto Futures (67.04% WR, 25,578% profit, 2x vs Spot)',
      'MetCloud untuk Forex (~$10/bulan, tanpa VPS)',
      'API Binance/Bybit untuk Crypto (setup instant)',
      'Diversifikasi portfolio maksimal',
      'Semua fitur Pro plan',
      'Unlimited Account MT5/MT4',
      'Advanced risk management per provider',
      'Priority email support',
      '24/7 VIP support',
      'Advanced analytics & reporting',
      'Early access ke signal baru'
    ]
  },
];

export default function HargaPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Harga Transparan" subtitle="Pilih paket sesuai kebutuhan" />
        <PriceTable plans={plans} />
      </div>
    </div>
  );
}
