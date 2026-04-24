import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function Layout ({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-72">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 md:p-10 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
