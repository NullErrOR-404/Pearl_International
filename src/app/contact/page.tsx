import { ContactHero } from "@/components/contact/ContactHero"
import { ContactForm } from "@/components/contact/ContactForm"
import { ContactInformation } from "@/components/contact/ContactInformation"
import { LocationMap } from "@/components/contact/LocationMap"
import { ContactCTA } from "@/components/contact/ContactCTA"

export const metadata = {
  title: "Contact Us | Pearl International",
  description: "Get in touch with Pearl International. Our dedicated team is available to answer your questions and provide global support.",
  openGraph: {
    title: "Contact Us - Pearl International",
    description: "Get in touch with Pearl International for bulk export inquiries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Pearl International",
  }
}

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full bg-[#FAFAFA]">
      <ContactHero />
      
      {/* Main Contact Section */}
      <section className="bg-brand-ivory/30 py-16 md:py-24 border-y border-brand-charcoal/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            
            {/* Left: Contact Form (Takes up more space) */}
            <div className="w-full lg:w-[60%] xl:w-[65%]">
              <ContactForm />
            </div>

            {/* Right: Contact Information */}
            <div className="w-full lg:w-[40%] xl:w-[35%]">
              <ContactInformation />
            </div>

          </div>
        </div>
      </section>

      <LocationMap />
      <ContactCTA />
    </main>
  )
}
