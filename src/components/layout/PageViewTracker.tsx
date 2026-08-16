"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/analytics-actions"

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track public paths (ignore admin routes)
    if (pathname && !pathname.startsWith('/admin')) {
      trackPageView(pathname)
    }
  }, [pathname])

  return null
}
