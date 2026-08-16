import { MapPin } from "lucide-react"

export function LocationMap() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center gap-2">
            OUR LOCATION
            <div className="w-8 h-px bg-brand-gold"></div>
          </span>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-brand-charcoal/10 flex flex-col md:flex-row items-end md:items-center p-4 md:p-8">
          
          {/* Real iframe Google Map Embed */}
          <iframe 
            src="https://maps.google.com/maps?q=5th+street+Mosque+colony,+Guindy,+Chennai+-+600032&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Pearl International Location"
          ></iframe>
          
          {/* Overlay Card */}
          <div className="relative z-10 bg-brand-navy p-6 md:p-8 rounded-xl shadow-2xl w-full md:max-w-sm ml-0 md:ml-4 flex flex-col gap-4 border border-brand-gold/20">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-lg mb-2">Pearl International</h4>
                <p className="text-brand-ivory/70 text-sm leading-relaxed whitespace-pre-line">
                  5th street Mosque colony,{"\n"}
                  Guindy, Chennai - 600032
                </p>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=5th+street+Mosque+colony,+Guindy,+Chennai+-+600032" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-brand-navy hover:bg-white hover:text-brand-navy rounded-sm font-bold tracking-widest text-xs uppercase transition-colors"
            >
              VIEW ON MAP →
            </a>
            
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
