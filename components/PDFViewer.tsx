'use client';

import { useEffect, useState } from 'react';

interface PDFViewerProps {
  url: string;
  title?: string;
}

/**
 * Адаптивный просмотрщик PDF.
 * На десктопе встраивает документ через нативный <iframe>,
 * на мобильных устройствах предлагает скачивание (мобильные браузеры
 * часто не умеют корректно рендерить встроенный PDF).
 */
export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-gray-50">
        <p className="text-gray-600 text-center">
          Для просмотра на мобильном устройстве скачайте документ
        </p>
        <a
          href={url}
          download
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ⬇ Скачать PDF
        </a>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={`${url}#toolbar=1&navpanes=1`}
        width="100%"
        height="900px"
        title={title ?? 'PDF документ'}
        className="block"
      />
    </div>
  );
}
