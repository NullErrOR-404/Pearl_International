const fs = require('fs');
const path = require('path');

const components = {
    'src/components/ui/PageHero.tsx': `import Image from "next/image"

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
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white max-w-4xl mx-auto balance-text">
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
`,

    'src/components/ui/FAQ.tsx': `"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export function FAQ({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  
  return (
    <div className="space-y-4 w-full" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, i) => (
        <div key={i} className="border border-brand-navy/10 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors hover:bg-brand-navy/5"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={` + "`faq-answer-${i}`" + `}
            id={` + "`faq-question-${i}`" + `}
          >
            <span className="font-serif font-bold text-brand-navy text-lg pr-4">{item.question}</span>
            <ChevronDown 
              className={cn("w-5 h-5 text-brand-gold transition-transform duration-300 shrink-0 motion-reduce:transition-none", openIndex === i && "rotate-180")} 
              aria-hidden="true"
            />
          </button>
          <div 
            id={` + "`faq-answer-${i}`" + `}
            role="region"
            aria-labelledby={` + "`faq-question-${i}`" + `}
            className={cn("overflow-hidden transition-all duration-300 motion-reduce:transition-none", openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}
          >
            <p className="text-brand-charcoal/80 font-sans px-6 pb-5 pt-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
`,

    'src/components/ui/Breadcrumbs.tsx': `import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 overflow-x-auto">
      <ol className="flex items-center space-x-2 text-sm text-brand-charcoal/60 whitespace-nowrap">
        <li>
          <Link 
            href="/" 
            className="flex items-center hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-brand-navy/30 shrink-0" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span className="text-brand-navy font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
`,

    'src/components/ui/EmptyState.tsx': `import { SearchX } from "lucide-react"
import { Button } from "./Button"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-brand-navy/10 rounded-2xl bg-brand-navy/5">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
        <SearchX className="w-8 h-8 text-brand-navy/40" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-2xl text-brand-navy mb-2">{title}</h3>
      <p className="text-brand-charcoal/60 font-sans max-w-md mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="outline">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
`,
    
    'src/components/ui/ProductSkeleton.tsx': `export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-brand-navy/10 bg-white shadow-sm flex flex-col animate-pulse">
          <div className="h-64 bg-brand-navy/5 w-full"></div>
          <div className="p-6 flex flex-col flex-1 space-y-4">
            <div className="h-6 bg-brand-navy/10 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-brand-navy/5 rounded"></div>
              <div className="h-4 bg-brand-navy/5 rounded w-5/6"></div>
            </div>
            <div className="mt-auto pt-6 space-y-3">
              <div className="h-10 bg-brand-navy/10 rounded-lg w-full"></div>
              <div className="h-10 bg-brand-navy/10 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
`,

    'src/app/products/[category]/[product]/page.tsx': `import { notFound } from "next/navigation"
import { mockCategories } from "@/lib/mock-data/categories"
import { mockProducts } from "@/lib/mock-data/products"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, product: string }> }) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = mockCategories.find(c => c.slug === categorySlug)
  const product = mockProducts.find(p => p.slug === productSlug)

  if (!category || !product || product.category_id !== category.id) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-12 lg:gap-16 pb-24 pt-4 md:pt-8">
      <section className="container mx-auto px-4 max-w-7xl">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: ` + "`/products/${category.slug}`" + ` },
          { label: product.name, href: ` + "`/products/${category.slug}/${product.slug}`" + ` }
        ]} />
      </section>

      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-brand-navy/10 bg-brand-ivory shadow-lg w-full">
            <Image 
              src={product.image}
              alt={` + "`Image of ${product.name}`" + `}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <span className="text-brand-gold font-sans font-bold text-sm md:text-base uppercase tracking-wider mb-2 block">
                {category.name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-4 balance-text">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-brand-charcoal/70 font-sans max-w-prose">
                {product.shortDescription}
              </p>
            </div>

            <div className="prose prose-lg prose-brand max-w-prose">
              <p className="text-brand-charcoal/80 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-navy">Key Highlights</h3>
              <ul className="space-y-3" role="list">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-charcoal/80 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-brand-navy/10 flex flex-col sm:flex-row gap-4">
              <Link href={` + "`/enquire?product=${product.slug}`" + `} className="flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button variant="primary" className="w-full text-lg py-6 sm:py-8">Enquire for Bulk Order</Button>
              </Link>
              <Button variant="outline" className="flex-1 text-lg py-6 sm:py-8">Download Specs</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-7xl">
        <div className="bg-brand-navy/5 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy mb-6">Specifications</h2>
              <div className="border border-brand-navy/10 rounded-xl overflow-hidden bg-white shadow-sm">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={key} className={` + "`flex flex-col sm:flex-row sm:justify-between p-4 md:p-6 ${idx !== 0 ? 'border-t border-brand-navy/5' : ''}`" + `}>
                    <span className="font-medium text-brand-charcoal/60 mb-1 sm:mb-0">{key}</span>
                    <span className="text-brand-charcoal font-medium sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy mb-6">Packaging & Logistics</h2>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-brand-navy/10 shadow-sm h-full">
                <h3 className="font-sans font-bold text-lg text-brand-charcoal mb-2">Standard Packaging</h3>
                <p className="text-brand-charcoal/80 mb-8 text-lg leading-relaxed">{product.packaging}</p>
                
                <h3 className="font-sans font-bold text-lg text-brand-charcoal mb-2">Custom Packaging</h3>
                <p className="text-brand-charcoal/80 text-lg leading-relaxed">Available upon request for bulk orders to meet specific import regulations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
`,

    'src/app/layout.tsx': `import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Pearl International",
  description: "B2B agricultural export company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` + "`${inter.variable} ${playfair.variable}`" + `}>
      <body className="antialiased min-h-screen flex flex-col font-sans text-brand-charcoal selection:bg-brand-gold selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-navy">
          Skip to content
        </a>
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-brand-navy/10" role="banner">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link 
              href="/" 
              className="font-serif text-2xl font-bold text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm p-1"
              aria-label="Pearl International Home"
            >
              PEARL<br/><span className="text-brand-gold text-lg">INTERNATIONAL</span>
            </Link>
            <nav className="hidden md:flex gap-8 items-center" aria-label="Main Navigation">
              <Link href="/about" className="text-sm font-medium hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">About</Link>
              <Link href="/products" className="text-sm font-medium hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Products</Link>
              <Link href="/quality" className="text-sm font-medium hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Quality</Link>
              <Link href="/services" className="text-sm font-medium hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Services</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Contact</Link>
              <Link href="/enquire" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">Enquire Now</Link>
            </nav>
            <button 
              className="md:hidden p-2 text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <footer className="bg-brand-navy text-white/80 py-16" role="contentinfo">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <span className="font-serif text-2xl font-bold text-white block">PEARL<br/><span className="text-brand-gold text-lg">INTERNATIONAL</span></span>
              <p className="text-sm max-w-xs">Premium agricultural exports sourced globally, delivered reliably.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-white">Company</h4>
              <nav className="flex flex-col gap-2" aria-label="Footer Company Navigation">
                <Link href="/about" className="hover:text-white transition-colors text-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">About Us</Link>
                <Link href="/quality" className="hover:text-white transition-colors text-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">Quality Standards</Link>
                <Link href="/contact" className="hover:text-white transition-colors text-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">Contact</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-white">Legal</h4>
              <nav className="flex flex-col gap-2" aria-label="Footer Legal Navigation">
                <Link href="/privacy-policy" className="hover:text-white transition-colors text-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors text-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">Terms & Conditions</Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
`,

    'src/app/enquire/page.tsx': `"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { PageHero } from "@/components/ui/PageHero"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  productCategory: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Please provide more details about your requirement")
})

type FormData = z.infer<typeof formSchema>

export default function EnquirePage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Mock form data:", data)
    router.push("/thank-you")
  }

  return (
    <main className="flex flex-col gap-12 lg:gap-16 pb-24">
      <PageHero 
        title="Bulk Enquiry"
        description="Submit your requirements and our sales team will contact you within 24 hours."
        imageSrc="/images/hero-contact.webp"
      />

      <section className="container mx-auto px-4 max-w-3xl">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 md:space-y-8 bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-sm border border-brand-navy/10"
          noValidate
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-bold text-brand-navy">Full Name *</label>
              <input 
                id="fullName"
                {...register("fullName")}
                className={` + "`w-full p-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow`" + `}
                placeholder="John Doe"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && <p id="fullName-error" className="text-red-500 text-xs font-medium" role="alert">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-bold text-brand-navy">Company Name *</label>
              <input 
                id="company"
                {...register("company")}
                className={` + "`w-full p-3 rounded-xl border ${errors.company ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow`" + `}
                placeholder="Global Imports Ltd"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
              {errors.company && <p id="company-error" className="text-red-500 text-xs font-medium" role="alert">{errors.company.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-brand-navy">Email Address *</label>
              <input 
                id="email"
                type="email"
                {...register("email")}
                className={` + "`w-full p-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow`" + `}
                placeholder="john@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-xs font-medium" role="alert">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-brand-navy">Phone Number *</label>
              <input 
                id="phone"
                type="tel"
                {...register("phone")}
                className={` + "`w-full p-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow`" + `}
                placeholder="+1 234 567 8900"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && <p id="phone-error" className="text-red-500 text-xs font-medium" role="alert">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="productCategory" className="text-sm font-bold text-brand-navy">Product Category of Interest *</label>
            <select 
              id="productCategory"
              {...register("productCategory")}
              className={` + "`w-full p-3 rounded-xl border ${errors.productCategory ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white transition-shadow`" + `}
              aria-invalid={!!errors.productCategory}
              aria-describedby={errors.productCategory ? "productCategory-error" : undefined}
            >
              <option value="">Select a category</option>
              <option value="coconuts">Coconuts</option>
              <option value="spices">Spices</option>
              <option value="vegetables">Vegetables</option>
              <option value="other">Other / General</option>
            </select>
            {errors.productCategory && <p id="productCategory-error" className="text-red-500 text-xs font-medium" role="alert">{errors.productCategory.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-brand-navy">Requirements & Details *</label>
            <textarea 
              id="message"
              {...register("message")}
              rows={5}
              className={` + "`w-full p-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-brand-navy/20'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow`" + `}
              placeholder="Please specify product quantities, preferred packaging, and delivery destination..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <p id="message-error" className="text-red-500 text-xs font-medium" role="alert">{errors.message.message}</p>}
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full py-4 sm:py-5 text-lg rounded-xl flex items-center justify-center gap-2" 
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Enquiry"
              )}
            </Button>
            <p className="text-xs text-brand-charcoal/50 text-center mt-6 max-w-md mx-auto leading-relaxed">
              By submitting this form, you agree to our <a href="/privacy-policy" className="underline hover:text-brand-navy focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold">Privacy Policy</a>.
              <br/>Note: This is a mock UI implementation. No actual data is saved.
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}
`
};

for (const [filePath, content] of Object.entries(components)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Repaired files successfully.");
