# 🚀 IndoTraderXpert - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Duitku Payment Gateway Setup](#duitku-setup)
4. [Admin Account Setup](#admin-setup)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-application)
7. [Admin Panel Guide](#admin-panel)
8. [Testing Payment Flow](#testing-payment)
9. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Supabase account (free tier works!)
- ✅ Duitku merchant account
- ✅ Basic understanding of Next.js

---

## 🗄️ Supabase Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - Project Name: `indotraderxpert`
   - Database Password: (save this!)
   - Region: `Southeast Asia (Singapore)`
4. Wait 2-3 minutes for project to be created

### Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbG...
   service_role key: eyJhbG... (keep secret!)
   ```

### Step 3: Run Database Migrations

All migrations are already deployed! The system includes:
- ✅ User profiles with role management
- ✅ Subscription plans (Trial, Basic, Pro, Premium)
- ✅ Payment tracking
- ✅ Promo codes system
- ✅ RLS (Row Level Security) policies

**Tables created:**
- `profiles` - User profiles with admin roles
- `subscription_plans` - 4 default plans
- `user_subscriptions` - Track active subscriptions
- `payments` - Payment records
- `promo_codes` - Discount codes

### Step 4: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable **Confirm email** (for testing)
4. Save changes

---

## 💳 Duitku Payment Gateway Setup

### Step 1: Register Duitku Account

**Sandbox (Testing):**
1. Go to [https://sandbox.duitku.com](https://sandbox.duitku.com)
2. Click **"Register"**
3. Verify your email
4. Complete merchant registration

**Production:**
1. Go to [https://duitku.com](https://duitku.com)
2. Register as merchant
3. Submit business documents
4. Wait for approval (1-3 days)

### Step 2: Get API Credentials

1. Login to Duitku Dashboard
2. Go to **Settings** → **API**
3. Copy:
   ```
   Merchant Code: D12345
   API Key: xxxxxxxxxxxxxxxx
   ```

### Step 3: Configure Callback URL

In Duitku Dashboard:
1. Go to **Settings** → **Callback URL**
2. Set callback URL:
   ```
   https://YOUR-SUPABASE-URL/functions/v1/duitku-callback
   ```
3. Save

### Step 4: Deploy Edge Functions

The following edge functions are already deployed:
- ✅ `duitku-create-payment` - Create payment request
- ✅ `duitku-callback` - Handle payment notifications
- ✅ `send-email` - Email notifications

**Edge Functions Environment Variables:**

Go to Supabase Dashboard → Edge Functions → Manage secrets:

```bash
DUITKU_MERCHANT_CODE=D12345
DUITKU_API_KEY=your_api_key_here
DUITKU_MODE=sandbox
APP_URL=https://your-app.com
SENDGRID_API_KEY=SG.xxxxx (optional, for emails)
```

---

## 👤 Admin Account Setup

### Method 1: Via Supabase Dashboard (Recommended)

1. **Create First User:**
   - Go to **Authentication** → **Users**
   - Click **"Add user"**
   - Email: `admin@yourdomain.com`
   - Password: (your secure password)
   - Auto confirm user: ✅ Yes

2. **Promote to Admin:**
   - Go to **Table Editor** → **profiles**
   - Find your user
   - Edit the `role` column
   - Change from `user` to `super_admin`
   - Save

### Method 2: Via SQL (Advanced)

1. Go to **SQL Editor**
2. Run this query (replace email):
```sql
-- First, sign up normally through the app
-- Then run this to promote to admin:
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'admin@yourdomain.com';
```

### Admin Login

1. Go to `https://your-app.com/auth/login`
2. Login with admin credentials
3. Access admin panel at `https://your-app.com/admin/dashboard`

**Admin URL:** `/admin/dashboard`

---

## 🔐 Environment Variables

Create `.env.local` file in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: For development
NEXT_PUBLIC_ENABLE_DEBUG=true
```

**⚠️ IMPORTANT:** Never commit `.env.local` to git!

---

## 🚀 Running the Application

### Development Mode

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deployment

**Vercel (Recommended):**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy!

**Environment variables to add in Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

---

## 🛡️ Admin Panel Guide

### Accessing Admin Panel

**URL:** `/admin/dashboard`

**Login:** Use super_admin account

### Admin Features

#### 1. **Dashboard** (`/admin/dashboard`)
- 📊 Total users
- 💰 Revenue statistics
- 📈 Active subscriptions
- 🎫 Recent payments
- 👥 Recent users

#### 2. **Promo Codes** (`/admin/promo-codes`)
**Actions:**
- Create new promo codes
- Edit existing codes
- Activate/deactivate codes
- Track usage statistics

**Example Promo Codes:**
```sql
-- 50% discount, max 100 uses
Code: LAUNCH50
Type: percentage
Value: 50
Max Uses: 100

-- Rp100,000 off
Code: WELCOME100K
Type: fixed
Value: 100000
Max Uses: unlimited
```

#### 3. **Create Promo Code:**
1. Click **"New Promo Code"**
2. Fill form:
   - Code: `NEWYEAR2024` (uppercase)
   - Type: `Percentage` or `Fixed Amount`
   - Value: `50` (for 50%) or `100000` (for Rp100K)
   - Max Uses: Leave empty for unlimited
   - Valid Until: Optional expiry date
   - Active: ✅ Check to enable
3. Click **"Create"**

#### 4. **View Payments:**
- See all payment transactions
- Filter by status (success/pending/failed)
- Export payment data
- Refund management

#### 5. **Manage Users:**
- View all registered users
- Change user roles (user/admin/super_admin)
- View user subscriptions
- Manage user accounts

---

## 🧪 Testing Payment Flow

### Sandbox Testing (Duitku)

1. **Create Test Payment:**
   - Login as normal user
   - Go to `/subscription`
   - Select a paid plan (Basic/Pro/Premium)
   - Choose payment method
   - Click "Bayar Sekarang"

2. **Complete Test Payment:**
   - You'll be redirected to Duitku sandbox
   - Use test credentials (provided by Duitku)
   - Complete payment

3. **Verify Subscription:**
   - System will receive callback
   - Subscription will be activated
   - User will be redirected back
   - Check `/subscription` to see active plan

### Test Payment Methods

**Sandbox Virtual Accounts:**
- BCA: Use any test VA number
- Mandiri: Use 8888000000123456
- BNI: Use 8888000000123456
- BRI: Use 1234567890123456

**E-Wallet Testing:**
- OVO: Use test phone number
- DANA: Use test phone number
- QRIS: Scan test QR code

---

## ❓ Troubleshooting

### Issue: Cannot access admin panel

**Solution:**
1. Check user role in `profiles` table
2. Must be `admin` or `super_admin`
3. Run SQL:
```sql
UPDATE profiles SET role = 'super_admin' WHERE email = 'your@email.com';
```

### Issue: Payment callback not working

**Solution:**
1. Check callback URL in Duitku dashboard
2. Verify edge function is deployed:
   ```bash
   # List deployed functions
   supabase functions list
   ```
3. Check edge function logs in Supabase dashboard

### Issue: Subscription not activating after payment

**Solution:**
1. Check payment status in `payments` table
2. Check callback data in `callback_data` column
3. Verify signature validation in callback handler
4. Check edge function logs

### Issue: Email notifications not sending

**Solution:**
1. Verify SendGrid API key is set
2. Check edge function environment variables
3. Email feature is optional - payment still works without it

### Issue: RLS Policy Error

**Solution:**
1. Check if user is authenticated
2. Verify RLS policies are enabled
3. Use service_role key for admin operations
4. Check table permissions

---

## 📞 Support & Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Duitku API Docs](https://docs.duitku.com)
- [Next.js Docs](https://nextjs.org/docs)

### Database Queries

**Check active subscriptions:**
```sql
SELECT
  p.email,
  s.status,
  sp.name as plan_name,
  s.expires_at
FROM user_subscriptions s
JOIN profiles p ON s.user_id = p.id
JOIN subscription_plans sp ON s.plan_id = sp.id
WHERE s.status = 'active';
```

**Check payment revenue:**
```sql
SELECT
  COUNT(*) as total_payments,
  SUM(amount) as total_revenue,
  currency
FROM payments
WHERE status = 'success'
GROUP BY currency;
```

**Create promo code via SQL:**
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, max_uses, is_active)
VALUES ('BLACKFRIDAY', 'percentage', 75, 50, true);
```

---

## 🎯 Quick Start Checklist

- [ ] Create Supabase project
- [ ] Get Supabase API keys
- [ ] Register Duitku account
- [ ] Get Duitku credentials
- [ ] Set edge function environment variables
- [ ] Create admin account
- [ ] Promote user to super_admin
- [ ] Test login as admin
- [ ] Access admin dashboard
- [ ] Create test promo code
- [ ] Test payment flow (sandbox)
- [ ] Verify subscription activation

---

## 🔥 Pro Tips

1. **Use Sandbox First:** Always test in Duitku sandbox before going live
2. **Monitor Logs:** Check Supabase Edge Function logs regularly
3. **Backup Database:** Export database regularly
4. **Security:** Never share service_role key publicly
5. **Testing:** Test all payment methods in sandbox
6. **Monitoring:** Set up alerts for failed payments
7. **Support:** Respond to payment issues within 24 hours

---

## 📊 Default Subscription Plans

| Plan | Price (IDR) | Duration | Features |
|------|-------------|----------|----------|
| Trial | FREE | 7 days | Basic features, 1 account |
| Basic | 199,000 | 30 days | 2 accounts, 3 providers |
| Pro | 499,000 | 30 days | 5 accounts, 10 providers |
| Premium | 999,000 | 30 days | Unlimited accounts & providers |

---

## 🚨 Security Best Practices

1. **Never commit secrets** to git
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** on Supabase dashboard
4. **Rotate API keys** periodically
5. **Monitor admin activity** regularly
6. **Backup database** daily
7. **Use HTTPS** in production
8. **Validate all inputs** on backend
9. **Implement rate limiting** on APIs
10. **Log security events**

---

## ✅ Production Checklist

Before going live:
- [ ] Change Duitku mode to `production`
- [ ] Update callback URLs to production domain
- [ ] Enable email confirmations
- [ ] Set up custom domain
- [ ] Configure CORS properly
- [ ] Enable database backups
- [ ] Set up monitoring/alerts
- [ ] Test payment flow end-to-end
- [ ] Prepare customer support
- [ ] Legal: Terms of Service & Privacy Policy

---

## 🎉 You're Ready!

Your IndoTraderXpert platform is now fully configured with:
- ✅ User authentication
- ✅ Subscription management
- ✅ Duitku payment integration
- ✅ Admin panel
- ✅ Promo code system
- ✅ Email notifications

**Need help?** Check the troubleshooting section or review Supabase/Duitku documentation.

**Good luck with your trading platform! 🚀💰**
