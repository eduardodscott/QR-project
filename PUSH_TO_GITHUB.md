# How to Push to GitHub - Manual Instructions

If the automated push didn't work, follow these steps manually:

## Step 1: Open PowerShell in Your Project Folder

1. Open PowerShell
2. Navigate to your project:
   ```powershell
   cd "C:\Users\eduar\Documents\QR project"
   ```

## Step 2: Check Git Status

```powershell
git status
```

## Step 3: Add All Files

```powershell
git add .
```

## Step 4: Commit

```powershell
git commit -m "Initial commit - QR Chat Platform ready for deployment"
```

## Step 5: Add Remote (if needed)

```powershell
git remote add origin https://github.com/eduardodscott/qr-chat-platform.git
```

If you get an error saying "remote origin already exists", run this instead:
```powershell
git remote set-url origin https://github.com/eduardodscott/qr-chat-platform.git
```

## Step 6: Set Main Branch

```powershell
git branch -M main
```

## Step 7: Push to GitHub

```powershell
git push -u origin main
```

**If you get an authentication error**, you'll need to:

### Option A: Use Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "QR Platform Deployment"
4. Select scope: ✅ `repo` (check this)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, GitHub will ask for credentials:
   - **Username**: Your GitHub username (eduardodscott)
   - **Password**: Paste the token (not your GitHub password)

### Option B: Use GitHub CLI

```powershell
gh auth login
gh repo sync
```

### Option C: Configure Git Credential Helper (Windows)

```powershell
git config --global credential.helper wincred
```

Then try pushing again - Windows will prompt for credentials.

---

## Troubleshooting

### Error: "repository not found"
- Check the repository name is correct
- Make sure you have access to the repository

### Error: "authentication failed"
- Generate a Personal Access Token (see above)
- Use the token as password when pushing

### Error: "remote origin already exists"
- Run: `git remote set-url origin https://github.com/eduardodscott/qr-chat-platform.git`

---

## Verify Push Was Successful

After pushing, refresh your GitHub repository page:
https://github.com/eduardodscott/qr-chat-platform

You should see all your files there!

