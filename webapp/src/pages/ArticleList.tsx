import { useQuery } from '@tanstack/react-query'
import { HiOutlineSearch } from 'react-icons/hi'
import { useState } from 'react'
import { IconType } from 'react-icons'
import Layout from '../components/layout/Layout'
import ArticleCard from '../components/ui/ArticleCard'
import { api } from '../api/client'

interface ArticleListProps {
  category: string
  title: string
  subtitle: string
  icon: IconType
  type: string
  emptyText?: string
}

export default function ArticleList ({ category, title, subtitle, icon: Icon, type, emptyText }: ArticleListProps) {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', category],
    queryFn: () => api.articles.list({ category }),
    staleTime: 1000 * 60 * 5
  })

  const articles = (data?.data || []).filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) || (a.description || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout title={title} subtitle={subtitle}>
      {/* Header bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}…`}
            className="w-full pl-9 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl px-4 py-3 text-sm font-bold text-zinc-600">
          {articles.length} <span className="text-zinc-400 font-medium">docs</span>
        </div>
      </div>

      {/* Grid */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-zinc-100 rounded-5xl p-6 animate-pulse">
              <div className="w-16 h-5 bg-zinc-100 rounded-lg mb-4" />
              <div className="w-3/4 h-5 bg-zinc-100 rounded mb-2" />
              <div className="w-full h-4 bg-zinc-50 rounded mb-1" />
              <div className="w-2/3 h-4 bg-zinc-50 rounded" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-4xl p-8 text-center">
          <p className="text-rose-600 font-semibold">Failed to load articles. Is the backend running?</p>
          <p className="text-rose-400 text-sm mt-1">Make sure <code className="bg-rose-100 px-1 rounded">npm run dev</code> is running in /backend</p>
        </div>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <div className="bg-zinc-50 border border-zinc-100 rounded-4xl p-12 text-center">
          <p className="text-zinc-500 font-semibold">{emptyText || 'No articles found.'}</p>
          <p className="text-zinc-400 text-sm mt-1">Run <code className="bg-zinc-100 px-1 rounded">npm run db:seed</code> in /backend to populate content.</p>
        </div>
      )}

      {!isLoading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} basePath={`/${category}`} />
          ))}
        </div>
      )}
    </Layout>
  )
}
