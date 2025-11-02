# Vercel Deployment - Step by Step Instructions

Your code is now on GitHub: https://github.com/eduardodscott/qr-chat-platform

Follow these steps to deploy to Vercel:

---

## Step 1: Go to Vercel

1. Open your browser: https://vercel.com
2. Click **"Sign Up"** (if new) or **"Log In"** (if you have an account)
3. **Recommended**: Sign in with GitHub (click "Continue with GitHub")

---

## Step 2: Import Your Project

1. After signing in, click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. You should see your repository: `eduardodscott/qr-chat-platform`
4. Click **"Import"** next to it

---

## Step 3: Configure Project

Vercel should auto-detect Next.js. Verify these settings:

- ✅ **Framework Preset**: Next.js
- ✅ **Root Directory**: `./` (default)
- ✅ **Build Command**: `npm run build` (default)
- ✅ **Output Directory**: `.next` (default)
- ✅ **Install Command**: `npm install` (default)

**Don't click Deploy yet!** We need to add environment variables first.

---

## Step 4: Add Environment Variables

**IMPORTANT**: Add these BEFORE deploying!

### How to Add:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add New"** for each variable below
3. For each variable:
   - Paste the **Key** name
   - Paste the **Value**
   - Select all environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Add"**

### Variables to Add:

#### 1. DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Environments**: ✅ All

#### 2. NEXTAUTH_URL (Update after deployment)
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://qr-chat-platform.vercel.app` (we'll update this after deployment with your actual URL)
- **Environments**: ✅ All

#### 3. NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `lGTjVlsz6Zd22ov5dH5l0KPNbrwBSDmu6PesZUP8mHk=`
- **Environments**: ✅ All

#### 4. GOOGLE_CLIENT_ID
- **Key**: `GOOGLE_CLIENT_ID`
- **Value**: `YOUR_GOOGLE_CLIENT_ID_HERE` (get from Google Cloud Console)
- **Environments**: ✅ All

#### 5. GOOGLE_CLIENT_SECRET
- **Key**: `GOOGLE_CLIENT_SECRET`
- **Value**: `YOUR_GOOGLE_CLIENT_SECRET_HERE` (get from Google Cloud Console)
- **Environments**: ✅ All

#### 6. GMAIL_USER
- **Key**: `GMAIL_USER`
- **Value**: `es@ipndigital.com`
- **Environments**: ✅ All

#### 7. GMAIL_APP_PASSWORD
- **Key**: `GMAIL_APP_PASSWORD`
- **Value**: `zowflbhyidsbxbav`
- **Environments**: ✅ All

#### 8. ADMIN_EMAIL
- **Key**: `ADMIN_EMAIL`
- **Value**: `es@ipndigital.com`
- **Environments**: ✅ All

#### 9. NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Environments**: ✅ All

---

## Step 5: Deploy

1. After adding all environment variables, scroll down
2. Click **"Deploy"** button
3. Wait for build to complete (2-5 minutes)

---

## Step 6: Get Your Vercel URL

After deployment completes:

1. You'll see a success message
2. Vercel will give you a URL like: `https://qr-chat-platform-abc123.vercel.app`
3. **Copy this URL** - you'll need it for the next steps!

---

## Step 7: Update NEXTAUTH_URL

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `NEXTAUTH_URL` in the list
3. Click **"Edit"** (or click the **"..."** menu → **"Edit"**)
4. Update the value to your actual Vercel URL (from Step 6)
   - Example: `https://qr-chat-platform-abc123.vercel.app`
5. Click **"Save"**

### Redeploy

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** → **"Redeploy"**
4. Wait for it to finish

---

## Step 8: Update Google OAuth Redirect URIs

### 8.1 Go to Google Cloud Console

1. Open: https://console.cloud.google.com
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
   - (The one with Client ID ending in `.apps.googleusercontent.com`)

### 8.2 Add Authorized JavaScript Origins

Under **"Authorized JavaScript origins"**:

1. Click **"+ ADD URI"**
2. Add your Vercel URL (from Step 6):
   - `https://qr-chat-platform-abc123.vercel.app`
   - Replace with your actual URL
3. Click **"Save"**

### 8.3 Add Authorized Redirect URIs

Under **"Authorized redirect URIs"**:

1. Click **"+ ADD URI"**
2. Add:
   - `https://qr-chat-platform-abc123.vercel.app/api/auth/callback/google`
   - Replace with your actual URL + `/api/auth/callback/google`
3. **Make sure** you still have:
   - `http://localhost:3000/api/auth/callback/google` (for local dev)
4. Click **"Save"**

---

## Step 9: Configure Cron Job

1. Go to Vercel Dashboard → Your Project → **Settings** → **Cron Jobs**
2. Click **"Add Cron Job"**
3. Fill in:
   - **Path**: `/api/cron/expire-chats`
   - **Schedule**: `*/10 * * * *` (every 10 minutes)
   - **Timezone**: (optional, leave default)
4. Click **"Save"**

---

## Step 10: Test Your Deployment

### 10.1 Test Authentication

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Click **"Sign In"**
3. Sign in with Google
4. Should redirect to dashboard ✅

### 10.2 Test Features

- [ ] Create a QR code
- [ ] View QR code page
- [ ] Send a message through QR code
- [ ] View chats in dashboard
- [ ] Test admin dashboard (with `es@ipndigital.com` account)

---

## ✅ Success!

Your QR Chat Platform is now live!

**Live URL**: `https://your-project.vercel.app`

---

## Troubleshooting

### Build Fails

**Check:**
- All environment variables are set
- No typos in variable names
- All values are correct

**Solution:**
- Check build logs in Vercel Dashboard → Deployments → Latest deployment → Build logs

### Authentication Doesn't Work

**Check:**
- `NEXTAUTH_URL` matches your Vercel URL exactly (no trailing slash)
- Google OAuth redirect URIs are updated
- Redeploy after updating

**Solution:**
- Verify `NEXTAUTH_URL` in Vercel environment variables
- Check Google Cloud Console redirect URIs
- Redeploy after any changes

### Database Connection Fails

**Check:**
- `DATABASE_URL` is correct
- Neon database is accessible

**Solution:**
- Verify `DATABASE_URL` in Vercel environment variables
- Check Neon dashboard to ensure database is running

---

## Quick Reference

**GitHub Repository**: https://github.com/eduardodscott/qr-chat-platform

**Vercel Dashboard**: https://vercel.com/dashboard

**Google Cloud Console**: https://console.cloud.google.com

---

**Need Help?** Let me know if you encounter any issues!

