"use client"

import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, LogOut, LayoutDashboard, Package, Settings, Tags, Inbox, FileText, Menu, X } from "lucide-react"
import { CommandPalette } from "@/components/admin/CommandPalette"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:block">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-brand-navy text-white flex flex-col shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-gold" />
            <span className="font-serif font-bold tracking-widest text-lg">ADMIN</span>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <LayoutDashboard className="w-5 h-5 text-brand-gold" /> Dashboard
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <Inbox className="w-5 h-5 text-brand-gold" /> Inquiries
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <FileText className="w-5 h-5 text-brand-gold" /> Articles
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <Package className="w-5 h-5 text-brand-gold" /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <Tags className="w-5 h-5 text-brand-gold" /> Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider">
            <Settings className="w-5 h-5 text-brand-gold" /> Site Settings
          </Link>
          <Link href="/admin/mfa" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold tracking-wider text-green-400">
            <ShieldCheck className="w-5 h-5 text-green-400" /> MFA Security
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/20 text-red-400 transition-colors text-sm font-semibold tracking-wider">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen md:pl-64 w-full">
        <header className="shrink-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-500 hover:text-brand-navy p-1"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <h1 className="font-sans font-bold text-gray-800 tracking-wider text-sm md:text-base">Pearl International Admin</h1>
              <span className="text-xs text-gray-500 font-mono mt-1 hidden lg:block">Press <kbd className="bg-gray-100 px-1 py-0.5 rounded border border-gray-200">Ctrl/Cmd + K</kbd> for Quick Actions</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">Secure Session</span>
          </div>
        </header>
        <div className="flex-1 p-6 lg:p-10">
          {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  )
}
