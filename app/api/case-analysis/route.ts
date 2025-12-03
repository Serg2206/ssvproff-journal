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

    const prompt = `Вы - опытный хирург и медицинский аналитик. Проведите детальный анализ следующей медицинской статьи.

Название статьи: ${articleTitle}

Краткое содержание: ${articleSummary}

Полный текст статьи:
${articleContent}

Проанализируйте статью и предоставьте:
1. Основные клинические находки
2. Критическую оценку методологии
3. Практическое значение для клинической практики
4. Потенциальные ограничения исследования
5. Рекомендации по применению результатов

Ответьте подробно на русском языке, используя профессиональную медицинскую терминологию.`

    const messages = [
      {
        role: 'system',
        content: 'Вы - профессиональный хирург и медицинский аналитик, специализирующийся на критическом анализе научных публикаций.'
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
    console.error('Case Analysis API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    )
  }
}
