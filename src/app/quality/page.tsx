import { QualityHero } from "@/components/quality/QualityHero"
import { QualityProcess } from "@/components/quality/QualityProcess"
import { Certifications } from "@/components/quality/Certifications"
import { QualityCommitment } from "@/components/quality/QualityCommitment"
import { QualityCTA } from "@/components/quality/QualityCTA"

export const metadata = {
  title: "Quality | Pearl International",
  description: "At Pearl International, quality is our commitment. We ensure excellence in every step from sourcing to delivery with international standards and strict hygiene.",
  openGraph: {
    title: "Quality - Pearl International",
    description: "At Pearl International, quality is our commitment. We ensure excellence in every step from sourcing to delivery.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality - Pearl International",
  }
}

export default function QualityPage() {
  return (
    <main className="flex flex-col w-full bg-[#FAFAFA]">
      <QualityHero />
      <QualityProcess />
      <Certifications />
      <QualityCommitment />
      <QualityCTA />
    </main>
  )
}
