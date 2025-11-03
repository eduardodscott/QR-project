# Update Vercel URL Configuration

Your Vercel project name: **qr-project-gthk_2**

This means your Vercel URL is likely: **https://qr-project-gthk_2.vercel.app**

## ✅ Updates Needed:

### 1. Update NEXTAUTH_URL in Vercel Environment Variables

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find **NEXTAUTH_URL**
3. Click **"Edit"** (or **"..."** → **"Edit"**)
4. Update to: `https://qr-project-gthk_2.vercel.app`
   - Or check your actual deployment URL in Vercel dashboard (it might be slightly different)
5. Click **"Save"**

### 2. Update Google OAuth Redirect URIs

1. Go to: https://console.cloud.google.com
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your **OAuth 2.0 Client ID**

#### Add Authorized JavaScript Origins:
- Click **"+ ADD URI"**
- Add: `https://qr-project-gthk_2.vercel.app`
- Click **"Save"**

#### Add Authorized Redirect URIs:
- Click **"+ ADD URI"**
- Add: `https://qr-project-gthk_2.vercel.app/api/auth/callback/google`
- Make sure you still have: `http://localhost:3000/api/auth/callback/google` (for local dev)
- Click **"Save"**

### 3. Redeploy After Updating

1. Go to: **Vercel Dashboard** → Your Project → **"Deployments"** tab
2. Click on latest deployment
3. Click **"Redeploy"** → **"Redeploy"**
4. Wait for it to complete

---

## 🔍 Find Your Exact Vercel URL

To find your exact URL:

1. Go to: **Vercel Dashboard** → Your Project
2. Look at the top of the page - you'll see your deployment URL
3. It might be:
   - `https://qr-project-gthk_2.vercel.app`
   - OR `https://qr-project-gthk-2.vercel.app` (with dashes)
   - OR a custom domain if you set one up

**Use the exact URL shown in your Vercel dashboard!**

---

## ✅ Checklist

- [ ] Updated NEXTAUTH_URL in Vercel environment variables
- [ ] Added Vercel URL to Google OAuth JavaScript origins
- [ ] Added Vercel URL to Google OAuth redirect URIs
- [ ] Redeployed after updates
- [ ] Tested authentication (sign in with Google)

---

**After these updates, your app should work fully! 🎉**

