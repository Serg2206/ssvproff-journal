import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const { message, articleTitle, articleContent, chatHistory } = body ?? {}

    if (!message || !articleTitle || !articleContent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Build conversation history
    const messages = [
      {
        role: 'system',
        content: `Вы - профессиональный хирург-консультант, специализирующийся на обсуждении медицинских статей и клинических случаев. Вы отвечаете на вопросы о следующей статье:

Название: ${articleTitle}

Содержание статьи:
${articleContent}

Отвечайте профессионально, точно и на русском языке. Используйте информацию из статьи для обоснования своих ответов.`
      },
      // Add chat history
      ...(chatHistory?.map((msg: any) => ({
        role: msg?.role ?? 'user',
        content: msg?.content ?? ''
      })) ?? []),
      // Add current message
      {
        role: 'user',
        content: message
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
        max_tokens: 2000,
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
    console.error('Chatbot API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate chat response' },
      { status: 500 }
    )
  }
}
