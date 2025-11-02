# Deployment Checklist - Step by Step

Follow these steps in order to deploy your QR Chat Platform.

---

## ✅ Step 1: Verify Local Build Works

Run:
```powershell
npm run build
```

Expected: Build completes successfully with no errors.

---

## ✅ Step 2: Initialize Git Repository

### 2.1 Check if Git is initialized
```powershell
git status
```

If it says "not a git repository", proceed to Step 2.2

### 2.2 Initialize Git
```powershell
git init
git add .
git commit -m "Initial commit - QR Chat Platform ready for deployment"
```

---

## ✅ Step 3: Create GitHub Repository

### 3.1 Go to GitHub
1. Open browser: https://github.com/new
2. **Repository name**: `qr-chat-platform` (or your preferred name)
3. **Description**: "QR Chat Platform - Ephemeral messaging via QR codes"
4. **Visibility**: 
   - ✅ Private (recommended) OR
   - ✅ Public (if you want it open source)
5. **IMPORTANT**: 
   - ❌ DO NOT check "Add a README file"
   - ❌ DO NOT check "Add .gitignore"
   - ❌ DO NOT check "Choose a license"
6. Click **"Create repository"**

### 3.2 Copy the repository URL
After creating, GitHub will show you the URL. It looks like:
```
https://github.com/YOUR_USERNAME/qr-chat-platform.git
```
**Copy this URL** - you'll need it in the next step.

---

## ✅ Step 4: Push Code to GitHub

### 4.1 Add Remote and Push
Replace `YOUR_USERNAME` and `qr-chat-platform` with your actual values:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/qr-chat-platform.git
git branch -M main
git push -u origin main
```

### 4.2 Verify
Go back to GitHub and refresh the page - you should see all your files.

---

## ✅ Step 5: Deploy to Vercel

### 5.1 Go to Vercel
1. Open browser: https://vercel.com
2. Click **"Sign Up"** (if new) or **"Log In"** (if you have an account)
3. Sign in with GitHub (recommended)

### 5.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your GitHub repository (`qr-chat-platform`)
4. Click **"Import"**

### 5.3 Configure Project (if prompted)
- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` ✅ (default)
- **Build Command**: `npm run build` ✅ (default)
- **Output Directory**: `.next` ✅ (default)
- **Install Command**: `npm install` ✅ (default)

### 5.4 Add Environment Variables
**BEFORE CLICKING DEPLOY**, add environment variables:

1. Click **"Environment Variables"** section
2. Add each variable one by one:

#### Variable 1: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Environment**: Select all ✅ (Production, Preview, Development)
- Click **"Add"**

#### Variable 2: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app` (we'll update this later)
- **Environment**: All ✅
- Click **"Add"**
- **Note**: Replace `your-project-name` with your actual project name after deployment

#### Variable 3: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `lGTjVlsz6Zd22ov5dH5l0KPNbrwBSDmu6PesZUP8mHk=`
- **Environment**: All ✅
- Click **"Add"**

#### Variable 4: GOOGLE_CLIENT_ID
- **Key**: `GOOGLE_CLIENT_ID`
- **Value**: `YOUR_GOOGLE_CLIENT_ID_HERE` (get from Google Cloud Console)
- **Environment**: All ✅
- Click **"Add"**

#### Variable 5: GOOGLE_CLIENT_SECRET
- **Key**: `GOOGLE_CLIENT_SECRET`
- **Value**: `YOUR_GOOGLE_CLIENT_SECRET_HERE` (get from Google Cloud Console)
- **Environment**: All ✅
- Click **"Add"**

#### Variable 6: GMAIL_USER
- **Key**: `GMAIL_USER`
- **Value**: `es@ipndigital.com`
- **Environment**: All ✅
- Click **"Add"**

#### Variable 7: GMAIL_APP_PASSWORD
- **Key**: `GMAIL_APP_PASSWORD`
- **Value**: `zowflbhyidsbxbav`
- **Environment**: All ✅
- Click **"Add"**

#### Variable 8: ADMIN_EMAIL
- **Key**: `ADMIN_EMAIL`
- **Value**: `es@ipndigital.com`
- **Environment**: All ✅
- Click **"Add"**

#### Variable 9: NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Environment**: All ✅
- Click **"Add"**

### 5.5 Deploy
1. Click **"Deploy"** button at the bottom
2. Wait for build to complete (2-5 minutes)
3. When done, Vercel will give you a URL like: `https://qr-chat-platform.vercel.app`

---

## ✅ Step 6: Update NEXTAUTH_URL

### 6.1 Get Your Vercel URL
After deployment completes, copy your Vercel URL (e.g., `https://qr-chat-platform.vercel.app`)

### 6.2 Update in Vercel
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `NEXTAUTH_URL`
3. Click **"Edit"** or **"..."** → **"Edit"**
4. Update value to: `https://your-actual-project.vercel.app`
5. Click **"Save"**

### 6.3 Redeploy
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** → **"Redeploy"**

---

## ✅ Step 7: Update Google OAuth Redirect URIs

### 7.1 Go to Google Cloud Console
1. Open: https://console.cloud.google.com
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID (the one with Client ID ending in `.apps.googleusercontent.com`)

### 7.2 Add Authorized JavaScript Origins
Under **"Authorized JavaScript origins"**:
1. Click **"+ ADD URI"**
2. Add: `https://your-project.vercel.app` (replace with your actual Vercel URL)
3. Click **"Save"**

### 7.3 Add Authorized Redirect URIs
Under **"Authorized redirect URIs"**:
1. Click **"+ ADD URI"**
2. Add: `https://your-project.vercel.app/api/auth/callback/google`
3. Make sure you already have: `http://localhost:3000/api/auth/callback/google` (for local dev)
4. Click **"Save"**

---

## ✅ Step 8: Configure Cron Job

### 8.1 Go to Vercel Cron Settings
1. Go to Vercel Dashboard → Your Project → **Settings** → **Cron Jobs**
2. Click **"Add Cron Job"**

### 8.2 Configure Cron Job
- **Path**: `/api/cron/expire-chats`
- **Schedule**: `*/10 * * * *` (every 10 minutes)
- **Timezone**: (optional, leave default)
- Click **"Save"**

---

## ✅ Step 9: Test Deployment

### 9.1 Test Authentication
1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Click **"Sign In"**
3. Sign in with Google
4. Should redirect to dashboard ✅

### 9.2 Test Features
- [ ] Create a QR code
- [ ] View QR code page
- [ ] Send a message through QR code
- [ ] View chats in dashboard
- [ ] Test admin dashboard (if admin account)

---

## 🎉 Success!

Your QR Chat Platform is now live!

**Live URL**: `https://your-project.vercel.app`

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify all environment variables are set
- Try building locally: `npm run build`

### Authentication Doesn't Work
- Verify `NEXTAUTH_URL` matches your Vercel URL exactly
- Check Google OAuth redirect URIs
- Redeploy after updating

### Database Connection Fails
- Verify `DATABASE_URL` is correct
- Check if Neon database is accessible

---

## Quick Reference Commands

```powershell
# Local build test
npm run build

# Git commands
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/qr-chat-platform.git
git branch -M main
git push -u origin main
```

---

**Need Help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions.

