import { ServicesHero } from "@/components/services/ServicesHero"
import { CoreServices } from "@/components/services/CoreServices"
import { WhyChooseUs } from "@/components/services/WhyChooseUs"
import { IndustriesWeServe } from "@/components/services/IndustriesWeServe"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"
import { ServicesCTA } from "@/components/services/ServicesCTA"

export const metadata = {
  title: "Our Services | Pearl International",
  description: "End-to-End Solutions with Global Standards. We provide comprehensive export services including sourcing, quality assurance, processing, packaging, and logistics.",
  openGraph: {
    title: "Our Services - Pearl International",
    description: "End-to-End Export Solutions with Global Standards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - Pearl International",
  }
}

export default function ServicesPage() {
  return (
    <main className="flex flex-col w-full bg-[#FAFAFA]">
      <ServicesHero />
      <CoreServices />
      <WhyChooseUs />
      <IndustriesWeServe />
      <ProcessTimeline />
      <ServicesCTA />
    </main>
  )
}
