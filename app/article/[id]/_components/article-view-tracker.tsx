'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

interface ArticleViewTrackerProps {
  articleId: string
  articleTitle: string
  articleTags: string[]
}

export default function ArticleViewTracker({ articleId, articleTitle, articleTags }: ArticleViewTrackerProps) {
  useEffect(() => {
    // Track article view with Google Analytics
    sendGAEvent('event', 'article_view', {
      event_category: 'Article',
      event_label: articleTitle,
      article_id: articleId,
      article_tags: articleTags.join(', '),
      value: 1
    })
  }, [articleId, articleTitle, articleTags])

  return null // This component doesn't render anything
}
