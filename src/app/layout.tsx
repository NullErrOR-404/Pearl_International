import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HideOnAdmin } from "@/components/layout/HideOnAdmin";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { getGlobalSettings } from "@/lib/data/settings";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings()
  
  return {
    title: {
      template: '%s | Pearl International',
      default: settings?.default_meta_title || "Pearl International - Premium Agricultural Exports",
    },
    description: settings?.default_meta_description || "B2B agricultural export company specializing in premium spices, coconuts, and fresh produce.",
    openGraph: {
      title: settings?.default_meta_title || "Pearl International",
      description: settings?.default_meta_description || "B2B agricultural export company.",
      url: 'https://www.pearlinternational.com',
      siteName: 'Pearl International',
      images: [
        {
          url: '/og/og-image.jpg', // You should create this image in public/og/
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.default_meta_title || "Pearl International",
      description: settings?.default_meta_description || "B2B agricultural export company.",
      images: ['/og/og-image.jpg'],
    },
    verification: {
      google: 'ixCkAfcqTBWKJbQBgViU10-aGK94QfGPP_BxmUnEiUY',
    },
    metadataBase: new URL('https://www.pearlinternational.com'),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings()
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans text-brand-charcoal selection:bg-brand-gold selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-navy">
          Skip to content
        </a>
        
        {/* Organization JSON-LD */}
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pearl International",
              "url": "https://www.pearlinternational.com",
              "logo": "https://www.pearlinternational.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "${settings?.contact_phone || '+91 9489240467'}",
                "contactType": "customer service"
              }
            }
          `}
        </Script>

        <SmoothScroll>
          <HideOnAdmin>
            <TopBar />
          </HideOnAdmin>
          <SiteHeader />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <HideOnAdmin>
            <SiteFooter />
          </HideOnAdmin>
        </SmoothScroll>
        <HideOnAdmin>
          <StickyMobileCTA />
        </HideOnAdmin>
        <PageViewTracker />
      </body>
    </html>
  );
}
