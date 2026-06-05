'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ArticleForm from '@/components/article-form'
import { Loader2 } from 'lucide-react'

export default function NewArticlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/')
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a73e8]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl font-bold text-[#202124] mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Новая статья
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <ArticleForm />
        </div>
      </div>
    </div>
  )
}
