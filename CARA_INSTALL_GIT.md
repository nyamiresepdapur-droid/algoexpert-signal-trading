# 🔧 Install Git di Windows (Langkah Mudah)

## ❌ Masalah: "git is not recognized"

Error ini berarti **Git belum terinstall** di komputer kamu. Mari install dulu!

---

## 📥 CARA INSTALL GIT (5 Menit)

### **Metode 1: Download & Install Manual** ⭐ Recommended

1. **Download Git:**
   - Buka: https://git-scm.com/download/win
   - Atau langsung download: https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe
   - File akan otomatis terdownload (~50MB)

2. **Install Git:**
   - Double-click file `Git-2.43.0-64-bit.exe` yang sudah didownload
   - Klik **"Next"** terus sampai selesai
   - **PENTING:** Gunakan default settings (jangan ubah apapun)
   - Klik **"Install"**
   - Tunggu sampai selesai (~2-3 menit)

3. **Restart PowerShell:**
   - **Tutup PowerShell yang sekarang**
   - Buka PowerShell lagi (Windows + R → ketik `powershell`)
   - Masuk ke folder project lagi:
     ```powershell
     cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
     ```

4. **Test Git:**
   ```powershell
   git --version
   ```
   
   **Harus muncul:**
   ```
   git version 2.43.0.windows.1
   ```
   (angka versi bisa berbeda, yang penting tidak error)
   
   ✅ **Jika muncul versi = Git sudah terinstall!**

---

### **Metode 2: Pakai Winget (Windows Package Manager)** ⚡ Lebih Cepat

Jika kamu pakai Windows 10/11 modern:

1. **Buka PowerShell sebagai Administrator:**
   - Tekan **Windows + X**
   - Pilih **"Windows PowerShell (Admin)"** atau **"Terminal (Admin)"**

2. **Install Git:**
   ```powershell
   winget install --id Git.Git -e --source winget
   ```

3. **Tunggu sampai selesai**

4. **Restart PowerShell** (tutup dan buka lagi)

5. **Test:**
   ```powershell
   git --version
   ```

---

### **Metode 3: Pakai Chocolatey** (Jika sudah punya Chocolatey)

```powershell
choco install git
```

---

## ✅ SETELAH INSTALL - Lanjut Setup Git

Setelah Git terinstall, lanjutkan dengan:

1. **Buka PowerShell baru** (penting: tutup yang lama, buka baru)

2. **Masuk ke folder project:**
   ```powershell
   cd "C:\Users\GEMBUL JP  BUY SELL\Downloads\project-bolt-sb1-ocrtavqa\project"
   ```

3. **Cek Git:**
   ```powershell
   git --version
   ```
   ✅ Harus muncul versi Git

4. **Setup Git (ikuti panduan sebelumnya):**
   ```powershell
   git init
   git add .
   git commit -m "Phase 1 MVP"
   ```

---

## 🎬 Visual Guide Install Git

### **Step 1: Download**
- Buka browser
- Go to: https://git-scm.com/download/win
- Klik tombol besar "Download for Windows"
- File akan terdownload

### **Step 2: Install**
- Cari file `Git-2.43.0-64-bit.exe` di folder Downloads
- Double-click
- Wizard akan muncul
- Klik "Next" → "Next" → ... → "Install"
- Tunggu sampai selesai
- Klik "Finish"

### **Step 3: Test**
- Buka PowerShell baru
- Ketik: `git --version`
- Harus muncul versi

---

## ❓ FAQ

### **Q: Harus install Git-2.43.0 atau versi lain?**
**A:** Versi apapun boleh, yang terbaru lebih baik. Installer akan auto-download versi terbaru.

### **Q: Berapa lama install?**
**A:** Sekitar 2-3 menit, tergantung kecepatan komputer.

### **Q: Apakah aman?**
**A:** Ya, Git adalah tool resmi untuk version control. Dipakai jutaan developer.

### **Q: Harus restart komputer?**
**A:** Tidak perlu restart komputer, cukup restart PowerShell saja.

### **Q: Apakah gratis?**
**A:** Ya, Git 100% gratis dan open source.

---

## 🚨 Troubleshooting

### **Masalah: "git --version" masih error setelah install**

**Solusi:**
1. **Tutup semua PowerShell/Terminal**
2. **Restart komputer** (untuk memastikan PATH ter-update)
3. **Buka PowerShell baru**
4. Test lagi: `git --version`

### **Masalah: Installer tidak jalan**

**Solusi:**
1. Klik kanan installer → **"Run as Administrator"**
2. Atau download ulang dari website resmi

### **Masalah: Installer stuck/tidak selesai**

**Solusi:**
1. Tutup installer
2. Restart komputer
3. Download ulang installer
4. Install lagi

---

## ✅ Checklist

Setelah install, pastikan:

- [ ] Download installer dari git-scm.com
- [ ] Install berhasil (tidak ada error)
- [ ] Tutup PowerShell yang lama
- [ ] Buka PowerShell baru
- [ ] `git --version` muncul versi (tidak error)
- [ ] Sudah masuk ke folder project

**Jika semua checklist ✅ → LANJUT ke setup Git repository!**

---

## 🎯 Next Step

Setelah Git terinstall, kembali ke file:
- `GITHUB_TO_BOLT_GUIDE.md` → STEP 1 (Setup Git Repository)
- Atau `CARA_MUDAH_GITHUB.md` → Lanjutkan dari STEP 2

---

**Install Git dulu, lalu test dengan `git --version`. Beri tahu saya jika sudah berhasil!** 🚀

