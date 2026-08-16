import Image from "next/image"

export function AboutLeadership() {
  return (
    <section className="bg-brand-navy text-brand-ivory py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center justify-center gap-2">
            LEADERSHIP
            <div className="w-8 h-px bg-brand-gold"></div>
          </span>
          <h2 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-8">
            Guided by Vision and Trust
          </h2>
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-gold/20">
            <span className="text-brand-navy text-3xl font-bold font-sans tracking-tighter">MJ</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">MOHAMMED JUNAID S</h3>
          <p className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-8">Proprietor & Founder</p>
          <p className="text-brand-ivory/80 leading-relaxed text-sm md:text-base italic">
            "At Pearl International, our foundation is built on uncompromising quality and enduring relationships. We take immense pride in sourcing the finest agricultural products and delivering them with complete transparency to our global partners."
          </p>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
    </section>
  )
}
