"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface PlayerResult {
  id: string
  slug: string
  name: string
  ign: string
  country: string
}

interface TeamResult {
  id: string
  slug: string
  name: string
  acronym: string
}

interface TournamentResult {
  id: string
  slug: string
  name: string
  tier: string
  location: string
}

interface MatchResult {
  id: string
  slug: string
  team1Score: number
  team2Score: number
  date: Date
  tournament: { name: string }
  team1: { name: string; slug: string }
  team2: { name: string; slug: string }
}

interface SearchClientProps {
  players: PlayerResult[]
  teams: TeamResult[]
  tournaments: TournamentResult[]
  matches: MatchResult[]
}

const tabs = ["All", "Players", "Teams", "Tournaments", "Matches"] as const

export default function SearchClient({ players, teams, tournaments, matches }: SearchClientProps) {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("All")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    const matchesSearch = (val: string) => val.toLowerCase().includes(q)

    const fp = !q
      ? players
      : players.filter(p => matchesSearch(p.name) || matchesSearch(p.ign) || matchesSearch(p.country))

    const ft = !q
      ? teams
      : teams.filter(t => matchesSearch(t.name) || matchesSearch(t.acronym))

    const ftr = !q
      ? tournaments
      : tournaments.filter(t => matchesSearch(t.name) || matchesSearch(t.location))

    const fm = !q
      ? matches
      : matches.filter(m =>
          matchesSearch(m.tournament.name) ||
          matchesSearch(m.team1.name) ||
          matchesSearch(m.team2.name)
        )

    switch (activeTab) {
      case "Players":
        return { players: fp, teams: [], tournaments: [], matches: [] }
      case "Teams":
        return { players: [], teams: ft, tournaments: [], matches: [] }
      case "Tournaments":
        return { players: [], teams: [], tournaments: ftr, matches: [] }
      case "Matches":
        return { players: [], teams: [], tournaments: [], matches: fm }
      default:
        return { players: fp, teams: ft, tournaments: ftr, matches: fm }
    }
  }, [query, activeTab, players, teams, tournaments, matches])

  const totalResults = filtered.players.length + filtered.teams.length + filtered.tournaments.length + filtered.matches.length

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 w-full max-w-2xl">
          <h1 className="mb-8 text-center text-5xl font-black tracking-tighter text-white sm:text-7xl">
            SEARCH
          </h1>
          <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3">
            <svg className="h-5 w-5 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search players, teams, tournaments, matches..."
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-zinc-500 transition-colors hover:text-zinc-300">
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === tab
                  ? "bg-esports-accent text-white shadow-lg shadow-esports-accent/20"
                  : "glass text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {totalResults === 0 && query ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-zinc-500">No results found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.players.length > 0 && (activeTab === "All" || activeTab === "Players") && (
              <div>
                {activeTab === "All" && (
                  <h2 className="mb-4 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    Players <span className="text-zinc-600">({filtered.players.length})</span>
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.players.map(p => (
                    <Link
                      key={p.id}
                      href={`/player/${p.slug}`}
                      className="glass glass-hover animate-fade-in group rounded-xl p-5 transition-all duration-300"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-esports-accent/10 text-lg">
                        🎮
                      </div>
                      <h3 className="font-bold text-white transition-colors group-hover:text-esports-accent">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {p.ign} &middot; {p.country}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.teams.length > 0 && (activeTab === "All" || activeTab === "Teams") && (
              <div>
                {activeTab === "All" && (
                  <h2 className="mb-4 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    Teams <span className="text-zinc-600">({filtered.teams.length})</span>
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.teams.map(t => (
                    <Link
                      key={t.id}
                      href={`/teams/${t.slug}`}
                      className="glass glass-hover animate-fade-in group rounded-xl p-5 transition-all duration-300"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-lg">
                        🏳️
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white transition-colors group-hover:text-emerald-400">
                          {t.name}
                        </h3>
                        {t.acronym && (
                          <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 uppercase">
                            {t.acronym}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.tournaments.length > 0 && (activeTab === "All" || activeTab === "Tournaments") && (
              <div>
                {activeTab === "All" && (
                  <h2 className="mb-4 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    Tournaments <span className="text-zinc-600">({filtered.tournaments.length})</span>
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.tournaments.map(t => (
                    <Link
                      key={t.id}
                      href={`/tournaments/${t.slug}`}
                      className="glass glass-hover animate-fade-in group rounded-xl p-5 transition-all duration-300"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-lg">
                        🏆
                      </div>
                      <h3 className="font-bold text-white transition-colors group-hover:text-orange-400">
                        {t.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                        <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] font-bold">
                          {t.tier}
                        </span>
                        <span>{t.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.matches.length > 0 && (activeTab === "All" || activeTab === "Matches") && (
              <div>
                {activeTab === "All" && (
                  <h2 className="mb-4 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    Matches <span className="text-zinc-600">({filtered.matches.length})</span>
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.matches.map(m => (
                    <Link
                      key={m.id}
                      href={`/matches/${m.slug}`}
                      className="glass glass-hover animate-fade-in group rounded-xl p-5 transition-all duration-300"
                    >
                      <p className="mb-2 text-xs text-zinc-500">{m.tournament.name}</p>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white transition-colors group-hover:text-esports-accent">
                          {m.team1.name}
                        </span>
                        <span className="stat-value text-base text-white">
                          {m.team1Score} : {m.team2Score}
                        </span>
                        <span className="text-sm font-semibold text-white transition-colors group-hover:text-esports-accent">
                          {m.team2.name}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600">
                        {new Date(m.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
