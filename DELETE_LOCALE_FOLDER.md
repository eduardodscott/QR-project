# Delete [locale] Folder - Manual Steps

## Critical Issue:
**The `app\[locale]` folder STILL EXISTS and needs to be deleted!**

## Manual Delete Steps:

### Option 1: PowerShell Command
```powershell
cd "C:\Users\eduar\Documents\QR project"

# Delete all files first
Get-ChildItem -Path "app\[locale]" -Recurse -File | Remove-Item -Force

# Then delete the folder
Remove-Item -Recurse -Force "app\[locale]"

# Verify it's deleted
Test-Path "app\[locale]"  # Should return False
```

### Option 2: Manual Delete (Windows Explorer)
1. Open Windows Explorer
2. Navigate to: `C:\Users\eduar\Documents\QR project\app`
3. Find the folder named `[locale]`
4. Right-click → Delete
5. Confirm deletion

### After Deleting:
```powershell
# Clean build cache
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue

# Test build
npm run build
```

### If Build Succeeds:
```powershell
# Commit the deletion
git add -A
git commit -m "Delete [locale] folder - fix build errors"
git push origin main
```

---

**The folder needs to be deleted manually or with PowerShell!**

