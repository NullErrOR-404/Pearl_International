"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Download, Loader2 } from "lucide-react"
import { CatalogueDocument } from "./CatalogueDocument"

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)

interface CatalogueDownloadButtonProps {
  settings: any;
  products: any[];
  categoryName?: string;
  className?: string;
  label?: string;
}

export function CatalogueDownloadButton({ 
  settings, 
  products, 
  categoryName, 
  className = "",
  label = "Download Catalogue"
}: CatalogueDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")

  useEffect(() => {
    setIsClient(true)
    setBaseUrl(window.location.origin)
  }, [])

  if (!isClient) {
    return (
      <button disabled className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-navy/50 text-white rounded-lg font-semibold tracking-wider text-sm opacity-70 cursor-not-allowed ${className}`}>
        <Loader2 className="w-5 h-5 animate-spin" />
        Preparing PDF...
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <CatalogueDocument 
          settings={settings} 
          products={products} 
          categoryName={categoryName} 
          baseUrl={baseUrl} 
        />
      }
      fileName={`${categoryName ? categoryName.replace(/\s+/g, '-') : 'Complete'}-Catalogue.pdf`}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-lg font-semibold tracking-wider text-sm hover:bg-brand-gold hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${className}`}
    >
      {({ blob, url, loading, error }) => 
        loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {label}
          </>
        )
      }
    </PDFDownloadLink>
  )
}
