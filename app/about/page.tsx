import { Mail, Users, Target, BookOpen, Award, ExternalLink, FileText, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a73e8] to-[#34a853] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6" 
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            О журнале SSVproff
          </h1>
          <p className="text-xl text-white/95 leading-relaxed">
            Профессиональный хирургический журнал, посвященный анализу, исследованиям и интеграции AI в современной медицине
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-8 w-8 text-[#1a73e8]" />
            <h2 
              className="text-3xl font-bold text-[#202124]" 
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Наша миссия
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            SSVproff стремится быть вашим надежным навигатором в мировой хирургии, предоставляя глубокий анализ 
            научных исследований, критический разбор публикаций и практические рекомендации для клинической практики.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Мы верим в силу доказательной медицины и интеграции передовых технологий, включая искусственный интеллект, 
            для улучшения качества хирургической помощи.
          </p>
        </section>

        {/* Focus Areas */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-8 w-8 text-[#34a853]" />
            <h2 
              className="text-3xl font-bold text-[#202124]" 
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Тематические направления
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#e8f0fe] rounded-lg">
              <h3 className="font-bold text-lg text-[#1a73e8] mb-2">
                Наука и исследования
              </h3>
              <p className="text-gray-700">
                Анализ последних научных публикаций, методологии исследований и их практической значимости.
              </p>
            </div>
            <div className="p-4 bg-[#e6f4ea] rounded-lg">
              <h3 className="font-bold text-lg text-[#34a853] mb-2">
                Клиническая практика
              </h3>
              <p className="text-gray-700">
                Обновленные протоколы, клинические рекомендации и разбор сложных клинических случаев.
              </p>
            </div>
            <div className="p-4 bg-[#fce8e6] rounded-lg">
              <h3 className="font-bold text-lg text-[#ea4335] mb-2">
                Технологии и инновации
              </h3>
              <p className="text-gray-700">
                Роботизированная хирургия, искусственный интеллект, новые хирургические технологии.
              </p>
            </div>
            <div className="p-4 bg-[#fef7e0] rounded-lg">
              <h3 className="font-bold text-lg text-[#f9ab00] mb-2">
                Образование
              </h3>
              <p className="text-gray-700">
                Материалы для профессионального развития хирургов и обучения новым методикам.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Team */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-[#1a73e8]" />
            <h2 
              className="text-3xl font-bold text-[#202124]" 
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Редакционная коллегия
            </h2>
          </div>
          <div className="space-y-6">
            {/* Chief Editor Section */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-full p-3 shadow-md">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-2xl text-[#202124]">
                      Главный редактор
                    </h3>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-1">
                    Сушков Сергей Валентинович
                  </p>
                  <p className="text-gray-700 mb-3">
                    Доктор медицинских наук, профессор кафедры хирургии № 2, 
                    Харьковский национальный медицинский университет
                  </p>
                  
                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-white">
                      <FileText className="w-3 h-3 mr-1 text-blue-600" />
                      121 публикация
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <BookOpen className="w-3 h-3 mr-1 text-green-600" />
                      93+ цитирований
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Award className="w-3 h-3 mr-1 text-purple-600" />
                      h-индекс: 6
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <GraduationCap className="w-3 h-3 mr-1 text-orange-600" />
                      20+ к.м.н.
                    </Badge>
                  </div>
                  
                  {/* Expertise */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Ключевые направления:</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Неотложная хирургия</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Малоинвазивные технологии</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">ИИ в хирургии</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Трансляционные исследования</span>
                    </div>
                  </div>
                  
                  <Button asChild>
                    <Link href="/editor-profile">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Просмотреть полный профиль
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-[#34a853] pl-4">
              <h3 className="font-bold text-lg text-[#202124] mb-2">
                Редакционный совет
              </h3>
              <p className="text-gray-600">
                Журнал сотрудничает с ведущими специалистами из крупнейших медицинских центров Украины, Европы и США, 
                включая Национальный институт хирургии и трансплантологии им. А.А. Шалимова (Киев), 
                Клинику Шарите (Берлин), Johns Hopkins Hospital (Балтимор), 
                Mayo Clinic (Рочестер) и других профильных учреждений.
              </p>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section className="bg-gradient-to-br from-[#1a73e8]/5 to-[#34a853]/5 rounded-lg shadow-md p-8 border-2 border-[#1a73e8]/20">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-8 w-8 text-[#1a73e8]" />
            <h2 
              className="text-3xl font-bold text-[#202124]" 
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Интеграция ИИ-технологий
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            SSVproff - один из первых медицинских журналов, интегрировавший искусственный интеллект 
            для углубленного анализа публикаций. Наш AI-ассистент помогает:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#1a73e8] mr-2">✓</span>
              <span>Проводить детальный анализ клинических случаев</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#1a73e8] mr-2">✓</span>
              <span>Генерировать профессиональные ответы и комментарии</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#1a73e8] mr-2">✓</span>
              <span>Вести тематические дискуссии по материалам статей</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#1a73e8] mr-2">✓</span>
              <span>Помогать в интерпретации сложных научных данных</span>
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="h-8 w-8 text-[#1a73e8]" />
            <h2 
              className="text-3xl font-bold text-[#202124]" 
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Контакты
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              Мы всегда рады сотрудничеству и открыты для предложений.
            </p>
            <div className="bg-[#f8f9fa] p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:ssvnauka@gmail.com" className="text-[#1a73e8] hover:underline">
                  ssvnauka@gmail.com
                </a>
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Для авторов: если вы хотите опубликовать свое исследование или предложить материал для разбора, 
              пожалуйста, свяжитесь с нами по указанному адресу.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
