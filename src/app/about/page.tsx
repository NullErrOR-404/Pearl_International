import { AboutHero } from "@/components/about/AboutHero"
import { OurJourney } from "@/components/about/OurJourney"
import { OurValues } from "@/components/about/OurValues"
import { OurCommitment } from "@/components/about/OurCommitment"
import { MissionVision } from "@/components/about/MissionVision"
import { AboutLeadership } from "@/components/about/AboutLeadership"

export const metadata = {
  title: "About Us | Pearl International",
  description: "Learn about Pearl International, our mission, vision, and core values in delivering premium agricultural commodities globally.",
  openGraph: {
    title: "About Us - Pearl International",
    description: "Discover our journey and commitment to quality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Pearl International",
  }
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <OurJourney />
      <OurValues />
      <OurCommitment />
      <MissionVision />
      <AboutLeadership />
    </div>
  )
}
