import { useState } from 'react'
import { HiOutlineAcademicCap, HiOutlineRefresh, HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import Layout from '../components/layout/Layout'

const flashcards = [
  { q: 'What does HTTP stand for?', a: 'HyperText Transfer Protocol — the stateless application-layer protocol used for web communication.' },
  { q: 'What is the difference between HTTP and HTTPS?', a: 'HTTPS = HTTP + TLS. TLS encrypts the connection, verifies server identity via certificates, and prevents tampering.' },
  { q: 'What does "stateless" mean in REST?', a: 'Each HTTP request must contain all info needed to process it. The server stores no session state between requests.' },
  { q: 'What is a JWT?', a: 'JSON Web Token — compact, self-contained token with header.payload.signature. Signed with a secret key.' },
  { q: 'What is git commit?', a: 'Saves a snapshot of staged changes to the local repository history with a unique SHA hash.' },
  { q: 'What is Docker?', a: 'Platform for packaging applications and dependencies into containers — lightweight, portable, isolated runtime environments.' },
  { q: 'What is the difference between git fetch and git pull?', a: 'fetch downloads remote changes without applying them. pull = fetch + merge.' },
  { q: 'What is MongoDB?', a: 'A NoSQL document database that stores data as BSON (binary JSON) documents in collections.' },
  { q: 'What does useEffect do in React?', a: 'Runs side effects after render. The dependency array controls when it re-runs: [] = once, [x] = when x changes.' },
  { q: 'What is TanStack Query?', a: 'A data-fetching library for React that manages server state: caching, background refresh, loading/error states.' },
  { q: 'What is bcrypt?', a: 'A password hashing algorithm that applies a cost factor to deliberately slow down hashing, making brute-force attacks impractical.' },
  { q: 'What are the 5 HTTP methods?', a: 'GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).' }
]

export default function Flashcards () {
  const [deck, setDeck] = useState(() => [...flashcards].sort(() => Math.random() - 0.5))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [done, setDone] = useState(false)

  const card = deck[index]
  const total = deck.length

  const answer = (correct: boolean) => {
    setScore(s => ({ ...s, [correct ? 'correct' : 'wrong']: s[correct ? 'correct' : 'wrong'] + 1 }))
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setFlipped(false)
    }
  }

  const restart = () => {
    setDeck([...flashcards].sort(() => Math.random() - 0.5))
    setIndex(0)
    setFlipped(false)
    setScore({ correct: 0, wrong: 0 })
    setDone(false)
  }

  if (done) {
    const pct = Math.round((score.correct / total) * 100)
    return (
      <Layout title="Flashcards" subtitle="Self-assessment · Spaced repetition">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white border border-zinc-100 rounded-6xl p-12 text-center shadow-sm max-w-md w-full">
            <div className={`text-6xl font-black mb-2 ${pct >= 80 ? 'text-emerald-500' : pct >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>{pct}%</div>
            <p className="text-zinc-400 font-semibold mb-6">You got <strong className="text-zinc-900">{score.correct}/{total}</strong> correct</p>
            <button onClick={restart} className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
              <HiOutlineRefresh className="w-4 h-4" />
              Play again
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Flashcards" subtitle="Self-assessment · Spaced repetition">
      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-zinc-500">{index + 1}/{total}</span>
        <span className="text-sm text-emerald-600 font-bold">{score.correct}✓</span>
        <span className="text-sm text-rose-500 font-bold">{score.wrong}✗</span>
      </div>

      {/* Card */}
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-full max-w-2xl">
          <div
            onClick={() => setFlipped(f => !f)}
            className="bg-white border border-zinc-100 rounded-6xl p-10 md:p-14 shadow-sm hover:shadow-xl cursor-pointer transition-all min-h-[280px] flex flex-col justify-center select-none"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-6">
              {flipped ? 'Answer' : 'Question — click to reveal'}
            </p>
            <p className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
              {flipped ? card.a : card.q}
            </p>
          </div>

          {flipped && (
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => answer(false)}
                className="flex items-center gap-2 px-8 py-4 bg-rose-50 text-rose-600 rounded-3xl font-bold hover:bg-rose-100 transition-all active:scale-95"
              >
                <HiOutlineX className="w-5 h-5" />
                Missed it
              </button>
              <button
                onClick={() => answer(true)}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-50 text-emerald-600 rounded-3xl font-bold hover:bg-emerald-100 transition-all active:scale-95"
              >
                <HiOutlineCheck className="w-5 h-5" />
                Got it!
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
