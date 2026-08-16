import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Maintenance Mode Check
  // Skip maintenance check for admin, auth, and maintenance page itself
  if (
    !pathname.startsWith('/admin') && 
    !pathname.startsWith('/auth') && 
    !pathname.startsWith('/maintenance')
  ) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseAnonKey) {
        const res = await fetch(`${supabaseUrl}/rest/v1/settings?select=maintenance_mode&limit=1`, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          next: { revalidate: 60 } 
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            const settings = data[0]
            
            // Maintenance Mode
            if (settings.maintenance_mode) {
              return NextResponse.redirect(new URL('/maintenance', request.url))
            }
          }
        }
      }
    } catch (error) {
      console.error("Middleware Supabase fetch error:", error)
    }
  }

  // 2. Auth Check
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
