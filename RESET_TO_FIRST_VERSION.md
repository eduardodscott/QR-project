# Reset to First Working Version

## Steps to Reset:

### Step 1: Check Git History
See all commits and find the first working version:
```powershell
git log --oneline --all
```

### Step 2: Find the First Commit
```powershell
git log --oneline --reverse
```

### Step 3: Reset to First Commit
**Option A: Soft Reset (keeps changes)**
```powershell
git reset --soft <first-commit-sha>
```

**Option B: Hard Reset (discards all changes)**
```powershell
git reset --hard <first-commit-sha>
```

**Option C: Create New Branch from First Commit**
```powershell
git checkout -b original-working-version <first-commit-sha>
```

### Step 4: Make it Work Locally
After resetting:
1. Install dependencies
2. Set up environment variables
3. Run migrations
4. Start development server

---

**Let me check the git history first to find the first commit!**

