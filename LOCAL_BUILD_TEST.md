# Local Build Test Guide

## Testing Locally Before Vercel Deployment

### Step 1: Verify Current State
```powershell
# Check latest commit
git log --oneline -1

# Check if [locale] folder exists (should NOT exist)
Test-Path "app\[locale]"

# Check if component files exist (should exist)
Test-Path "components\chat\ChatDetail.tsx"
Test-Path "lib\auth.ts"

# Verify tsconfig.json has fixes
Get-Content tsconfig.json | Select-String "baseUrl|moduleResolution"
```

### Step 2: Clean Build
```powershell
# Remove old build cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Run build
npm run build
```

### Step 3: Verify Build Output
The build should:
- ✅ Compile successfully
- ✅ Resolve all `@/components/*` paths
- ✅ Resolve all `@/lib/*` paths
- ✅ NOT try to build `app/[locale]` routes

### Step 4: If Build Fails Locally
If the build fails with the same errors:
1. Check if component files exist
2. Check if `tsconfig.json` has `baseUrl` and `moduleResolution: "node"`
3. Check if `[locale]` folder is deleted

### Step 5: If Build Succeeds Locally
✅ Commit and push all changes:
```powershell
git add -A
git commit -m "Tested locally - build works"
git push origin main
```

Then trigger a new deployment in Vercel.

---

**Run `npm run build` to test locally!**

