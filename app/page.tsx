'use client'

import { getLatestArticles } from '@/lib/articles-data'
import ArticleCard from '@/components/article-card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const latestArticles = getLatestArticles(6)

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden text-white py-24 md:py-32 px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.abacus.ai/images/c37f67eb-5875-40bb-b0b2-c4791e0bb71b.png"
            alt="Medical science background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a73e8]/95 via-[#1a73e8]/90 to-[#34a853]/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" 
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Добро пожаловать в <span className="text-white drop-shadow-lg">SSVproff</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl mb-6 text-white/95 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ваш навигатор в мировой хирургии
            </motion.p>
            
            <motion.p 
              className="text-lg text-white/90 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Профессиональный хирургический журнал, посвященный анализу научных исследований, 
              клинической практике и интеграции передовых технологий в современную медицину.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/archive"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-[#1a73e8] rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-semibold group"
              >
                <BookOpen className="h-5 w-5" />
                <span>Начать исследование</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
              >
                <Sparkles className="h-5 w-5" />
                <span>Узнать больше</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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
          {latestArticles?.map((article) => (
            <ArticleCard key={article?.id} article={article} />
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
