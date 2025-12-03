import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import Link from 'next/link'
import { Eye, Shield, Clock, CheckCircle, AlertTriangle, FileCheck, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Для рецензентов | SSVproff',
  description: 'Руководство для рецензентов журнала SSVproff',
}

export default function ForReviewersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#34a853] to-[#1a73e8] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Для рецензентов</h1>
            <p className="text-xl text-white/90">
              Руководство по рецензированию научных статей в SSVproff
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Роль рецензента</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Рецензенты являются ключевым звеном в процессе научной публикации. Ваша экспертная оценка помогает:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <CheckCircle className="w-8 h-8 text-[#34a853] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Обеспечивать качество</h4>
                  <p className="text-sm text-gray-700">Поддерживать высокие стандарты научной публикации</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <Shield className="w-8 h-8 text-[#1a73e8] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Защищать науку</h4>
                  <p className="text-sm text-gray-700">Предотвращать публикацию некачественных исследований</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <FileCheck className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Улучшать статьи</h4>
                  <p className="text-sm text-gray-700">Помогать авторам усилить их работу</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                  <Clock className="w-8 h-8 text-amber-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Ускорять прогресс</h4>
                  <p className="text-sm text-gray-700">Способствовать распространению новых знаний</p>
                </div>
              </div>
            </div>
          </section>

          {/* Review Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-[#34a853]" />
              Процесс рецензирования
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Приглашение к рецензированию</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Редактор направит вам приглашение по email с кратким описанием статьи</li>
                  <li>• Оцените, подходит ли вам тема и есть ли конфликт интересов</li>
                  <li>• Ответьте в течение 2-3 дней, приняв или отклонив приглашение</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Получение рукописи</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• После принятия приглашения вы получите полный текст рукописи</li>
                  <li>• Срок рецензирования: 2-3 недели с момента получения</li>
                  <li>• Вся информация строго конфиденциальна</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Проведение рецензии</h3>
                <p className="text-gray-700 mb-4">При оценке статьи сосредоточьтесь на следующих аспектах:</p>
                <div className="space-y-3">
                  <div className="border-l-4 border-[#1a73e8] pl-4">
                    <h5 className="font-bold text-gray-900">Новизна и актуальность</h5>
                    <p className="text-sm text-gray-700">Вносит ли исследование новый вклад в область знаний?</p>
                  </div>
                  <div className="border-l-4 border-[#34a853] pl-4">
                    <h5 className="font-bold text-gray-900">Методология</h5>
                    <p className="text-sm text-gray-700">Корректен ли дизайн, адекватна ли выборка, правильна ли статистика?</p>
                  </div>
                  <div className="border-l-4 border-[#ea4335] pl-4">
                    <h5 className="font-bold text-gray-900">Результаты и интерпретация</h5>
                    <p className="text-sm text-gray-700">Поддерживают ли данные выводы? Нет ли переинтерпретации?</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <h5 className="font-bold text-gray-900">Клиническое значение</h5>
                    <p className="text-sm text-gray-700">Какова практическая значимость для клинической практики?</p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h5 className="font-bold text-gray-900">Язык и презентация</h5>
                    <p className="text-sm text-gray-700">Четко ли изложена статья? Логична ли структура?</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Подготовка рецензии</h3>
                <p className="text-gray-700 mb-4">Ваша рецензия должна включать:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Краткое резюме</strong> содержания и целей статьи</li>
                  <li>• <strong>Сильные стороны</strong> исследования</li>
                  <li>• <strong>Слабые стороны</strong> и конкретные замечания по улучшению</li>
                  <li>• <strong>Конкретные вопросы</strong> к авторам (если необходимо)</li>
                  <li>• <strong>Итоговую рекомендацию</strong>: принять, принять с доработкой, отклонить</li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI Usage */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Использование ИИ при рецензировании</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Журнал SSVproff разрешает ограниченное использование ИИ-инструментов рецензентами для 
                    повышения эффективности рецензирования.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Допустимо
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Анализ методологии</li>
                        <li>• Поиск литературы</li>
                        <li>• Улучшение формулировок</li>
                        <li>• Перевод текста</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Недопустимо
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Загрузка рукописи в публичные ИИ</li>
                        <li>• Делегирование критического анализа</li>
                        <li>• Генерация рецензий ИИ</li>
                        <li>• Нарушение конфиденциальности</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-900 font-semibold mb-2">⚠️ Важно:</p>
                    <p className="text-sm text-red-900">
                      Не загружайте полный текст рукописи в публичные ИИ-системы (ChatGPT, Claude и т.д.)! 
                      Это нарушает конфиденциальность рецензирования.
                    </p>
                  </div>

                  <Link 
                    href="/ai-policy" 
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-[#34a853] to-[#1a73e8] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Shield className="w-5 h-5" />
                    Полная политика ИИ
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Ethics and Confidentiality */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#1a73e8]" />
                Этика и конфиденциальность
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Конфиденциальность</h4>
                  <p className="text-sm text-gray-700">
                    Рукопись является строго конфиденциальной. Не обсуждайте ее содержание с коллегами и не 
                    используйте информацию из нее в собственных исследованиях до публикации.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Конфликт интересов</h4>
                  <p className="text-sm text-gray-700">
                    Если у вас есть личные, финансовые или профессиональные связи с авторами или 
                    исследованием, немедленно сообщите об этом редактору.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Объективность</h4>
                  <p className="text-sm text-gray-700">
                    Рецензия должна быть объективной, конструктивной и уважительной. Критикуйте работу, а не авторов.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Своевременность</h4>
                  <p className="text-sm text-gray-700">
                    Старайтесь предоставить рецензию в установленные сроки. Если вы не можете выполнить рецензию, 
                    сообщите редактору как можно скорее.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#34a853] to-[#1a73e8] text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Преимущества рецензентов SSVproff</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <CheckCircle className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Признание</h4>
                  <p className="text-sm text-white/90">Ваше имя в списке рецензентов журнала (при желании)</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <FileCheck className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Ранний доступ</h4>
                  <p className="text-sm text-white/90">Ознакомление с новейшими исследованиями до публикации</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <Clock className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Профессиональный рост</h4>
                  <p className="text-sm text-white/90">Развитие навыков критического анализа и научной экспертизы</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <Shield className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg mb-2">Вклад в науку</h4>
                  <p className="text-sm text-white/90">Участие в формировании научного знания в хирургии</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Стать рецензентом</h3>
              <p className="text-gray-700 mb-6">
                Если вы заинтересованы в рецензировании для SSVproff, свяжитесь с редакцией
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#34a853] text-white rounded-lg font-semibold hover:bg-[#2d8e47] transition-colors"
              >
                Контакты редакции
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
