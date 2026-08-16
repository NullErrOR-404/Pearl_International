import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";
import { getGlobalSettings } from "@/lib/data/settings";
import { Hero } from "@/components/home/Hero";
import { ProductRange } from "@/components/home/ProductRange";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowWeWork } from "@/components/home/HowWeWork";
import { CTAStrip } from "@/components/home/CTAStrip";
import { FAQ } from "@/components/ui/FAQ";

const faqs = [
  {
    question: "What are your minimum order quantities (MOQ)?",
    answer: "Our minimum order quantities vary depending on the product and packaging requirements. For most agricultural commodities, the MOQ is one standard 20ft container. Please contact our sales team for specific product MOQ details."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship globally. We have extensive experience in international logistics and export compliance, ensuring smooth delivery to major ports worldwide across Asia, Europe, Middle East, and the Americas."
  },
  {
    question: "How do you ensure product quality during transit?",
    answer: "We use premium, industry-standard packaging materials and climate-controlled containers when necessary. All products undergo rigorous pre-shipment inspections and we provide full phytosanitary and quality certificates."
  },
  {
    question: "What are your standard payment terms?",
    answer: "Our standard payment terms are typically Letter of Credit (L/C) at sight or Telegraphic Transfer (T/T) with an advance payment. Terms can be negotiated based on the order volume and long-term partnership agreements."
  },
  {
    question: "Can you provide custom packaging or private labeling?",
    answer: "Absolutely. We offer flexible packaging solutions including bulk packaging and consumer-ready private labeling. We work closely with our clients to meet their specific branding and regulatory requirements."
  }
];

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();
  const settings = await getGlobalSettings();

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProductRange categories={categories} products={products} settings={settings} />
      <WhyChooseUs />
      <HowWeWork />

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3">Got Questions?</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-navy">Frequently Asked Questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTAStrip />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
