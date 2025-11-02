# Multi-Language System (i18n)

## 🌍 Auto Language Detection

Website akan otomatis mendeteksi bahasa pengunjung berdasarkan:

1. **Browser Language** - Dari `navigator.language`
2. **Saved Preference** - Dari `localStorage`

### Supported Languages:
- 🇺🇸 **English (EN)** - Default
- 🇮🇩 **Bahasa Indonesia (ID)** - Auto-detected untuk visitor dari Indonesia

---

## 🔧 How It Works

### 1. Auto Detection Flow:

```
Visitor Masuk
    ↓
Check localStorage untuk saved preference
    ↓
Jika tidak ada, detect dari browser language
    ↓
Jika browser language = "id" atau "id-ID" → Set ke Bahasa Indonesia
    ↓
Jika tidak → Set ke English (default)
    ↓
Save preference ke localStorage
```

### 2. Language Toggle:

User bisa manual switch language dengan klik:
- **Globe icon (🌐)** di header
- Toggle antara **EN** ⟷ **ID**
- Preference disimpan ke localStorage

---

## 📝 Implementation

### File Structure:

```
lib/
├── i18n.ts                 # Config & detection logic
├── translations.ts         # All translations (EN & ID)
└── LanguageContext.tsx     # React context for language state
```

### Usage in Components:

```tsx
'use client';

import { useLanguage } from '@/lib/LanguageContext';

export function MyComponent() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
    </div>
  );
}
```

---

## 🎯 Features

### ✅ Implemented:
- [x] Auto browser language detection
- [x] localStorage persistence
- [x] Manual language toggle (Globe icon in header)
- [x] Hero section translations
- [x] Navigation translations
- [x] Complete EN & ID translations for homepage

### 🚀 What Happens:

**Visitor dari Indonesia:**
1. Browser language = `id-ID`
2. System detects Indonesian
3. Page loads dalam **Bahasa Indonesia**
4. User sees: "Sinyalnya Sempurna. Kenapa Anda Masih Rugi?"

**Visitor dari US/International:**
1. Browser language = `en-US`
2. System detects English
3. Page loads dalam **English**
4. User sees: "The Signal Was Perfect. Why Did You Still Lose?"

---

## 🔄 Switching Languages

**Method 1: Automatic (Based on Browser)**
- Visitor's browser language determines initial language
- Saved to localStorage on first visit

**Method 2: Manual Toggle**
- Click Globe icon (🌐) in header
- Toggle between EN ⟷ ID
- Preference saved to localStorage
- Works on all pages

---

## 📊 Translation Coverage

### Currently Translated:
- **Hero Section**: Title, subtitle, emotion cards
- **Navigation**: All menu items
- **CTA Buttons**: Join Waitlist, etc.

### To Be Added (if needed):
- Problem section (detailed trader stories)
- Solution section (manual vs automated)
- Features section
- Waitlist section
- Performance cards
- FAQ section

---

## 🌐 Testing

### Test EN (English):
1. Open browser in incognito
2. Set browser language to English
3. Visit site → Should show English

### Test ID (Indonesian):
1. Open browser in incognito
2. Set browser language to Indonesian
3. Visit site → Should show Bahasa Indonesia

### Test Toggle:
1. Click Globe icon in header
2. Switch between EN/ID
3. Reload page → Should remember preference

---

## 💡 Technical Notes

- Uses React Context API for state management
- `localStorage` for persistence
- Client-side rendering for language detection
- SSR returns default (EN) to avoid hydration issues
- Automatic re-render on language change

---

## 🎨 Similar to telegramsignalcopier.com

Sistem ini bekerja sama seperti https://telegramsignalcopier.com/:
- Auto-detect berdasarkan visitor location/browser
- Smooth transition antara bahasa
- No page reload needed
- Preference disimpan untuk kunjungan berikutnya
