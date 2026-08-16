import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with cross-browser cookies, so just do it exactly like this.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login') && !request.nextUrl.pathname.startsWith('/admin/forgot-password')) {
    if (!user) {
      // no user, redirect to login page
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Strictly enforce authorized email
    if (user.email !== 'pearlinternational1010@gmail.com') {
      // Authorized user but wrong email, log them out and reject
      await supabase.auth.signOut()
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('error', 'Unauthorized email address.')
      return NextResponse.redirect(url)
    }

    // 15-Minute Inactivity Timeout Check
    const lastActive = request.cookies.get('admin-last-active')?.value
    const now = Date.now()
    const FIFTEEN_MINUTES = 15 * 60 * 1000

    if (lastActive && now - parseInt(lastActive, 10) > FIFTEEN_MINUTES) {
      // Session expired due to inactivity
      await supabase.auth.signOut()
      supabaseResponse.cookies.delete('admin-last-active')
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('error', 'Session expired due to 15 minutes of inactivity.')
      return NextResponse.redirect(url)
    }

    // Refresh the inactivity cookie
    supabaseResponse.cookies.set('admin-last-active', now.toString(), {
      path: '/admin',
      maxAge: 15 * 60, // 15 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  // Redirect authenticated admin away from login page
  if (user && user.email === 'pearlinternational1010@gmail.com' && request.nextUrl.pathname === '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
