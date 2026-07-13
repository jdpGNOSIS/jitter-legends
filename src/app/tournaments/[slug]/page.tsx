import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency, cn, TIER_COLORS, TIER_BG_COLORS } from "@/lib/utils"
import SectionTitle from "@/components/SectionTitle"

interface PageProps {
  params: Promise<{ slug: string }>
}

const ROUND_ORDER = ["Group Stage", "Quarter Final", "Semi Final", "Grand Final"]

export default async function TournamentDetailPage({ params }: PageProps) {
  const { slug } = await params

  const tournament = await prisma.tournament.findUnique({
    where: { slug },
    include: {
      winner: true,
      mvp: true,
      matches: {
        include: {
          team1: true,
          team2: true,
        },
        orderBy: { date: "asc" },
      },
    },
  })

  if (!tournament) notFound()

  const groupedMatches: Record<string, typeof tournament.matches> = {}
  for (const match of tournament.matches) {
    if (!groupedMatches[match.round]) {
      groupedMatches[match.round] = []
    }
    groupedMatches[match.round].push(match)
  }

  const sortedRounds = Object.keys(groupedMatches).sort(
    (a, b) => ROUND_ORDER.indexOf(a) - ROUND_ORDER.indexOf(b)
  )

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="animate-fade-in max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                className={cn(
                  "rounded-md border px-3 py-1 text-sm font-bold tracking-wider uppercase",
                  TIER_BG_COLORS[tournament.tier] || "border-esports-border bg-esports-card/50"
                )}
              >
                <span className={TIER_COLORS[tournament.tier] || "text-zinc-400"}>
                  {tournament.tier}-Tier
                </span>
              </span>
              <span className="text-sm text-zinc-500">{tournament.location}</span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl">
              {tournament.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <span>
                {new Date(tournament.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(tournament.endDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="stat-value text-lg text-esports-gold">
                {formatCurrency(tournament.prizePool)}
              </span>
            </div>

            {tournament.description && (
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                {tournament.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Winner & MVP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {tournament.winner && (
            <div className="glass animate-fade-in rounded-xl p-6">
              <p className="mb-2 text-xs font-semibold tracking-wider text-esports-gold uppercase">
                Champion
              </p>
              <Link
                href={`/teams/${tournament.winner.slug}`}
                className="group flex items-center gap-3"
              >
                <div
                  className="h-12 w-12 rounded-full"
                  style={{ backgroundColor: tournament.winner.primaryColor }}
                />
                <span className="text-xl font-bold text-white transition-colors group-hover:text-esports-accent">
                  {tournament.winner.name}
                </span>
              </Link>
            </div>
          )}

          {tournament.mvp && (
            <div className="glass animate-fade-in rounded-xl p-6">
              <p className="mb-2 text-xs font-semibold tracking-wider text-esports-purple uppercase">
                MVP
              </p>
              <Link
                href={`/player/${tournament.mvp.slug}`}
                className="group flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-esports-purple/20 text-lg font-bold text-esports-purple">
                  {tournament.mvp.ign.charAt(0)}
                </div>
                <div>
                  <span className="text-xl font-bold text-white transition-colors group-hover:text-esports-accent">
                    {tournament.mvp.ign}
                  </span>
                  <p className="text-xs text-zinc-500">{tournament.mvp.name}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Matches by Round */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle title="Matches" subtitle="Every clash on the road to glory" />

        {sortedRounds.length === 0 ? (
          <p className="text-zinc-500">No matches scheduled</p>
        ) : (
          <div className="space-y-12">
            {sortedRounds.map((round) => {
              const matches = groupedMatches[round]
              const isGrandFinal = round === "Grand Final"

              return (
                <div
                  key={round}
                  className={cn(isGrandFinal ? "animate-pulse-glow rounded-2xl p-0.5" : "")}
                  style={
                    isGrandFinal
                      ? {
                          background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(99,102,241,0.3))",
                        }
                      : undefined
                  }
                >
                  <div className={cn("rounded-2xl bg-esports-dark p-6 sm:p-8", isGrandFinal ? "h-full" : "")}>
                    <h3
                      className={cn(
                        "mb-6 text-lg font-bold tracking-wider uppercase",
                        isGrandFinal ? "text-esports-gold" : "text-zinc-400"
                      )}
                    >
                      {round}
                    </h3>

                    <div className="grid gap-4">
                      {matches.map((match, i) => {
                        const mWinner =
                          match.winnerId === match.team1Id
                            ? match.team1
                            : match.winnerId === match.team2Id
                              ? match.team2
                              : null

                        return (
                          <Link
                            key={match.id}
                            href={`/matches/${match.slug}`}
                            className="glass glass-hover animate-fade-in flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between"
                            style={{ animationDelay: `${i * 0.05}s` }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-right sm:w-32">
                                <p
                                  className={`text-sm font-bold ${
                                    mWinner?.id === match.team1.id
                                      ? "text-esports-green"
                                      : "text-zinc-300"
                                  }`}
                                >
                                  {match.team1.name}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`stat-value text-xl ${
                                    mWinner?.id === match.team1.id
                                      ? "text-esports-green"
                                      : "text-zinc-500"
                                  }`}
                                >
                                  {match.team1Score}
                                </span>
                                <span className="text-xs text-zinc-600">VS</span>
                                <span
                                  className={`stat-value text-xl ${
                                    mWinner?.id === match.team2.id
                                      ? "text-esports-green"
                                      : "text-zinc-500"
                                  }`}
                                >
                                  {match.team2Score}
                                </span>
                              </div>

                              <div className="sm:w-32">
                                <p
                                  className={`text-sm font-bold ${
                                    mWinner?.id === match.team2.id
                                      ? "text-esports-green"
                                      : "text-zinc-300"
                                  }`}
                                >
                                  {match.team2.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                              <span className="font-mono">{match.format.toUpperCase()}</span>
                              <span>|</span>
                              <span>
                                {new Date(match.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
