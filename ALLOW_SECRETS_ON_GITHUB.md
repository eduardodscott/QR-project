# How to Allow Secrets on GitHub

Since GitHub has already detected the secrets in commit history, the easiest solution is to allow them through GitHub's interface.

## Option 1: Allow Secrets (Easiest - Recommended)

GitHub has provided URLs to allow the secrets. Just click these links:

### For Google OAuth Client ID:
1. **Click this link**: https://github.com/eduardodscott/qr-chat-platform/security/secret-scanning/unblock-secret/34wZyipMPWvAlPsRTi74hDZAaqP
2. Click **"Allow secret"** button
3. Confirm

### For Google OAuth Client Secret:
1. **Click this link**: https://github.com/eduardodscott/qr-chat-platform/security/secret-scanning/unblock-secret/34wZyf0ce3E1EAcSdhvzwnB83Tb
2. Click **"Allow secret"** button
3. Confirm

### After Allowing:
```powershell
git push -u origin main
```

The push should work now!

---

## Option 2: Rewrite Git History (If You Don't Want to Allow)

If you prefer not to allow secrets, we can rewrite git history:

```powershell
# Warning: This rewrites history - only do this if you haven't shared the repo yet!

# Remove secrets from all commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ENV_COMPLETE.txt DEPLOYMENT_CHECKLIST.md DEPLOYMENT_GUIDE.md VERCEL_DEPLOY_INSTRUCTIONS.md VERCEL_ENV_VALUES.md" --prune-empty --tag-name-filter cat -- --all

# Force push (only if you're the only one using this repo!)
git push -u origin main --force
```

**⚠️ Warning**: Force pushing rewrites history. Only do this if:
- You're the only one using this repository
- You haven't shared it with anyone yet

---

## Recommended: Use Option 1

Since these are your own credentials for deployment, **Option 1 (allow secrets)** is the easiest and safest approach.

The secrets are already in your commit history - allowing them just tells GitHub that you're aware of them and they're intentional.

---

**After allowing secrets, push again:**
```powershell
git push -u origin main
```

