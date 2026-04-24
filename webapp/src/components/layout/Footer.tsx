export default function Footer () {
  return (
    <footer className="border-t border-zinc-200 bg-white/50 backdrop-blur-sm px-8 py-5 mt-auto">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-[8px]">AC</span>
          </div>
          <span className="font-semibold text-zinc-500">Alfa Computers</span>
          <span>·</span>
          <span>Junior Software Engineer Training 2026</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <span>Trainer: Ferid HELALI</span>
          <span>·</span>
          <span>20h Workshop Series</span>
          <span>·</span>
          <span>MERN · Python · DevOps</span>
        </div>
      </div>
    </footer>
  )
}
