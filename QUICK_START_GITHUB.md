# ⚡ Quick Start: Push ke GitHub dalam 5 Menit

## 🚀 Command Lengkap (Copy-Paste Ready)

### **1. Inisialisasi Git (jika belum)**
```powershell
cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
git init
```

### **2. Tambahkan semua file**
```powershell
git add .
```

### **3. Commit pertama**
```powershell
git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
```

### **4. Connect ke GitHub**
```powershell
# GANTI YOUR_USERNAME dan REPO_NAME dengan yang sesuai!
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 📝 Step-by-Step Detail

### **A. Setup Git Lokal** (2 menit)

1. **Buka PowerShell atau Terminal**
2. **Masuk ke folder project:**
   ```powershell
   cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
   ```

3. **Cek apakah sudah ada Git:**
   ```powershell
   git status
   ```
   - ✅ Jika muncul status → sudah ada Git, skip ke step B
   - ❌ Jika error → lanjut inisialisasi:
     ```powershell
     git init
     ```

4. **Tambahkan semua file:**
   ```powershell
   git add .
   ```

5. **Commit:**
   ```powershell
   git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
   ```

---

### **B. Buat Repository di GitHub** (2 menit)

1. **Buka https://github.com** dan login

2. **Klik tombol hijau "New"** atau ikon **"+"** di pojok kanan atas

3. **Isi form:**
   - **Repository name**: `algoexpert-signal-trading` (atau nama lain)
   - **Description**: `Trading Signal Platform with Auto-Trade`
   - **Visibility**: 
     - ✅ **Public** (recommended untuk Bolt.new)
     - ⚠️ Private (perlu setup token)
   - **JANGAN centang apapun** (no README, no .gitignore, no license)

4. **Klik "Create repository"**

5. **Copy URL repository** yang muncul (contoh: `https://github.com/username/algoexpert-signal-trading.git`)

---

### **C. Push ke GitHub** (1 menit)

**GANTI `YOUR_USERNAME` dan `algoexpert-signal-trading` dengan yang sesuai!**

```powershell
# Tambahkan remote
git remote add origin https://github.com/YOUR_USERNAME/algoexpert-signal-trading.git

# Rename branch ke main (jika perlu)
git branch -M main

# Push
git push -u origin main
```

**Jika muncul popup authentication:**
- **Username**: Masukkan username GitHub kamu
- **Password**: Masukkan **Personal Access Token** (bukan password GitHub!)
  - Jika belum punya token, lihat cara buat di bawah ⬇️

---

### **D. Buat Personal Access Token (Jika Diperlukan)**

**Jika `git push` minta password:**

1. Buka: https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Isi:
   - **Note**: `Bolt.new Access`
   - **Expiration**: Pilih `90 days` atau sesuai kebutuhan
   - **Select scopes**: Centang ✅ `repo` (semua checkbox di bawahnya)
4. Scroll bawah, klik **"Generate token"**
5. **COPY TOKEN SEKARANG!** (hanya muncul sekali)
6. Gunakan token ini sebagai password saat `git push`

---

### **E. Import ke Bolt.new** (1 menit)

1. **Buka https://bolt.new**
2. **Login** (atau buat akun baru)
3. **Klik "New"** → **"Import from GitHub"**
4. **Masukkan URL repository:**
   - Format pendek: `YOUR_USERNAME/algoexpert-signal-trading`
   - Atau full: `https://github.com/YOUR_USERNAME/algoexpert-signal-trading`
5. **Klik "Import"**
6. **Tunggu 1-2 menit** sampai import selesai

---

## ✅ Verify Berhasil

Setelah push berhasil, kamu bisa cek di:
- **GitHub**: https://github.com/YOUR_USERNAME/algoexpert-signal-trading
- Semua file kamu harus ada di sana

Setelah import ke Bolt.new:
- Semua file harus muncul di file explorer Bolt.new
- Terminal bisa run `npm install` dan `npm run dev`

---

## 🔧 Troubleshooting

### **Error: "fatal: not a git repository"**
```powershell
# Pastikan kamu di folder project yang benar
cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
git init
```

### **Error: "Authentication failed"**
- Gunakan **Personal Access Token**, bukan password GitHub
- Pastikan token punya permission `repo`

### **Error: "Repository not found"**
- Pastikan repository visibility adalah **Public**
- Atau pastikan token punya akses ke private repo

### **Error: "remote origin already exists"**
```powershell
# Hapus remote lama
git remote remove origin
# Tambahkan lagi
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

---

## 📋 Checklist Cepat

- [ ] Git initialized (`git init`)
- [ ] File di-commit (`git commit`)
- [ ] Repository dibuat di GitHub
- [ ] Remote ditambahkan (`git remote add`)
- [ ] Push berhasil (`git push`)
- [ ] Import ke Bolt.new berhasil

---

**Siap untuk mulai? Copy command di atas dan jalankan!** 🚀

Jika ada error, paste error message-nya dan saya akan bantu troubleshoot!

