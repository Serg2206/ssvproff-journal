import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { articles } from '../lib/articles-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const adminHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ssvproff.com' },
    update: {},
    create: {
      name: 'Сушков С.В.',
      email: 'admin@ssvproff.com',
      passwordHash: adminHash,
      role: 'admin',
    },
  })
  console.log('Admin user: ' + admin.email)

  for (const article of articles) {
    const tagRecords = []
    for (const tagName of article.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      })
      tagRecords.push({ tagId: tag.id })
    }

    const created = await prisma.article.create({
      data: {
        title: article.title,
        summary: article.summary,
        content: article.content,
        date: new Date(article.date),
        doi: article.doi,
        institution: article.institution,
        imageUrl: article.imageUrl || '',
        views: article.views,
        downloads: article.downloads,
        citations: article.citations,
        published: true,
        authorId: admin.id,
        authors: {
          create: article.authors.map((name: string, i: number) => ({ name, position: i })),
        },
        tags: {
          create: tagRecords,
        },
      },
    })
    console.log('Article: ' + created.title.substring(0, 50) + '...')
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
