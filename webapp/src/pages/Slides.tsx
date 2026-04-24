import Layout from '../components/layout/Layout'
import { HiOutlinePresentationChartLine, HiOutlineExternalLink } from 'react-icons/hi'

const slideSections = [
  { no: '01–05', title: 'What Is the Web?', topics: ['Internet history', 'Static vs Dynamic sites', 'Web 2.0 & beyond'] },
  { no: '06–12', title: 'Network Engineering', topics: ['OSI model', 'TCP/IP stack', 'DNS resolution', 'TLS/HTTPS'] },
  { no: '13–18', title: 'OS Engineering', topics: ['Linux fundamentals', 'Process management', 'File system', 'Shell scripting'] },
  { no: '19–26', title: 'Application Engineering', topics: ['Frontend: HTML/CSS/JS', 'React component model', 'REST API design', 'JWT auth'] },
  { no: '27–33', title: 'Databases', topics: ['SQL vs NoSQL', 'MongoDB + Mongoose', 'PostgreSQL', 'ORMs & migrations'] },
  { no: '34–40', title: 'DevOps & Tooling', topics: ['Git workflow', 'Docker & containers', 'CI/CD pipelines', 'Cloud deployment'] },
  { no: '41–46', title: 'Best Practices', topics: ['SOLID principles', 'DRY & clean code', 'TDD basics', 'Code review culture'] },
  { no: '47–50', title: 'Career & Next Steps', topics: ['Portfolio building', 'Open source contribution', 'Interview prep', 'Continuous learning'] }
]

export default function Slides () {
  return (
    <Layout title="Slides" subtitle="50-slide presentation · Web engineering fundamentals">
      <div className="bg-amber-50 border border-amber-200 rounded-4xl p-5 mb-8 flex items-start gap-3">
        <HiOutlinePresentationChartLine className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-700">Google Slides presentation coming soon</p>
          <p className="text-xs text-amber-600 mt-1">
            The 50-slide Google Presentation is being prepared with Alfa Computers branding. Below is the content outline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {slideSections.map((section, i) => (
          <div key={i} className="bg-white border border-zinc-100 rounded-5xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                  Slides {section.no}
                </span>
              </div>
              <span className="text-3xl font-black text-zinc-100">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-extrabold text-zinc-900 mb-3">{section.title}</h3>
            <ul className="space-y-1.5">
              {section.topics.map(topic => (
                <li key={topic} className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}
