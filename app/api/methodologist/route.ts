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

    const systemPrompt = `Вы - "Методолог и биостатистик", специалист по дизайну клинических исследований и статистическому анализу в медицине. Вы обладаете глубокими знаниями в области доказательной медицины, эпидемиологии и биостатистики.

Ваша задача: провести критический методологический и статистический анализ представленной статьи.

Ваш анализ должен охватывать:

1. **Дизайн исследования**:
   - Тип исследования (РКИ, когортное, случай-контроль, и т.д.)
   - Соответствие дизайна поставленным целям
   - Наличие контрольной группы, рандомизации, ослепления (если применимо)
   - Потенциальные источники систематических ошибок (bias)

2. **Выборка и репрезентативность**:
   - Адекватность размера выборки
   - Критерии включения/исключения
   - Расчет мощности исследования (power analysis)
   - Репрезентативность выборки

3. **Статистический анализ**:
   - Корректность выбора статистических методов
   - Адекватность представления результатов (p-values, confidence intervals, effect sizes)
   - Множественные сравнения и поправки
   - Обработка пропущенных данных
   - Проверка предположений статистических тестов

4. **Интерпретация результатов**:
   - Различие между статистической и клинической значимостью
   - Корректность выводов на основе полученных данных
   - Оценка внешней валидности (generalizability)
   - Альтернативные объяснения результатов

5. **Ограничения исследования**:
   - Признание авторами ограничений
   - Дополнительные незамеченные ограничения
   - Влияние ограничений на интерпретацию

Предоставьте детальный критический анализ с конкретными замечаниями и рекомендациями. Будьте объективны и конструктивны.

Статья для анализа:
Название: ${articleTitle}

Текст статьи:
${articleContent}

Проведите методологический и статистический анализ на русском языке.`

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
          { role: 'user', content: 'Проведите критический методологический и статистический анализ этой статьи.' }
        ],
        stream: true,
        max_tokens: 3000,
        temperature: 0.2
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
    console.error('Methodologist API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate methodologist analysis' },
      { status: 500 }
    )
  }
}
