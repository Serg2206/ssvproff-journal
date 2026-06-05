import { getLatestArticles } from '@/lib/articles-db'
import ArticleCard from '@/components/article-card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import HeroSection from '@/components/hero-section'

export default async function Home() {
  const latestArticles = await getLatestArticles(6)

  return (
    <div className="w-full">
      <HeroSection />

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#202124]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Последние публикации
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/archive"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1a73e8] text-white rounded-md hover:bg-[#1557b0] transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <span>Все выпуски</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
