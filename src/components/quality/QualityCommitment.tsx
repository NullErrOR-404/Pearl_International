import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export function QualityCommitment() {
  const checklist = [
    "100% Natural Products",
    "No Artificial Colors or Additives",
    "Hygienic Processing & Packaging",
    "Traceability at Every Step",
    "Customer Satisfaction Guaranteed"
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-5/12 flex flex-col pt-4">
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center gap-2">
              OUR QUALITY COMMITMENT
              <div className="w-8 h-px bg-brand-gold"></div>
            </span>
            
            <h2 className="font-sans tracking-tight text-3xl md:text-4xl text-brand-navy font-bold leading-tight mb-6">
              Committed to Purity.<br />Dedicated to Perfection.
            </h2>
            
            <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed mb-8">
              From farm to final delivery, we maintain the highest levels of quality, hygiene and traceability. Our goal is to build long-term relationships through trust, transparency and unmatched quality.
            </p>

            <ul className="flex flex-col gap-4">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-brand-charcoal/80 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Bento Gallery */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] md:h-[600px]">
              
              {/* Large Main Image (Left Column on Desktop) */}
              <div className="relative rounded-2xl overflow-hidden h-full hidden md:block">
                <Image 
                  src="/images/quality_agri_field.jpg" 
                  alt="Lush agricultural field representing natural sourcing"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Smaller Stacked Images (Right Column on Desktop) */}
              <div className="grid grid-cols-2 gap-4 h-full">
                
                <div className="relative rounded-2xl overflow-hidden h-full">
                  <Image 
                    src="/images/quality_inspection.jpg" 
                    alt="Close-up of food product inspection line"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="relative rounded-2xl overflow-hidden h-full">
                  <Image 
                    src="/images/quality_processing.jpg" 
                    alt="Pristine stainless steel food processing facility"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative rounded-2xl overflow-hidden h-full col-span-2">
                  <Image 
                    src="/images/quality_shipping.jpg" 
                    alt="Modern shipping containers at logistics hub"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
