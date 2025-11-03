# Setup Local First Version - Step by Step

## ✅ Fixed:
1. **Updated `nodemailer`** from `^6.9.9` to `^7.0.7` in `package.json`
2. **Created `.npmrc`** with `legacy-peer-deps=true` for smooth installation

## Next Steps:

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Set Up Database
Make sure your `.env` file has all required variables (see `ENV_SETUP_GUIDE.md`), then:

```powershell
npm run db:push
```

### Step 3: Start Development Server
```powershell
npm run dev
```

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

## Required Environment Variables:
Make sure your `.env` file has:
- `DATABASE_URL` - Your Neon PostgreSQL URL
- `NEXTAUTH_URL` - http://localhost:3000
- `NEXTAUTH_SECRET` - Random secret key
- `GOOGLE_CLIENT_ID` - Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth Secret
- `GMAIL_USER` - Your Gmail address
- `GMAIL_APP_PASSWORD` - Your Gmail App Password
- `ADMIN_EMAIL` - Your admin email

See `ENV_SETUP_GUIDE.md` for detailed instructions.

---

**Dependencies are being installed. Once complete, run `npm run db:push` and `npm run dev`!**

