# IndoTraderXpert

Platform agregator sinyal & auto-trade untuk trader Indonesia. Website marketing production-grade dengan Next.js 14, TypeScript, dan Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Features

- Landing page dengan hero section dan CTA
- Halaman fitur lengkap dengan detail
- Pricing table dengan 3 paket (Basic, Pro, VIP)
- Performance proof dengan chart interaktif (weekly & monthly)
- FAQ accordion
- Legal pages (Terms, Privacy, Disclaimer)
- Dashboard demo (mock UI, read-only)
- Responsive design (mobile-first)
- Dark theme dengan brand colors
- SEO optimized dengan metadata

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── fitur/                # Features page
│   ├── harga/                # Pricing page
│   ├── proof/                # Performance proof
│   ├── faq/                  # FAQ page
│   ├── dashboard/            # Demo dashboard
│   └── legal/                # Legal pages
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── marketing/            # Custom marketing components
├── data/
│   └── performance/          # Performance data (JSON)
└── lib/                      # Utilities

```

## Performance Data

Data performa trading disimpan di `data/performance/`:

- `weekly.json` - Performa mingguan (Senin-Jumat)
- `october.json` - Data Oktober per symbol
- `september.json` - Data September per symbol

Format data dapat disesuaikan sesuai kebutuhan.

## Brand Colors

- Navy: `#0B1220`
- Slate: `#0F172A`
- Text: `#E5E7EB`
- Gold Accent: `#FBBF24`
- Profit Green: `#22C55E`
- Loss Red: `#EF4444`

## Deployment

### Vercel (Recommended)

1. Push ke GitHub repository
2. Import ke Vercel
3. Deploy otomatis

### Manual Deploy

```bash
npm run build
npm start
```

## Environment Variables

Tidak ada environment variables yang diperlukan untuk versi dasar. Untuk fitur tambahan (analytics, payment gateway, dll), tambahkan di `.env.local`.

## Notes

- **Dashboard** adalah mock UI untuk demo saja, tidak ada fungsionalitas real
- **Auto-trade** dan **MetaAPI** adalah fitur yang dijelaskan di website, implementasi actual memerlukan integrasi terpisah
- Data performance adalah dummy data untuk demo
- Tidak ada authentication atau payment processing di versi ini

## License

Proprietary - IndoTraderXpert

## Support

Untuk pertanyaan atau support, hubungi tim development.
