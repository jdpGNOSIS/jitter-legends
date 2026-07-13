import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatNumber } from "@/lib/utils"

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    include: {
      _count: {
        select: { players: true },
      },
    },
    orderBy: { name: "asc" },
  })

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <h1 className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-7xl">
            TEAMS
          </h1>
          <p className="mt-4 text-zinc-400">
            The organizations that shape competitive excellence
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {teams.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-zinc-500">No teams found</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/teams/${team.slug}`}
                className="group glass glass-hover animate-fade-in relative overflow-hidden rounded-xl transition-all duration-300"
              >
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: team.primaryColor }}
                />
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-esports-accent">
                      {team.name}
                    </h3>
                    {team.acronym && (
                      <span className="rounded-md border border-esports-border bg-esports-card/50 px-2 py-0.5 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        {team.acronym}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                    {team.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="stat-value text-esports-accent">
                      {formatNumber(team._count.players)}
                    </span>
                    <span>player{team._count.players !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
