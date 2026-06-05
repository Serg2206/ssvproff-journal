import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return null
  }
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
