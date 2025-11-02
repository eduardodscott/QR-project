import { NextRequest, NextResponse } from 'next/server'

// Temporary: i18n disabled - middleware for future features
export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // i18n can be re-enabled later if needed
  return NextResponse.next()
}

export const config = {
  // Match minimal set of routes for now
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

