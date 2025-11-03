# Fix Root Layout - Missing HTML Tags

## Problem:
Root layout (`app/layout.tsx`) was missing required `<html>` and `<body>` tags.

## Solution Applied:
✅ Added `<html>` and `<body>` tags to root layout
✅ Wrapped children with `SessionProvider` for NextAuth
✅ Added `lang="en"` attribute to `<html>` tag

## Updated `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

export const metadata: Metadata = {
  title: 'QR-Chat Platform',
  description: 'Ephemeral messaging platform via QR codes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
```

## Next Steps:
Development server is starting. Once ready:
- Open: **http://localhost:3000**
- The app should work correctly now!

---

**Root layout fixed with proper HTML structure!**

