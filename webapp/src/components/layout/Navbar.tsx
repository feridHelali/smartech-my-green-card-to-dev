import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineBell, HiOutlineUser } from 'react-icons/hi'
import { useQuery } from '@tanstack/react-query'
import Fuse from 'fuse.js'
import { api, Article } from '../../api/client'

interface NavbarProps {
  title: string
  subtitle?: string
}

export default function Navbar ({ title, subtitle }: NavbarProps) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['articles'],
    queryFn: () => api.articles.list(),
    staleTime: 1000 * 60 * 5
  })

  const fuse = data?.data
    ? new Fuse(data.data, { keys: ['title', 'description', 'tags'], threshold: 0.35 })
    : null

  const results = q.trim() && fuse ? fuse.search(q).slice(0, 6) : []

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  const pick = (article: Article) => {
    navigate(`/${article.category}/${article.slug}`)
    setOpen(false)
    setQ('')
  }

  const categoryLabel: Record<string, string> = {
    'cheat-sheets': 'Cheat Sheet',
    'mind-maps': 'Mind Map',
    feynman: 'Feynman',
    flashcards: 'Flashcard'
  }

  return (
    <header className="sticky top-0 z-20 glass border-b border-zinc-200 px-8 py-4 flex items-center justify-between gap-4">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tighter">{title}</h1>
        {subtitle && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder="Search docs…"
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {open && results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden z-50">
            {results.map(({ item }) => (
              <button
                key={item.slug}
                onClick={() => pick(item)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 text-left transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  {categoryLabel[item.category] || item.category}
                </span>
                <span className="text-sm font-semibold text-zinc-800 truncate">{item.title}</span>
              </button>
            ))}
          </div>
        )}

        {open && q.trim() && results.length === 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-3xl shadow-xl px-4 py-3 text-sm text-zinc-400 z-50">
            No results for "{q}"
          </div>
        )}

        {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
          <HiOutlineBell className="w-5 h-5 text-zinc-500" />
        </button>
        <button className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
          <HiOutlineUser className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  )
}
