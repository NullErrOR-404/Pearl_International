import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Package, ShieldCheck, Users } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-brand-charcoal/5 p-8 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold">
        {icon}
      </div>
      <span className="font-serif text-4xl lg:text-5xl font-bold text-brand-navy mb-2">{value}</span>
      <span className="text-sm font-semibold tracking-wider text-brand-charcoal/70 uppercase whitespace-pre-line leading-tight">
        {label}
      </span>
    </div>
  )
}

export function OurJourney() {
  const stats = [
    {
      icon: <Globe strokeWidth={1.5} className="w-6 h-6" />,
      value: "25+",
      label: "Countries\nServed"
    },
    {
      icon: <Package strokeWidth={1.5} className="w-6 h-6" />,
      value: "100+",
      label: "Premium\nProducts"
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} className="w-6 h-6" />,
      value: "100%",
      label: "Quality\nAssured"
    },
    {
      icon: <Users strokeWidth={1.5} className="w-6 h-6" />,
      value: "500+",
      label: "Happy\nClients"
    }
  ]

  return (
    <section className="bg-brand-ivory py-20 lg:py-28">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col gap-10">
            <div>
              <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm mb-4 block">
                OUR STORY
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-navy font-bold leading-tight mb-6">
                Our Journey
              </h2>
              
              <div className="w-12 h-1 bg-brand-gold mb-6"></div>
              
              <p className="text-brand-charcoal/80 text-base leading-relaxed mb-8">
                Pearl International was founded with a vision to deliver premium quality agricultural products from the best farms to global markets. With a commitment to quality, integrity and sustainable practices, we have built lasting relationships with clients in over 25+ countries.
              </p>
              
              <Link 
                href="/services" 
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-brand-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                LEARN MORE ABOUT OUR SERVICES <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Added Image Block */}
            <div className="relative w-full h-[300px] rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src="/images/services-food.jpg" 
                alt="Agricultural fields and export" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
