import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Middleware for the server
export async function updateSession(request: NextRequest) {
  console.log('Middleware triggered for path:', request.nextUrl.pathname)
  
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create a client for the server
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  // Get the user from database
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log('Session data:', user)

  // If user is not logged in and trying to access protected routes
  if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
    console.log('No session found, redirecting to login')
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in, check their role and handle dashboard routing
  if (user) {
    console.log('User is logged in, checking role')
    // this is not secure below should figure out a better way to do this
    const isAdmin = user.email === 'haseebsayed960@gmail.com'
    const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')
    const isOnCoachDashboard = request.nextUrl.pathname.startsWith('/coach-dashboard')

    console.log('Is admin:', isAdmin)

    // Redirect admin users trying to access regular dashboard
    if (isAdmin && isOnDashboard) {
      console.log('Admin user detected, redirecting to coach dashboard')
      const url = request.nextUrl.clone()
      url.pathname = '/coach-dashboard'
      return NextResponse.redirect(url)
    }

    // Redirect non-admin users trying to access coach dashboard
    if (!isAdmin && isOnCoachDashboard) {
      console.log('Non-admin user trying to access coach dashboard, redirecting to dashboard')
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

