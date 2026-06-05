'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, X, Plus } from 'lucide-react'

interface ArticleFormProps {
  initialData?: {
    title: string
    summary: string
    content: string
    date: string
    doi: string
    institution: string
    imageUrl: string
    tags: string[]
    authors: string[]
    published: boolean
  }
  articleId?: string
}

const AVAILABLE_TAGS = [
  '#Технологии и Инновации',
  '#Клиническая Практика',
  '#Наука и Исследования',
  '#Разбор статей',
  '#Дискуссии и Кейсы',
  '#Образование',
]

export default function ArticleForm({ initialData, articleId }: ArticleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [summary, setSummary] = useState(initialData?.summary || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0])
  const [doi, setDoi] = useState(initialData?.doi || '')
  const [institution, setInstitution] = useState(initialData?.institution || '')
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [authors, setAuthors] = useState<string[]>(initialData?.authors || [''])
  const [published, setPublished] = useState(initialData?.published ?? true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const body = {
      title, summary, content, date, doi, institution, imageUrl,
      tags, authors: authors.filter(a => a.trim()), published,
    }

    const url = articleId ? `/api/admin/articles/${articleId}` : '/api/admin/articles'
    const method = articleId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setLoading(false)
    if (res.ok) router.push('/admin')
  }

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const addAuthor = () => setAuthors(prev => [...prev, ''])
  const removeAuthor = (i: number) => setAuthors(prev => prev.filter((_, idx) => idx !== i))
  const updateAuthor = (i: number, val: string) => setAuthors(prev => prev.map((a, idx) => idx === i ? val : a))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Название *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Краткое описание *</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Авторы</label>
        {authors.map((author, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={author}
              onChange={(e) => updateAuthor(i, e.target.value)}
              placeholder="Фамилия И.О."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
            />
            {authors.length > 1 && (
              <button type="button" onClick={() => removeAuthor(i)} className="p-2 text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addAuthor} className="text-sm text-[#1a73e8] hover:underline flex items-center gap-1">
          <Plus className="h-4 w-4" /> Добавить автора
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Дата</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">DOI</label>
          <input type="text" value={doi} onChange={(e) => setDoi(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Учреждение</label>
          <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">URL изображения</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Категории</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                tags.includes(tag)
                  ? 'bg-[#1a73e8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Содержание (Markdown) *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={20}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8] font-mono text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 text-[#1a73e8] rounded"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">Опубликовать</label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center space-x-2 px-8 py-3 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors font-medium disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          <span>{articleId ? 'Сохранить' : 'Создать статью'}</span>
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Отмена
        </button>
      </div>
    </form>
  )
}
