import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*',       // Match /dashboard and all its sub-paths
    '/coach-dashboard/:path*', // Match /coach-dashboard and all its sub-paths
    
  ],
}