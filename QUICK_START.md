# Quick Start Guide

Follow these steps in order to set up your QR-Chat Platform:

---

## Step 1: Set Up Google OAuth ⚙️

Follow the detailed guide: **`GOOGLE_OAUTH_SETUP.md`**

**Quick Summary**:
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. Copy **Client ID** and **Client Secret**

**Time**: ~10-15 minutes

---

## Step 2: Set Up Gmail App Password 📧

Follow the detailed guide: **`GMAIL_APP_PASSWORD_SETUP.md`**

**Quick Summary**:
1. Enable 2-Step Verification on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Create App Password for "Mail"
4. Copy the 16-character password

**Time**: ~5 minutes

---

## Step 3: Create .env File 📝

Follow the detailed guide: **`ENV_SETUP_GUIDE.md`**

**You already have**:
- ✅ Neon Database URL

**You need to add**:
- Google OAuth credentials (from Step 1)
- Gmail App Password (from Step 2)
- Generate NEXTAUTH_SECRET

Create `.env` file in the root directory with all variables.

---

## Step 4: Install Dependencies 📦

```bash
npm install
```

---

## Step 5: Set Up Database 🗄️

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

This will create all the tables in your Neon database.

---

## Step 6: Run Development Server 🚀

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Step 7: Test Sign-In ✅

1. Click "Sign In" on the homepage
2. You should be redirected to Google
3. Sign in with your Google account
4. You should be redirected back to your app

If this works, your setup is correct! 🎉

---

## Need Help?

- **Google OAuth Issues**: See `GOOGLE_OAUTH_SETUP.md` → Troubleshooting
- **Gmail Password Issues**: See `GMAIL_APP_PASSWORD_SETUP.md` → Troubleshooting
- **Environment Variables**: See `ENV_SETUP_GUIDE.md`
- **General Setup**: See `SETUP_INSTRUCTIONS.md`

---

## Next Steps After Setup

Once everything is working:

1. ✅ Test creating a QR code
2. ✅ Test scanning a QR code
3. ✅ Test email notifications
4. ✅ Push code to GitHub
5. ✅ Deploy to Vercel

---

## Checklist

- [ ] Completed Google OAuth setup
- [ ] Got Google Client ID and Secret
- [ ] Enabled 2-Step Verification on Gmail
- [ ] Generated Gmail App Password
- [ ] Created `.env` file with all variables
- [ ] Ran `npm install`
- [ ] Ran `npm run db:generate`
- [ ] Ran `npm run db:push`
- [ ] Started development server
- [ ] Tested Google sign-in successfully

---

**Ready to start?** Begin with Step 1: `GOOGLE_OAUTH_SETUP.md`

