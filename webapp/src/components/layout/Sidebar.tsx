import { NavLink } from 'react-router-dom'
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineShare,
  HiOutlineAcademicCap,
  HiOutlineMap,
  HiOutlinePresentationChartLine,
  HiOutlineLightBulb
} from 'react-icons/hi'
import logo from '../../assets/logo.svg'

const nav = [
  { to: '/', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/cheat-sheets', icon: HiOutlineBookOpen, label: 'Cheat Sheets' },
  { to: '/mind-maps', icon: HiOutlineShare, label: 'Mind Maps' },
  { to: '/feynman', icon: HiOutlineLightBulb, label: 'Feynman' },
  { to: '/flashcards', icon: HiOutlineAcademicCap, label: 'Flashcards' },
  { to: '/slides', icon: HiOutlinePresentationChartLine, label: 'Slides' },
  { to: '/roadmaps', icon: HiOutlineMap, label: 'Roadmaps' }
]

export default function Sidebar () {
  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-white/70 backdrop-blur-xl border-r border-zinc-200 flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-zinc-100">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <span className="text-white font-black text-sm">AC</span>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Alfa Computers</p>
          <p className="text-sm font-extrabold text-zinc-900 tracking-tight leading-none mt-0.5">MyGreenCardToJob</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 custom-scrollbar overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 translate-x-0.5'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom card */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Trainer</span>
          </div>
          <p className="font-extrabold text-sm">Ferid HELALI</p>
          <p className="text-indigo-200 text-xs mt-0.5">20h Workshop Series</p>
        </div>
      </div>
    </aside>
  )
}
