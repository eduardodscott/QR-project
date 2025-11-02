# QR-Chat Platform - Setup Instructions

## Prerequisites

Before running the project, make sure you have:

1. **Node.js** (v18 or higher) installed
2. **Neon PostgreSQL Database URL**
3. **Google OAuth Credentials** (Client ID & Secret)
4. **Gmail Account** with App Password enabled
5. **Admin Email Address** for admin access

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gmail SMTP
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"

# Admin
ADMIN_EMAIL="admin@example.com"

# App
NODE_ENV="development"
```

### How to Get Each Credential:

#### Neon PostgreSQL Database URL: ✅
**You already have this!** Use:
```
postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Google OAuth Credentials:
📖 **See detailed step-by-step guide: `GOOGLE_OAUTH_SETUP.md`**

Quick steps:
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth 2.0 Client ID
6. Copy Client ID and Client Secret

#### Gmail App Password:
📖 **See detailed step-by-step guide: `GMAIL_APP_PASSWORD_SETUP.md`**

Quick steps:
1. Enable 2-Step Verification on your Google account (required!)
2. Go to https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail"
4. Copy the 16-character password

#### NEXTAUTH_SECRET:
Generate a random secret key:
```bash
openssl rand -base64 32
```
Or using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

📖 **For complete environment variable setup, see: `ENV_SETUP_GUIDE.md`**

---

## Step 3: Set Up Database

1. Generate Prisma client:
```bash
npm run db:generate
```

2. Push schema to database:
```bash
npm run db:push
```

Or create a migration:
```bash
npm run db:migrate
```

---

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 5: Production Deployment on Vercel

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add all environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your Vercel URL (e.g., `https://your-project.vercel.app`)
5. Deploy!

### 3. Update Google OAuth Redirect URI
1. Add your production URL to Google OAuth authorized redirect URIs:
   - `https://your-project.vercel.app/api/auth/callback/google`

### 4. Set Up Cron Job
Add `vercel.json` configuration for chat expiration (see vercel.json file).

---

## Project Structure

```
qr-chat-platform/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth routes
│   │   ├── qr/           # QR code endpoints
│   │   ├── chat/         # Chat endpoints
│   │   └── admin/        # Admin endpoints
│   ├── [locale]/         # Internationalized routes
│   └── ...               # Other pages
├── components/           # React components
├── lib/                  # Utilities and helpers
├── messages/             # Translation files (en.json, es.json)
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static files
```

---

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check if your Neon database is active
- Ensure SSL mode is set correctly

### Google OAuth Issues
- Verify redirect URI matches exactly
- Check if OAuth consent screen is configured
- Ensure credentials are correct

### Email Not Sending
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Ensure `GMAIL_USER` is the correct email

### Build Errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npm run db:generate`

---

## Next Steps After Setup

1. ✅ Test Google OAuth sign-in
2. ✅ Create your first QR code
3. ✅ Test QR code scanning flow
4. ✅ Verify email notifications
5. ✅ Set up admin access (using ADMIN_EMAIL)

---

For detailed project documentation, see `PROJECT_PLAN.md`.

