import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminOrUnauthorized, unauthorizedJson } from '@/lib/api-helpers'

export async function GET() {
  const session = await requireAdminOrUnauthorized()
  if (!session) return unauthorizedJson()

  const articles = await prisma.article.findMany({
    include: {
      authors: { orderBy: { position: 'asc' } },
      tags: { include: { tag: true } },
    },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const session = await requireAdminOrUnauthorized()
  if (!session) return unauthorizedJson()

  const body = await request.json()
  const { title, summary, content, date, doi, institution, imageUrl, tags, authors, published } = body

  const tagRecords = []
  for (const tagName of (tags || [])) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    })
    tagRecords.push({ tagId: tag.id })
  }

  const article = await prisma.article.create({
    data: {
      title,
      summary,
      content,
      date: new Date(date),
      doi: doi || '',
      institution: institution || '',
      imageUrl: imageUrl || '',
      published: published ?? true,
      authorId: (session.user as any).id,
      authors: {
        create: (authors || []).map((name: string, i: number) => ({ name, position: i })),
      },
      tags: { create: tagRecords },
    },
    include: {
      authors: { orderBy: { position: 'asc' } },
      tags: { include: { tag: true } },
    },
  })

  return NextResponse.json(article)
}
