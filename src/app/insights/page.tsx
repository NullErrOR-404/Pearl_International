import { getPublishedArticles } from "@/lib/data/articles"
import { PageHero } from "@/components/ui/PageHero"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"

export const metadata = {
  title: 'Insights & News',
  description: 'Latest news, market insights, and updates from Pearl International.',
}

export default async function InsightsPage() {
  const articles = await getPublishedArticles()

  return (
    <main className="flex flex-col pb-24">
      <PageHero 
        title="Insights & News" 
        description="Market trends, company updates, and industry knowledge."
        imageSrc="/images/quality-agri-field.jpg"
      />
      
      <section className="container mx-auto px-4 max-w-7xl mt-12 md:mt-24">
        {articles.length === 0 ? (
          <div className="text-center py-24 bg-brand-navy/5 rounded-3xl">
            <h3 className="font-serif text-2xl text-brand-navy mb-2">No Insights Yet</h3>
            <p className="text-brand-charcoal/60">Check back soon for our latest market updates.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Link key={article.id} href={`/insights/${article.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {article.featured_image ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <Image 
                      src={article.featured_image} 
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/9] w-full bg-brand-navy/10 flex items-center justify-center">
                    <span className="font-serif text-brand-gold opacity-50">Pearl International</span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-medium text-brand-charcoal/50 mb-4 font-mono uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(article.created_at).toLocaleDateString()}</div>
                  </div>
                  
                  <h2 className="font-serif text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-brand-charcoal/70 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
