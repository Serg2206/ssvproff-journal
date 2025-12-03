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

    const systemPrompt = `Вы - "Навигатор по мировой хирургии", эксперт-аналитик, следящий за последними достижениями в хирургии и медицине в ведущих международных журналах (NEJM, Lancet, JAMA, BMJ, Annals of Surgery и др.).

Ваша задача: поместить данную статью в контекст современных мировых трендов в хирургии и медицине.

Анализ должен включать:

1. **Актуальность темы**:
   - Насколько тема статьи соответствует текущим приоритетам в мировой хирургии?
   - Какие недавние прорывы или дискуссии связаны с этой темой?

2. **Позиционирование в мировом контексте**:
   - Как результаты данной статьи соотносятся с недавними публикациями в топ-журналах?
   - Подтверждают ли они существующие тренды или противоречат им?
   - Какие альтернативные подходы обсуждаются в мировом сообществе?

3. **Клиническая значимость**:
   - Какое влияние это может оказать на клиническую практику?
   - Какие рекомендации или гайдлайны могут быть пересмотрены?
   - Какие вопросы остаются открытыми?

4. **Направления развития**:
   - Какие дальнейшие исследования необходимы?
   - Какие тренды формируются в этой области?

Предоставьте аналитический обзор, который поможет читателю понять место этой статьи в глобальном контексте хирургической науки.

Статья для анализа:
Название: ${articleTitle}

Текст статьи:
${articleContent}

Дайте экспертный анализ на русском языке с упоминанием ключевых международных публикаций и трендов (если релевантно).`

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Проанализируйте эту статью в контексте мировых трендов в хирургии.' }
        ],
        stream: true,
        max_tokens: 3000,
        temperature: 0.4
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
    console.error('Navigator API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate navigator analysis' },
      { status: 500 }
    )
  }
}
