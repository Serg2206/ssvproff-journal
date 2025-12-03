// Tag color mapping for better visual categorization
export const tagColors: Record<string, { bg: string; text: string }> = {
  'AI': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Робототехника': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Хирургия': { bg: 'bg-red-100', text: 'text-red-700' },
  'Онкология': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'Диагностика': { bg: 'bg-green-100', text: 'text-green-700' },
  'Трансплантология': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Нейрохирургия': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'Кардиохирургия': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Исследования': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  'Обзор': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'default': { bg: 'bg-gray-100', text: 'text-gray-700' },
}

export function getTagColor(tag: string): { bg: string; text: string } {
  return tagColors[tag] || tagColors.default
}
