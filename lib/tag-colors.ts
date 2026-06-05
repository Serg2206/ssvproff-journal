// Tag color mapping for better visual categorization
export const tagColors: Record<string, { bg: string; text: string }> = {
  '#Технологии и Инновации': { bg: 'bg-blue-100', text: 'text-blue-700' },
  '#Клиническая Практика': { bg: 'bg-red-100', text: 'text-red-700' },
  '#Наука и Исследования': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  '#Разбор статей': { bg: 'bg-purple-100', text: 'text-purple-700' },
  '#Дискуссии и Кейсы': { bg: 'bg-orange-100', text: 'text-orange-700' },
  '#Образование': { bg: 'bg-green-100', text: 'text-green-700' },
  'default': { bg: 'bg-gray-100', text: 'text-gray-700' },
}

export function getTagColor(tag: string): { bg: string; text: string } {
  return tagColors[tag] || tagColors.default
}
