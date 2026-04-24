import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  HiOutlineBookOpen, HiOutlineShare, HiOutlineLightBulb,
  HiOutlineAcademicCap, HiOutlineMap, HiOutlinePresentationChartLine,
  HiOutlineArrowRight, HiOutlineDocumentText
} from 'react-icons/hi'
import Layout from '../components/layout/Layout'
import { api } from '../api/client'

const sections = [
  { label: 'Cheat Sheets', icon: HiOutlineBookOpen, to: '/cheat-sheets', color: 'from-indigo-500 to-indigo-600', desc: 'Quick-reference cards for HTTP, Git, Linux, MERN, Docker, REST, Python/FastAPI' },
  { label: 'Mind Maps', icon: HiOutlineShare, to: '/mind-maps', color: 'from-emerald-500 to-emerald-600', desc: 'Mermaid diagrams: web architecture, MERN stack, Git workflow' },
  { label: 'Feynman', icon: HiOutlineLightBulb, to: '/feynman', color: 'from-amber-500 to-amber-600', desc: 'Plain-language explanations using analogies and simple words' },
  { label: 'Flashcards', icon: HiOutlineAcademicCap, to: '/flashcards', color: 'from-rose-500 to-rose-600', desc: 'Anki-style interactive Q&A to test your knowledge' },
  { label: 'Slides', icon: HiOutlinePresentationChartLine, to: '/slides', color: 'from-cyan-500 to-cyan-600', desc: '50-slide Google Presentation on web engineering fundamentals' },
  { label: 'Roadmaps', icon: HiOutlineMap, to: '/roadmaps', color: 'from-purple-500 to-purple-600', desc: 'Visual learning roadmaps for MERN, Python, DevOps, Git and Linux' }
]

const stack = [
  { name: 'MERN', detail: 'MongoDB · Express · React · Node.js', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Python/FastAPI', detail: 'FastAPI · SQLAlchemy · PostgreSQL', color: 'text-amber-600 bg-amber-50' },
  { name: 'DevOps', detail: 'Git · Docker · CI/CD · Linux', color: 'text-indigo-600 bg-indigo-50' },
  { name: 'LAMP', detail: 'Linux · Apache · MySQL · PHP overview', color: 'text-rose-600 bg-rose-50' }
]

export default function Home () {
  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.articles.categories(),
    staleTime: 1000 * 60 * 5
  })

  const countMap = Object.fromEntries(
    (catData?.data || []).map(c => [c.category, c.count])
  )

  return (
    <Layout title="Dashboard" subtitle="Junior Software Engineer Training 2026">
      {/* Hero */}
      <div className="bg-zinc-900 rounded-6xl p-8 md:p-12 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Alfa Computers · 2026</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-4">
            Your Green Card<br />to a Tech Career
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl leading-relaxed mb-8">
            20 hours of hands-on workshops covering modern tech stacks, paradigms, best practices and patterns.
            Everything you need to land your first software engineering role.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/cheat-sheets" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-900/30 transition-all active:scale-95 flex items-center gap-2">
              <HiOutlineBookOpen className="w-4 h-4" />
              Start Learning
            </Link>
            <Link to="/roadmaps" className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-2">
              <HiOutlineMap className="w-4 h-4" />
              View Roadmaps
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Cheat Sheets', value: countMap['cheat-sheets'] || 0 },
          { label: 'Mind Maps', value: countMap['mind-maps'] || 0 },
          { label: 'Feynman Docs', value: countMap['feynman'] || 0 },
          { label: 'Total Articles', value: Object.values(countMap).reduce((a, b) => a + b, 0) }
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-zinc-100 rounded-4xl p-6 shadow-sm text-center">
            <p className="text-3xl font-black text-zinc-900">{stat.value}</p>
            <p className="text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content sections */}
      <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight mb-4">Learning Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
        {sections.map(({ label, icon: Icon, to, color, desc }) => (
          <Link key={to} to={to} className="group bg-white border border-zinc-100 rounded-5xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <div className={`w-11 h-11 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mb-4 shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-zinc-900 mb-1.5 flex items-center gap-2">
              {label}
              {countMap[to.slice(1)] !== undefined && (
                <span className="text-[10px] font-black text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-lg">{countMap[to.slice(1)]}</span>
              )}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            <div className="flex items-center gap-1 text-indigo-600 text-sm font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Open module <HiOutlineArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Tech Stacks */}
      <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight mb-4">Tech Stacks Covered</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stack.map(s => (
          <div key={s.name} className="bg-white border border-zinc-100 rounded-4xl p-5 shadow-sm">
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${s.color}`}>{s.name}</span>
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{s.detail}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
