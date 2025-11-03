# Quick Update Guide - Vercel Project Name

**Your Vercel Project:** `qr-project-gthk_2`

**Your Vercel URL:** `https://qr-project-gthk_2.vercel.app` (check your dashboard for exact URL)

---

## Step 1: Update NEXTAUTH_URL

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find **NEXTAUTH_URL**
3. Edit and set to: `https://qr-project-gthk_2.vercel.app` (or your exact URL)
4. Save

## Step 2: Update Google OAuth

1. **Google Cloud Console** → **APIs & Services** → **Credentials**
2. Click your OAuth Client ID
3. Add to **JavaScript origins**: `https://qr-project-gthk_2.vercel.app`
4. Add to **Redirect URIs**: `https://qr-project-gthk_2.vercel.app/api/auth/callback/google`
5. Save

## Step 3: Redeploy

1. **Vercel** → **Deployments** → **Redeploy**

---

**That's it! Your app should work now! ✅**

