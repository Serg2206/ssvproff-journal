import type { Metadata } from 'next';
import PDFViewer from '@/components/PDFViewer';

export const metadata: Metadata = {
  title: 'Современная хирургия рака желудка | SSVproff Journal',
  description:
    'Аналитический разбор для оперирующего хирурга: доказательная база, статистика операционных решений и логика послеоперационного ведения.',
  openGraph: {
    title:
      'Современная хирургия рака желудка: от радикальной резекции к управлению функцией',
    description: 'Клинический очерк. Автор: проф. С. В. Сушков',
    type: 'article',
  },
};

const article = {
  category: 'Клинический очерк · Хирургия верхних отделов ЖКТ',
  title:
    'Современная хирургия рака желудка: от радикальной резекции к управлению функцией',
  subtitle:
    'Аналитический разбор для оперирующего хирурга: доказательная база, статистика операционных решений и логика послеоперационного ведения',
  author: 'Сушков Сергей Валентинович',
  authorTitle: 'Хирург, онкохирург, доктор медицинских наук, профессор',
  date: '2025',
  source:
    'Park SH, Cho A, Kim DJ. Current Trends in Gastric Cancer Surgery and Postoperative Care. Korean J Helicobacter Up Gastrointest Res 2025;25(4):308–318. doi:10.7704/kjhugr.2025.0063',
  tags: [
    'хирургия желудка',
    'онкохирургия',
    'лапароскопия',
    'гастрэктомия',
    'KLASS',
    'качество жизни',
  ],
  pdfUrl: '/articles/gastric-cancer-surgery-2025.pdf',
};

export default function GastricSurgeryArticle() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Заголовок */}
      <header className="mb-8">
        <div className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-2">
          {article.category}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-gray-500 mb-6">{article.subtitle}</p>

        {/* Метаданные */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-b py-4 mb-6">
          <div>
            <span className="font-semibold">Автор:</span> {article.author}
          </div>
          <div>
            <span className="font-semibold">Должность:</span>{' '}
            {article.authorTitle}
          </div>
          <div>
            <span className="font-semibold">Год:</span> {article.date}
          </div>
        </div>

        {/* Теги */}
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Источник */}
        <p className="text-xs text-gray-400 italic">
          Основано на: {article.source}
        </p>
      </header>

      {/* Просмотрщик PDF */}
      <PDFViewer url={article.pdfUrl} title={article.title} />

      {/* Кнопка скачивания */}
      <div className="mt-6 flex justify-end">
        <a
          href={article.pdfUrl}
          download
          className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
        >
          ⬇ Скачать PDF
        </a>
      </div>
    </main>
  );
}
