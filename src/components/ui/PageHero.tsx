import Image from "next/image"

interface PageHeroProps {
  title: string
  description?: string
  imageSrc: string
}

export function PageHero({ title, description, imageSrc }: PageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[350px] max-h-[600px] flex items-center bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent absolute z-10" />
        <Image 
          src={imageSrc} 
          alt="" 
          fill 
          sizes="100vw"
          className="object-cover grayscale mix-blend-overlay"
          priority
        />
      </div>
      <div className="container mx-auto px-4 z-10 text-center space-y-4 md:space-y-6">
        <h1 
          className="text-2xl md:text-4xl lg:text-5xl tracking-tight font-semibold text-white max-w-4xl mx-auto balance-text"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-brand-ivory/80 max-w-2xl mx-auto font-sans">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
