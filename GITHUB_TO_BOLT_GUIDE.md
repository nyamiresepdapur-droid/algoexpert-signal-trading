# 🚀 Panduan: Memindahkan Project ke Bolt.new via GitHub

## 📋 Langkah-Langkah Lengkap

### **STEP 1: Setup Git Repository (Lokal)**

**📍 PENTING: Buka PowerShell terlebih dahulu!**

**Cara buka PowerShell:**
1. Tekan **Windows + R**
2. Ketik: `powershell`
3. Tekan **Enter**

**Atau:**
1. Buka folder `project` di File Explorer
2. Klik kanan → **"Open PowerShell window here"**

---

**1. Masuk ke folder project:**
   ```powershell
   cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
   ```
   Tekan **Enter**

**2. Cek apakah sudah ada Git:**
   ```powershell
   git status
   ```
   Tekan **Enter**
   
   **Hasil:**
   - ✅ Jika muncul info tentang branch → Git sudah ada! Skip ke STEP 4
   - ❌ Jika muncul "fatal: not a git repository" → Lanjut ke step 3

**3. Inisialisasi Git (jika belum ada):**
   ```powershell
   git init
   ```
   Tekan **Enter**
   
   **Harus muncul:** `Initialized empty Git repository...`

**4. Tambahkan semua file:**
   ```powershell
   git add .
   ```
   Tekan **Enter**
   
   **Tidak ada output = BERHASIL** ✅

**5. Commit pertama:**
   ```powershell
   git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
   ```
   Tekan **Enter**
   
   **Harus muncul:** `[main (root-commit) xxxxxxx] Phase 1 MVP...`
   
   ✅ **Selesai! Git sudah setup di lokal**

**💡 Masih bingung? Lihat file `CARA_MUDAH_GITHUB.md` untuk panduan visual lengkap!**

---

### **STEP 2: Buat Repository di GitHub**

1. **Login ke GitHub**
   - Buka https://github.com
   - Login dengan akun kamu

2. **Buat Repository Baru**
   - Klik tombol **"New"** atau **"+"** → **"New repository"**
   - **Repository name**: `algoexpert-signal-trading` (atau nama lain)
   - **Description**: "Trading Signal Platform with Auto-Trade"
   - **Visibility**: 
     - ✅ Public (gratis, bisa import ke Bolt.new)
     - ⚠️ Private (perlu setup access token)
   - **JANGAN** centang:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - Klik **"Create repository"**

3. **Copy Repository URL**
   - Setelah repository dibuat, kamu akan lihat URL seperti:
   - `https://github.com/YOUR_USERNAME/algoexpert-signal-trading.git`
   - Copy URL ini!

---

### **STEP 3: Connect Lokal ke GitHub**

1. **Tambahkan remote repository**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/algoexpert-signal-trading.git
   ```
   *Ganti `YOUR_USERNAME` dan `algoexpert-signal-trading` dengan yang sesuai*

2. **Cek remote sudah benar**
   ```bash
   git remote -v
   ```
   - Harus muncul 2 baris dengan URL GitHub kamu

3. **Rename branch ke main (jika perlu)**
   ```bash
   git branch -M main
   ```

4. **Push ke GitHub**
   ```bash
   git push -u origin main
   ```
   
   **Jika muncul error authentication:**
   - GitHub sekarang pakai Personal Access Token (PAT)
   - Lihat STEP 4 untuk cara buat PAT

---

### **STEP 4: Setup GitHub Authentication (Jika Diperlukan)**

**Jika `git push` minta username/password:**

1. **Buat Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Klik **"Generate new token"** → **"Generate new token (classic)"**
   - **Note**: `Bolt.new Access`
   - **Expiration**: Pilih sesuai kebutuhan (misal: 90 days)
   - **Select scopes**: 
     - ✅ `repo` (semua checkbox di bawah repo)
   - Klik **"Generate token"**
   - **COPY TOKEN SEKARANG!** (hanya muncul sekali)

2. **Gunakan Token untuk Push**
   - Username: `YOUR_GITHUB_USERNAME`
   - Password: `PASTE_TOKEN_DISINI`

   Atau setup credential helper:
   ```bash
   git config --global credential.helper store
   git push -u origin main
   ```
   - Masukkan username & token (sebagai password)

---

### **STEP 5: Import ke Bolt.new**

1. **Buka Bolt.new**
   - Go to: https://bolt.new
   - Login dengan akun kamu (atau buat akun baru)

2. **Import dari GitHub**
   - Klik tombol **"New"** atau **"+"**
   - Pilih **"Import from GitHub"** atau **"From GitHub"**
   - Masukkan URL repository:
     - Format: `https://github.com/YOUR_USERNAME/algoexpert-signal-trading`
     - Atau: `YOUR_USERNAME/algoexpert-signal-trading`
   - Klik **"Import"** atau **"Create"**

3. **Tunggu Import Selesai**
   - Bolt.new akan:
     - Clone repository
     - Install dependencies
     - Setup project
   - Ini mungkin butuh 1-2 menit

4. **Setup Environment Variables**
   - Di Bolt.new, buat file `.env.local`
   - Tambahkan:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

---

### **STEP 6: Run Database Migration**

1. **Buka Supabase Dashboard**
   - Login ke https://app.supabase.com
   - Pilih project kamu

2. **Buka SQL Editor**
   - Klik **"SQL Editor"** di sidebar
   - Klik **"New query"**

3. **Run Migration**
   - Buka file: `supabase/migrations/20250131000000_phase1_auto_trade_system.sql`
   - Copy semua isinya
   - Paste ke SQL Editor
   - Klik **"Run"** atau tekan `Ctrl+Enter`

4. **Verify Migration**
   - Check apakah semua tables sudah dibuat:
     - `signal_providers`
     - `user_signal_settings`
     - `auto_trade_configs`
     - `trade_executions`
     - `admin_analytics`

---

### **STEP 7: Test di Bolt.new**

1. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Di terminal Bolt.new

2. **Buka Preview**
   - Bolt.new akan auto-generate preview URL
   - Atau klik tombol "Open in Browser"

3. **Test Pages**
   - `/admin/signals` - Admin signal push
   - `/signals` - User signal dashboard
   - `/signals/[id]/settings` - Signal settings (ganti [id] dengan signal ID)

---

## 🔧 Troubleshooting

### **Error: "Authentication failed"**
- Pastikan sudah pakai Personal Access Token (bukan password)
- Check token masih valid & punya permission `repo`

### **Error: "Repository not found"**
- Pastikan repository visibility adalah **Public**
- Atau pastikan token punya akses ke private repo

### **Error: "Could not import" di Bolt.new**
- Pastikan repository URL benar
- Pastikan repository tidak kosong (sudah ada commit)
- Coba refresh Bolt.new dan import lagi

### **Dependencies Error di Bolt.new**
- Run: `npm install` di terminal Bolt.new
- Pastikan `package.json` sudah ada di repository

---

## ✅ Checklist

- [ ] Git initialized di lokal
- [ ] Semua file sudah di-commit
- [ ] Repository dibuat di GitHub
- [ ] Remote origin sudah ditambahkan
- [ ] Push ke GitHub berhasil
- [ ] Import ke Bolt.new berhasil
- [ ] Environment variables sudah di-set
- [ ] Database migration sudah di-run
- [ ] `npm install` sudah di-run
- [ ] Development server berjalan

---

## 🎯 Quick Command Reference

```bash
# Setup Git
cd project
git init
git add .
git commit -m "Phase 1 MVP"

# Connect ke GitHub
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main

# Update di masa depan
git add .
git commit -m "Update message"
git push
```

---

**Siap untuk push ke GitHub?** 🚀

Jika ada error atau bingung di step manapun, beri tahu saya!

