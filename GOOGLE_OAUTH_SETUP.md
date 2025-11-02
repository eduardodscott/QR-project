# Google OAuth Setup Guide

## Step-by-Step Instructions

### Step 1: Go to Google Cloud Console

1. Open your web browser
2. Navigate to: **https://console.cloud.google.com**
3. Sign in with your Google account

---

### Step 2: Create a New Project (or Select Existing)

1. Click on the project dropdown at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Enter a project name (e.g., "QR-Chat Platform")
4. Click **"Create"**
5. Wait for the project to be created, then select it from the dropdown

**OR** if you already have a project:
- Select it from the dropdown menu

---

### Step 3: Enable Google+ API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"** or **"Google Identity"**
3. Click on **"Google+ API"** (or **"Google Identity API"**)
4. Click the **"Enable"** button
5. Wait for it to enable (takes a few seconds)

---

### Step 4: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace)
3. Click **"Create"**
4. Fill in the required information:

   **App Information:**
   - **App name**: "QR-Chat Platform" (or your preferred name)
   - **User support email**: Your email address
   - **App logo**: (Optional - you can skip this)
   - **Application home page**: `http://localhost:3000` (for development)
   - **Application privacy policy link**: (Optional - you can skip for now)
   - **Application terms of service link**: (Optional - you can skip for now)
   - **Authorized domains**: (Leave empty for development)
   - **Developer contact information**: Your email address

5. Click **"Save and Continue"**

6. **Scopes** (Step 2):
   - Click **"Add or Remove Scopes"**
   - Select these scopes:
     - `email`
     - `profile`
     - `openid`
   - Click **"Update"**
   - Click **"Save and Continue"**

7. **Test users** (Step 3):
   - For testing, you can add your own email as a test user
   - Click **"Add Users"**
   - Enter your email
   - Click **"Add"**
   - Click **"Save and Continue"**

8. **Summary** (Step 4):
   - Review the information
   - Click **"Back to Dashboard"**

---

### Step 5: Create OAuth 2.0 Credentials

1. In the left sidebar, go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** at the top
3. Select **"OAuth client ID"**

4. If prompted, choose **"Web application"** as the application type

5. Fill in the details:

   **Name**: "QR-Chat Platform Web Client" (or any name you prefer)

   **Authorized JavaScript origins**:
   - Click **"+ Add URI"**
   - Add: `http://localhost:3000`
   - Add: `https://your-project.vercel.app` (replace with your Vercel URL - you can add this later)

   **Authorized redirect URIs**:
   - Click **"+ Add URI"**
   - Add: `http://localhost:3000/api/auth/callback/google`
   - Add: `https://your-project.vercel.app/api/auth/callback/google` (replace with your Vercel URL - you can add this later)

6. Click **"Create"**

7. **IMPORTANT**: A popup will appear with your credentials:
   - **Client ID**: Copy this (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
   - **Client Secret**: Copy this (looks like: `GOCSPX-xxxxxxxxxxxxxxxxxxxxx`)

8. **SAVE THESE IMMEDIATELY!** You won't be able to see the Client Secret again.
   - Store them in a safe place
   - Add them to your `.env` file

---

### Step 6: Add Credentials to Your .env File

Open your `.env` file and add:

```env
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret-here"
```

**Important**: 
- Don't include quotes around the values
- Don't commit the `.env` file to GitHub (it's already in `.gitignore`)

---

### Step 7: Verify Setup

1. Make sure your `.env` file has:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL=http://localhost:3000` (for development)

2. Run your development server:
   ```bash
   npm run dev
   ```

3. Try signing in with Google - it should redirect you to Google's consent screen

---

## For Production (Vercel Deployment)

### After deploying to Vercel:

1. Get your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

2. Go back to Google Cloud Console → **"Credentials"** → Click on your OAuth client

3. Add to **Authorized JavaScript origins**:
   - `https://your-project.vercel.app`

4. Add to **Authorized redirect URIs**:
   - `https://your-project.vercel.app/api/auth/callback/google`

5. Click **"Save"**

6. Update your Vercel environment variables:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to your Vercel URL: `https://your-project.vercel.app`

---

## Troubleshooting

### Issue: "redirect_uri_mismatch" error
**Solution**: Make sure the redirect URI in Google Console **exactly matches** the one in your app, including:
- Protocol (http vs https)
- Domain
- Port (if using one)
- Path (`/api/auth/callback/google`)

### Issue: OAuth consent screen not showing
**Solution**: 
- Make sure you've completed the OAuth consent screen setup
- For external apps, Google requires verification if you add more scopes later
- Test with your own email first as a test user

### Issue: "invalid_client" error
**Solution**:
- Double-check your Client ID and Client Secret in `.env`
- Make sure there are no extra spaces or quotes
- Regenerate credentials if needed

---

## Quick Checklist

- [ ] Created/selected Google Cloud project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Created OAuth 2.0 credentials
- [ ] Copied Client ID and Client Secret
- [ ] Added credentials to `.env` file
- [ ] Added authorized redirect URIs (both localhost and production)
- [ ] Tested sign-in locally
- [ ] Updated redirect URIs for production deployment

---

**Next Step**: Set up Gmail App Password (see `GMAIL_APP_PASSWORD_SETUP.md`)

