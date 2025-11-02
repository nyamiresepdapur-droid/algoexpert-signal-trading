# ⚡ Quick Start Guide - 5 Minutes Setup

## 🎯 Goal
Get admin panel running and make your first test payment in 5 minutes!

---

## Step 1: Setup Supabase (2 minutes)

### 1.1 Create Project
1. Go to **https://supabase.com** → Sign up
2. Click **"New Project"**
3. Name: `indotraderxpert`
4. Password: Save it!
5. Region: `Southeast Asia`
6. **Wait 2 minutes** for setup

### 1.2 Get API Keys
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL`
   - `anon public key`

### 1.3 Create Admin Account
1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Email: `admin@test.com`
4. Password: `admin123`
5. ✅ Auto confirm user

### 1.4 Promote to Admin
1. Go to **Table Editor** → **profiles**
2. Find your user row
3. Change `role` from `user` to `super_admin`
4. Save

---

## Step 2: Configure Environment (1 minute)

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 3: Run App (1 minute)

```bash
npm install
npm run dev
```

Open: **http://localhost:3000**

---

## Step 4: Login as Admin (30 seconds)

1. Go to: **http://localhost:3000/auth/login**
2. Email: `admin@test.com`
3. Password: `admin123`
4. Click **Login**

---

## Step 5: Access Admin Panel (30 seconds)

1. After login, go to: **http://localhost:3000/admin/dashboard**
2. You'll see:
   - 📊 Statistics dashboard
   - 💳 Payment management
   - 🎫 Promo codes
   - 👥 User management

---

## 🎉 Done! What's Next?

### Create Test Promo Code
1. Go to `/admin/promo-codes`
2. Click **"New Promo Code"**
3. Code: `TEST50`
4. Type: `Percentage`
5. Value: `50`
6. Click **Create**

### Test Subscription Flow
1. Logout from admin
2. Sign up as regular user
3. Go to `/subscription`
4. Click **"Pilih Paket"** on Pro plan
5. Enter promo code: `TEST50`
6. See 50% discount applied!

---

## 🔐 Admin Panel URLs

| Page | URL | What you can do |
|------|-----|-----------------|
| **Dashboard** | `/admin/dashboard` | View statistics, recent activity |
| **Promo Codes** | `/admin/promo-codes` | Create/edit discount codes |
| **Payments** | `/admin/payments` | View all transactions (coming soon) |
| **Users** | `/admin/users` | Manage users & roles (coming soon) |

---

## 🚨 Important Security Notes

**⚠️ For Production:**
1. Change admin password immediately
2. Never use `admin@test.com` in production
3. Add proper email verification
4. Use strong passwords
5. Enable 2FA on Supabase

**🔒 Keep Secret:**
- Service role key
- Duitku API key
- Admin credentials

---

## 💳 Add Payment Gateway (Optional)

### Quick Duitku Setup

1. **Register:**
   - Sandbox: https://sandbox.duitku.com
   - Get Merchant Code + API Key

2. **Add to Supabase:**
   - Go to **Edge Functions** → **Manage secrets**
   - Add:
     ```
     DUITKU_MERCHANT_CODE=D12345
     DUITKU_API_KEY=your_key
     DUITKU_MODE=sandbox
     ```

3. **Test Payment:**
   - Select paid plan
   - Choose payment method
   - Complete in Duitku sandbox

---

## ❓ Troubleshooting

### "Access Denied" when accessing admin panel
**Fix:**
```sql
-- Run in Supabase SQL Editor
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'your@email.com';
```

### Can't see profiles table
**Fix:** Tables are auto-created on first user signup. Sign up first!

### Environment variables not working
**Fix:** Restart dev server after changing `.env.local`

---

## 📚 Full Documentation

For detailed setup and advanced features:
- Read: `COMPLETE_SETUP_GUIDE.md`
- Or visit admin panel help section

---

## ✅ Quick Checklist

- [ ] Supabase project created
- [ ] Admin user created
- [ ] Role changed to super_admin
- [ ] Environment variables set
- [ ] App running on localhost:3000
- [ ] Can login as admin
- [ ] Admin dashboard accessible
- [ ] Test promo code created

---

**🚀 You're all set! Start managing your trading platform!**

**Admin Login:** http://localhost:3000/auth/login (admin@test.com / admin123)

**Admin Panel:** http://localhost:3000/admin/dashboard
