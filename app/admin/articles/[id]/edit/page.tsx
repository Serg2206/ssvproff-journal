'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ArticleForm from '@/components/article-form'
import { Loader2 } from 'lucide-react'

export default function EditArticlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/')
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && params.id) {
      fetch(`/api/admin/articles/${params.id}`)
        .then(r => r.json())
        .then(data => { setArticle(data); setLoading(false) })
    }
  }, [status, params.id])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a73e8]" />
      </div>
    )
  }

  if (!article) return null

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl font-bold text-[#202124] mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Редактирование статьи
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <ArticleForm
            articleId={article.id}
            initialData={{
              title: article.title,
              summary: article.summary,
              content: article.content,
              date: new Date(article.date).toISOString().split('T')[0],
              doi: article.doi,
              institution: article.institution,
              imageUrl: article.imageUrl,
              tags: article.tags.map((t: any) => t.tag.name),
              authors: article.authors.map((a: any) => a.name),
              published: article.published,
            }}
          />
        </div>
      </div>
    </div>
  )
}
