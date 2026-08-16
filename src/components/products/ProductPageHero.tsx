import Image from "next/image"
import Link from "next/link"
import { Home, ChevronRight, Leaf, ShieldCheck, Factory, Sprout } from "lucide-react"
import { Category } from "@/lib/data/categories"

interface ProductPageHeroProps {
  category: Category
}

export function ProductPageHero({ category }: ProductPageHeroProps) {
  const features = [
    { icon: <Leaf className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />, text: "100%\nNatural" },
    { icon: <Sprout className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />, text: "Rich in\nAroma" },
    { icon: <ShieldCheck className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />, text: "Premium\nQuality" },
    { icon: <Factory className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />, text: "Hygienically\nProcessed" }
  ]

  return (
    <section className="relative min-h-[450px] xl:min-h-[500px] w-full bg-brand-navy overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Content Area */}
      <div className="w-full md:w-[55%] flex flex-col justify-center px-4 md:px-12 lg:px-24 py-12 md:py-16 relative z-20 h-full min-h-[450px]">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-brand-ivory/60 mb-10 mt-4 md:mt-0">
          <Link href="/" className="hover:text-brand-gold transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-sm">
            <Home className="w-3.5 h-3.5" />
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-sm">
            Products
          </Link>
          <span>/</span>
          <span className="text-brand-gold font-medium">{category.name}</span>
        </nav>

        {/* Hero Title & Description */}
        <h1 
          className="tracking-tight text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-5"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
        >
          {category.name}
        </h1>
        <div className="w-16 h-1 bg-brand-gold mb-5"></div>
        <p className="text-brand-ivory/80 text-base md:text-lg max-w-md leading-relaxed mb-12">
          {category.description || "Handpicked products with rich quality and purity, sourced from the best farms across the world."}
        </p>

        {/* Feature Row */}
        <div className="flex items-center flex-wrap gap-4 md:gap-6 divide-x divide-white/20">
          {features.map((feat, idx) => (
            <div key={idx} className={`flex items-center gap-3 ${idx !== 0 ? 'pl-4 md:pl-6' : ''}`}>
              <div className="shrink-0">{feat.icon}</div>
              <span className="text-xs font-medium text-white/90 whitespace-pre-line leading-snug">
                {feat.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image Composition */}
      <div className="relative w-full md:w-[45%] h-[350px] md:h-auto min-h-[350px]">
         {/* Organic curved wrapper matching the reference */}
          <div className="absolute inset-0 w-full h-full md:-ml-[15%] md:w-[115%] md:rounded-bl-[150px] overflow-hidden z-10 shadow-2xl">
            <Image 
              src={category.image || "/images/hero-about.webp"} 
              alt={category.name} 
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle dark gradient overlay to ensure the image blends slightly with navy */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-brand-navy/30 to-transparent mix-blend-multiply"></div>
         </div>
         {/* Gold decorative curve mimicking the boundary line */}
         <div className="hidden md:block absolute bottom-0 -ml-[10%] w-[110%] h-[100%] border-b-[4px] border-l-[4px] border-brand-gold rounded-bl-[150px] pointer-events-none translate-x-2 -translate-y-2 opacity-60 z-0"></div>
      </div>

    </section>
  )
}
