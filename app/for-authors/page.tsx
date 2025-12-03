import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, CheckCircle, AlertCircle, BookOpen, Send, Shield, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Для авторов | SSVproff',
  description: 'Информация для авторов, требования к публикациям в журнале SSVproff',
}

export default function ForAuthorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a73e8] to-[#34a853] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Для авторов</h1>
            <p className="text-xl text-white/90">
              Руководство по подготовке и подаче рукописей в SSVproff
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Scope and Focus */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#1a73e8]" />
                Тематика и направления журнала
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Журнал <strong>SSVproff</strong> публикует оригинальные научные исследования, обзоры, клинические случаи и мета-анализы в области хирургии и смежных медицинских наук.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-3">Основные направления:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Неотложная хирургия и политравма</li>
                    <li>• Малоинвазивная и эндоскопическая хирургия</li>
                    <li>• Роботизированная хирургия</li>
                    <li>• Искусственный интеллект в хирургии</li>
                    <li>• Хирургическая гепатология</li>
                    <li>• Онкохирургия</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="font-bold text-gray-900 mb-3">Типы публикаций:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Оригинальные исследования</li>
                    <li>• Систематические обзоры и мета-анализы</li>
                    <li>• Клинические случаи</li>
                    <li>• Технические заметки</li>
                    <li>• Экспертные мнения</li>
                    <li>• Обзоры литературы</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Manuscript Preparation */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#34a853]" />
              Подготовка рукописи
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Структура рукописи (IMRAD)</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#1a73e8] pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Введение (Introduction)</h4>
                    <p className="text-sm text-gray-700">Обоснование актуальности, обзор литературы, четкая формулировка целей и гипотез</p>
                  </div>
                  <div className="border-l-4 border-[#34a853] pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Методы (Methods)</h4>
                    <p className="text-sm text-gray-700">Подробное описание дизайна, выборки, методов исследования и статистического анализа (достаточное для воспроизведения)</p>
                  </div>
                  <div className="border-l-4 border-[#ea4335] pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Результаты (Results)</h4>
                    <p className="text-sm text-gray-700">Логичное и объективное представление данных, таблицы и рисунки с пояснениями</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Обсуждение (Discussion)</h4>
                    <p className="text-sm text-gray-700">Интерпретация, сравнение с литературой, ограничения, клиническое значение</p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Заключение (Conclusion)</h4>
                    <p className="text-sm text-gray-700">Краткое резюме основных выводов, соответствующее поставленным целям</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Технические требования</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Формат: Microsoft Word (.docx) или LaTeX</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Шрифт: Times New Roman, 12 pt, двойной интервал</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Объем: оригинальные статьи - до 5000 слов, обзоры - до 8000 слов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Резюме: структурированное, 250-300 слов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Ключевые слова: 4-6 слов, предпочтительно MeSH terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Библиография: Vancouver style (нумерация в порядке цитирования)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-0.5" />
                    <span>Рисунки: высокое разрешение (min 300 dpi), TIFF, JPEG или PNG</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI Policy Reference */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a73e8] to-[#34a853] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Использование ИИ в подготовке рукописи</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Журнал SSVproff поддерживает ответственное использование ИИ-инструментов авторами для улучшения 
                    качества рукописей. Однако, существуют четкие правила и ограничения.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Допустимо
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Редактирование текста</li>
                        <li>• Перевод</li>
                        <li>• Поиск литературы</li>
                        <li>• Форматирование</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Недопустимо
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Генерация данных</li>
                        <li>• Написание выводов</li>
                        <li>• Создание изображений</li>
                        <li>• Плагиат</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-900 font-semibold mb-2">⚠️ Обязательное раскрытие:</p>
                    <p className="text-sm text-amber-900">
                      Все случаи использования ИИ-инструментов должны быть указаны в разделе "Acknowledgments" с описанием 
                      конкретных инструментов и целей их применения.
                    </p>
                  </div>

                  <Link 
                    href="/ai-policy" 
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-[#1a73e8] to-[#34a853] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Shield className="w-5 h-5" />
                    Полная политика ИИ
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Ethical Requirements */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#34a853]" />
                Этические требования
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Комитет по этике</h4>
                  <p className="text-sm text-gray-700">
                    Все исследования с участием людей должны быть одобрены локальным этическим комитетом (IRB/IEC). 
                    Номер одобрения должен быть указан в разделе "Методы".
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Информированное согласие</h4>
                  <p className="text-sm text-gray-700">
                    Должно быть получено письменное информированное согласие от всех участников, включая согласие на 
                    публикацию изображений или личных данных.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Конфликт интересов</h4>
                  <p className="text-sm text-gray-700">
                    Все авторы должны раскрыть любые финансовые или личные отношения, которые могут влиять на 
                    объективность исследования.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Авторские права</h4>
                  <p className="text-sm text-gray-700">
                    Все перечисленные авторы должны соответствовать критериям ICMJE. Все авторы должны одобрить 
                    окончательную версию рукописи.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Submission */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#1a73e8] to-[#34a853] text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Send className="w-8 h-8" />
                Подача рукописи
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Для подачи рукописи отправьте письмо с вложениями на:
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                <p className="text-2xl font-bold">editor@ssvproff.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Необходимые документы:</h4>
                <ul className="space-y-2 text-white/90">
                  <li>• Рукопись в формате .docx или .pdf</li>
                  <li>• Сопроводительное письмо (cover letter)</li>
                  <li>• Рисунки и таблицы (отдельными файлами)</li>
                  <li>• Заявление об отсутствии конфликта интересов</li>
                  <li>• Одобрение этического комитета (если применимо)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Review Process */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Процесс рецензирования</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#1a73e8] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Предварительная оценка</h4>
                    <p className="text-sm text-gray-700">Редактор оценивает соответствие рукописи тематике журнала (3-5 дней)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#34a853] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Рецензирование</h4>
                    <p className="text-sm text-gray-700">Double-blind peer review двумя независимыми экспертами (2-4 недели)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ea4335] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Решение</h4>
                    <p className="text-sm text-gray-700">Принятие, принятие с доработкой или отклонение (1 неделя после получения рецензий)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Публикация</h4>
                    <p className="text-sm text-gray-700">Редакторская подготовка и публикация в следующем выпуске (2-4 недели)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Есть вопросы?</h3>
              <p className="text-gray-700 mb-6">
                Свяжитесь с редакцией для получения дополнительной информации
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a73e8] text-white rounded-lg font-semibold hover:bg-[#1557b0] transition-colors"
              >
                Контакты
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
