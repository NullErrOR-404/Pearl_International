import { Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { getGlobalSettings } from '@/lib/data/settings'

export async function TopBar() {
  const settings = await getGlobalSettings()
  
  const phone = settings?.primary_phone || "+91 98406 32263"
  const email = settings?.primary_email || "info@pearlinternational.com"
  const fb = settings?.facebook_url || "#"
  const ig = settings?.instagram_url || "#"
  const li = settings?.linkedin_url || "#"

  const showFacebook = settings?.show_facebook ?? true
  const showInstagram = settings?.show_instagram ?? true
  const showLinkedin = settings?.show_linkedin ?? true

  // Strip non-numeric chars for the tel: link
  const phoneLink = phone.replace(/[^0-9+]/g, '')

  return (
    <div className="w-full bg-brand-navy text-white py-2">
      <div className="container mx-auto px-4 max-w-7xl flex flex-row justify-between items-center gap-1 sm:gap-4">
        
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-2 sm:gap-4 text-brand-ivory/90 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
          <a href={`tel:${phoneLink}`} className="flex items-center gap-1 sm:gap-2 hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" aria-hidden="true" />
            <span>{phone}</span>
          </a>
          <span className="text-white/30" aria-hidden="true">|</span>
          <a href={`mailto:${email}`} className="flex items-center gap-1 sm:gap-2 hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" aria-hidden="true" />
            <span className="hidden sm:inline">{email}</span>
            <span className="sm:hidden">Email Us</span>
          </a>
        </div>

        {/* Right Side: Social */}
        <div className="flex items-center gap-2 sm:gap-4 text-brand-ivory/90 text-[10px] sm:text-xs md:text-sm">
          <span className="hidden md:inline font-medium text-white/80">Follow Us:</span>
          <div className="flex items-center gap-2 sm:gap-3">
            {showFacebook && (
              <Link href={fb} target="_blank" className="hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
            )}
            {showInstagram && (
              <Link href={ig} target="_blank" className="hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </Link>
            )}
            {showLinkedin && (
              <Link href={li} target="_blank" className="hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

