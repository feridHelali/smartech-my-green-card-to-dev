import Layout from '../components/layout/Layout'
import { HiOutlineMap } from 'react-icons/hi'

const roadmaps = [
  {
    name: 'Full-Stack JS (MERN)',
    color: 'from-indigo-500 to-indigo-600',
    steps: [
      { phase: 'Foundation', items: ['HTML & CSS', 'JavaScript ES6+', 'Git & CLI', 'HTTP/REST basics'] },
      { phase: 'Frontend', items: ['React 18 + Hooks', 'React Router v6', 'TanStack Query', 'Tailwind CSS'] },
      { phase: 'Backend', items: ['Node.js & Express', 'REST API design', 'JWT Authentication', 'Prisma ORM'] },
      { phase: 'Database', items: ['MongoDB / Mongoose', 'SQLite / Prisma', 'Data modelling', 'Migrations'] },
      { phase: 'DevOps', items: ['Docker & Compose', 'GitHub Actions CI', 'Render / Railway deploy', 'Environment management'] }
    ]
  },
  {
    name: 'Python / FastAPI',
    color: 'from-amber-500 to-amber-600',
    steps: [
      { phase: 'Python Core', items: ['Type hints', 'Async/await', 'Pydantic models', 'Virtual environments'] },
      { phase: 'FastAPI', items: ['Routes & schemas', 'Dependency injection', 'Background tasks', 'OpenAPI docs'] },
      { phase: 'Database', items: ['SQLAlchemy ORM', 'Alembic migrations', 'PostgreSQL', 'Async sessions'] },
      { phase: 'Auth & Security', items: ['JWT with jose', 'bcrypt passwords', 'OAuth2 scopes', 'CORS config'] }
    ]
  },
  {
    name: 'DevOps & Git',
    color: 'from-emerald-500 to-emerald-600',
    steps: [
      { phase: 'Version Control', items: ['Git fundamentals', 'Branch strategies', 'PR reviews', 'Conflict resolution'] },
      { phase: 'Linux', items: ['File system', 'Permissions', 'Process management', 'Networking tools'] },
      { phase: 'Containers', items: ['Docker basics', 'Dockerfile best practices', 'Docker Compose', 'Registry & pull'] },
      { phase: 'CI/CD', items: ['GitHub Actions', 'Render auto-deploy', 'Secrets management', 'Health checks'] }
    ]
  }
]

export default function Roadmaps () {
  return (
    <Layout title="Roadmaps" subtitle="Visual learning paths · 2026 curriculum">
      <div className="space-y-8">
        {roadmaps.map(roadmap => (
          <div key={roadmap.name} className="bg-white border border-zinc-100 rounded-5xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${roadmap.color} px-8 py-6`}>
              <div className="flex items-center gap-3">
                <HiOutlineMap className="w-6 h-6 text-white/80" />
                <h2 className="text-xl font-extrabold text-white tracking-tight">{roadmap.name}</h2>
              </div>
            </div>

            {/* Phases */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {roadmap.steps.map((step, i) => (
                  <div key={step.phase} className="relative">
                    {/* Connector */}
                    {i < roadmap.steps.length - 1 && (
                      <div className="hidden xl:block absolute top-5 left-full w-4 border-t-2 border-dashed border-zinc-200 z-10" />
                    )}
                    <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-zinc-900 text-white text-[10px] font-black rounded-lg flex items-center justify-center">{i + 1}</span>
                        <span className="text-xs font-extrabold text-zinc-700 uppercase tracking-wider">{step.phase}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {step.items.map(item => (
                          <li key={item} className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
