# 🎯 Cara Mudah: Push ke GitHub (Untuk Pemula)

## 📍 Lokasi: Dimana harus jalankan command?

### **Cara 1: Pakai Windows PowerShell** (Recommended)
1. Tekan **Windows + R**
2. Ketik: `powershell`
3. Tekan **Enter**
4. Akan muncul jendela hitam (PowerShell)

### **Cara 2: Pakai File Explorer**
1. Buka folder project kamu:
   ```
   C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project
   ```
2. Klik kanan di folder `project` → **"Open in Terminal"** atau **"Open PowerShell window here"**

---

## 🚀 STEP 1: Masuk ke Folder Project

### **Langkah-langkah:**

1. **Buka PowerShell** (lihat cara di atas)

2. **Copy paste command ini:**
   ```powershell
   cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
   ```
   
   Tekan **Enter**

3. **Cek apakah sudah masuk ke folder yang benar:**
   ```powershell
   pwd
   ```
   
   Harus muncul: `C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project`

---

## 🔍 STEP 2: Cek Apakah Git Sudah Terinstall?

### **Langkah-langkah:**

1. **Cek versi Git:**
   ```powershell
   git --version
   ```
   
   Tekan **Enter**

2. **Hasil yang mungkin muncul:**

   ✅ **Jika muncul seperti ini:**
   ```
   git version 2.43.0.windows.1
   ```
   → **Git sudah terinstall!** Lanjut ke STEP 3

   ❌ **Jika muncul error seperti ini:**
   ```
   git : The term 'git' is not recognized...
   ```
   → **Git belum terinstall!** ⚠️ **INSTALL GIT DULU!**
   
   → Baca file: `CARA_INSTALL_GIT.md`
   → Atau: Download dari https://git-scm.com/download/win

---

## 🔍 STEP 2B: Cek Apakah Sudah Ada Git Repository?

**Setelah Git terinstall, cek repository:**

1. **Jalankan command ini:**
   ```powershell
   git status
   ```
   
   Tekan **Enter**

2. **Hasil yang mungkin muncul:**

   ✅ **Jika muncul seperti ini:**
   ```
   On branch main
   Your branch is up to date with 'origin/main'.
   ...
   ```
   → **Git repository sudah ada!** Skip ke STEP 4

   ❌ **Jika muncul error seperti ini:**
   ```
   fatal: not a git repository
   ```
   → **Git repository belum ada!** Lanjut ke STEP 3

---

## ⚙️ STEP 3: Setup Git (Jika Belum Ada)

### **Langkah-langkah:**

1. **Inisialisasi Git:**
   ```powershell
   git init
   ```
   
   Tekan **Enter**
   
   **Harus muncul:**
   ```
   Initialized empty Git repository in C:\Users\...\project\.git\
   ```

2. **Tambahkan semua file:**
   ```powershell
   git add .
   ```
   
   Tekan **Enter**
   
   **Tidak ada output = BERHASIL** ✅

3. **Cek file yang ditambahkan:**
   ```powershell
   git status
   ```
   
   **Harus muncul banyak file dengan nama "new file:"**
   - ✅ Jika muncul banyak file → BERHASIL!
   - ❌ Jika tidak ada file → ada masalah

4. **Simpan perubahan (Commit):**
   ```powershell
   git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
   ```
   
   Tekan **Enter**
   
   **Harus muncul:**
   ```
   [main (root-commit) xxxxxxx] Phase 1 MVP: Admin Signals + Auto-Trade System
   X files changed, X insertions(+)
   ```
   
   ✅ **Selesai! Git sudah setup di lokal**

---

## 📤 STEP 4: Push ke GitHub

### **Persiapan:**
1. **Pastikan sudah punya akun GitHub**
   - Jika belum: https://github.com/signup

2. **Buat Repository di GitHub** (lihat panduan di bawah)

3. **Setup Authentication** (lihat panduan di bawah)

---

## 🎯 Visual Guide: Apa yang Terjadi?

### **Sebelum Git:**
```
📁 project/
  📄 file1.tsx
  📄 file2.tsx
  📄 file3.tsx
  ...
```
→ File-file hanya ada di komputer kamu

### **Setelah `git init`:**
```
📁 project/
  📁 .git/          ← Folder Git (tersembunyi)
  📄 file1.tsx
  📄 file2.tsx
  ...
```
→ Git mulai tracking file-file kamu

### **Setelah `git add .`:**
```
📁 project/
  📁 .git/
    📦 staging area  ← File-file sudah "disiapkan"
  📄 file1.tsx      ← Siap di-commit
  📄 file2.tsx      ← Siap di-commit
  ...
```

### **Setelah `git commit`:**
```
📁 project/
  📁 .git/
    📚 history/     ← Semua file tersimpan di history
  📄 file1.tsx
  📄 file2.tsx
  ...
```
→ Semua file sudah "disimpan" di Git lokal

---

## ❓ FAQ - Pertanyaan Umum

### **Q1: Apa itu `git init`?**
**A:** `git init` = memulai Git repository di folder kamu. Seperti "mengaktifkan" fitur Git.

### **Q2: Apa itu `git add .`?**
**A:** `git add .` = menambahkan SEMUA file di folder ke "staging area". Titik (.) berarti "semua file".

### **Q3: Apa itu `git commit`?**
**A:** `git commit` = menyimpan snapshot semua file. Seperti "save point" di game.

### **Q4: Error "git: command not found"?**
**A:** Git belum terinstall! Download di: https://git-scm.com/download/win
- Install seperti biasa
- Restart PowerShell setelah install

### **Q5: Error "fatal: not a git repository"?**
**A:** Kamu tidak di folder yang benar, atau belum run `git init`.
- Pastikan sudah `cd` ke folder `project`
- Run `git init` dulu

### **Q6: File mana yang akan di-commit?**
**A:** Semua file di folder `project` dan subfolder-nya, KECUALI:
- File di `.gitignore` (jika ada)
- File yang sudah di-ignore oleh Git

---

## 🎬 Contoh Sesi Lengkap

**Ini contoh apa yang kamu akan lihat di PowerShell:**

```powershell
PS C:\Users\...> cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
PS C:\Users\...\project> git status
fatal: not a git repository

PS C:\Users\...\project> git init
Initialized empty Git repository in C:\Users\...\project\.git\

PS C:\Users\...\project> git add .
PS C:\Users\...\project> git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   app/admin/signals/page.tsx
        new file:   app/signals/[id]/settings/page.tsx
        new file:   components/signals/SignalDashboard.tsx
        ... (banyak file lainnya)

PS C:\Users\...\project> git commit -m "Phase 1 MVP: Admin Signals + Auto-Trade System"
[main (root-commit) abc1234] Phase 1 MVP: Admin Signals + Auto-Trade System
 150 files changed, 5000 insertions(+)

PS C:\Users\...\project> ✅ SELESAI!
```

---

## ✅ Checklist STEP 1-3

Setelah selesai STEP 3, pastikan:

- [ ] `git status` tidak error lagi
- [ ] `git status` menampilkan "On branch main"
- [ ] `git commit` berhasil dengan pesan sukses
- [ ] Tidak ada error merah di PowerShell

**Jika semua checklist ✅ → LANJUT ke STEP 4 (Push ke GitHub)**

---

## 📚 Next Steps

Setelah STEP 1-3 selesai, lanjut ke:
1. **Buat Repository di GitHub** (lihat file `GITHUB_TO_BOLT_GUIDE.md` bagian STEP 2)
2. **Push ke GitHub** (lihat file `GITHUB_TO_BOLT_GUIDE.md` bagian STEP 3)

---

**Masih bingung?** 
- Screenshot error message kamu
- Atau copy-paste pesan error dari PowerShell
- Saya akan bantu troubleshoot! 🚀

