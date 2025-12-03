'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Users, 
  FileText, 
  GraduationCap,
  Microscope,
  Brain,
  Activity,
  Sparkles,
  ExternalLink,
  Mail,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const editorProfile = {
  name: 'Сушков Сергей Валентинович',
  title: 'Главный редактор SSVproff',
  position: 'Доктор медицинских наук, профессор',
  photo: '/editor-photo.jpg', // placeholder
  institution: 'Харьковский национальный медицинский университет',
  department: 'Кафедра хирургии № 2',
  email: 'editor@ssvproff.com',
  
  bio: `Доктор медицинских наук, профессор кафедры хирургии № 2 Харьковского национального медицинского университета. Ведущий эксперт в области неотложной хирургии, миниинвазивных технологий и применения искусственного интеллекта в медицине. Автор более 120 научных работ, включая монографии, учебники и статьи в ведущих международных журналах.`,
  
  metrics: {
    publications: 121,
    citations: 93,
    hIndex: 6,
    students: 20,
    patents: 18
  },
  
  expertise: [
    'Неотложная хирургия и политравма',
    'Малоинвазивная и эндоскопическая хирургия',
    'Искусственный интеллект в хирургии',
    'Инновационные технологии (озонотерапия, криохирургия)',
    'Хирургическая гепатология и портальная гипертензия',
    'Онкохирургия',
    'Трансляционные исследования',
    'Иммунология хирургических заболеваний'
  ],
  
  keyPublications: [
    {
      title: 'Интервенционная радиология в онкохирургии',
      type: 'Монография',
      year: 2021,
      pages: 680,
      description: 'Фундаментальный труд о применении рентгенхирургических методов в лечении онкологических заболеваний'
    },
    {
      title: 'Causes and Diagnosis of Autoimmune Diseases',
      type: 'Монография',
      year: 2023,
      publisher: 'InTech, London',
      doi: 'http://dx.doi.org/10.5772/intechopen.1002972',
      description: 'Международная публикация о патогенезе аутоиммунных заболеваний'
    },
    {
      title: 'Политравма. Руководство для врачей (4 тома)',
      type: 'Руководство',
      year: 2009,
      description: 'Комплексное руководство по диагностике и лечению политравмы'
    },
    {
      title: 'Хирургия. Учебник для студентов медицинских вузов',
      type: 'Учебник',
      year: 2012,
      pages: 440,
      description: 'Базовый учебник по хирургии для студентов'
    },
    {
      title: 'Влияние озонотерапии на некоторые параметры иммунитета у больных при распространенном перитоните',
      type: 'Статья',
      year: 2012,
      journal: 'Клиническая хирургия, № 7',
      description: 'Исследование эффективности озонотерапии при сепсисе'
    },
    {
      title: 'Сравнительная оценка эффективности иммунокорригирующей сочетанной трехуровневой цитокино- и озонотерапии',
      type: 'Статья',
      year: 2013,
      journal: 'Клиническая хирургия, № 5',
      description: 'Инновационный подход к лечению распространенного перитонита'
    }
  ],
  
  patents: [
    'Способ лечения больных с циррозом печени и профилактики его осложнений (№ 37688 U)',
    'Способ дифференциальной диагностики синдрома гепатоспленомегалии (№ 145027)',
    'Способ выбора тактики лечения распространенного перитонита (№ 78026)'
  ],
  
  achievements: [
    'Подготовлено более 20 кандидатов медицинских наук',
    'H-индекс: 6 (по данным Google Scholar)',
    '93+ цитирований научных работ',
    '18 патентов на изобретения и полезные модели',
    'Автор 6 монографий и учебников',
    'Член редакционной коллегии ведущих хирургических журналов'
  ]
};

export default function EditorProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Photo */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0 bg-white">
                <div className="w-full h-full flex items-center justify-center text-blue-600">
                  <Users className="w-32 h-32" />
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {editorProfile.name}
                </h1>
                <p className="text-xl md:text-2xl mb-4 opacity-90">
                  {editorProfile.position}
                </p>
                <p className="text-lg mb-2 opacity-80">
                  {editorProfile.title}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Building2 className="w-3 h-3 mr-1" />
                    {editorProfile.institution}
                  </Badge>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <Button variant="secondary" size="sm" asChild>
                    <a href={`mailto:${editorProfile.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Связаться
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Metrics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-600">{editorProfile.metrics.publications}</div>
                  <div className="text-sm text-gray-600 mt-1">Публикаций</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-3xl font-bold text-green-600">{editorProfile.metrics.citations}+</div>
                  <div className="text-sm text-gray-600 mt-1">Цитирований</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-600">{editorProfile.metrics.hIndex}</div>
                  <div className="text-sm text-gray-600 mt-1">h-индекс</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-3xl font-bold text-orange-600">{editorProfile.metrics.students}+</div>
                  <div className="text-sm text-gray-600 mt-1">Подготовлено к.м.н.</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <div className="text-3xl font-bold text-red-600">{editorProfile.metrics.patents}</div>
                  <div className="text-sm text-gray-600 mt-1">Патентов</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Biography */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Биография
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {editorProfile.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expertise */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Ключевые направления исследований
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {editorProfile.expertise.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                      <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Publications */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Избранные публикации
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {editorProfile.keyPublications.map((pub, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="mb-6" />}
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {pub.title}
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="secondary">{pub.type}</Badge>
                              <Badge variant="outline">{pub.year}</Badge>
                              {pub.pages && (
                                <Badge variant="outline">{pub.pages} с.</Badge>
                              )}
                            </div>
                            {pub.journal && (
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Журнал:</span> {pub.journal}
                              </p>
                            )}
                            {pub.publisher && (
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Издательство:</span> {pub.publisher}
                              </p>
                            )}
                            <p className="text-sm text-gray-700 mb-2">
                              {pub.description}
                            </p>
                            {pub.doi && (
                              <a 
                                href={pub.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                DOI: {pub.doi}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Patents */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Патенты и изобретения (избранные)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {editorProfile.patents.map((patent, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-yellow-400 rounded-full p-1 mt-0.5 flex-shrink-0">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{patent}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-blue-600" />
                  Достижения и признание
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  {editorProfile.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-green-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center py-8"
          >
            <h3 className="text-2xl font-bold mb-4">Заинтересованы в сотрудничестве?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              SSVproff открыт для сотрудничества с исследователями, клиницистами и учеными. 
              Приглашаем к публикации статей, обзору исследований и участию в научных дискуссиях.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/archive">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Просмотреть публикации
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`mailto:${editorProfile.email}`}>
                  <Mail className="w-5 h-5 mr-2" />
                  Связаться с редакцией
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
