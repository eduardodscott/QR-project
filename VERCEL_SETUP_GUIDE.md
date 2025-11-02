# Step-by-Step Guide: Vercel Setup & GitHub Connection

## Part 1: Creating a Vercel Account

### Step 1: Go to Vercel Website
1. Open your web browser
2. Navigate to: **https://vercel.com**
3. You'll see the Vercel homepage

### Step 2: Sign Up
1. Click the **"Sign Up"** button in the top right corner
2. You'll see options to sign up with:
   - **GitHub** (recommended - green button)
   - GitLab
   - Bitbucket
   - Email

### Step 3: Sign Up with GitHub (Recommended)
1. Click **"Continue with GitHub"**
2. You'll be redirected to GitHub's authorization page
3. If you're not logged into GitHub, log in first
4. Review the permissions Vercel is requesting:
   - Read access to your repositories
   - Write access to repository hooks and settings
5. Click **"Authorize vercel"** (or similar button)
6. You'll be redirected back to Vercel

### Step 4: Complete Profile (Optional)
1. Vercel may ask for:
   - Your name
   - Team name (you can skip this for now)
   - Plan selection (choose **Free** plan - it's sufficient for this project)

### Step 5: Verify Your Account
- You should now be on the Vercel Dashboard
- You're all set! ✅

---

## Part 2: Connecting GitHub to Vercel

### Prerequisites
Before connecting, make sure you have:
- ✅ A GitHub account (if not, see "Creating GitHub Account" below)
- ✅ A GitHub repository for this project (we'll create it later if needed)

### Step 1: Go to Vercel Dashboard
1. Log in to your Vercel account
2. You should see the dashboard with an option to **"Add New Project"** or **"Import Project"**

### Step 2: Import Your Repository
1. Click **"Add New Project"** button
2. You'll see a list of your GitHub repositories
3. If you don't see your repository:
   - Click **"Adjust GitHub App Permissions"**
   - Make sure all necessary repositories are selected
   - Or install the Vercel GitHub App if prompted

### Step 3: Select Your Repository
1. Find your **"QR project"** repository (or whatever you named it)
2. Click **"Import"** next to the repository name

### Step 4: Configure Project Settings
1. **Project Name**: Leave as default or change if desired
2. **Framework Preset**: Vercel should auto-detect Next.js
3. **Root Directory**: Leave as `./` (root)
4. **Build Command**: `npm run build` (should be auto-filled)
5. **Output Directory**: `.next` (should be auto-filled)
6. **Install Command**: `npm install` (should be auto-filled)

### Step 5: Environment Variables (Important!)
1. Click **"Environment Variables"** section
2. We'll add these later (after the project is set up):
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `ADMIN_EMAIL`
3. For now, click **"Deploy"** (you can add variables after)

### Step 6: Deploy
1. Click the **"Deploy"** button
2. Vercel will:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy it
3. This process takes 2-5 minutes

### Step 7: Get Your Deployment URL
1. Once deployment is complete, you'll see:
   - ✅ "Deployment Successful"
   - A URL like: `https://your-project-name.vercel.app`
2. **Save this URL** - you'll need it for:
   - `NEXTAUTH_URL` environment variable
   - Testing your application

---

## Part 3: Automatic Deployments (Already Configured!)

Once connected, Vercel automatically:
- ✅ Deploys whenever you push to the `main` or `master` branch
- ✅ Creates preview deployments for Pull Requests
- ✅ Shows deployment status in GitHub

### How It Works:
1. You push code to GitHub
2. Vercel detects the change
3. Automatically builds and deploys
4. You get a notification when done

---

## Part 4: Setting Up Cron Jobs (Later)

After deployment, we'll configure:
1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Cron Jobs"**
3. Add a cron job to expire chats every 10 minutes
4. We'll configure this when we set up the cron endpoint

---

## Troubleshooting

### Issue: Can't see my GitHub repositories
**Solution:**
1. Go to Vercel Settings → GitHub
2. Click "Configure" or "Manage Permissions"
3. Make sure your repositories are selected
4. Authorize access if needed

### Issue: Build fails
**Solution:**
1. Check the build logs in Vercel Dashboard
2. Make sure all dependencies are in `package.json`
3. Verify environment variables are set
4. Check for TypeScript/build errors

### Issue: Environment variables not working
**Solution:**
1. Go to Project Settings → Environment Variables
2. Make sure variables are added for:
   - Production
   - Preview
   - Development (if testing locally)
3. Redeploy after adding variables

---

## Creating a GitHub Account (If Needed)

If you don't have a GitHub account:

### Step 1: Go to GitHub
1. Navigate to: **https://github.com**

### Step 2: Sign Up
1. Click **"Sign up"**
2. Enter:
   - Username
   - Email address
   - Password
3. Solve the verification puzzle
4. Click **"Create account"**

### Step 3: Verify Email
1. Check your email inbox
2. Click the verification link from GitHub
3. Complete the setup (choose plan - **Free** is fine)

### Step 4: You're Ready!
Now you can:
- Create repositories
- Connect to Vercel
- Push code from your local project

---

## Next Steps After Vercel is Connected

Once Vercel is set up and connected:

1. ✅ I'll create the Next.js project structure
2. ✅ Initialize Git repository locally
3. ✅ Push code to GitHub
4. ✅ Configure environment variables in Vercel
5. ✅ Set up the cron job
6. ✅ Test the deployment

---

## Quick Checklist

- [ ] Created Vercel account
- [ ] Connected GitHub to Vercel
- [ ] Imported project repository (or ready to import)
- [ ] Got deployment URL
- [ ] Ready to add environment variables

---

**Note**: If you need help at any step, just let me know what you're seeing or where you're stuck, and I'll guide you through it!

