import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/data/categories"
import { getProductBySlug } from "@/lib/data/products"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { AnimateIn } from "@/components/animations/AnimateIn"
import Script from "next/script"

export async function generateMetadata({ params }: { params: Promise<{ category: string, product: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.product);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Pearl International`,
    description: product.short_description || `Premium ${product.name} exported globally by Pearl International.`,
    openGraph: {
      title: `${product.name} - Pearl International`,
      description: product.short_description,
      images: product.image ? [{ url: product.image }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Pearl International`,
      description: product.short_description,
      images: product.image ? [product.image] : [],
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, product: string }> }) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = await getCategoryBySlug(categorySlug)
  const product = await getProductBySlug(productSlug)

  if (!category || !product || product.category_id !== category.id) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-12 lg:gap-16 pb-24 pt-4 md:pt-8">
      {/* Product JSON-LD */}
      <Script id={`product-schema-${product.id}`} type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${product.name}",
            "image": "${product.image}",
            "description": "${product.short_description}",
            "brand": {
              "@type": "Brand",
              "name": "Pearl International"
            },
            "category": "${category.name}",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD",
              "price": "0.00",
              "priceValidUntil": "2026-12-31",
              "seller": {
                "@type": "Organization",
                "name": "Pearl International"
              }
            }
          }
        `}
      </Script>

      <section className="container mx-auto px-4 max-w-7xl">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/products/${category.slug}` },
          { label: product.name, href: `/products/${category.slug}/${product.slug}` }
        ]} />
      </section>

      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Sticky Left: Image */}
          <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-brand-navy/10 bg-brand-ivory shadow-lg w-full lg:sticky lg:top-32">
            <Image 
              src={product.image}
              alt={`Image of ${product.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Scrolling Right: Details */}
          <div className="space-y-8">
            <AnimateIn>
              <span className="text-brand-gold font-sans font-bold text-sm md:text-base uppercase tracking-wider mb-2 block">
                {category.name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-4 balance-text">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-brand-charcoal/70 font-sans max-w-prose">
                {product.short_description}
              </p>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <div className="prose prose-lg prose-brand max-w-prose">
                <p className="text-brand-charcoal/80 leading-relaxed">
                  {product.full_description}
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2} className="space-y-4">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-navy">Key Highlights</h3>
              <ul className="space-y-3" role="list">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-charcoal/80 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <AnimateIn delay={0.3} className="pt-8 border-t border-brand-navy/10 flex flex-col sm:flex-row gap-4">
              <Link href={`/contact?product=${product.slug}`} className="flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button className="w-full text-xs">ENQUIRE BULK →</Button>
              </Link>
              <Button variant="outline" className="flex-1 text-lg py-6 sm:py-8">Download Specs</Button>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-7xl">
        <div className="bg-brand-navy/5 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <AnimateIn>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy mb-6">Specifications</h2>
              <div className="border border-brand-navy/10 rounded-xl overflow-hidden bg-white shadow-sm">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={key} className={`flex flex-col sm:flex-row sm:justify-between p-4 md:p-6 ${idx !== 0 ? 'border-t border-brand-navy/5' : ''}`}>
                    <span className="font-medium text-brand-charcoal/60 mb-1 sm:mb-0">{key}</span>
                    <span className="text-brand-charcoal font-medium sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy mb-6">Packaging & Logistics</h2>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-brand-navy/10 shadow-sm h-full">
                <h3 className="font-sans font-bold text-lg text-brand-charcoal mb-2">Standard Packaging</h3>
                <p className="text-brand-charcoal/80 mb-8 text-lg leading-relaxed">{product.packaging}</p>
                
                <h3 className="font-sans font-bold text-lg text-brand-charcoal mb-2">Custom Packaging</h3>
                <p className="text-brand-charcoal/80 text-lg leading-relaxed">Available upon request for bulk orders to meet specific import regulations.</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  )
}
