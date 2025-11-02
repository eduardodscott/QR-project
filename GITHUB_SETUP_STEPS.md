# GitHub Setup Steps - Allow Secrets & Make Repository Private

Follow these steps in order:

---

## Step 1: Allow Google OAuth Client ID Secret

1. **Open this link in your browser:**
   ```
   https://github.com/eduardodscott/QR-project/security/secret-scanning/unblock-secret/34wZyipMPWvAlPsRTi74hDZAaqP
   ```

2. **You'll see a page that says:**
   - "Allow this secret"
   - Description: "Google OAuth Client ID"

3. **Click the "Allow secret" button** (it's a green button)

4. **If it asks you to confirm, click "Allow secret" again**

5. **You should see a success message**

---

## Step 2: Allow Google OAuth Client Secret

1. **Open this link in your browser:**
   ```
   https://github.com/eduardodscott/QR-project/security/secret-scanning/unblock-secret/34wZyf0ce3E1EAcSdhvzwnB83Tb
   ```

2. **You'll see a page that says:**
   - "Allow this secret"
   - Description: "Google OAuth Client Secret"

3. **Click the "Allow secret" button** (green button)

4. **If it asks you to confirm, click "Allow secret" again**

5. **You should see a success message**

---

## Step 3: Make Repository Private

1. **Go to your repository:**
   ```
   https://github.com/eduardodscott/QR-project
   ```

2. **Click the "Settings" tab** (at the top of the repository page)

3. **Scroll down to the bottom** of the Settings page

4. **Find the "Danger Zone" section** (it's at the very bottom)

5. **Look for "Change repository visibility"**

6. **Click "Change visibility"**

7. **You'll see options:**
   - Make private
   - Make public
   - Make internal (if you're on GitHub Enterprise)

8. **Select "Make private"**

9. **Type your repository name to confirm:** `eduardodscott/qr-chat-platform`

10. **Click "I understand, change repository visibility"**

11. **Confirm by clicking the final confirmation button**

12. **Your repository is now private! ✅**

---

## Step 4: Push to GitHub

After allowing both secrets and making the repository private, push your code:

1. **Open PowerShell in your project folder:**
   ```powershell
   cd "C:\Users\eduar\Documents\QR project"
   ```

2. **Push to GitHub:**
   ```powershell
   git push -u origin main
   ```

3. **This should work now! ✅**

---

## Quick Links Summary

**Allow Client ID Secret:**
https://github.com/eduardodscott/qr-chat-platform/security/secret-scanning/unblock-secret/34wZyipMPWvAlPsRTi74hDZAaqP

**Allow Client Secret:**
https://github.com/eduardodscott/qr-chat-platform/security/secret-scanning/unblock-secret/34wZyf0ce3E1EAcSdhvzwnB83Tb

**Repository Settings:**
https://github.com/eduardodscott/qr-chat-platform/settings

---

## What You'll See

### When Allowing Secrets:
- A page with "Allow this secret" heading
- A green "Allow secret" button
- A confirmation step (type the secret type or click confirm)
- Success message: "Secret has been allowed"

### When Making Private:
- "Danger Zone" section (red/orange color)
- "Change repository visibility" option
- Confirmation dialog asking you to type repository name
- Final confirmation button

---

## Troubleshooting

### If you can't find the Settings tab:
- Make sure you're logged into GitHub
- Make sure you're the owner of the repository
- Try refreshing the page

### If the "Allow secret" link doesn't work:
- Make sure you're logged into GitHub
- The link might have expired - check the error message in terminal for new links
- The repository URL might be different - check your actual repository URL

### If push still fails:
- Make sure you allowed BOTH secrets
- Wait a few seconds after allowing secrets
- Try pushing again: `git push -u origin main`

---

## After Success

Once the push succeeds:

1. ✅ **Repository is private**
2. ✅ **Secrets are allowed**
3. ✅ **Code is on GitHub**
4. ✅ **Ready to deploy to Vercel!**

**Next Step:** Deploy to Vercel using `VERCEL_DEPLOY_INSTRUCTIONS.md`

---

**Good luck!** 🚀

