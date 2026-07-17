import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminOrUnauthorized, unauthorizedJson, notFoundJson } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdminOrUnauthorized()
  if (!session) return unauthorizedJson()

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      authors: { orderBy: { position: 'asc' } },
      tags: { include: { tag: true } },
    },
  })

  if (!article) return notFoundJson()
  return NextResponse.json(article)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdminOrUnauthorized()
  if (!session) return unauthorizedJson()

  const body = await request.json()
  const { title, summary, content, date, doi, institution, imageUrl, tags, authors, published } = body

  await prisma.articleTag.deleteMany({ where: { articleId: params.id } })
  await prisma.articleAuthor.deleteMany({ where: { articleId: params.id } })

  const tagRecords = []
  for (const tagName of (tags || [])) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    })
    tagRecords.push({ tagId: tag.id })
  }

  const article = await prisma.article.update({
    where: { id: params.id },
    data: {
      title,
      summary,
      content,
      date: new Date(date),
      doi: doi || '',
      institution: institution || '',
      imageUrl: imageUrl || '',
      published: published ?? true,
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

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdminOrUnauthorized()
  if (!session) return unauthorizedJson()

  await prisma.article.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
