# Environment Variables Setup Guide

## Complete .env File Configuration

After setting up Google OAuth and Gmail App Password, create your `.env` file with all the required variables.

---

## Your Neon Database Connection

Your Neon PostgreSQL connection string:
```
postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## Complete .env File Template

Create a `.env` file in the root directory with the following content:

```env
# Database - Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here-32-characters-minimum"

# Google OAuth (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"

# Gmail SMTP (Get App Password from Google Account settings)
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"

# Admin Email (The email address that will have admin access)
ADMIN_EMAIL="your-admin-email@gmail.com"

# App Environment
NODE_ENV="development"
```

---

## Step-by-Step Setup

### 1. Database URL ✅
Already have it! Use:
```
DATABASE_URL="postgresql://neondb_owner:npg_GpnkO8HsWMD2@ep-gentle-mud-ahw97wkm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 2. Generate NEXTAUTH_SECRET

**Option A: Using OpenSSL (if you have it installed)**
```bash
openssl rand -base64 32
```

**Option B: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option C: Online Generator**
- Go to: https://generate-secret.vercel.app/32
- Copy the generated secret

**Example**: 
```
NEXTAUTH_SECRET="aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890=="
```

### 3. Google OAuth Credentials
Follow the guide in `GOOGLE_OAUTH_SETUP.md` to get:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### 4. Gmail App Password
Follow the guide in `GMAIL_APP_PASSWORD_SETUP.md` to get:
- `GMAIL_USER` - Your Gmail address
- `GMAIL_APP_PASSWORD` - The 16-character app password

### 5. Admin Email
Set `ADMIN_EMAIL` to the email address you want to have admin access (usually your own email).

---

## Important Notes

### ⚠️ Security Warnings

1. **Never commit `.env` file to GitHub**
   - The `.env` file is already in `.gitignore`
   - Double-check before committing!

2. **No Quotes Needed**
   - Some values can have quotes, but Next.js will handle them
   - If you have issues, try without quotes

3. **No Spaces**
   - Make sure there are no spaces around the `=` sign
   - Correct: `DATABASE_URL="value"`
   - Wrong: `DATABASE_URL = "value"`

4. **Special Characters**
   - If your password has special characters, they should be fine in quotes
   - Database URLs with `&` symbols are fine

---

## Verification Checklist

Before running the app, verify:

- [ ] `DATABASE_URL` - Your Neon connection string ✅
- [ ] `NEXTAUTH_URL` - Set to `http://localhost:3000` for development
- [ ] `NEXTAUTH_SECRET` - Generated random 32+ character string
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- [ ] `GMAIL_USER` - Your full Gmail address
- [ ] `GMAIL_APP_PASSWORD` - 16-character app password
- [ ] `ADMIN_EMAIL` - Email for admin access
- [ ] `NODE_ENV` - Set to `development`

---

## For Production (Vercel)

When deploying to Vercel, you'll need to:

1. **Update NEXTAUTH_URL**
   - Change from `http://localhost:3000`
   - To your Vercel URL: `https://your-project.vercel.app`

2. **Add all environment variables in Vercel Dashboard**:
   - Go to your project in Vercel
   - Settings → Environment Variables
   - Add each variable (one by one)
   - Select all environments (Production, Preview, Development)

3. **Update Google OAuth Redirect URIs**:
   - Add production URL to Google Cloud Console
   - `https://your-project.vercel.app/api/auth/callback/google`

---

## Testing Your Configuration

After setting up `.env`:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```

3. **Push database schema**:
   ```bash
   npm run db:push
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Test sign-in**:
   - Go to `http://localhost:3000`
   - Try signing in with Google
   - If it works, your OAuth is configured correctly!

---

## Troubleshooting

### Issue: "Environment variable not found"
**Solution**: 
- Make sure `.env` file is in the root directory (same level as `package.json`)
- Restart your development server after adding/changing variables
- Check for typos in variable names

### Issue: Database connection fails
**Solution**:
- Verify `DATABASE_URL` is correct
- Check if Neon database is active
- Try the connection string without `&channel_binding=require` if needed

### Issue: OAuth not working
**Solution**:
- Verify `NEXTAUTH_URL` matches exactly (including http:// and port)
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Verify redirect URI in Google Console matches

### Issue: Email not sending
**Solution**:
- Verify `GMAIL_USER` is your full email address
- Check `GMAIL_APP_PASSWORD` is the 16-character app password (not regular password)
- Ensure 2-Step Verification is enabled

---

## Quick Reference

| Variable | Where to Get It | Example |
|----------|----------------|---------|
| `DATABASE_URL` | Neon Dashboard | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Generate with OpenSSL/Node | `randomBase64String32chars` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console | `123-apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console | `GOCSPX-xxxxx` |
| `GMAIL_USER` | Your Gmail address | `you@gmail.com` |
| `GMAIL_APP_PASSWORD` | Google Account → App Passwords | `abcdefghijklmnop` |

---

**Next Steps**:
1. Complete Google OAuth setup (`GOOGLE_OAUTH_SETUP.md`)
2. Complete Gmail App Password setup (`GMAIL_APP_PASSWORD_SETUP.md`)
3. Create your `.env` file with all variables
4. Run `npm install`
5. Set up the database
6. Start development!

