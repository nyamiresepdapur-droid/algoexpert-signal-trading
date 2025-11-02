# 🚀 Panduan Memindahkan Project ke Bolt.new untuk Testing UI

## 📋 Opsi yang Tersedia

### **Opsi 1: Export Files Manual (Paling Mudah)** ✅

1. **Copy File-File Penting**
   - File-file yang sudah dibuat:
     - `supabase/migrations/20250131000000_phase1_auto_trade_system.sql`
     - `app/admin/signals/page.tsx`
     - `app/signals/[id]/settings/page.tsx`
     - `components/signals/SignalDashboard.tsx` (updated)
     - `app/admin/dashboard/page.tsx` (updated)

2. **Buka Bolt.new**
   - Go to https://bolt.new
   - Create new project
   - Paste file satu per satu

3. **Atau Import dari Clipboard**
   - Copy entire file content
   - Paste di Bolt.new editor

---

### **Opsi 2: Export Sebagai ZIP (Recommended)** ⭐

**Script untuk Export Files:**

```bash
# Buat folder export
mkdir bolt-export

# Copy semua file yang sudah dibuat
cp -r project/supabase/migrations/20250131000000_phase1_auto_trade_system.sql bolt-export/
cp -r project/app/admin/signals bolt-export/
cp -r project/app/signals bolt-export/
cp -r project/components/signals/SignalDashboard.tsx bolt-export/
cp -r project/app/admin/dashboard/page.tsx bolt-export/

# Buat ZIP
cd bolt-export
zip -r ../bolt-export.zip .
```

**Atau Manual:**
1. Select semua file yang sudah dibuat
2. ZIP mereka
3. Upload ke bolt.new (jika support)
4. Atau extract dan copy paste

---

### **Opsi 3: Push ke GitHub & Import (Best Practice)** 🏆

1. **Inisialisasi Git (jika belum)**
```bash
cd project
git init
git add .
git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
```

2. **Push ke GitHub**
```bash
# Buat repo baru di GitHub
# Lalu:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. **Import ke Bolt.new**
   - Buka Bolt.new
   - Klik "Import from GitHub"
   - Masukkan repo URL
   - Bolt.new akan clone & sync

---

### **Opsi 4: Export Kecepatan File List** ⚡

File-file yang perlu di-copy:

#### **Database Migration:**
```
project/supabase/migrations/20250131000000_phase1_auto_trade_system.sql
```

#### **Admin Pages:**
```
project/app/admin/signals/page.tsx
project/app/admin/dashboard/page.tsx (sudah diupdate)
```

#### **User Pages:**
```
project/app/signals/[id]/settings/page.tsx
```

#### **Components:**
```
project/components/signals/SignalDashboard.tsx (sudah diupdate dengan real-time + modal)
```

#### **Config Files (jika perlu):**
```
project/package.json (untuk dependencies)
project/tsconfig.json
project/tailwind.config.ts
```

---

## 📝 Checklist File untuk Copy-Paste Manual

### **1. Database Migration** (Wajib)
- [ ] `supabase/migrations/20250131000000_phase1_auto_trade_system.sql`

### **2. Admin Pages** (Wajib)
- [ ] `app/admin/signals/page.tsx`
- [ ] `app/admin/dashboard/page.tsx` (yang sudah diupdate dengan link "Manage Signals")

### **3. User Pages** (Wajib)
- [ ] `app/signals/[id]/settings/page.tsx`

### **4. Components** (Wajib)
- [ ] `components/signals/SignalDashboard.tsx` (yang sudah diupdate)

### **5. Dependencies** (Opsional, tapi recommended)
- [ ] Cek `package.json` untuk dependencies yang dibutuhkan:
  - `@supabase/supabase-js`
  - `@radix-ui/*` (semua UI components)
  - `lucide-react`
  - `next`, `react`, `typescript`
  - dll

---

## 🔧 Setup di Bolt.new Setelah Import

### **1. Install Dependencies**
Di terminal Bolt.new, jalankan:
```bash
npm install
```

### **2. Setup Environment Variables**
Buat file `.env.local` di Bolt.new:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **3. Run Database Migration**
- Buka Supabase Dashboard
- Go to SQL Editor
- Copy paste isi `20250131000000_phase1_auto_trade_system.sql`
- Run migration

### **4. Test**
```bash
npm run dev
```

---

## 🎯 Quick Copy-Paste Method

**Untuk test cepat di Bolt.new:**

1. **Buka file di editor lokal**
2. **Select All (Ctrl+A / Cmd+A)**
3. **Copy (Ctrl+C / Cmd+C)**
4. **Buka Bolt.new**
5. **Create new file dengan nama yang sama**
6. **Paste (Ctrl+V / Cmd+V)**
7. **Repeat untuk semua file**

**Urutan Copy-Paste (Recommended):**
1. Database migration SQL
2. Components (SignalDashboard.tsx)
3. Admin pages (admin/signals/page.tsx)
4. User pages (signals/[id]/settings/page.tsx)
5. Admin dashboard update (admin/dashboard/page.tsx)

---

## ⚠️ Notes Penting

1. **Dependencies**: Pastikan semua dependencies dari `package.json` sudah terinstall di Bolt.new
2. **Supabase Config**: Jangan lupa setup Supabase environment variables
3. **Database**: Migration harus di-run di Supabase dashboard terlebih dahulu
4. **File Structure**: Pastikan struktur folder sama dengan yang ada di project lokal

---

## 🚀 Alternative: Export Script

Jika kamu mau, saya bisa buatkan script Node.js untuk export semua file yang relevan ke satu folder. Mau dibuatkan?

---

## 📦 Minimal Files untuk Test UI

**Jika hanya mau test UI tanpa database:**
1. `app/admin/signals/page.tsx` - Admin signal push UI
2. `app/signals/[id]/settings/page.tsx` - User settings UI
3. `components/signals/SignalDashboard.tsx` - Signal dashboard

**File-file ini bisa di-test UI-nya langsung di Bolt.new tanpa database connection.**

---

**Ready untuk export? Pilih metode yang paling mudah untukmu!** 🎉

