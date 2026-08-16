import React from 'react'
import { Hammer } from 'lucide-react'

export const metadata = {
  title: 'Under Maintenance | Pearl International',
  description: 'Our website is currently undergoing scheduled maintenance.',
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
          <Hammer className="w-10 h-10 text-brand-gold animate-bounce" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-brand-navy mb-4 tracking-wide">
          Under Maintenance
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We are currently updating our website to serve you better. 
          Please check back shortly. Thank you for your patience!
        </p>
        <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
      </div>
    </div>
  )
}
