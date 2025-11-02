# How to Run the Project in PowerShell

## Step 1: Open PowerShell

1. Press `Windows Key + X`
2. Select **"Windows PowerShell"** or **"Terminal"**
3. OR search for "PowerShell" in the Start menu

## Step 2: Navigate to Your Project Folder

```powershell
cd "C:\Users\eduar\Documents\QR project"
```

## Step 3: Start the Development Server

```powershell
npm run dev
```

## What You Should See

After running `npm run dev`, you should see output like:

```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X seconds

✓ Starting...
✓ Ready in 1234ms
```

## Step 4: Open in Browser

Once you see "Ready", open your browser and go to:

```
http://localhost:3000
```

---

## Complete PowerShell Commands

Copy and paste these commands one by one:

```powershell
# Navigate to project folder
cd "C:\Users\eduar\Documents\QR project"

# Start development server
npm run dev
```

---

## Alternative: Using VS Code / Cursor Terminal

If you're using VS Code or Cursor:

1. Open your project folder in VS Code/Cursor
2. Press `` Ctrl + ` `` (backtick key) to open terminal
3. The terminal will automatically be in your project folder
4. Type: `npm run dev`
5. Press Enter

---

## Stop the Server

To stop the development server:
- Press `Ctrl + C` in the PowerShell window where it's running
- Wait for it to stop completely

---

## Common Issues

### Issue: "npm is not recognized"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Cannot find module"
**Solution**: Run `npm install` first

### Issue: Port 3000 already in use
**Solution**: 
- Stop any other application using port 3000
- Or use a different port: `npm run dev -- -p 3001`

---

## Quick Reference

```powershell
# Navigate to project
cd "C:\Users\eduar\Documents\QR project"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Stop server (Ctrl + C)
# Press Ctrl + C
```

---

**That's it!** Once `npm run dev` is running, open http://localhost:3000 in your browser.

