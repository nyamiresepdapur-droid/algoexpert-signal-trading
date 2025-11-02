# 🚀 Deployment Guide - AlgoXpertHub

## OPSI 1: VERCEL (RECOMMENDED - GRATIS & MUDAH)

### Kenapa Vercel?
- ✅ Dibuat khusus untuk Next.js
- ✅ Deploy gratis unlimited
- ✅ SSL certificate otomatis
- ✅ CDN global (website super cepat)
- ✅ Auto deploy dari Git
- ✅ Custom domain gratis

### Langkah-langkah:

#### 1. Push Code ke GitHub
```bash
# Jika belum ada repo
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create repo di GitHub.com lalu:
git remote add origin https://github.com/USERNAME/algoxperthub.git
git push -u origin main
```

#### 2. Deploy ke Vercel
1. Kunjungi https://vercel.com
2. Sign up dengan GitHub account
3. Click "Add New Project"
4. Import repository AlgoXpertHub
5. Vercel auto-detect Next.js settings ✅
6. Click "Deploy"
7. Tunggu 1-2 menit → Website live!

#### 3. Connect Custom Domain
1. Di Vercel dashboard → Settings → Domains
2. Add domain Anda (contoh: algoxperthub.com)
3. Copy DNS records yang diberikan:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Paste di DNS settings domain provider Anda
5. Tunggu 10-60 menit → Domain connected!

#### 4. Setup Environment Variables
1. Di Vercel dashboard → Settings → Environment Variables
2. Add variables dari `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
3. Click "Save"
4. Redeploy project

✅ DONE! Website live di domain Anda!

---

## OPSI 2: NETLIFY (ALTERNATIF GRATIS)

Similar dengan Vercel, juga bagus untuk Next.js.

### Langkah-langkah:

1. Push code ke GitHub (sama seperti di atas)
2. Kunjungi https://netlify.com
3. Sign up dengan GitHub
4. "Add new site" → "Import from Git"
5. Select repository
6. Build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```
7. Deploy!
8. Custom domain: Sites settings → Domain management

---

## OPSI 3: CPANEL / SHARED HOSTING

⚠️ **TIDAK RECOMMENDED** untuk Next.js karena:
- Next.js butuh Node.js server
- Shared hosting biasanya hanya support static HTML/PHP
- Performa jelek

Tapi jika harus pakai cPanel, ada 2 cara:

### A. Export Static (Terbatas Fitur)

Next.js bisa di-export jadi static HTML:

```bash
# 1. Update next.config.js
# Tambahkan:
output: 'export'

# 2. Build
npm run build

# 3. Upload folder 'out/' ke public_html via FTP/cPanel
```

⚠️ **WARNING:**
- API routes tidak jalan
- Dynamic features hilang
- Supabase form mungkin tidak jalan

### B. Node.js Hosting (cPanel Advanced)

Jika hosting support Node.js:

```bash
# 1. Build production
npm run build

# 2. Upload semua files via FTP
# 3. Di cPanel → Setup Node.js App
# 4. Set entry point: npm start
# 5. Restart app
```

---

## OPSI 4: VPS (DigitalOcean, AWS, dll)

Untuk advanced users dengan VPS:

### Quick Deploy Script:

```bash
# 1. SSH ke VPS
ssh root@your-vps-ip

# 2. Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Clone repo
git clone https://github.com/USERNAME/algoxperthub.git
cd algoxperthub

# 5. Install dependencies
npm install

# 6. Create .env file
nano .env
# Paste environment variables
# Ctrl+X, Y, Enter to save

# 7. Build
npm run build

# 8. Start with PM2
pm2 start npm --name "algoxperthub" -- start
pm2 save
pm2 startup

# 9. Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/algoxperthub

# Paste config:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/algoxperthub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 10. Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## OPSI 5: HOSTINGER / NIAGAHOSTER

Kebanyakan shared hosting Indonesia (Hostinger, Niagahoster, dll) **TIDAK support Next.js** karena butuh Node.js server.

### Solusi:

**Pilihan A:** Gunakan Vercel (gratis) + Point domain ke Vercel
**Pilihan B:** Upgrade ke VPS mereka (jika ada)
**Pilihan C:** Static export (limited features)

---

## RECOMMENDATION

Untuk AlgoXpertHub project ini, saya **STRONGLY RECOMMEND VERCEL** karena:

1. ✅ **GRATIS selamanya** untuk project unlimited
2. ✅ **SSL certificate otomatis** (HTTPS)
3. ✅ **CDN global** - website cepat dari mana saja
4. ✅ **Auto deploy** - push to GitHub = auto update website
5. ✅ **Zero configuration** - sudah optimal untuk Next.js
6. ✅ **Analytics built-in**
7. ✅ **Custom domain gratis**
8. ✅ **Unlimited bandwidth**
9. ✅ **99.99% uptime**

### Proses Deploy ke Vercel:
```
Push ke GitHub (5 menit)
    ↓
Import ke Vercel (2 menit)
    ↓
Connect domain (10-60 menit DNS propagation)
    ↓
✅ LIVE!
```

Total waktu: **< 1 jam** dan website sudah production-ready!

---

## NEXT STEPS

Beritahu saya jenis hosting yang Anda punya, saya akan guide step-by-step untuk deploy! 🚀

Pilihan:
1. "Saya pakai Vercel" → Saya guide deploy ke Vercel
2. "Saya pakai cPanel/shared hosting" → Saya bantu static export
3. "Saya punya VPS" → Saya guide VPS setup
4. "Saya belum punya hosting" → Recommend Vercel (gratis)
