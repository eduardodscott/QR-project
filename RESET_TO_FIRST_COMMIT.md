# Reset to First Working Version

## Steps to Reset:

### Step 1: Find the First Commit
```powershell
# Show commits from first to last
git log --oneline --reverse

# Get first commit SHA
$firstCommit = git log --oneline --reverse | Select-Object -First 1
```

### Step 2: Check What's in the First Commit
```powershell
# View files in first commit
git show --name-only <first-commit-sha>
```

### Step 3: Reset to First Commit
**⚠️ WARNING: This will discard all current changes!**

**Option A: Hard Reset (discards all changes)**
```powershell
git reset --hard <first-commit-sha>
```

**Option B: Create New Branch (keeps current work)**
```powershell
git checkout -b original-working-version <first-commit-sha>
```

**Option C: Checkout First Commit Temporarily**
```powershell
git checkout <first-commit-sha>
# Make changes, test locally
# When done: git checkout main
```

### Step 4: Clean Up
```powershell
# Remove untracked files
git clean -fd

# Remove node_modules and .next
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
```

### Step 5: Reinstall Dependencies
```powershell
npm install
```

### Step 6: Set Up Environment
```powershell
# Make sure .env file exists with all variables
# See ENV_SETUP_GUIDE.md for details
```

### Step 7: Run Database Setup
```powershell
npm run db:push
```

### Step 8: Test Locally
```powershell
npm run dev
```

---

**Let me check the git history to find the first commit!**

