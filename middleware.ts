import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  // Note: Removed protection for introductory-sessions 
  // Expert Sessions should be accessible to all users without any form completion requirement
  
  // If you need to protect other routes in the future, add them here
  // Example:
  // if (request.nextUrl.pathname.startsWith('/some-other-protected-route')) {
  //   // Check for completion cookie and redirect if needed
  // }
  
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/introductory-sessions/:path*',
  ]
}
