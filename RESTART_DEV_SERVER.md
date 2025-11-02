# How to Restart the Dev Server

## Stop the Current Server

If `npm run dev` is running:
1. Press `Ctrl + C` in the terminal where it's running
2. Wait for it to stop

## Restart the Server

Run:
```bash
npm run dev
```

## Clear Next.js Cache (if needed)

If the restart doesn't work, try clearing the Next.js cache:

```bash
# Stop the server first (Ctrl + C)

# Delete .next folder
Remove-Item -Recurse -Force .next

# Restart
npm run dev
```

