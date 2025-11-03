# Fix Vercel Install Command

If the dependency conflict persists, configure Vercel to use `--legacy-peer-deps`:

## Option 1: Configure Install Command in Vercel (Recommended)

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **General**
2. Scroll to **"Build & Development Settings"**
3. Find **"Install Command"**
4. Change from: `npm install`
5. To: `npm install --legacy-peer-deps`
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"Redeploy"** on latest deployment

## Option 2: Add .npmrc File

Create a `.npmrc` file in your project root:

```
legacy-peer-deps=true
```

Then commit and push:

```powershell
git add .npmrc
git commit -m "Add .npmrc for legacy peer deps"
git push origin main
```

---

**I've updated package.json and package-lock.json. Try Option 1 first - it's faster!**

