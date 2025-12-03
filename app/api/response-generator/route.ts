import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const { articleTitle, articleContent, articleSummary } = body ?? {}

    if (!articleTitle || !articleContent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `Вы - профессиональный медицинский редактор и хирург. На основе следующей статьи сформируйте профессиональный развернутый ответ или комментарий.

Название статьи: ${articleTitle}

Краткое содержание: ${articleSummary}

Полный текст статьи:
${articleContent}

Сформулируйте профессиональный ответ, который:
1. Суммирует ключевые моменты статьи
2. Выделяет наиболее значимые аспекты для практикующих хирургов
3. Предлагает контекст относительно текущего состояния медицинской науки
4. Указывает на возможные направления будущих исследований

Ответ должен быть структурированным, профессиональным и на русском языке.`

    const messages = [
      {
        role: 'system',
        content: 'Вы - опытный хирург и медицинский редактор, специализирующийся на составлении профессиональных медицинских комментариев и ответов.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 3000,
        temperature: 0.7
      }),
    })

    if (!response?.ok) {
      throw new Error(`API request failed: ${response?.status}`)
    }

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response?.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()

        try {
          while (true) {
            const { done, value } = await reader?.read() ?? { done: true, value: undefined }
            if (done) break
            
            const chunk = decoder?.decode(value ?? new Uint8Array(), { stream: true })
            controller?.enqueue(encoder?.encode(chunk))
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller?.error(error)
        } finally {
          controller?.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Response Generator API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
