'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { Globe, Menu, X, User, LogOut } from 'lucide-react';

export function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
            <span className="font-bold text-slate-900 text-sm">AX</span>
          </div>
          <span className="font-bold text-gray-100">AlgoXpertHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
            {t.nav.features}
          </Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
            {t.nav.pricing}
          </Link>
          <Link href="/performance" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
            {t.nav.performance}
          </Link>
          <Link href="/faq" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
            {t.nav.faq}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-gray-400 hover:text-gray-100 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
          </Button>
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-gray-100">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-gray-400 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-300 hover:text-gray-100">
                  Login
                </Button>
              </Link>
              <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                  {t.nav.joinWaitlist}
                </Button>
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-gray-400 hover:text-gray-100"
          >
            <Globe className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/features"
              className="text-gray-400 hover:text-gray-100 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              {t.nav.features}
            </Link>
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-gray-100 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="/performance"
              className="text-gray-400 hover:text-gray-100 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              {t.nav.performance}
            </Link>
            <Link
              href="/faq"
              className="text-gray-400 hover:text-gray-100 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              {t.nav.faq}
            </Link>
            <a href="https://t.me/AlgoXpertHub" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                {t.nav.joinWaitlist}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
