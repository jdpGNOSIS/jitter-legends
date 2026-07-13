import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency, cn, TIER_COLORS, TIER_BG_COLORS } from "@/lib/utils"

const TIERS = [
  { label: "All", value: "" },
  { label: "S-Tier", value: "S" },
  { label: "A-Tier", value: "A" },
  { label: "B-Tier", value: "B" },
] as const

interface PageProps {
  searchParams: Promise<{ tier?: string }>
}

export default async function TournamentsPage({ searchParams }: PageProps) {
  const { tier } = await searchParams
  const activeTier = tier && ["S", "A", "B"].includes(tier) ? tier : ""

  const tournaments = await prisma.tournament.findMany({
    where: activeTier ? { tier: activeTier } : {},
    include: {
      winner: true,
    },
    orderBy: { startDate: "desc" },
  })

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <h1 className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-7xl">
            TOURNAMENTS
          </h1>
          <p className="mt-4 text-zinc-400">
            Premier competitive events across the globe
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          {TIERS.map((t) => {
            const isActive = activeTier === t.value
            const href = t.value ? `?tier=${t.value}` : "/tournaments"
            return (
              <Link
                key={t.value}
                href={href}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "border-esports-accent/50 bg-esports-accent/10 text-esports-accent"
                    : "border-esports-border bg-esports-card/50 text-zinc-400 hover:border-esports-accent/30 hover:text-zinc-200"
                )}
              >
                {t.label}
              </Link>
            )
          })}
        </div>

        {tournaments.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-zinc-500">No tournaments found</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((t) => (
              <Link
                key={t.id}
                href={`/tournaments/${t.slug}`}
                className="group glass glass-hover animate-fade-in rounded-xl p-6 transition-all duration-300"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-esports-accent">
                    {t.name}
                  </h3>
                  <span
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-xs font-bold tracking-wider uppercase",
                      TIER_BG_COLORS[t.tier] || "border-esports-border bg-esports-card/50 text-zinc-400"
                    )}
                  >
                    <span className={TIER_COLORS[t.tier] || "text-zinc-400"}>
                      {t.tier}-Tier
                    </span>
                  </span>
                </div>

                <div className="mb-3 space-y-1.5 text-sm text-zinc-500">
                  <p>{t.location}</p>
                  <p>
                    {new Date(t.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    {" - "}
                    {new Date(t.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="font-mono text-esports-accent">
                    {formatCurrency(t.prizePool)}
                  </p>
                </div>

                {t.winner && (
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>🏆</span>
                    <span className="font-medium text-white">{t.winner.name}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
