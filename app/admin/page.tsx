'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, FileText } from 'lucide-react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/')
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/admin/articles')
        .then(r => r.json())
        .then(data => { setArticles(data); setLoading(false) })
    }
  }, [status])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Удалить статью "${title}"?`)) return
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a73e8]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-[#202124]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Админ-панель
            </h1>
            <p className="text-gray-600 mt-1">Управление статьями журнала</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Новая статья</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-[#1a73e8]">{articles.length}</div>
            <div className="text-sm text-gray-600 mt-1">Всего статей</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-[#34a853]">{articles.filter(a => a.published).length}</div>
            <div className="text-sm text-gray-600 mt-1">Опубликовано</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-[#ea4335]">{articles.filter(a => !a.published).length}</div>
            <div className="text-sm text-gray-600 mt-1">Черновики</div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Статья</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Дата</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Статус</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">Просмотры</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#202124] text-sm line-clamp-1">{article.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {article.authors?.map((a: any) => a.name).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {new Date(article.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {article.published ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        <Eye className="h-3 w-3" /> Опубликовано
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        <EyeOff className="h-3 w-3" /> Черновик
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {article.views}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/article/${article.id}`}
                        className="p-2 text-gray-400 hover:text-[#1a73e8] transition-colors"
                        title="Просмотр"
                      >
                        <FileText className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-2 text-gray-400 hover:text-[#1a73e8] transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="p-2 text-gray-400 hover:text-[#ea4335] transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
