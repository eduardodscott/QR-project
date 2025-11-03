# Reset to First Working Version - Step by Step

## Quick Reset Commands:

### Step 1: Find the First Commit
Run this in PowerShell:
```powershell
cd "C:\Users\eduar\Documents\QR project"
git log --oneline --reverse
```

Copy the **first commit SHA** (the one at the top).

### Step 2: Reset to First Commit
**⚠️ WARNING: This will discard all current changes!**

Replace `<first-commit-sha>` with the actual commit SHA from Step 1:

```powershell
# Option A: Hard Reset (recommended - clean slate)
git reset --hard <first-commit-sha>

# OR Option B: Create new branch (keeps current work safe)
git checkout -b original-working-version <first-commit-sha>
```

### Step 3: Clean Up
```powershell
# Remove build artifacts
Remove-Item -Recurse -Force .next, node_modules -ErrorAction SilentlyContinue

# Remove untracked files (optional)
git clean -fd
```

### Step 4: Reinstall Dependencies
```powershell
npm install
```

### Step 5: Set Up Database
```powershell
# Make sure .env file exists with your database URL
npm run db:push
```

### Step 6: Test Locally
```powershell
npm run dev
```

Then open: **http://localhost:3000**

---

## Alternative: Check What's in First Commit First

Before resetting, you can check what the first commit contains:

```powershell
# Get first commit SHA
$firstCommit = (git log --oneline --reverse | Select-Object -First 1).Split()[0]
Write-Host "First commit: $firstCommit"

# View files in first commit
git show --name-only $firstCommit

# View full commit
git show $firstCommit
```

---

**Run these commands step by step!**

