import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { HiOutlineArrowLeft, HiOutlineDownload, HiOutlineTag } from 'react-icons/hi'
import Layout from '../components/layout/Layout'
import MarkdownViewer from '../components/ui/MarkdownViewer'
import { api } from '../api/client'

interface ArticleDetailProps {
  category: string
  backPath: string
  backLabel: string
}

export default function ArticleDetail ({ category, backPath, backLabel }: ArticleDetailProps) {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => api.articles.get(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5
  })

  const article = data?.data
  const tags: string[] = JSON.parse(article?.tags || '[]')

  const downloadMd = () => {
    if (!article) return
    const blob = new Blob([article.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${article.slug}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout title={article?.title || '…'} subtitle={backLabel}>
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to={backPath}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        {article && (
          <button
            onClick={downloadMd}
            className="flex items-center gap-2 px-4 py-2.5 border border-zinc-200 rounded-2xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-all"
          >
            <HiOutlineDownload className="w-4 h-4" />
            Download .md
          </button>
        )}
      </div>

      {isLoading && (
        <div className="bg-white border border-zinc-100 rounded-5xl p-8 md:p-12 animate-pulse">
          <div className="w-48 h-6 bg-zinc-100 rounded mb-4" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-zinc-50 rounded w-full" />)}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-4xl p-8 text-center">
          <p className="text-rose-600 font-semibold">Article not found or backend unavailable.</p>
        </div>
      )}

      {article && (
        <div className="bg-white border border-zinc-100 rounded-5xl shadow-sm overflow-hidden">
          {/* Article header */}
          <div className="px-8 md:px-12 py-8 border-b border-zinc-100">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
                {article.type}
              </span>
              {tags.slice(0, 5).map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-lg">
                  <HiOutlineTag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter">{article.title}</h1>
            {article.description && <p className="text-zinc-400 mt-2">{article.description}</p>}
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-8">
            <MarkdownViewer content={article.content} />
          </div>
        </div>
      )}
    </Layout>
  )
}
