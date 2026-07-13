import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency, formatNumber } from "@/lib/utils"
import SectionTitle from "@/components/SectionTitle"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function TeamDetailPage({ params }: PageProps) {
  const { slug } = await params

  const team = await prisma.team.findUnique({
    where: { slug },
    include: {
      players: {
        include: { player: true },
        orderBy: { startDate: "desc" },
      },
      tournamentWins: true,
    },
  })

  if (!team) notFound()

  const matches = await prisma.match.findMany({
    where: {
      OR: [
        { team1Id: team.id },
        { team2Id: team.id },
      ],
    },
    include: {
      tournament: true,
      team1: true,
      team2: true,
    },
    orderBy: { date: "desc" },
    take: 10,
  })

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden px-4">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${team.primaryColor}22, ${team.secondaryColor}11)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-esports-dark" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl">
                  {team.name}
                </h1>
                {team.acronym && (
                  <span className="rounded-lg border border-esports-border bg-esports-card/50 px-3 py-1 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    {team.acronym}
                  </span>
                )}
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
                {team.description}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: team.primaryColor }}
                />
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: team.secondaryColor }}
                />
                <span className="text-sm text-zinc-500">
                  {formatNumber(team.players.length)} player{team.players.length !== 1 ? "s" : ""}
                </span>
                <span className="text-sm text-zinc-500">
                  {formatNumber(team.tournamentWins.length)} tournament win{team.tournamentWins.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roster */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle title="Roster" subtitle="The players representing the team" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.players.map((pt, i) => (
            <Link
              key={pt.id}
              href={`/player/${pt.player.slug}`}
              className="glass glass-hover animate-fade-in flex items-center gap-4 rounded-xl p-5 transition-all duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: team.primaryColor }}
              >
                {pt.player.ign.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{pt.player.ign}</p>
                <p className="text-xs text-zinc-500">{pt.role}</p>
                <p className="text-[10px] text-zinc-600">
                  Joined{" "}
                  {new Date(pt.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
          {team.players.length === 0 && (
            <p className="col-span-full text-zinc-500">No players on roster</p>
          )}
        </div>
      </section>

      {/* Recent Matches */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle title="Recent Matches" subtitle="Last 10 competitive outings" />

        {matches.length === 0 ? (
          <p className="text-zinc-500">No matches recorded</p>
        ) : (
          <div className="glass animate-fade-in overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">Tournament</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">Opponent</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">Score</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {matches.map((m) => {
                    const isTeam1 = m.team1Id === team.id
                    const teamScore = isTeam1 ? m.team1Score : m.team2Score
                    const oppScore = isTeam1 ? m.team2Score : m.team1Score
                    const opponent = isTeam1 ? m.team2 : m.team1
                    const won = m.winnerId === team.id
                    const lost = m.winnerId !== null && m.winnerId !== team.id

                    return (
                      <tr key={m.id} className="transition-colors hover:bg-white/5">
                        <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                          {new Date(m.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 text-zinc-300">{m.tournament.name}</td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/teams/${opponent.slug}`}
                            className="font-medium text-white transition-colors hover:text-esports-accent"
                          >
                            {opponent.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-zinc-300">
                          {teamScore} - {oppScore}
                        </td>
                        <td className="px-4 py-3">
                          {won ? (
                            <span className="text-xs font-semibold text-esports-green">W</span>
                          ) : lost ? (
                            <span className="text-xs font-semibold text-esports-red">L</span>
                          ) : (
                            <span className="text-xs font-semibold text-zinc-500">-</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Tournament Wins */}
      {team.tournamentWins.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle title="Tournament Wins" subtitle="Championships claimed" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.tournamentWins.map((t, i) => (
              <Link
                key={t.id}
                href={`/tournaments/${t.slug}`}
                className="glass glass-hover animate-fade-in rounded-xl p-5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <h3 className="font-bold text-white">{t.name}</h3>
                </div>
                <p className="text-xs text-zinc-500">
                  {new Date(t.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {" - "}
                  {new Date(t.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Prize Pool: {formatCurrency(t.prizePool)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
