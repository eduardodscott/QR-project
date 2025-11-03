# Deploy to Vercel - Final Checklist

## ✅ Main Branch Prepared:

### 1. Dependencies Fixed
- ✅ `nodemailer` updated to `^7.0.7`
- ✅ `.npmrc` created with `legacy-peer-deps=true`

### 2. Root Layout Fixed
- ✅ Added `<html>` and `<body>` tags
- ✅ Wrapped with `SessionProvider`

### 3. TypeScript Configuration
- ✅ Added `baseUrl: "."`
- ✅ Changed `moduleResolution` to `"node"`
- ✅ Added explicit path mappings

### 4. Vercel Configuration
- ✅ `vercel.json` - Cron jobs array empty (for hobby plan)
- ✅ `next.config.js` - Configured for images

### 5. Build Ready
- ✅ All component files present
- ✅ No `[locale]` folder
- ✅ Proper file structure

## 📋 Deployment Steps:

### Step 1: Push to GitHub
```powershell
git push origin main
```

### Step 2: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import from GitHub → Select `QR-project` repository
4. Select `main` branch

### Step 3: Configure Project Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install --legacy-peer-deps` (or leave default)

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

**Required Variables:**
```
DATABASE_URL = your-neon-postgresql-url
NEXTAUTH_URL = https://your-app.vercel.app (or use Vercel's auto-detected URL)
NEXTAUTH_SECRET = generate-random-secret-key-here
GOOGLE_CLIENT_ID = your-google-client-id
GOOGLE_CLIENT_SECRET = your-google-client-secret
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = your-gmail-app-password
ADMIN_EMAIL = your-admin-email@gmail.com
```

**Optional:**
```
CRON_SECRET = random-secret-for-cron
NODE_ENV = production
```

### Step 5: Deploy!
Click "Deploy" and wait for build to complete.

## 🔍 After Deployment:

### Check Build Logs
- Should see: `✓ Compiled successfully`
- Should see: `✓ Generating static pages`
- Should see: `Build Successful`

### Test Your App
1. Open the deployed URL (e.g., `https://your-app.vercel.app`)
2. Test sign-in
3. Test dashboard
4. Test QR code creation

## ⚠️ If Build Fails:

### Check:
1. Environment variables are set correctly
2. Build logs for specific errors
3. GitHub repository is synced with latest code

### Common Issues:
- **Module not found**: Verify all files are committed
- **Database connection**: Verify `DATABASE_URL` is correct
- **OAuth errors**: Verify `GOOGLE_CLIENT_ID` and `SECRET` are correct

---

**Main branch is ready! Push to GitHub and deploy on Vercel!**

