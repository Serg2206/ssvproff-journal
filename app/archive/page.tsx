'use client'

import { useState, useMemo } from 'react'
import { filterArticles, getAllTags } from '@/lib/articles-data'
import ArticleCard from '@/components/article-card'
import { Filter, Search, SortAsc, X, Loader2, Tag } from 'lucide-react'
import { getTagColor } from '@/lib/tag-colors'
import { motion, AnimatePresence } from 'framer-motion'

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'citations'>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const allTags = getAllTags()
  
  const filteredArticles = useMemo(() => {
    setIsSearching(true)
    const timer = setTimeout(() => setIsSearching(false), 300)
    const results = filterArticles({ searchQuery, selectedTags, sortBy })
    return results
  }, [searchQuery, selectedTags, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      if (prev?.includes(tag)) {
        return prev?.filter(t => t !== tag) ?? []
      } else {
        return [...(prev ?? []), tag]
      }
    })
  }

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#202124] mb-4" 
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Архив публикаций
          </h1>
          <p className="text-lg text-gray-600">
            Просмотрите все статьи журнала SSVproff
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию, авторам или содержанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value ?? '')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                showFilters || selectedTags?.length > 0
                  ? 'bg-[#1a73e8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span>Фильтры</span>
              {selectedTags?.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white text-[#1a73e8] rounded-full text-xs font-bold">
                  {selectedTags?.length ?? 0}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Chips */}
          {(selectedTags?.length > 0 || searchQuery) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200"
            >
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Активные фильтры:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  <Search className="h-3.5 w-3.5" />
                  Поиск: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedTags?.map((tag) => {
                const colors = getTagColor(tag)
                return (
                  <span 
                    key={tag}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full ${colors.bg} ${colors.text}`}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                    <button 
                      onClick={() => toggleTag(tag)}
                      className="ml-1 hover:opacity-70 rounded-full p-0.5 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )
              })}
              <button
                onClick={() => {
                  setSelectedTags([])
                  setSearchQuery('')
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Очистить все
              </button>
            </motion.div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-2">
                  Категории
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags?.map((tag) => {
                    const colors = getTagColor(tag ?? '')
                    const isSelected = selectedTags?.includes(tag)
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                          isSelected
                            ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-current`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Tag className="h-3.5 w-3.5" />
                        {tag ?? ''}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-2">
                  <SortAsc className="inline h-4 w-4 mr-1" />
                  Сортировка
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSortBy('date')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === 'date'
                        ? 'bg-[#1a73e8] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    По дате
                  </button>
                  <button
                    onClick={() => setSortBy('views')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === 'views'
                        ? 'bg-[#1a73e8] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    По просмотрам
                  </button>
                  <button
                    onClick={() => setSortBy('citations')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === 'citations'
                        ? 'bg-[#1a73e8] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    По цитированиям
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTags?.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTags([])
                    setSearchQuery('')
                  }}
                  className="text-sm text-[#1a73e8] hover:text-[#1557b0] font-medium"
                >
                  Очистить все фильтры
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 flex items-center gap-2">
            Найдено статей: <span className="font-semibold text-[#202124]">{filteredArticles?.length ?? 0}</span>
            {isSearching && <Loader2 className="h-4 w-4 animate-spin text-[#1a73e8]" />}
          </p>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-[#1a73e8] mb-4" />
                <span className="text-gray-600">Поиск статей...</span>
              </div>
            </motion.div>
          ) : filteredArticles?.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles?.map((article) => (
                <ArticleCard key={article?.id} article={article} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow-md p-12 text-center"
            >
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                Статьи не найдены
              </p>
              <p className="text-sm text-gray-500">
                Попробуйте изменить параметры поиска или очистить фильтры
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
