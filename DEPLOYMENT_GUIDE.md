# Deployment Guide - QR Chat Platform

Complete step-by-step guide to deploy your QR Chat Platform to Vercel.

---

## Prerequisites Checklist

Before deploying, make sure:

- [ ] Code is working locally (`npm run dev`)
- [ ] Database is set up and connected (Neon PostgreSQL)
- [ ] Google OAuth credentials are ready
- [ ] GitHub account and repository ready
- [ ] Vercel account ready

---

## Step 1: Prepare Code for GitHub

### 1.1 Check .gitignore

Make sure `.env` and sensitive files are ignored:

```bash
# Already in .gitignore:
.env
.env*.local
node_modules
.next
.vercel
```

### 1.2 Remove or Comment Out i18n (Since We're Skipping It)

Since we're skipping internationalization, we need to disable it temporarily:

1. **Option A**: Keep the files but disable in `next.config.js`
2. **Option B**: Move i18n files to a backup folder

For now, we'll keep files but they won't break anything.

### 1.3 Verify Build Works Locally

```powershell
npm run build
```

If build succeeds, you're ready!

---

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```powershell
git init
git add .
git commit -m "Initial commit - QR Chat Platform"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `qr-chat-platform`)
3. **Don't** initialize with README, .gitignore, or license

### 2.3 Push to GitHub

```powershell
git remote add origin https://github.com/YOUR_USERNAME/qr-chat-platform.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository (`qr-chat-platform`)
5. Click **"Import"**

### 3.2 Configure Project Settings

In Vercel project settings:

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3.3 Add Environment Variables

**IMPORTANT**: Add all these environment variables in Vercel:

Go to **Settings** → **Environment Variables** and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

NEXTAUTH_URL=https://YOUR_PROJECT.vercel.app
NEXTAUTH_SECRET=lGTjVlsz6Zd22ov5dH5l0KPNbrwBSDmu6PesZUP8mHk=

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE

GMAIL_USER=es@ipndigital.com
GMAIL_APP_PASSWORD=zowflbhyidsbxbav

ADMIN_EMAIL=es@ipndigital.com

NODE_ENV=production
```

**Important Notes:**
- Replace `YOUR_PROJECT` with your actual Vercel project name
- Set each variable for **Production**, **Preview**, and **Development** environments
- Click **"Save"** after adding each variable

### 3.4 Deploy

Click **"Deploy"** and wait for the build to complete.

---

## Step 4: Update Google OAuth Redirect URIs

### 4.1 Get Your Vercel URL

After deployment, you'll get a URL like:
```
https://qr-chat-platform.vercel.app
```

### 4.2 Update Google Cloud Console

1. Go to https://console.cloud.google.com
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, add:
   - `https://YOUR_PROJECT.vercel.app`
5. Under **Authorized redirect URIs**, add:
   - `https://YOUR_PROJECT.vercel.app/api/auth/callback/google`
6. Click **"Save"**

### 4.3 Update NEXTAUTH_URL in Vercel

1. Go back to Vercel → **Settings** → **Environment Variables**
2. Update `NEXTAUTH_URL` to your actual Vercel URL:
   ```
   NEXTAUTH_URL=https://YOUR_PROJECT.vercel.app
   ```
3. Click **"Save"**
4. **Redeploy** the application (Settings → Deployments → Redeploy)

---

## Step 5: Configure Cron Job

### 5.1 Set Up Cron Job in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Cron Jobs**
2. Click **"Add Cron Job"**
3. Fill in:
   - **Path**: `/api/cron/expire-chats`
   - **Schedule**: `*/10 * * * *` (every 10 minutes)
   - **Timezone**: Your timezone (optional)
4. Click **"Save"**

### 5.2 Optional: Add CRON_SECRET

For extra security, add a `CRON_SECRET` environment variable:

1. Generate a secret:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
2. Add to Vercel environment variables:
   - Name: `CRON_SECRET`
   - Value: (generated secret)
3. Update `app/api/cron/expire-chats/route.ts` to use it (already configured)

---

## Step 6: Run Database Migrations

### 6.1 Generate Prisma Client in Production

Prisma should auto-generate during build, but if needed:

1. In Vercel build logs, check for Prisma generation
2. If errors, ensure `DATABASE_URL` is correct

### 6.2 Verify Database Connection

After deployment:
1. Try signing in with Google
2. Check if user is created in database
3. Try creating a QR code

---

## Step 7: Test Deployment

### 7.1 Test Authentication

1. Visit your Vercel URL: `https://YOUR_PROJECT.vercel.app`
2. Click **"Sign In"**
3. Sign in with Google
4. Should redirect to dashboard

### 7.2 Test Features

- [ ] Create a QR code
- [ ] View QR code
- [ ] Scan QR code (if you have a QR scanner)
- [ ] Send a message through QR code
- [ ] View chats in dashboard
- [ ] Test admin features (if admin account)

### 7.3 Check Logs

If something doesn't work:
1. Go to Vercel Dashboard → **Deployments** → Click on latest deployment
2. Check **"Build Logs"** for errors
3. Check **"Function Logs"** for runtime errors

---

## Troubleshooting

### Issue: Build Fails

**Error**: `Module not found` or `Cannot find module`
- **Solution**: Check if all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error**: `Prisma Client not generated`
- **Solution**: Add `postinstall` script to `package.json`:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

### Issue: Authentication Not Working

**Error**: `redirect_uri_mismatch`
- **Solution**: Make sure Google OAuth redirect URI exactly matches:
  - `https://YOUR_PROJECT.vercel.app/api/auth/callback/google`

**Error**: `NEXTAUTH_URL mismatch`
- **Solution**: Update `NEXTAUTH_URL` in Vercel to match your domain

### Issue: Database Connection Fails

**Error**: `Can't reach database server`
- **Solution**: 
  1. Check `DATABASE_URL` is correct in Vercel
  2. Verify Neon database is running
  3. Check if IP restrictions exist (Neon might need to allow Vercel IPs)

### Issue: Cron Job Not Running

**Error**: Cron job not executing
- **Solution**:
  1. Check cron job is configured in Vercel Dashboard
  2. Verify path: `/api/cron/expire-chats`
  3. Check function logs for errors

---

## Post-Deployment Checklist

- [ ] Application is live and accessible
- [ ] Authentication works (Google OAuth)
- [ ] Database connection works
- [ ] Can create QR codes
- [ ] Can view chats
- [ ] Admin dashboard works (if admin account)
- [ ] Cron job is configured
- [ ] Email notifications work (if tested)
- [ ] All environment variables are set correctly

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel → Your Project → **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain
5. Update Google OAuth redirect URIs

---

## Monitoring

### Vercel Analytics (Optional)

1. Go to Vercel → Your Project → **Analytics**
2. Enable Vercel Analytics (free tier available)

### Error Tracking (Optional)

Consider adding:
- Sentry for error tracking
- Logtail for logging

---

## Success! 🎉

Your QR Chat Platform should now be live at:
```
https://YOUR_PROJECT.vercel.app
```

**Next Steps:**
- Share your deployment URL
- Test all features
- Monitor error logs
- Gather user feedback

---

## Quick Reference

**Vercel Dashboard**: https://vercel.com/dashboard
**GitHub Repository**: https://github.com/YOUR_USERNAME/qr-chat-platform
**Google Cloud Console**: https://console.cloud.google.com
**Neon Database**: https://console.neon.tech

---

**Need Help?**
- Check Vercel logs
- Review error messages
- Verify all environment variables
- Test locally first

