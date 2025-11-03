# Local Testing Guide

## Starting Development Server

Run this command:
```powershell
npm run dev
```

## Access the Application

Once the server starts, open your browser and go to:
- **http://localhost:3000**

## What to Test

### 1. Homepage
- Navigate to: http://localhost:3000
- Should show the homepage

### 2. Sign In
- Navigate to: http://localhost:3000/auth/signin
- Should show Google OAuth sign-in

### 3. Dashboard (After Sign In)
- Navigate to: http://localhost:3000/dashboard
- Should show your dashboard with QR codes and chats

### 4. Admin Dashboard (If Admin)
- Navigate to: http://localhost:3000/admin
- Should show admin dashboard

### 5. Create QR Code
- Click "Create New QR Code" button
- Fill in the form
- Submit

### 6. View QR Code
- Click "Show QR" on a QR code
- Should display the QR code image

### 7. Scan QR Code (Public Page)
- Navigate to: http://localhost:3000/qr/[code]
- Replace `[code]` with an actual QR code from your database
- Should show the public QR code page

### 8. Chat Functionality
- Open a chat from the dashboard
- Should be able to send and receive messages

## Stopping the Server

Press `Ctrl+C` in the terminal to stop the development server.

---

**The development server is starting. Once it's ready, open http://localhost:3000 in your browser!**

