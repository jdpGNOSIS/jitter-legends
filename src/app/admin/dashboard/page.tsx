import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatNumber, formatCurrency } from "@/lib/utils"

async function getStats() {
  const [
    playerCount,
    teamCount,
    tournamentCount,
    matchCount,
    newsCount,
    achievementCount,
    totalPrizePool,
  ] = await Promise.all([
    prisma.player.count(),
    prisma.team.count(),
    prisma.tournament.count(),
    prisma.match.count(),
    prisma.newsArticle.count(),
    prisma.achievement.count(),
    prisma.tournament.aggregate({ _sum: { prizePool: true } }),
  ])

  return {
    players: playerCount,
    teams: teamCount,
    tournaments: tournamentCount,
    matches: matchCount,
    news: newsCount,
    achievements: achievementCount,
    totalPrizePool: totalPrizePool._sum.prizePool || 0,
  }
}

const links = [
  { href: "/admin/players", label: "Manage Players", color: "from-purple-600 to-purple-800" },
  { href: "/admin/teams", label: "Manage Teams", color: "from-cyan-600 to-cyan-800" },
  { href: "/admin/tournaments", label: "Manage Tournaments", color: "from-amber-600 to-amber-800" },
  { href: "/admin/matches", label: "Manage Matches", color: "from-rose-600 to-rose-800" },
  { href: "/admin/news", label: "Manage News", color: "from-emerald-600 to-emerald-800" },
  { href: "/admin/achievements", label: "Manage Achievements", color: "from-violet-600 to-violet-800" },
]

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const statCards = [
    { label: "Total Players", value: formatNumber(stats.players), color: "border-purple-500/30" },
    { label: "Total Teams", value: formatNumber(stats.teams), color: "border-cyan-500/30" },
    { label: "Tournaments", value: formatNumber(stats.tournaments), color: "border-amber-500/30" },
    { label: "Matches", value: formatNumber(stats.matches), color: "border-rose-500/30" },
    { label: "News Articles", value: formatNumber(stats.news), color: "border-emerald-500/30" },
    { label: "Achievements", value: formatNumber(stats.achievements), color: "border-violet-500/30" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome to the admin panel. Total prize pool across all tournaments: {formatCurrency(stats.totalPrizePool)}
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`glass rounded-2xl border-l-4 ${card.color} p-5`}
          >
            <p className="text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 font-mono text-3xl font-bold text-zinc-100">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-zinc-300">Quick Actions</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`glass-hover rounded-2xl bg-gradient-to-r ${link.color} p-4 text-center text-sm font-semibold text-white transition-all hover:scale-[1.02]`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
