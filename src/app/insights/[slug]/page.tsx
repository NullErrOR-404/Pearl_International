import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/data/articles"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Calendar, User, ArrowLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | Pearl International Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featured_image ? [{ url: article.featured_image }] : [],
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.featured_image ? [article.featured_image] : [],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="flex flex-col pb-24 pt-24 md:pt-32">
      
      {/* Article JSON-LD */}
      <Script id={`article-schema-${article.id}`} type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${article.title}",
            "image": "${article.featured_image || 'https://www.pearlinternational.com/og/og-image.jpg'}",
            "datePublished": "${article.created_at}",
            "dateModified": "${article.updated_at}",
            "author": [{
              "@type": "Person",
              "name": "${article.author}"
            }],
            "publisher": {
              "@type": "Organization",
              "name": "Pearl International",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.pearlinternational.com/logo.png"
              }
            },
            "description": "${article.excerpt}"
          }
        `}
      </Script>

      <article className="container mx-auto px-4 max-w-4xl">
        <Link href="/insights" className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm uppercase tracking-widest mb-8 hover:-translate-x-1 transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-6 balance-text leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-brand-charcoal/60 font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(article.created_at).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</div>
          </div>
        </header>

        {article.featured_image && (
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-lg border border-brand-navy/10">
            <Image 
              src={article.featured_image} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl prose-brand max-w-none">
          {/* We use dangerouslySetInnerHTML here assuming content is trusted from the DB admin panel */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </main>
  )
}
