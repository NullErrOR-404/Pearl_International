import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react"
import { getGlobalSettings } from "@/lib/data/settings"

export async function ContactInformation() {
  const settings = await getGlobalSettings()
  
  const fb = settings?.facebook_url || "#"
  const ig = settings?.instagram_url || "#"
  const li = settings?.linkedin_url || "#"
  
  const showFacebook = settings?.show_facebook ?? true
  const showInstagram = settings?.show_instagram ?? true
  const showLinkedin = settings?.show_linkedin ?? true

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-charcoal/10 h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-sans font-bold text-brand-navy text-sm tracking-widest uppercase mb-3">
          CONTACT INFORMATION
        </h2>
        <div className="w-12 h-px bg-brand-gold"></div>
      </div>

      {/* Info Items */}
      <div className="flex flex-col gap-6 flex-1">
        
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Phone</span>
            <a href="tel:+919840632263" className="text-brand-charcoal/70 text-sm hover:text-brand-gold transition-colors">+91 98406 32263</a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Email</span>
            <a href="mailto:pearlinternational1010@gmail.com" className="text-brand-charcoal/70 text-sm hover:text-brand-gold transition-colors break-all">pearlinternational1010@gmail.com</a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Address</span>
            <address className="not-italic text-brand-charcoal/70 text-sm whitespace-pre-line leading-relaxed">
              5th street Mosque colony,{"\n"}
              Guindy, Chennai - 600032
            </address>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Business Hours</span>
            <p className="text-brand-charcoal/70 text-sm leading-relaxed">
              Mon – Sat: 9:00 AM – 6:00 PM<br/>
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Website</span>
            <a href="https://www.pearlinternational.com" target="_blank" rel="noopener noreferrer" className="text-brand-charcoal/70 text-sm hover:text-brand-gold transition-colors">www.pearlinternational.com</a>
          </div>
        </div>

        {/* Proprietor */}
        <div className="flex items-start gap-4 mt-2">
          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <span className="text-brand-gold font-bold font-sans tracking-tighter text-sm">MJ</span>
          </div>
          <div className="pt-1">
            <span className="block font-sans font-bold text-brand-navy text-sm mb-1">Proprietor</span>
            <span className="text-brand-charcoal/90 font-medium text-sm block">MOHAMMED JUNAID S</span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="mt-4">
          <a href="https://wa.me/919840632263" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-4 rounded-xl transition-colors font-bold tracking-wide text-sm shadow-md border border-[#25D366]/20 hover:border-[#128C7E]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Contact on WhatsApp
          </a>
        </div>

      </div>

      {/* Social Follow */}
      <div className="mt-10 pt-8 border-t border-brand-charcoal/10">
        <h3 className="font-sans font-bold text-brand-navy text-sm mb-4">Follow Us</h3>
        <div className="flex items-center gap-3">
          {showFacebook && (
            <a href={fb} target="_blank" className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center group hover:bg-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
              <svg className="w-4 h-4 text-white group-hover:text-brand-navy transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              <span className="sr-only">Facebook</span>
            </a>
          )}
          {showInstagram && (
            <a href={ig} target="_blank" className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center group hover:bg-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
              <svg className="w-4 h-4 text-white group-hover:text-brand-navy transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span className="sr-only">Instagram</span>
            </a>
          )}
          {showLinkedin && (
            <a href={li} target="_blank" className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center group hover:bg-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
              <svg className="w-4 h-4 text-white group-hover:text-brand-navy transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
        </div>
      </div>

    </div>
  )
}
