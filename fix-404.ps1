# Stop any running Node processes (optional - be careful!)
# Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clear Next.js cache
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "Cleared .next cache" -ForegroundColor Green
}

# Restart dev server
Write-Host "Starting dev server..." -ForegroundColor Yellow
npm run dev

