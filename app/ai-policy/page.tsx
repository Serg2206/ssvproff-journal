import { Metadata } from 'next'
import Link from 'next/link'
import { Bot, Shield, AlertTriangle, CheckCircle2, Users, FileText, Brain, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Политика использования ИИ | SSVproff',
  description: 'Политика использования искусственного интеллекта в журнале SSVproff',
}

export default function AIPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a73e8] to-[#34a853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Scale className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Политика использования искусственного интеллекта</h1>
            <p className="text-xl text-white/90 mb-4">
              Прозрачность, подотчетность и этика в научных публикациях
            </p>
            <p className="text-sm text-white/80">
              Версия 1.0 | Дата вступления в силу: 3 декабря 2025 г.
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
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-[#1a73e8]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Введение</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Журнал <strong>SSVproff</strong> признает трансформационный потенциал искусственного интеллекта (ИИ) 
                    в научных публикациях и стремится использовать его для повышения эффективности, качества и доступности 
                    научной информации в области хирургии и медицины.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Настоящая политика устанавливает четкие принципы и правила использования ИИ-инструментов всеми 
                    участниками редакционного процесса, обеспечивая прозрачность, научную добросовестность и соблюдение 
                    этических стандартов.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Principles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#34a853]" />
              Основные принципы
            </h2>
            <div className="grid gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                  1. Прозрачность
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Все случаи использования ИИ-инструментов в процессе подготовки, рецензирования и редактирования 
                  рукописей должны быть раскрыты и задокументированы.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                  2. Подотчетность
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Авторы несут полную ответственность за содержание своих рукописей, включая любые материалы, 
                  созданные или модифицированные с помощью ИИ. Редакция несет ответственность за окончательные 
                  редакционные решения.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                  3. Сохранение человеческого суждения
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  ИИ является вспомогательным инструментом. Критическая оценка, интерпретация данных и принятие 
                  окончательных решений остаются исключительной прерогативой человека.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                  4. Научная добросовестность
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Использование ИИ не должно нарушать принципы академической честности, точности данных и 
                  воспроизводимости результатов.
                </p>
              </div>
            </div>
          </section>

          {/* For Authors */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#1a73e8]" />
              Правила для авторов
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">✅ Допустимое использование</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-1" />
                  <span><strong>Редактирование текста:</strong> Улучшение грамматики, стиля и читабельности научного текста</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-1" />
                  <span><strong>Перевод:</strong> Перевод текста между языками (с обязательной проверкой и корректировкой человеком)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-1" />
                  <span><strong>Организация материала:</strong> Помощь в структурировании разделов и улучшении логики изложения</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-1" />
                  <span><strong>Поиск литературы:</strong> Использование ИИ для поиска релевантных публикаций и источников</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853] flex-shrink-0 mt-1" />
                  <span><strong>Форматирование:</strong> Автоматизация форматирования библиографии, таблиц и рисунков</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-8 mb-6">
              <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                ❌ Недопустимое использование
              </h3>
              <ul className="space-y-3 text-red-900">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span><strong>Генерация или фальсификация данных:</strong> Создание экспериментальных данных, результатов исследований или клинических наблюдений</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span><strong>Написание ключевых научных выводов:</strong> Генерация разделов "Результаты", "Обсуждение" или "Заключение" без существенной авторской переработки</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span><strong>Создание изображений:</strong> Генерация медицинских изображений, графиков или визуализаций данных без четкого указания на их искусственное происхождение</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span><strong>Плагиат:</strong> Использование ИИ для перефразирования чужих работ без надлежащего цитирования</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span><strong>Указание ИИ в качестве соавтора:</strong> ИИ-инструменты не могут быть указаны как авторы публикации</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1a73e8]" />
                Обязательное раскрытие информации
              </h3>
              <p className="text-gray-700 mb-4">
                При подаче рукописи авторы обязаны указать:
              </p>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li className="list-disc">Какие ИИ-инструменты были использованы (название, версия)</li>
                <li className="list-disc">Для каких целей применялся ИИ (редактирование, перевод, поиск литературы и т.д.)</li>
                <li className="list-disc">Степень использования ИИ в подготовке рукописи</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 italic">
                Эта информация может быть включена в раздел "Acknowledgments" или "Funding" рукописи.
              </p>
            </div>
          </section>

          {/* For Reviewers */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Brain className="w-8 h-8 text-[#34a853]" />
              Правила для рецензентов
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">✅ Допустимое использование</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="list-disc">Помощь в анализе методологии и статистики</li>
                  <li className="list-disc">Поиск релевантной литературы для сравнения</li>
                  <li className="list-disc">Улучшение формулировок в рецензии</li>
                  <li className="list-disc">Перевод и языковая помощь</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  ❌ Недопустимое использование
                </h3>
                <ul className="space-y-2 text-red-900 ml-6">
                  <li className="list-disc"><strong>Загрузка конфиденциальных данных:</strong> Запрещается загружать полные тексты рецензируемых рукописей в публичные ИИ-системы</li>
                  <li className="list-disc"><strong>Делегирование критического анализа:</strong> Окончательная оценка качества и новизны работы должна выполняться человеком</li>
                  <li className="list-disc"><strong>Генерация рецензий ИИ:</strong> Рецензия должна отражать профессиональное мнение рецензента, а не быть автоматически сгенерированной</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">⚠️ Важно</h3>
                <p className="text-gray-700">
                  Рецензенты должны сообщать редакции, если они подозревают недопустимое использование ИИ 
                  в рецензируемой рукописи (например, фальсификацию данных или плагиат).
                </p>
              </div>
            </div>
          </section>

          {/* For Editorial Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Bot className="w-8 h-8 text-[#1a73e8]" />
              Использование ИИ редакцией
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <p className="text-lg text-gray-700 mb-6">
                Редакция журнала <strong>SSVproff</strong> использует специализированные ИИ-инструменты для повышения 
                эффективности редакционного процесса:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🤖 "Редактор статьи SSVproff"</h4>
                  <p className="text-gray-700 text-sm">
                    Анализ научной ясности, структуры (IMRAD), языка и выявление слабых мест в методологии.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🧭 "Навигатор по мировой хирургии"</h4>
                  <p className="text-gray-700 text-sm">
                    Краткий обзор последних публикаций в топ-журналах, выделение ключевых выводов и клинических изменений.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📊 "Методолог и биостатистик"</h4>
                  <p className="text-gray-700 text-sm">
                    Анализ дизайна исследования, выборки, статистики и выявление потенциальных методологических ошибок.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Ключевые принципы редакционного использования ИИ:</h4>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="list-disc">ИИ используется как вспомогательный инструмент, не заменяющий редакционное суждение</li>
                  <li className="list-disc">Окончательные решения о принятии/отклонении рукописей принимаются редакторами-людьми</li>
                  <li className="list-disc">Все использование ИИ документируется и подлежит регулярному аудиту</li>
                  <li className="list-disc">Редакция периодически обновляет промты и проверяет качество выводов ИИ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detection and Enforcement */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              Выявление нарушений и санкции
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <p className="text-gray-700 mb-6">
                Редакция оставляет за собой право использовать специализированные инструменты для выявления 
                недопустимого использования ИИ, включая:
              </p>
              
              <ul className="space-y-2 text-gray-700 ml-6 mb-8">
                <li className="list-disc">Детекторы текстов, сгенерированных ИИ</li>
                <li className="list-disc">Проверку подлинности данных и изображений</li>
                <li className="list-disc">Анализ на плагиат и самоплагиат</li>
              </ul>

              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <h4 className="font-bold text-red-900 mb-3">Санкции за нарушения:</h4>
                <ul className="space-y-2 text-red-900 ml-6">
                  <li className="list-disc"><strong>Отклонение рукописи</strong> при выявлении недопустимого использования ИИ</li>
                  <li className="list-disc"><strong>Отзыв публикации (retraction)</strong> если нарушение обнаружено после публикации</li>
                  <li className="list-disc"><strong>Временный или постоянный запрет</strong> на подачу рукописей авторами-нарушителями</li>
                  <li className="list-disc"><strong>Уведомление академических учреждений</strong> о серьезных нарушениях</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact and Updates */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#1a73e8] to-[#34a853] text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Вопросы и обновления политики</h2>
              <p className="text-white/90 mb-6">
                Если у вас есть вопросы относительно применения данной политики или вы хотите сообщить о 
                подозрении на нарушение, пожалуйста, свяжитесь с редакцией.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1a73e8] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Контакты редакции
                </Link>
                <Link 
                  href="/for-authors" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Информация для авторов
                </Link>
              </div>
              <p className="text-sm text-white/70 mt-6">
                Редакция оставляет за собой право периодически обновлять данную политику в соответствии с 
                развитием технологий ИИ и изменениями в международных стандартах научных публикаций.
              </p>
            </div>
          </section>

          {/* References */}
          <section className="mb-16">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Международные стандарты и рекомендации</h3>
              <p className="text-sm text-gray-600 mb-4">
                Данная политика разработана с учетом рекомендаций ведущих научных организаций:
              </p>
              <ul className="text-sm text-gray-700 space-y-2 ml-6">
                <li className="list-disc">International Committee of Medical Journal Editors (ICMJE)</li>
                <li className="list-disc">Committee on Publication Ethics (COPE)</li>
                <li className="list-disc">World Association of Medical Editors (WAME)</li>
                <li className="list-disc">European Association of Science Editors (EASE)</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
