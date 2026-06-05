# Установка статьи в ssvproff-journal

## Шаг 1. Установить зависимость (в терминале репозитория)
```bash
npm install
# react-pdf-viewer не требуется — используется нативный iframe
```

## Шаг 2. Положить файлы в репозиторий (сохранив пути)
```
ssvproff-journal/
├── components/PDFViewer.tsx                         ← новый файл
├── app/articles/gastric-surgery-2025/page.tsx       ← новый файл
└── public/articles/gastric-cancer-surgery-2025.pdf  ← PDF статьи
```

> Если в проекте используется папка `src/`, поместите `components/` и `app/`
> внутрь `src/`. Алиас `@/components` должен указывать на корень исходников
> (обычно настроен в `tsconfig.json` → `"paths": { "@/*": ["./*"] }`).
> Если алиаса нет — замените импорт в page.tsx на относительный:
> `import PDFViewer from '../../../components/PDFViewer';`

## Шаг 3. Добавить ссылку в навигацию журнала
```tsx
{ label: 'Хирургия рака желудка (2025)', href: '/articles/gastric-surgery-2025' }
```

## Шаг 4. Проверить локально
```bash
npm run dev
# открыть http://localhost:3000/articles/gastric-surgery-2025
```

## Результат
Страница статьи с заголовком, автором (проф. С. В. Сушков), тегами,
источником и встроенным просмотром PDF + кнопка скачивания.
