import { Leaf, Search, Settings, ShieldCheck, Box, Truck } from "lucide-react"

export function QualityProcess() {
  const steps = [
    {
      number: "01",
      title: "Sourcing",
      desc: "Carefully sourced from trusted farms and reliable growers.",
      icon: <Leaf className="w-6 h-6 text-brand-gold" />
    },
    {
      number: "02",
      title: "Inspection",
      desc: "Raw materials are inspected for quality, purity and freshness.",
      icon: <Search className="w-6 h-6 text-brand-gold" />
    },
    {
      number: "03",
      title: "Processing",
      desc: "Hygienic processing using advanced technology and best practices.",
      icon: <Settings className="w-6 h-6 text-brand-gold" />
    },
    {
      number: "04",
      title: "Quality Check",
      desc: "Multiple quality checks ensure consistency, safety and international standards.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />
    },
    {
      number: "05",
      title: "Packaging",
      desc: "Products are packed with care using food-grade and eco-friendly materials.",
      icon: <Box className="w-6 h-6 text-brand-gold" />
    },
    {
      number: "06",
      title: "Delivery",
      desc: "Timely and safe delivery to your destination worldwide.",
      icon: <Truck className="w-6 h-6 text-brand-gold" />
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center justify-center gap-2">
            OUR QUALITY ASSURANCE
            <div className="w-8 h-px bg-brand-gold"></div>
          </span>
          <h2 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl text-brand-navy font-bold mb-4">
            Excellence at Every Step
          </h2>
          <p className="text-brand-charcoal/70 max-w-2xl mx-auto text-sm md:text-base">
            We follow a strict quality assurance process to deliver products of the highest standard.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Background Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[8%] right-[8%] h-px border-t-2 border-dashed border-brand-gold/30 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                
                {/* Icon Container */}
                <div className="w-[90px] h-[90px] rounded-full bg-brand-navy flex items-center justify-center border-4 border-white shadow-md mb-6 relative">
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-3 bg-white text-brand-gold font-bold text-xs px-2 py-0.5 rounded-full border border-brand-gold/20 shadow-sm">
                    {step.number}
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-sans tracking-tight font-semibold text-brand-navy text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-charcoal/60 text-xs md:text-sm leading-relaxed px-2 lg:px-0">
                  {step.desc}
                </p>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
