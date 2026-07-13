import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatNumber, calculateKdRatio } from "@/lib/utils"
import DataTable from "@/components/DataTable"

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface PageProps {
  params: Promise<{ slug: string }>
}

interface PlayerStatRow extends Record<string, unknown> {
  player: string
  team: string
  kills: number
  deaths: number
  assists: number
  kd: number
  adr: number
  rating: number
  headshots: number
  clutches: number
}

export default async function MatchDetailPage({ params }: PageProps) {
  const { slug } = await params

  const match = await prisma.match.findUnique({
    where: { slug },
    include: {
      tournament: true,
      team1: true,
      team2: true,
      maps: true,
      playerStats: {
        include: {
          player: true,
          team: true,
        },
      },
    },
  })

  if (!match) notFound()

  const winner = match.winnerId
    ? match.winnerId === match.team1Id
      ? match.team1
      : match.team2
    : null

  const stats: PlayerStatRow[] = match.playerStats.map((ps) => ({
    player: ps.player.ign,
    team: ps.team.name,
    kills: ps.kills,
    deaths: ps.deaths,
    assists: ps.assists,
    kd: calculateKdRatio(ps.kills, ps.deaths),
    adr: Math.round(ps.adr * 10) / 10,
    rating: Math.round(ps.rating * 100) / 100,
    headshots: ps.headshots,
    clutches: ps.clutchesWon,
  }))

  const columns: Column<PlayerStatRow>[] = [
    { key: "player", label: "Player", sortable: false },
    { key: "team", label: "Team", sortable: false },
    { key: "kills", label: "Kills", sortable: true },
    { key: "deaths", label: "Deaths", sortable: true },
    { key: "assists", label: "Assists", sortable: true },
    {
      key: "kd",
      label: "K/D",
      sortable: true,
      render: (row) => (
        <span className={row.kd >= 1 ? "text-esports-green" : "text-esports-red"}>
          {row.kd.toFixed(2)}
        </span>
      ),
    },
    {
      key: "adr",
      label: "ADR",
      sortable: true,
      render: (row) => <span className="font-mono">{row.adr}</span>,
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (row) => (
        <span
          className={
            row.rating >= 1.3
              ? "text-esports-gold"
              : row.rating >= 1.0
                ? "text-esports-green"
                : "text-esports-red"
          }
        >
          {row.rating.toFixed(2)}
        </span>
      ),
    },
    { key: "headshots", label: "HS", sortable: true },
    { key: "clutches", label: "Clutches", sortable: true },
  ]

  return (
    <div className="relative">
      {/* Scoreboard */}
      <section className="relative overflow-hidden px-4 py-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: winner
              ? `linear-gradient(135deg, ${winner.primaryColor}, transparent)`
              : undefined,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-esports-dark" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="glass animate-fade-in rounded-2xl p-8 sm:p-12">
            {/* Match meta */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
              <span className="text-xs font-semibold tracking-wider text-esports-accent uppercase">
                {match.round}
              </span>
              <span className="text-zinc-600">|</span>
              <span>{match.tournament.name}</span>
              <span className="text-zinc-600">|</span>
              <span>
                {new Date(match.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="font-mono text-xs text-zinc-400">{match.format.toUpperCase()}</span>
            </div>

            {/* Teams vs */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Link
                href={`/teams/${match.team1.slug}`}
                className={`group text-center transition-all duration-300 ${
                  winner?.id === match.team1.id
                    ? "scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className="mx-auto mb-3 h-16 w-16 rounded-full opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: match.team1.primaryColor }}
                />
                <h3
                  className={`text-lg font-bold transition-colors group-hover:text-esports-accent ${
                    winner?.id === match.team1.id ? "text-esports-green" : "text-white"
                  }`}
                >
                  {match.team1.name}
                </h3>
                {winner?.id === match.team1.id && (
                  <span className="mt-1 inline-block rounded-full bg-esports-green/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-esports-green uppercase">
                    Winner
                  </span>
                )}
              </Link>

              <div className="flex items-center justify-center gap-4">
                <span
                  className={`stat-value text-5xl sm:text-6xl ${
                    winner?.id === match.team1.id ? "text-esports-green" : "text-zinc-400"
                  }`}
                >
                  {match.team1Score}
                </span>
                <span className="text-2xl font-bold text-zinc-600">VS</span>
                <span
                  className={`stat-value text-5xl sm:text-6xl ${
                    winner?.id === match.team2.id ? "text-esports-green" : "text-zinc-400"
                  }`}
                >
                  {match.team2Score}
                </span>
              </div>

              <Link
                href={`/teams/${match.team2.slug}`}
                className={`group text-center transition-all duration-300 ${
                  winner?.id === match.team2.id
                    ? "scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className="mx-auto mb-3 h-16 w-16 rounded-full opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: match.team2.primaryColor }}
                />
                <h3
                  className={`text-lg font-bold transition-colors group-hover:text-esports-accent ${
                    winner?.id === match.team2.id ? "text-esports-green" : "text-white"
                  }`}
                >
                  {match.team2.name}
                </h3>
                {winner?.id === match.team2.id && (
                  <span className="mt-1 inline-block rounded-full bg-esports-green/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-esports-green uppercase">
                    Winner
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maps */}
      {match.maps.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white">
            Maps
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {match.maps.map((map, i) => {
              const mapWinner =
                map.winnerId === match.team1Id
                  ? match.team1
                  : map.winnerId === match.team2Id
                    ? match.team2
                    : null
              return (
                <div
                  key={map.id}
                  className="glass animate-fade-in rounded-xl p-5"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-white">{map.mapName}</h3>
                    {mapWinner && (
                      <span className="text-[10px] font-semibold tracking-wider text-esports-green uppercase">
                        {mapWinner.name} win
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div
                      className={`text-center ${
                        map.team1Score > map.team2Score
                          ? "font-bold text-esports-green"
                          : "text-zinc-400"
                      }`}
                    >
                      <span className="stat-value text-3xl">{map.team1Score}</span>
                      <p className="mt-1 text-[10px] tracking-wider text-zinc-600 uppercase">
                        {match.team1.acronym}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-zinc-600">:</span>
                    <div
                      className={`text-center ${
                        map.team2Score > map.team1Score
                          ? "font-bold text-esports-green"
                          : "text-zinc-400"
                      }`}
                    >
                      <span className="stat-value text-3xl">{map.team2Score}</span>
                      <p className="mt-1 text-[10px] tracking-wider text-zinc-600 uppercase">
                        {match.team2.acronym}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Player Stats */}
      {stats.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white">
            Player Statistics
          </h2>
          <DataTable columns={columns} data={stats} />
        </section>
      )}
    </div>
  )
}
