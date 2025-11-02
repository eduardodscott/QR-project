# QR-Chat Ephemeral Platform - Detailed Implementation Plan

## Overview
Build a web-based platform where users can generate QR codes for personal objects. When scanned, QR codes open a 24-hour ephemeral chat between the owner and finder.

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Auth.js) with Google OAuth
- **Email**: Gmail SMTP (nodemailer)
- **i18n**: next-intl
- **QR Generation**: qrcode library
- **Deployment**: Vercel
- **Cron Jobs**: Vercel Cron Jobs
- **Styling**: Tailwind CSS (recommended for modern UI)

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Next.js Project
- [ ] Create Next.js 14+ app with TypeScript
- [ ] Configure ESLint and Prettier
- [ ] Set up project structure (app directory)
- [ ] Install core dependencies

### 1.2 Database Setup
- [ ] Initialize Prisma with Neon PostgreSQL
- [ ] Design database schema:
  - **User Model**: id, email, name, image, role (ADMIN | USER), createdAt, updatedAt
  - **QRCode Model**: id, userId, code (unique), name, message, status (ACTIVE | ARCHIVED), createdAt, expiresAt
  - **Chat Model**: id, qrCodeId, userId (owner), readerId (nullable), status (PENDING | ACTIVE | EXPIRED), createdAt, expiresAt
  - **Message Model**: id, chatId, senderId, content, type (PREDEFINED | FREE_TEXT), createdAt
- [ ] Run initial migrations
- [ ] Seed database with admin user (optional)

### 1.3 Environment Configuration
- [ ] Create `.env.example` file
- [ ] Document required environment variables:
  - `DATABASE_URL` (Neon PostgreSQL)
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GMAIL_USER` (email address)
  - `GMAIL_APP_PASSWORD`
  - `ADMIN_EMAIL` (for admin access)

---

## Phase 2: Authentication & Authorization

### 2.1 NextAuth.js Setup
- [ ] Install and configure NextAuth.js
- [ ] Set up Google OAuth provider
- [ ] Create authentication API routes (`/api/auth/[...nextauth]`)
- [ ] Configure session management
- [ ] Implement role-based access control middleware

### 2.2 User Management
- [ ] Auto-create user on first Google sign-in
- [ ] Assign default USER role
- [ ] Create admin assignment mechanism
- [ ] Build user profile page

---

## Phase 3: Core Backend Logic

### 3.1 QR Code Management API
- [ ] `POST /api/qr/create` - Create new QR code
  - Validate user has < 10 active QRs
  - Generate unique QR code string
  - Create QR code record
  - Generate QR code image
  - Return QR code data and image
- [ ] `GET /api/qr/list` - Get user's QR codes (with filtering)
- [ ] `GET /api/qr/[id]` - Get single QR code
- [ ] `PUT /api/qr/[id]/archive` - Archive QR code
- [ ] `DELETE /api/qr/[id]` - Delete QR code
- [ ] `GET /api/qr/[id]/download` - Download QR code as image

### 3.2 Chat & Message API
- [ ] `GET /api/qr/[code]/scan` - Public endpoint for QR code scanning
  - Verify QR code exists and is active
  - Create or retrieve chat
  - Return chat ID and QR code details
- [ ] `POST /api/chat/[chatId]/message` - Send message
  - Validate message rules (predefined vs free-text)
  - Check chat expiration
  - Enforce 200 character limit for free-text
  - Create message record
  - Trigger email notification if first message
- [ ] `GET /api/chat/[chatId]` - Get chat with messages
- [ ] `GET /api/chat/list` - Get user's chats (authenticated)
- [ ] `PUT /api/chat/[chatId]/expire` - Manually expire chat (admin/cron)

### 3.3 Email Notification System
- [ ] Install nodemailer
- [ ] Configure Gmail SMTP connection
- [ ] Create email service module
- [ ] Design email templates (English/Spanish):
  - Welcome email (first message notification)
  - Chat reply notification
- [ ] Implement email sending logic:
  - Trigger on first Reader message only
  - Include chat link in email
  - Support bilingual emails
- [ ] Add error handling and logging

### 3.4 Admin API
- [ ] `GET /api/admin/users` - List all users
- [ ] `PUT /api/admin/users/[id]/role` - Update user role
- [ ] `PUT /api/admin/users/[id]/status` - Activate/deactivate user
- [ ] `GET /api/admin/qr` - List all QR codes
- [ ] `PUT /api/admin/qr/[id]/status` - Activate/deactivate QR
- [ ] `GET /api/admin/chats` - List all chats
- [ ] `POST /api/admin/impersonate` - Impersonate user (for support)
- [ ] `GET /api/admin/stats` - Dashboard statistics

---

## Phase 4: Frontend Development

### 4.1 Layout & Navigation
- [ ] Create root layout with language switcher
- [ ] Build navigation component (responsive)
- [ ] Implement protected route wrapper
- [ ] Add loading states and error boundaries

### 4.2 User Dashboard (Authenticated)
- [ ] Dashboard homepage:
  - Display active QR count (max 10)
  - Recent chats summary
  - Quick actions
- [ ] QR Code Management:
  - Create QR form (name, message)
  - QR code list (active/archived filters)
  - QR code detail view with image
  - Download QR code button
  - Archive/unarchive functionality
- [ ] Chat Management:
  - Chat list with status indicators
  - Chat detail view with message thread
  - Message input (with character counter)
  - Real-time message updates (polling or SSE)

### 4.3 Public QR Scanner Page
- [ ] `/[locale]/qr/[code]` - Public page for QR code scanning
  - Display QR code owner's message
  - Show predefined message options (3 buttons)
  - Show chat interface after owner replies
  - Free-text input (200 char limit) after reply
  - Display expiration countdown
  - Handle expired chat state

### 4.4 Admin Dashboard
- [ ] Admin layout with sidebar navigation
- [ ] User Management:
  - User list with filters
  - User detail view
  - Role assignment interface
  - Activation/deactivation toggle
  - Impersonation button
- [ ] QR Code Management:
  - All QR codes list
  - QR code detail view
  - Activation/deactivation controls
- [ ] Chat Management:
  - All chats list
  - Chat detail view
  - Manual expiration option
- [ ] Statistics Dashboard:
  - Total users, QRs, chats
  - Active chats count
  - Recent activity

### 4.5 Authentication Pages
- [ ] Sign-in page with Google OAuth button
- [ ] Sign-out functionality
- [ ] Protected route redirects

---

## Phase 5: Internationalization (i18n)

### 5.1 next-intl Setup
- [ ] Install and configure next-intl
- [ ] Set up locale routing (`/en`, `/es`)
- [ ] Create translation files:
  - `messages/en.json`
  - `messages/es.json`
- [ ] Configure locale detection and switching

### 5.2 Translation Content
- [ ] Translate all UI components:
  - Navigation
  - Dashboard
  - Forms
  - Buttons
  - Error messages
  - Email templates
- [ ] Create language switcher component
- [ ] Test bilingual functionality

---

## Phase 6: Scheduling & Automation

### 6.1 Chat Expiration Cron Job
- [ ] Create Vercel Cron Job configuration
- [ ] Implement expiration logic:
  - Find chats that expired (> 24 hours old)
  - Update chat status to EXPIRED
  - Mark as read-only
- [ ] Test cron job locally and in production
- [ ] Set up monitoring/logging for cron execution

---

## Phase 7: UI/UX Polish

### 7.1 Styling & Design
- [ ] Implement responsive design (mobile-first)
- [ ] Create consistent color scheme
- [ ] Add loading spinners and skeleton states
- [ ] Implement toast notifications for actions
- [ ] Add form validation feedback
- [ ] Create QR code display component with styling

### 7.2 User Experience
- [ ] Add keyboard shortcuts (optional)
- [ ] Implement auto-save for draft messages
- [ ] Add confirmation dialogs for destructive actions
- [ ] Create empty states for lists
- [ ] Add search/filter functionality where needed

---

## Phase 8: Testing & QA

### 8.1 Functional Testing
- [ ] Test complete user flow:
  - User registration via Google OAuth
  - QR code creation
  - QR code scanning
  - Predefined message sending
  - Email notification receipt
  - Owner reply
  - Free-text messaging
  - Chat expiration after 24 hours
- [ ] Test edge cases:
  - Max QR limit (10 active)
  - Duplicate email prevention
  - Expired chat handling
  - Archived QR behavior
  - Admin impersonation
- [ ] Test bilingual interface
- [ ] Test responsive design on multiple devices

### 8.2 Security Testing
- [ ] Verify authentication protection on all routes
- [ ] Test role-based access control
- [ ] Validate input sanitization
- [ ] Test API rate limiting (if applicable)
- [ ] Verify email sending doesn't spam

---

## Phase 9: Deployment

### 9.1 Vercel Configuration
- [ ] Create `vercel.json` for cron job configuration
- [ ] Set up environment variables in Vercel dashboard
- [ ] Configure build settings
- [ ] Set up custom domain (if applicable)

### 9.2 CI/CD Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure automatic deployments
- [ ] Set up preview deployments for PRs
- [ ] Document deployment process

### 9.3 Production Verification
- [ ] Test authentication in production
- [ ] Verify database connections
- [ ] Test email sending from production
- [ ] Verify cron job execution
- [ ] Test bilingual routing
- [ ] Perform end-to-end testing

---

## Phase 10: Documentation

### 10.1 Technical Documentation
- [ ] API documentation
- [ ] Database schema documentation
- [ ] Environment variables guide
- [ ] Gmail App Password setup guide
- [ ] Deployment guide
- [ ] Cron job configuration guide

### 10.2 User Documentation
- [ ] User guide (how to create QR codes)
- [ ] Admin guide (how to manage platform)
- [ ] Troubleshooting guide

---

## File Structure (Proposed)

```
qr-chat-platform/
├── app/
│   ├── [locale]/
│   │   ├── dashboard/
│   │   ├── qr/
│   │   ├── chat/
│   │   └── admin/
│   ├── api/
│   │   ├── auth/
│   │   ├── qr/
│   │   ├── chat/
│   │   ├── admin/
│   │   └── cron/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── qr/
│   ├── chat/
│   └── admin/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── email.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── messages/
│   ├── en.json
│   └── es.json
├── public/
├── .env.example
├── next.config.js
├── package.json
├── vercel.json
└── README.md
```

---

## Estimated Timeline

- **Phase 1-2**: 1-2 days (Setup + Auth)
- **Phase 3**: 3-4 days (Backend APIs)
- **Phase 4**: 4-5 days (Frontend)
- **Phase 5**: 1-2 days (i18n)
- **Phase 6**: 1 day (Cron)
- **Phase 7**: 2-3 days (Polish)
- **Phase 8**: 2 days (Testing)
- **Phase 9**: 1 day (Deployment)
- **Phase 10**: 1 day (Documentation)

**Total**: ~15-20 days of development

---

## Critical Dependencies & Credentials Needed

Before starting, we need:

1. **Neon PostgreSQL Database URL**
2. **Google OAuth Credentials** (Client ID & Secret)
3. **Gmail Account** with App Password enabled
4. **Admin Email Address** (for initial admin setup)
5. **Vercel Account** (for deployment)

---

## Questions to Answer Before Implementation

1. Do you have the Neon PostgreSQL database URL ready?
2. Do you have Google OAuth credentials (Client ID and Secret)?
3. Do you have a Gmail account with App Password already set up?
4. What email address should be the initial admin?
5. Do you have any design preferences (color scheme, branding)?
6. Are there specific predefined messages you want, or should I create generic ones?
7. Should the QR codes be customizable in design/color, or standard black/white?
8. Do you need real-time messaging (WebSockets) or is polling acceptable?
9. Any specific requirements for the admin impersonation feature?
10. Should there be analytics/tracking for QR code scans?

