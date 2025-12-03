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

    const systemPrompt = `Вы - опытный редактор научного медицинского журнала SSVproff, специализирующийся на оценке качества научных публикаций.

Ваша задача: провести редакторский анализ следующей статьи с фокусом на:

1. **Научная ясность и стиль**:
   - Оцените четкость изложения научных концепций
   - Проверьте соответствие научному стилю письма
   - Выявите сложные или двусмысленные формулировки

2. **Структура (IMRAD)**:
   - Введение (Introduction): наличие четкой проблемы, целей и гипотез
   - Методы (Methods): полнота описания, воспроизводимость
   - Результаты (Results): логичное представление данных
   - Обсуждение (Discussion): интерпретация, ограничения, клиническое значение
   - Заключение (Conclusion): соответствие данным и целям

3. **Язык и читабельность**:
   - Грамматика и терминология
   - Логика изложения
   - Переходы между разделами

4. **Методологические аспекты**:
   - Достаточность описания методов
   - Обоснованность выбора конечных точек
   - Полнота описания статистического анализа

Предоставьте структурированный отзыв с конкретными рекомендациями по улучшению.

Статья для анализа:
Название: ${articleTitle}

Текст статьи:
${articleContent}

Дайте профессиональный редакторский анализ на русском языке.`

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
          { role: 'user', content: 'Проведите редакторский анализ этой статьи.' }
        ],
        stream: true,
        max_tokens: 3000,
        temperature: 0.3
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
    console.error('Editor API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate editor analysis' },
      { status: 500 }
    )
  }
}
