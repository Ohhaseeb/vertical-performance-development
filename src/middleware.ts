import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*',       // Match /dashboard and all its sub-paths
    '/coach-dashboard/:path*', // Match /coach-dashboard and all its sub-paths
    '/athlete/:path*', // Match /athlete and all its sub-paths

    
    // Add any other paths that require authentication here
    /*
     * The pattern below is removed as it matches all paths except static assets.
     * We only want the middleware to run on the explicitly listed protected routes above.
     */
    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}