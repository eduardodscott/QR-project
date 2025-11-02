# Vercel Cron Job Setup Guide

## Overview

The cron job automatically expires chats that are older than 24 hours. It runs every 10 minutes.

## How It Works

1. **Cron Job Endpoint**: `/api/cron/expire-chats`
2. **Schedule**: Every 10 minutes (`*/10 * * * *`)
3. **Function**: Finds all ACTIVE/PENDING chats where `expiresAt < now` and sets them to EXPIRED

## Setup Steps

### Step 1: Vercel Dashboard Configuration

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Cron Jobs**
3. Click **"Add Cron Job"**
4. Fill in:
   - **Path**: `/api/cron/expire-chats`
   - **Schedule**: `*/10 * * * *` (every 10 minutes)
   - **Timezone**: Your timezone (optional)
5. Click **"Save"**

### Step 2: Environment Variable (Optional but Recommended)

For security, add a CRON_SECRET to protect the endpoint:

1. In Vercel Dashboard → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `CRON_SECRET`
   - **Value**: Generate a random string (e.g., `openssl rand -hex 32`)
   - **Environment**: Production, Preview, Development

### Step 3: Test Locally (Optional)

You can test the cron endpoint manually:

```bash
# In PowerShell
curl http://localhost:3000/api/cron/expire-chats
```

Or visit in browser:
```
http://localhost:3000/api/cron/expire-chats
```

### Step 4: Verify in Production

After deployment:

1. Check Vercel Dashboard → **Cron Jobs** → See execution history
2. The endpoint should return:
   ```json
   {
     "success": true,
     "message": "Expired X chat(s)",
     "expiredCount": X,
     "timestamp": "..."
   }
   ```

## Cron Schedule Options

- `*/10 * * * *` - Every 10 minutes (current)
- `*/5 * * * *` - Every 5 minutes
- `0 * * * *` - Every hour
- `0 0 * * *` - Once per day at midnight

## Troubleshooting

### Cron job not running
- Check Vercel Dashboard → Cron Jobs for errors
- Verify the path is correct: `/api/cron/expire-chats`
- Check deployment logs

### Chats not expiring
- Verify chats have valid `expiresAt` dates
- Check if `expiresAt` is set when owner replies
- Verify cron job is executing (check Vercel dashboard)

### Authorization errors
- If using CRON_SECRET, make sure it's set in Vercel environment variables
- For development, the endpoint works without the secret

---

**Next Steps**: 
1. Deploy to Vercel
2. Configure cron job in Vercel dashboard
3. Test in production

