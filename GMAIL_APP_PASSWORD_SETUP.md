# Gmail App Password Setup Guide

## Prerequisites

Before you can create a Gmail App Password, you **MUST** have:
- ✅ A Gmail account (or Google account with Gmail)
- ✅ **2-Step Verification enabled** (this is required!)

---

## Step 1: Enable 2-Step Verification

If you don't have 2-Step Verification enabled yet:

1. Go to: **https://myaccount.google.com/security**
2. Sign in with your Google account
3. Scroll down to **"How you sign in to Google"** section
4. Find **"2-Step Verification"**
5. Click **"Get started"** or **"Turn on"**
6. Follow the setup wizard:
   - Enter your password
   - Add a phone number for verification
   - Enter the verification code sent to your phone
   - Choose to turn on 2-Step Verification
7. Complete the setup

**Note**: This is mandatory. Gmail App Passwords only work with 2-Step Verification enabled.

---

## Step 2: Generate App Password

### Method 1: Direct Link (Recommended)

1. Go directly to: **https://myaccount.google.com/apppasswords**
   - You might need to sign in first

### Method 2: Through Security Settings

1. Go to: **https://myaccount.google.com/security**
2. Scroll down to **"How you sign in to Google"** section
3. Find **"App passwords"** (it appears after 2-Step Verification is enabled)
4. Click **"App passwords"**

---

## Step 3: Create New App Password

1. You'll see a page titled **"Select app"** and **"Select device"**

2. **Select app**:
   - Click the dropdown
   - Select **"Mail"**

3. **Select device**:
   - Click the dropdown
   - Select **"Other (Custom name)"**
   - Type: "QR-Chat Platform" (or any name to identify it)
   - Click **"Generate"**

4. **IMPORTANT**: Google will display a 16-character password:
   - It looks like: `abcd efgh ijkl mnop` (with spaces) or `abcdefghijklmnop` (without spaces)
   - **COPY THIS IMMEDIATELY!** You won't be able to see it again
   - The format is: 4 groups of 4 characters each

5. **Save this password** - you'll add it to your `.env` file

---

## Step 4: Add to Your .env File

Open your `.env` file and add:

```env
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"
```

**Important Notes**:
- Use your **full Gmail address** (e.g., `yourname@gmail.com`)
- For the App Password, you can include spaces or remove them - both work:
  - `abcd efgh ijkl mnop` OR
  - `abcdefghijklmnop`
- Don't include quotes around the values (or remove them if you do)
- Don't commit the `.env` file to GitHub (it's already in `.gitignore`)

---

## Step 5: Verify Setup

1. Make sure your `.env` file has:
   - `GMAIL_USER=your-email@gmail.com`
   - `GMAIL_APP_PASSWORD=your-16-character-password`

2. Test the email configuration (we'll test this when we build the email service)

---

## Important Security Notes

🔒 **Security Best Practices**:

1. **Never share your App Password**
   - Treat it like your regular password
   - Don't commit it to GitHub or share publicly

2. **Use App Passwords, not your regular password**
   - Your regular Gmail password won't work with SMTP
   - You must use the App Password

3. **Revoke if compromised**
   - If you think your App Password is compromised:
   - Go back to App Passwords settings
   - Find the password you created
   - Click the trash icon to revoke it
   - Generate a new one

4. **Multiple App Passwords**
   - You can create multiple App Passwords
   - Each one is unique
   - Useful if you need separate passwords for different environments

---

## Troubleshooting

### Issue: "App passwords" option doesn't appear
**Solution**:
- Make sure **2-Step Verification is enabled** (this is required!)
- Try refreshing the page
- Wait a few minutes after enabling 2-Step Verification

### Issue: "Sign in using your app password" error
**Solution**:
- Double-check you're using the **App Password**, not your regular password
- Make sure there are no extra spaces (or use spaces consistently)
- Verify the password was copied correctly (all 16 characters)

### Issue: SMTP authentication failed
**Solution**:
- Verify `GMAIL_USER` is your full email address
- Verify `GMAIL_APP_PASSWORD` is the correct 16-character password
- Make sure there are no quotes or extra spaces in your `.env` file
- Check that 2-Step Verification is still enabled

### Issue: Password not working after copying
**Solution**:
- App Passwords are case-sensitive
- Make sure you copied all 16 characters
- Try removing spaces or keeping them consistent
- Generate a new App Password if needed

---

## Quick Checklist

- [ ] 2-Step Verification is enabled on your Google account
- [ ] Generated App Password for "Mail" app
- [ ] Copied the 16-character password immediately
- [ ] Added `GMAIL_USER` to `.env` file (with your full email)
- [ ] Added `GMAIL_APP_PASSWORD` to `.env` file (16 characters)
- [ ] Verified no quotes or extra spaces in `.env`
- [ ] Tested email sending (will do this during setup)

---

## Alternative: Using Gmail in Production

If you plan to send many emails in production, consider:
- Using a dedicated Gmail account for the platform (not your personal one)
- Setting up email sending limits monitoring
- Google has sending limits (500 emails/day for free accounts)

For the initial setup and testing, your personal Gmail with App Password is fine!

---

**Next Step**: Once you have both Google OAuth and Gmail App Password set up, proceed with:
1. Adding all credentials to your `.env` file
2. Running `npm install`
3. Setting up the database
4. Testing the application

