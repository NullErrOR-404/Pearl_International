import { ShieldCheck, CheckCircle2, Leaf, Box, FileText } from "lucide-react"

export function Certifications() {
  // These are placeholders for the certification data structure.
  // The actual official SVG logos should replace the lucide icons when available.
  const certs = [
    {
      name: "ISO 22000:2018",
      desc: "Food Safety\nManagement System",
      icon: <ShieldCheck className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />,
      isVerified: false // Indicates this is a placeholder claim
    },
    {
      name: "HACCP",
      desc: "Hazard Analysis\nCritical Control Point",
      icon: <CheckCircle2 className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />,
      isVerified: false
    },
    {
      name: "FSSAI",
      desc: "Food Safety and\nStandards Authority\nof India",
      icon: <FileText className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />,
      isVerified: false
    },
    {
      name: "APEDA",
      desc: "Agricultural & Processed\nFood Products Export\nDevelopment Authority",
      icon: <Leaf className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />,
      isVerified: false
    },
    {
      name: "GMP",
      desc: "Good Manufacturing\nPractices",
      icon: <Box className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />,
      isVerified: false
    }
  ]

  return (
    <section className="bg-brand-ivory/30 py-16 md:py-24 border-y border-brand-charcoal/5">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-8 items-start">
          
          {/* Left Text Block */}
          <div className="w-full xl:w-1/3 shrink-0">
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center gap-2">
              CERTIFICATIONS & STANDARDS
              <div className="w-8 h-px bg-brand-gold"></div>
            </span>
            <h2 className="font-sans tracking-tight text-3xl md:text-4xl text-brand-navy font-bold leading-tight mb-6">
              Certified Quality.<br />Global Assurance.
            </h2>
            <p className="text-brand-charcoal/70 text-sm leading-relaxed max-w-md">
              We comply with international quality standards and hold certifications that reflect our commitment to quality, safety and sustainability.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {certs.map((cert, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-brand-charcoal/5 hover:shadow-md transition-shadow">
                  
                  {/* Temporary Icon / Future Logo Slot */}
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-brand-navy/5">
                    {cert.icon}
                  </div>
                  
                  <h4 className="font-sans font-bold text-brand-navy text-sm mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-brand-charcoal/60 text-[10px] md:text-xs leading-tight whitespace-pre-line">
                    {cert.desc}
                  </p>
                  
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
