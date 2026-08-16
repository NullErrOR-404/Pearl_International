import { Button } from "@/components/ui/Button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 bg-brand-navy/5">
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-brand-navy/10 max-w-lg text-center space-y-6">
        <CheckCircle className="w-20 h-20 text-brand-gold mx-auto" />
        <h1 className="text-3xl md:text-4xl font-serif text-brand-navy">Thank You!</h1>
        <p className="text-lg text-brand-charcoal/80 font-sans">
          Your enquiry has been successfully received.
          Our sales team will review your requirements and contact you shortly.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button variant="outline" className="w-full">Return Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="primary" className="w-full">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

