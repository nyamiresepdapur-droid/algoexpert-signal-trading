export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function getLocaleFromHeaders(headers: Headers): Locale {
  // Get accept-language header
  const acceptLanguage = headers.get('accept-language') || '';

  // Check if Indonesian is preferred
  if (acceptLanguage.toLowerCase().includes('id')) {
    return 'id';
  }

  // Default to English
  return 'en';
}

export function getLocaleFromNavigator(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const browserLang = window.navigator.language.toLowerCase();

  if (browserLang.startsWith('id')) {
    return 'id';
  }

  return 'en';
}
