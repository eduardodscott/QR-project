# Vercel Deployment - Quick Start Guide

Your code is on GitHub: **https://github.com/eduardodscott/QR-project**

Now let's deploy to Vercel!

---

## 🚀 Step 1: Go to Vercel

**Link:** https://vercel.com

1. Click **"Sign Up"** (if new) or **"Log In"** (if you have an account)
2. **Recommended:** Sign in with GitHub

---

## 🚀 Step 2: Import Your Repository

1. After signing in, click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find and select: **`eduardodscott/QR-project`**
4. Click **"Import"** next to it

---

## 🚀 Step 3: Configure Project Settings

Vercel should auto-detect Next.js. Verify:

- ✅ **Framework Preset**: Next.js
- ✅ **Root Directory**: `./`
- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `.next`
- ✅ **Install Command**: `npm install`

**Don't click Deploy yet!** Add environment variables first.

---

## 🚀 Step 4: Add Environment Variables

**IMPORTANT:** Add these BEFORE deploying!

### Where to Add:
- Scroll down to **"Environment Variables"** section
- Click **"Add New"** for each variable

### How to Add Each Variable:
1. Paste the **Key** name
2. Paste the **Value** (from `VERCEL_ENV_VALUES.md`)
3. Select all environments: ✅ **Production**, ✅ **Preview**, ✅ **Development**
4. Click **"Add"**
5. Repeat for all 9 variables

### The 9 Variables to Add:

Open `VERCEL_ENV_VALUES.md` (local file) and copy these values:

1. **DATABASE_URL**
2. **NEXTAUTH_URL** (use `https://qr-chat-platform.vercel.app` for now, update later)
3. **NEXTAUTH_SECRET**
4. **GOOGLE_CLIENT_ID**
5. **GOOGLE_CLIENT_SECRET**
6. **GMAIL_USER**
7. **GMAIL_APP_PASSWORD**
8. **ADMIN_EMAIL**
9. **NODE_ENV** (value: `production`)

---

## 🚀 Step 5: Deploy!

1. After adding all 9 environment variables
2. Scroll down and click **"Deploy"** button
3. Wait for build (2-5 minutes)
4. Watch the build logs - it should complete successfully! ✅

---

## 🚀 Step 6: Get Your Vercel URL

After deployment completes:

1. You'll see: **"Congratulations! Your project has been deployed."**
2. You'll get a URL like: `https://qr-chat-platform-abc123.vercel.app`
3. **Copy this URL** - you need it!

---

## 🚀 Step 7: Update NEXTAUTH_URL

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find **NEXTAUTH_URL**
3. Click **"Edit"** (or **"..."** → **"Edit"**)
4. Update value to your actual Vercel URL:
   - Example: `https://qr-chat-platform-abc123.vercel.app`
5. Click **"Save"**

### Redeploy After Update:
1. Go to **"Deployments"** tab
2. Click on latest deployment
3. Click **"Redeploy"** → **"Redeploy"**
4. Wait for it to finish

---

## 🚀 Step 8: Update Google OAuth Redirect URIs

1. Go to: https://console.cloud.google.com
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your **OAuth 2.0 Client ID**

### Add Authorized JavaScript Origins:
- Click **"+ ADD URI"**
- Add: `https://your-project.vercel.app` (your actual Vercel URL)
- Click **"Save"**

### Add Authorized Redirect URIs:
- Click **"+ ADD URI"**
- Add: `https://your-project.vercel.app/api/auth/callback/google`
- Make sure you still have: `http://localhost:3000/api/auth/callback/google` (for local dev)
- Click **"Save"**

---

## 🚀 Step 9: Configure Cron Job (Optional - Hobby Plan Limit)

**Note:** Vercel Hobby plan has a limit of 1 cron job per day.

### Option A: Skip Cron Job (Recommended for Hobby Plan)
- ✅ Your app will work perfectly
- ✅ Chats can be manually expired through admin dashboard
- ✅ You can add cron job later if you upgrade

### Option B: Add Cron Job (If You Have 0 Cron Jobs)
1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Cron Jobs**
2. Click **"Add Cron Job"**
3. Fill in:
   - **Path**: `/api/cron/expire-chats`
   - **Schedule**: `*/10 * * * *` (every 10 minutes)
4. Click **"Save"**

**Note:** The cron job endpoint exists and works - it's just not scheduled automatically if you skip this step.

---

## ✅ Success!

Your QR Chat Platform is now live! 🎉

**Live URL:** `https://your-project.vercel.app`

---

## 📋 Checklist

- [ ] Code pushed to GitHub ✅
- [ ] Repository imported to Vercel
- [ ] All 9 environment variables added
- [ ] Deployment successful
- [ ] NEXTAUTH_URL updated
- [ ] Google OAuth redirect URIs updated
- [ ] Cron job configured
- [ ] Tested authentication
- [ ] Tested creating QR code
- [ ] Everything working! 🎉

---

## 📝 Quick Reference

**Repository:** https://github.com/eduardodscott/QR-project

**Vercel Dashboard:** https://vercel.com/dashboard

**Environment Variables:** See `VERCEL_ENV_VALUES.md` (local file)

**Google Cloud Console:** https://console.cloud.google.com

---

**Ready to deploy?** Follow steps 1-9 above! 🚀

