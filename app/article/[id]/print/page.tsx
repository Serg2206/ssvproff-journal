import { getArticleById } from '@/lib/articles-db'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import PrintTrigger from './print-trigger'

interface Props {
  params: { id: string }
}

export default async function PrintArticlePage({ params }: Props) {
  const article = await getArticleById(params.id)
  if (!article) notFound()

  return (
    <html lang="ru">
      <head>
        <title>{article.title} — SSVproff</title>
        <style dangerouslySetInnerHTML={{ __html: `
          @page { margin: 2cm; }
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; color: #000; max-width: 700px; margin: 0 auto; padding: 20px; }
          h1 { font-size: 18pt; margin-bottom: 8px; }
          h2 { font-size: 15pt; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
          h3 { font-size: 13pt; margin-top: 16px; }
          .meta { color: #555; font-size: 10pt; margin-bottom: 20px; border-bottom: 2px solid #1a73e8; padding-bottom: 12px; }
          .meta p { margin: 2px 0; }
          .header-logo { color: #1a73e8; font-size: 14pt; font-weight: bold; margin-bottom: 4px; }
          ul, ol { padding-left: 24px; }
          @media print { .no-print { display: none; } }
        `}} />
      </head>
      <body>
        <PrintTrigger />
        <div className="header-logo">SSVproff — Профессиональный хирургический журнал</div>
        <h1>{article.title}</h1>
        <div className="meta">
          <p><strong>Авторы:</strong> {article.authors.join(', ')}</p>
          <p><strong>Дата:</strong> {new Date(article.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Учреждение:</strong> {article.institution}</p>
          <p><strong>DOI:</strong> {article.doi}</p>
          <p><strong>Категории:</strong> {article.tags.join(', ')}</p>
        </div>
        <p><em>{article.summary}</em></p>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </body>
    </html>
  )
}
