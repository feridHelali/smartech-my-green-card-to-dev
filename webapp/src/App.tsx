import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import { CheatSheetList, CheatSheetDetail } from './pages/CheatSheets'
import { MindMapList, MindMapDetail } from './pages/MindMaps'
import { FeynmanList, FeynmanDetail } from './pages/Feynman'
import Flashcards from './pages/Flashcards'
import Slides from './pages/Slides'
import Roadmaps from './pages/Roadmaps'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } }
})

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cheat-sheets" element={<CheatSheetList />} />
          <Route path="/cheat-sheets/:slug" element={<CheatSheetDetail />} />
          <Route path="/mind-maps" element={<MindMapList />} />
          <Route path="/mind-maps/:slug" element={<MindMapDetail />} />
          <Route path="/feynman" element={<FeynmanList />} />
          <Route path="/feynman/:slug" element={<FeynmanDetail />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/slides" element={<Slides />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
