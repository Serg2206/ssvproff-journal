'use client'

import { ArticleDB } from '@/lib/articles-db'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Eye, Download, Quote, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getTagColor } from '@/lib/tag-colors'

interface ArticleCardProps {
  article: ArticleDB
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  if (!article) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/article/${article?.id ?? ''}`}>
        <div className="group h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
          {/* Image */}
          {article?.imageUrl && (
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              <Image
                src={article?.imageUrl ?? ''}
                alt={article?.title ?? 'Article image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {article?.tags?.slice(0, 2)?.map((tag: string) => {
                const colors = getTagColor(tag ?? '')
                return (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}
                  >
                    <Tag className="h-3 w-3" />
                    {tag ?? ''}
                  </span>
                )
              })}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#202124] mb-3 line-clamp-2 group-hover:text-[#1a73e8] transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {article?.title ?? ''}
            </h3>

            {/* Summary */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article?.summary ?? ''}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <User className="h-3.5 w-3.5" />
                <span>{article?.authors?.[0] ?? ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(article?.date ?? '')?.toLocaleDateString('ru-RU')}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{article?.views ?? 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-3.5 w-3.5" />
                <span>{article?.downloads ?? 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Quote className="h-3.5 w-3.5" />
                <span>{article?.citations ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
