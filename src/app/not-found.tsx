import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { MapPinOff } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-brand-ivory">
      <div className="w-20 h-20 bg-brand-navy/10 rounded-full flex items-center justify-center mb-8">
        <MapPinOff className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />
      </div>
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-navy mb-4">
        404
      </h1>
      <h2 className="font-sans font-bold text-xl md:text-2xl text-brand-charcoal mb-4">
        Page Not Found
      </h2>
      <p className="text-brand-charcoal/70 max-w-md mb-8 leading-relaxed">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
          <Button variant="primary" className="w-full sm:w-auto">Return Home</Button>
        </Link>
        <Link href="/products" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
          <Button variant="outline" className="w-full sm:w-auto">Browse Products</Button>
        </Link>
      </div>
    </div>
  )
}
