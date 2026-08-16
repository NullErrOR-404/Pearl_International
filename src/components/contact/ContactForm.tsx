"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Send, Clock, User, Building, Mail, Phone, Globe, MapPin, Bookmark, Grid, Pencil, Loader2, CheckCircle2 } from "lucide-react"
import { submitInquiry } from "@/app/actions"
import { Turnstile } from '@marsidev/react-turnstile'

type ContactFormData = {
  name: string
  company: string
  email: string
  phone: string
  country: string
  city: string
  subject: string
  category: string
  message: string
  consent: boolean
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      alert("Please complete the security check first.")
      return
    }

    setSubmitting(true)
    
    // Combine fields for the message body so we don't lose the extra info (company, city, country, subject, etc)
    const fullMessage = `Subject: ${data.subject}
Company: ${data.company}
Location: ${data.city}, ${data.country}
Category Interest: ${data.category || 'None'}

Message:
${data.message}`

    const result = await submitInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: fullMessage,
      turnstileToken: turnstileToken
    })

    if (result.success) {
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    } else {
      alert("Something went wrong. Please try again.")
    }

    setSubmitting(false)
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-charcoal/10 h-full flex flex-col relative overflow-hidden">
      
      {/* Success Overlay */}
      {success && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="font-serif font-bold text-2xl text-brand-navy mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-500">Thank you for reaching out to Pearl International. Our team will review your inquiry and get back to you within 24 hours.</p>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-sans font-bold text-brand-navy text-sm tracking-widest uppercase mb-3">
          SEND US A MESSAGE
        </h2>
        <div className="w-12 h-px bg-brand-gold"></div>
      </div>

      {/* Form */}
      <form className="flex-1 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input 
                {...register("name", { required: "Name is required" })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
                placeholder="Full Name *" 
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Building className="w-4 h-4" />
              </div>
              <input 
                {...register("company")}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
                placeholder="Company Name (Optional)" 
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
                placeholder="Email Address *" 
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input 
                type="tel"
                {...register("phone")}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
                placeholder="Phone Number" 
              />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Globe className="w-4 h-4" />
            </div>
            <select 
              {...register("country", { required: "Country is required" })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none appearance-none"
            >
              <option value="">Country *</option>
              <option value="IN">India</option>
              <option value="AE">United Arab Emirates</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input 
              {...register("city")}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
              placeholder="City (Optional)" 
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <input 
                {...register("subject", { required: "Subject is required" })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" 
                placeholder="Subject *" 
              />
            </div>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Grid className="w-4 h-4" />
            </div>
            <select 
              {...register("category")}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none appearance-none"
            >
              <option value="">Product Category (Optional)</option>
              <option value="Spices">Spices</option>
              <option value="Coconuts">Coconuts</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div className="flex-1">
          <div className="relative h-full">
            <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400">
              <Pencil className="w-4 h-4" />
            </div>
            <textarea 
              {...register("message", { required: "Message is required" })}
              className="w-full h-full min-h-[120px] pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none"
              placeholder="Your Message / Requirements *"
            ></textarea>
          </div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox"
              {...register("consent", { required: "You must agree to the terms" })}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
            />
            <span className="text-sm text-brand-charcoal/70">
              I agree to the <Link href="/terms-and-conditions" className="text-brand-gold hover:underline">Terms and Conditions</Link> and <Link href="/privacy-policy" className="text-brand-gold hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}
        </div>

        {/* Turnstile Widget */}
        <div className="flex justify-center md:justify-start">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          
          <button 
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy text-white hover:bg-brand-navy/90 rounded-sm font-bold tracking-widest text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-70"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? "SENDING..." : "SEND MESSAGE"}
          </button>

          <div className="flex items-center gap-2 text-brand-charcoal/60">
            <span className="text-xs">We typically respond within</span>
            <span className="font-bold text-brand-navy flex items-center gap-1.5 bg-brand-navy/5 px-2 py-1 rounded-sm text-xs">
              <Clock className="w-3.5 h-3.5 text-brand-gold" /> 24 hours
            </span>
          </div>

        </div>

      </form>
    </div>
  )
}
