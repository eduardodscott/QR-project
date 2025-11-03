# Deploy Without Cron Job - Instructions

I've removed the cron job from `vercel.json` so you can deploy on the Hobby plan.

## What Changed:

- ✅ Removed cron job configuration from `vercel.json`
- ✅ Your app will deploy successfully
- ✅ All features work, except automatic chat expiration
- ✅ You can manually expire chats through admin dashboard

## Your App Will Still Work:

- ✅ Authentication (Google OAuth)
- ✅ QR code creation
- ✅ Chat functionality
- ✅ Messages
- ✅ Admin dashboard
- ✅ Manual chat expiration through admin

## What Won't Work:

- ❌ Automatic chat expiration (runs every 10 minutes)
- ✅ **Solution:** Manually expire chats through admin dashboard

---

## After Deployment:

### Option 1: Add Cron Job Later (If You Upgrade)

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Cron Jobs**
2. Click **"Add Cron Job"**
3. Fill in:
   - **Path**: `/api/cron/expire-chats`
   - **Schedule**: `*/10 * * * *`
4. Click **"Save"**

### Option 2: Use Manual Expiration

1. Go to your admin dashboard
2. Find chats that should be expired
3. Click **"Expire Chat"** button
4. Done!

---

## Deploy Now:

1. **Add environment variables** (as before)
2. **Click "Deploy"**
3. **Should work now!** ✅

The cron job endpoint (`/api/cron/expire-chats`) still exists and works - it's just not scheduled to run automatically. You can manually call it or add it back when you upgrade!

---

**Ready to deploy?** Follow `VERCEL_QUICK_START.md` - just skip the cron job step!

