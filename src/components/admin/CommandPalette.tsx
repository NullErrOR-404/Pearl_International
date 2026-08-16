"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, LayoutDashboard, Inbox, Package, Tags, Settings } from "lucide-react"

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ]

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(query.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/40 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative z-10">
        <div className="flex items-center px-4 py-3 border-b border-gray-100 gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent outline-none text-brand-navy font-medium placeholder-gray-400"
            placeholder="Search pages... (e.g., Products)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-500 font-mono transition-colors">
            ESC
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredLinks.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">No results found.</div>
          ) : (
            filteredLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(link.href)
                    setIsOpen(false)
                    setQuery("")
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-brand-gold/10 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-brand-gold transition-colors" />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-brand-navy">{link.name}</span>
                </button>
              )
            })
          )}
        </div>
      </div>
      <div className="absolute inset-0 z-0" onClick={() => setIsOpen(false)} />
    </div>
  )
}
