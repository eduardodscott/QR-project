# Create Branch for Working Version - Manual Steps

## Run These Commands:

### Step 1: Check Current Status
```powershell
cd "C:\Users\eduar\Documents\QR project"
git status
```

### Step 2: Add Changes
```powershell
git add package.json .npmrc app/layout.tsx
```

### Step 3: Commit Changes
```powershell
git commit -m "Fix nodemailer version and root layout - working version"
```

### Step 4: Create New Branch
```powershell
git checkout -b working-version
```

### Step 5: Verify Branch Created
```powershell
git branch
```

You should see `* working-version` with an asterisk indicating it's the current branch.

### Step 6: Push to GitHub (Optional)
```powershell
git push -u origin working-version
```

---

**Run these commands step by step to create the branch!**

