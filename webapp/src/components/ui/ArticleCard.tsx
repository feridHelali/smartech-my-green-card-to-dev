import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineTag, HiOutlineDownload } from 'react-icons/hi'
import { Article } from '../../api/client'

interface ArticleCardProps {
  article: Article
  basePath: string
}

const typeColors: Record<string, string> = {
  'cheat-sheet': 'bg-indigo-50 text-indigo-600',
  'mind-map': 'bg-emerald-50 text-emerald-600',
  feynman: 'bg-amber-50 text-amber-600',
  flashcard: 'bg-rose-50 text-rose-600',
  slide: 'bg-cyan-50 text-cyan-600'
}

const typeLabels: Record<string, string> = {
  'cheat-sheet': 'Cheat Sheet',
  'mind-map': 'Mind Map',
  feynman: 'Feynman',
  flashcard: 'Flashcard',
  slide: 'Slide'
}

export default function ArticleCard ({ article, basePath }: ArticleCardProps) {
  const tags: string[] = JSON.parse(article.tags || '[]')
  const colorClass = typeColors[article.type] || 'bg-zinc-100 text-zinc-600'

  const downloadMd = (e: React.MouseEvent) => {
    e.preventDefault()
    const blob = new Blob([article.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${article.slug}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="group bg-white border border-zinc-100 rounded-5xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col">
      {/* Type badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${colorClass}`}>
          {typeLabels[article.type] || article.type}
        </span>
        <button
          onClick={downloadMd}
          title="Download as Markdown"
          className="w-8 h-8 rounded-xl border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-zinc-50 transition-all"
        >
          <HiOutlineDownload className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-extrabold text-zinc-900 text-base leading-snug mb-2">{article.title}</h3>

      {/* Description */}
      {article.description && (
        <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">{article.description}</p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 4).map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-lg">
              <HiOutlineTag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        to={`${basePath}/${article.slug}`}
        className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all mt-auto"
      >
        Read article
        <HiOutlineArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
