import { prisma } from './prisma'

const articleInclude = {
  authors: { orderBy: { position: 'asc' as const } },
  tags: { include: { tag: true } },
}

function mapArticle(raw: any) {
  return {
    id: raw.id,
    title: raw.title,
    summary: raw.summary,
    content: raw.content,
    date: raw.date.toISOString().split('T')[0],
    doi: raw.doi,
    institution: raw.institution,
    imageUrl: raw.imageUrl,
    views: raw.views,
    downloads: raw.downloads,
    citations: raw.citations,
    published: raw.published,
    authors: raw.authors.map((a: any) => a.name),
    tags: raw.tags.map((t: any) => t.tag.name),
  }
}

export type ArticleDB = ReturnType<typeof mapArticle>

export async function getArticleById(id: string) {
  const raw = await prisma.article.findUnique({
    where: { id },
    include: articleInclude,
  })
  return raw ? mapArticle(raw) : null
}

export async function getLatestArticles(count = 6) {
  const raw = await prisma.article.findMany({
    where: { published: true },
    include: articleInclude,
    orderBy: { date: 'desc' },
    take: count,
  })
  return raw.map(mapArticle)
}

export async function getRelatedArticles(currentId: string, count = 3) {
  const current = await prisma.article.findUnique({
    where: { id: currentId },
    include: { tags: true },
  })
  if (!current) return []

  const tagIds = current.tags.map((t) => t.tagId)

  const raw = await prisma.article.findMany({
    where: {
      id: { not: currentId },
      published: true,
      tags: { some: { tagId: { in: tagIds } } },
    },
    include: articleInclude,
    orderBy: { date: 'desc' },
    take: count,
  })

  if (raw.length < count) {
    const existingIds = [currentId, ...raw.map((a) => a.id)]
    const additional = await prisma.article.findMany({
      where: { id: { notIn: existingIds }, published: true },
      include: articleInclude,
      orderBy: { date: 'desc' },
      take: count - raw.length,
    })
    return [...raw, ...additional].map(mapArticle)
  }

  return raw.map(mapArticle)
}

export async function getAllArticles() {
  const raw = await prisma.article.findMany({
    where: { published: true },
    include: articleInclude,
    orderBy: { date: 'desc' },
  })
  return raw.map(mapArticle)
}

export async function getAllTags() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } })
  return tags.map((t) => t.name)
}

export async function filterArticles({
  searchQuery,
  selectedTags,
  sortBy = 'date',
}: {
  searchQuery?: string
  selectedTags?: string[]
  sortBy?: 'date' | 'views' | 'citations'
}) {
  const where: any = { published: true }

  if (searchQuery?.trim()) {
    const q = searchQuery.trim()
    where.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
      { authors: { some: { name: { contains: q } } } },
    ]
  }

  if (selectedTags?.length) {
    where.tags = { some: { tag: { name: { in: selectedTags } } } }
  }

  const orderBy =
    sortBy === 'views' ? { views: 'desc' as const }
    : sortBy === 'citations' ? { citations: 'desc' as const }
    : { date: 'desc' as const }

  const raw = await prisma.article.findMany({
    where,
    include: articleInclude,
    orderBy,
  })

  return raw.map(mapArticle)
}

export async function incrementViews(id: string) {
  await prisma.article.update({
    where: { id },
    data: { views: { increment: 1 } },
  })
}
