import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Globe, MapPin } from "lucide-react"
import { getGlobalSettings } from "@/lib/data/settings"

export async function SiteFooter() {
  const settings = await getGlobalSettings()
  
  const company = settings?.company_name || "Pearl International"
  const tagLine = settings?.tag_line || "Premium agricultural export partner delivering quality globally. We are committed to excellence, reliability, and transparency."
  const phone = settings?.primary_phone || "+91 98406 32263"
  const email = settings?.primary_email || "info@pearlinternational.com"
  const address = settings?.office_address || "Global Export Hub\nChennai, India"
  const fb = settings?.facebook_url || "#"
  const ig = settings?.instagram_url || "#"
  const li = settings?.linkedin_url || "#"
  
  const showFacebook = settings?.show_facebook ?? true
  const showInstagram = settings?.show_instagram ?? true
  const showLinkedin = settings?.show_linkedin ?? true

  // For whatsapp link
  const phoneLink = phone.replace(/[^0-9+]/g, '')
  const whatsappLink = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`

  return (
    <footer className="bg-brand-navy text-brand-ivory/80 pt-16 lg:pt-24 pb-6" role="contentinfo">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block p-2 rounded-md hover:opacity-80 transition-opacity">
              <Image 
                src="/footer-logo.png" 
                alt={company} 
                width={200} 
                height={60} 
                className="h-16 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              {tagLine}
            </p>
            <div className="flex items-center gap-4">
              {showFacebook && (
                <Link href={fb} target="_blank" className="p-2 bg-brand-charcoal/20 hover:bg-brand-gold hover:text-brand-navy transition-colors rounded-full" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
              )}
              {showInstagram && (
                <Link href={ig} target="_blank" className="p-2 bg-brand-charcoal/20 hover:bg-brand-gold hover:text-brand-navy transition-colors rounded-full" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </Link>
              )}
              {showLinkedin && (
                <Link href={li} target="_blank" className="p-2 bg-brand-charcoal/20 hover:bg-brand-gold hover:text-brand-navy transition-colors rounded-full" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-brand-gold transition-colors block">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors block">About Us</Link></li>
              <li><Link href="/products" className="hover:text-brand-gold transition-colors block">Products</Link></li>
              <li><Link href="/quality" className="hover:text-brand-gold transition-colors block">Quality</Link></li>
              <li><Link href="/services" className="hover:text-brand-gold transition-colors block">Services</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Product Categories (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-wider text-sm">Product Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products/coconuts" className="hover:text-brand-gold transition-colors block">Coconut Varieties</Link></li>
              <li><Link href="/products/spices" className="hover:text-brand-gold transition-colors block">Spices Varieties</Link></li>
              <li><Link href="/products/vegetables" className="hover:text-brand-gold transition-colors block">Vegetable Varieties</Link></li>
            </ul>
          </div>

          {/* Contact Us (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`tel:${phoneLink}`} className="flex items-start gap-3 hover:text-brand-gold transition-colors group">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="mt-0.5">{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-3 hover:text-brand-gold transition-colors group">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="mt-0.5 break-all">{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="mt-0.5 whitespace-pre-line">{address}</span>
              </li>
              <li className="pt-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-md transition-colors font-bold tracking-wide text-sm shadow-md mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Contact on WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {company}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="w-px h-3 bg-white/20"></span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
