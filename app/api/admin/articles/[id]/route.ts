import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') return null
  return session
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      authors: { orderBy: { position: 'asc' } },
      tags: { include: { tag: true } },
    },
  })

  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.article.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
