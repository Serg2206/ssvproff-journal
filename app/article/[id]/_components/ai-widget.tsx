'use client'

import { useState } from 'react'
import { Article } from '@/lib/articles-data'
import { Bot, FileText, MessageSquare, Sparkles, X, Loader2, Zap, Edit, Compass, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendGAEvent } from '@next/third-parties/google'

interface AIWidgetProps {
  article: Article
}

type AIMode = 'case-analysis' | 'response-generator' | 'chatbot' | 'editor' | 'navigator' | 'methodologist' | null

export default function AIWidget({ article }: AIWidgetProps) {
  const [activeMode, setActiveMode] = useState<AIMode>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])

  const handleModeClick = async (mode: AIMode) => {
    if (activeMode === mode) {
      setActiveMode(null)
      setAiResponse('')
      setChatHistory([])
      return
    }

    setActiveMode(mode)
    setAiResponse('')
    setChatHistory([])
    
    // Track AI mode usage with Google Analytics
    if (mode) {
      sendGAEvent('event', 'ai_mode_selected', {
        event_category: 'AI Widget',
        event_label: mode,
        value: mode === 'case-analysis' ? 1 : mode === 'response-generator' ? 2 : 3
      })
    }
    
    if (mode !== 'chatbot') {
      setIsLoading(true)
      
      try {
        const endpointMap: Record<string, string> = {
          'case-analysis': '/api/case-analysis',
          'response-generator': '/api/response-generator',
          'editor': '/api/editor',
          'navigator': '/api/navigator',
          'methodologist': '/api/methodologist'
        }
        const endpoint = (mode && endpointMap[mode]) || '/api/case-analysis'
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            articleTitle: article?.title ?? '',
            articleContent: article?.content ?? '',
            articleSummary: article?.summary ?? ''
          })
        })

        if (!response?.ok) throw new Error('Failed to fetch AI response')

        const reader = response?.body?.getReader()
        const decoder = new TextDecoder()
        let fullResponse = ''

        while (true) {
          const { done, value } = await reader?.read() ?? { done: true, value: undefined }
          if (done) break
          
          const chunk = decoder?.decode(value ?? new Uint8Array(), { stream: true })
          const lines = chunk?.split('\n\n') ?? []
          
          for (const line of lines) {
            if (line?.startsWith('data: ')) {
              const data = line?.slice(6)
              if (data === '[DONE]') continue
              
              try {
                const parsed = JSON.parse(data)
                if (parsed?.choices?.[0]?.delta?.content) {
                  const content = parsed?.choices?.[0]?.delta?.content ?? ''
                  fullResponse += content
                  setAiResponse(fullResponse)
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } catch (error) {
        console.error('AI Error:', error)
        setAiResponse('Извините, произошла ошибка при генерации ответа. Пожалуйста, попробуйте снова.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e?.preventDefault()
    if (!chatInput?.trim() || isLoading) return

    const userMessage = chatInput?.trim() ?? ''
    setChatInput('')
    setChatHistory(prev => [...(prev ?? []), { role: 'user', content: userMessage }])
    setIsLoading(true)
    
    // Track chat message submission with Google Analytics
    sendGAEvent('event', 'ai_chat_message_sent', {
      event_category: 'AI Widget',
      event_label: 'chatbot',
      value: (chatHistory?.length ?? 0) + 1
    })

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          articleTitle: article?.title ?? '',
          articleContent: article?.content ?? '',
          chatHistory: chatHistory ?? []
        })
      })

      if (!response?.ok) throw new Error('Failed to fetch chatbot response')

      const reader = response?.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      // Add empty assistant message that we'll fill
      setChatHistory(prev => [...(prev ?? []), { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader?.read() ?? { done: true, value: undefined }
        if (done) break
        
        const chunk = decoder?.decode(value ?? new Uint8Array(), { stream: true })
        const lines = chunk?.split('\n\n') ?? []
        
        for (const line of lines) {
          if (line?.startsWith('data: ')) {
            const data = line?.slice(6)
            if (data === '[DONE]') continue
            
            try {
              const parsed = JSON.parse(data)
              if (parsed?.choices?.[0]?.delta?.content) {
                const content = parsed?.choices?.[0]?.delta?.content ?? ''
                fullResponse += content
                // Update the last message in chat history
                setChatHistory(prev => {
                  const newHistory = [...(prev ?? [])]
                  if (newHistory?.length > 0) {
                    newHistory[newHistory?.length - 1] = { role: 'assistant', content: fullResponse }
                  }
                  return newHistory
                })
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chatbot Error:', error)
      setChatHistory(prev => [...(prev ?? []), { 
        role: 'assistant', 
        content: 'Извините, произошла ошибка. Пожалуйста, попробуйте снова.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-[#1a73e8]/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          AI Ассистент
        </h3>
      </div>

      <p className="text-gray-600 mb-6">
        Используйте искусственный интеллект для углубленного анализа статьи
      </p>

      {/* AI Mode Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleModeClick('editor')}
          disabled={isLoading}
          title="Анализ научной ясности, структуры (IMRAD), языка и выявление слабых мест в методологии"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'editor'
              ? 'border-[#1a73e8] bg-[#e8f0fe] shadow-lg'
              : 'border-gray-200 hover:border-[#1a73e8] hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <Edit className="h-6 w-6 text-[#1a73e8] mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Редактор статьи</div>
          <div className="text-xs text-gray-500 mt-1">Оценка структуры, ясности и методологии</div>
          {activeMode === 'editor' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-[#1a73e8] animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={() => handleModeClick('navigator')}
          disabled={isLoading}
          title="Краткий обзор последних публикаций в топ-журналах, ключевые выводы и клинические изменения"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'navigator'
              ? 'border-[#34a853] bg-[#e6f4ea] shadow-lg'
              : 'border-gray-200 hover:border-[#34a853] hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <Compass className="h-6 w-6 text-[#34a853] mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Навигатор мировой хирургии</div>
          <div className="text-xs text-gray-500 mt-1">Контекст статьи в мировых трендах</div>
          {activeMode === 'navigator' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-[#34a853] animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={() => handleModeClick('methodologist')}
          disabled={isLoading}
          title="Анализ дизайна исследования, выборки, статистики и выявление потенциальных методологических ошибок"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'methodologist'
              ? 'border-[#ea4335] bg-[#fce8e6] shadow-lg'
              : 'border-gray-200 hover:border-[#ea4335] hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <BarChart3 className="h-6 w-6 text-[#ea4335] mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Методолог и биостатистик</div>
          <div className="text-xs text-gray-500 mt-1">Критический анализ дизайна и статистики</div>
          {activeMode === 'methodologist' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-[#ea4335] animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={() => handleModeClick('case-analysis')}
          disabled={isLoading}
          title="Проведет глубокий анализ клинического случая, описанного в статье, с учетом всех деталей и контекста"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'case-analysis'
              ? 'border-purple-600 bg-purple-50 shadow-lg'
              : 'border-gray-200 hover:border-purple-600 hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <FileText className="h-6 w-6 text-purple-600 mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Анализ кейса</div>
          <div className="text-xs text-gray-500 mt-1">Детальный разбор клинического случая</div>
          {activeMode === 'case-analysis' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-purple-600 animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={() => handleModeClick('response-generator')}
          disabled={isLoading}
          title="Сформирует профессиональный медицинский ответ на основе содержания статьи"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'response-generator'
              ? 'border-amber-600 bg-amber-50 shadow-lg'
              : 'border-gray-200 hover:border-amber-600 hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <Bot className="h-6 w-6 text-amber-600 mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Генератор ответов</div>
          <div className="text-xs text-gray-500 mt-1">Формирование профессионального ответа</div>
          {activeMode === 'response-generator' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-amber-600 animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={() => handleModeClick('chatbot')}
          disabled={isLoading}
          title="Откроет диалог с AI-ассистентом для обсуждения темы статьи и ответов на ваши вопросы"
          className={`group relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
            activeMode === 'chatbot'
              ? 'border-cyan-600 bg-cyan-50 shadow-lg'
              : 'border-gray-200 hover:border-cyan-600 hover:bg-gray-50 hover:shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <MessageSquare className="h-6 w-6 text-cyan-600 mb-2" />
          <div className="text-sm font-semibold text-[#202124]">Тематический чат</div>
          <div className="text-xs text-gray-500 mt-1">Диалог по теме статьи</div>
          {activeMode === 'chatbot' && (
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-cyan-600 animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* AI Response Area */}
      <AnimatePresence mode="wait">
        {activeMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-gray-100 pt-6"
          >
            {activeMode === 'chatbot' ? (
              <div className="space-y-4">
                {/* Chat History */}
                <div className="max-h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {chatHistory?.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Задайте вопрос по теме статьи
                    </p>
                  ) : (
                    chatHistory?.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg?.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg?.role === 'assistant' && (
                          <div className="p-1.5 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-lg mr-2 flex-shrink-0 h-fit">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg?.role === 'user'
                              ? 'bg-[#1a73e8] text-white shadow-md'
                              : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg?.content ?? ''}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start items-center">
                      <div className="p-1.5 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-lg mr-2 flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-[#1a73e8]" />
                        <span className="text-sm text-gray-600">AI печатает...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e?.target?.value ?? '')}
                    placeholder="Введите ваш вопрос..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !chatInput?.trim()}
                    className="px-6 py-3 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-10 w-10 animate-spin text-[#1a73e8] mb-4" />
                    <span className="text-lg font-medium text-gray-700 mb-2">AI думает...</span>
                    <span className="text-sm text-gray-500">Анализируем статью и формируем ответ</span>
                  </div>
                ) : aiResponse ? (
                  <div className="bg-white rounded-lg p-6 border-l-4 border-[#1a73e8] shadow-sm">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-lg flex-shrink-0">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[#1a73e8] mb-2">Ответ AI-ассистента</h4>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {aiResponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
