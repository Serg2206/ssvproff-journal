import { getArticleById, getRelatedArticles, getAllArticles } from '@/lib/articles-db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, User, Building2, Eye, Download, Quote, FileText, Tag, Printer } from 'lucide-react'
import Link from 'next/link'
import ArticleCard from '@/components/article-card'
import AIWidget from './_components/ai-widget'
import ArticleViewTracker from './_components/article-view-tracker'
import ReactMarkdown from 'react-markdown'
import { getTagColor } from '@/lib/tag-colors'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ id: article.id }))
}

interface ArticlePageProps {
  params: { id: string }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(params.id, 3)

  return (
    <div className="w-full bg-[#f8f9fa]">
      <ArticleViewTracker
        articleId={params.id}
        articleTitle={article.title}
        articleTags={article.tags}
      />

      {/* Article Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag: string) => {
              const colors = getTagColor(tag)
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium ${colors.bg} ${colors.text} rounded-full`}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#202124] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {article.title}
          </h1>

          {/* Authors */}
          <div className="flex items-center space-x-2 mb-4 text-gray-700">
            <User className="h-5 w-5 text-[#1a73e8]" />
            <span className="font-medium">{article.authors.join(', ')}</span>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-[#1a73e8]" />
              <span>{new Date(article.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-[#34a853]" />
              <span>{article.institution}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-[#ea4335]" />
              <span><span className="font-medium">DOI:</span> {article.doi}</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center space-x-8 py-6 border-t border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-[#1a73e8]" />
              <div>
                <div className="text-2xl font-bold text-[#202124]">{article.views}</div>
                <div className="text-xs text-gray-500">Просмотры</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-[#34a853]" />
              <div>
                <div className="text-2xl font-bold text-[#202124]">{article.downloads}</div>
                <div className="text-xs text-gray-500">Загрузки</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Quote className="h-5 w-5 text-[#ea4335]" />
              <div>
                <div className="text-2xl font-bold text-[#202124]">{article.citations}</div>
                <div className="text-xs text-gray-500">Цитирования</div>
              </div>
            </div>
          </div>

          {/* PDF Download */}
          <div className="mt-6">
            <Link
              href={`/article/${params.id}/print`}
              target="_blank"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors font-medium"
            >
              <Printer className="h-5 w-5" />
              <span>Скачать PDF</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Article Image */}
      {article.imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 mt-8 text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }} {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-4 mt-8 text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }} {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-3 mt-6 text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }} {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-bold mb-2 mt-4 text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }} {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-[#202124]" {...props} />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* AI Widget */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIWidget article={article} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2
            className="text-3xl font-bold text-[#202124] mb-8"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Похожие статьи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
