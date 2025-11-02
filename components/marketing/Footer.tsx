import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                <span className="font-bold text-slate-900 text-sm">AX</span>
              </div>
              <span className="font-bold text-gray-100">AlgoXpertHub</span>
            </div>
            <p className="text-sm text-gray-500">
              Professional Forex/Crypto copy trading platform with verified 80% winrate.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/performance" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Performance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://t.me/algoxperthub" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 AlgoXpertHub. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center md:text-right max-w-md">
            Trusted by 500+ traders. Trading involves risk. Past performance doesn't guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
