# How to View Commits on GitHub

## Quick Links:

### 1. View All Commits (Main Branch)
**Direct Link:**
```
https://github.com/eduardodscott/QR-project/commits/main
```

This shows all commits on the main branch in chronological order (newest first).

### 2. View Latest Commit Details
**Direct Link:**
```
https://github.com/eduardodscott/QR-project/commit/HEAD
```
(Or replace HEAD with the actual commit hash)

### 3. Check in Terminal
Run this command to see recent commits:
```powershell
git log --oneline -5
```

This shows the last 5 commits with their hash and message.

### 4. Get Latest Commit Hash
```powershell
git rev-parse HEAD
```

---

## What to Look For:

On the commits page, you should see:
- **Latest commit at the top** (most recent)
- **Commit message** describing what was changed
- **Commit hash** (short version like `abc1234`)
- **Date and time** of the commit

The latest commit should be **newer than** `db40729` (the old commit Vercel was using).

---

## Verify Files Are in Latest Commit:

### Option 1: Check on GitHub
1. Go to: https://github.com/eduardodscott/QR-project/commits/main
2. Click on the **latest commit** (top of the list)
3. Look for changes to:
   - `components/` folder
   - `lib/` folder
   - `package.json`
   - `.npmrc`

### Option 2: Check in Terminal
```powershell
# See what files are in latest commit
git show HEAD --name-only

# Or see files changed in last 5 commits
git log --oneline --name-only -5
```

---

## Quick Checklist:

- [ ] Visit commits page: https://github.com/eduardodscott/QR-project/commits/main
- [ ] Latest commit should be at the top
- [ ] Latest commit should be newer than `db40729`
- [ ] Click on latest commit to see file changes
- [ ] Verify `components/` and `lib/` files are in the commit

---

**After checking, verify Vercel is building from the latest commit!**

