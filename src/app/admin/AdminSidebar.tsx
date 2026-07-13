"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "◈" },
  { href: "/admin/players", label: "Players", icon: "▣" },
  { href: "/admin/teams", label: "Teams", icon: "◆" },
  { href: "/admin/tournaments", label: "Tournaments", icon: "◉" },
  { href: "/admin/matches", label: "Matches", icon: "⚔" },
  { href: "/admin/news", label: "News", icon: "◈" },
  { href: "/admin/achievements", label: "Achievements", icon: "★" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
  }

  return (
    <aside
      className={`glass flex flex-col border-r border-zinc-800/50 transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex items-center justify-between border-b border-zinc-800/50 px-4 py-4">
        {!collapsed && (
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-sm font-bold text-transparent">
            ADMIN
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-purple-500/10 text-purple-400"
                  : "text-zinc-500 hover:bg-zinc-800/30 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-zinc-800/50 px-2 py-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="text-base">⏻</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
