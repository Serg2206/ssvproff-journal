import { NextRequest, NextResponse } from 'next/server'
import { filterArticles, getAllTags } from '@/lib/articles-db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get('q') || ''
  const tags = searchParams.get('tags')
  const sortBy = (searchParams.get('sort') || 'date') as 'date' | 'views' | 'citations'

  const selectedTags = tags ? tags.split(',') : []

  const articles = await filterArticles({ searchQuery, selectedTags, sortBy })
  const allTags = await getAllTags()

  return NextResponse.json({ articles, allTags })
}
