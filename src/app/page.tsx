import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency, formatNumber } from "@/lib/utils"
import HeroSection from "@/components/HeroSection"
import SectionTitle from "@/components/SectionTitle"
import StatCard from "@/components/StatCard"

interface RankingEntry {
  year: number
  rank: number
}

const rankingHistory: RankingEntry[] = [
  { year: 2018, rank: 42 },
  { year: 2019, rank: 18 },
  { year: 2020, rank: 5 },
  { year: 2021, rank: 2 },
  { year: 2022, rank: 1 },
  { year: 2023, rank: 1 },
  { year: 2024, rank: 1 },
  { year: 2025, rank: 1 },
]

export default async function Home() {
  const [player, news, achievements] = await Promise.all([
    prisma.player.findFirst(),
    prisma.newsArticle.findMany({
      take: 3,
      orderBy: { publishedAt: "desc" },
      where: { featured: true },
    }),
    prisma.achievement.findMany({
      take: 6,
      orderBy: { unlockedAt: "desc" },
    }),
  ])

  const highestEarningsRank = rankingHistory.reduce((best, e) => (e.rank < best ? e.rank : best), Infinity)

  return (
    <div className="relative">
      <HeroSection playerName={player?.name} />

      {/* Career Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          title="Career Highlights"
          subtitle="Unmatched numbers that define a generation"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="MVP Awards"
            value={player?.mvpCount ?? 31}
            color="from-yellow-500/20 to-orange-500/10"
          />
          <StatCard
            label="Tournament Wins"
            value={player?.tournamentWins ?? 49}
            color="from-emerald-500/20 to-teal-500/10"
          />
          <StatCard
            label="Career Earnings"
            value={player?.careerEarnings != null ? Math.round(player.careerEarnings) : 4870000}
            color="from-blue-500/20 to-cyan-500/10"
          />
          <StatCard
            label="Rating"
            value={player?.rating != null ? Math.round(player.rating * 100) / 100 : 1.32}
            color="from-purple-500/20 to-pink-500/10"
          />
        </div>
      </section>

      {/* Ranking History */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          title="World Ranking History"
          subtitle="A meteoric rise to the #1 spot"
        />
        <div className="glass rounded-2xl p-6 sm:p-10">
          <div className="flex items-end justify-between gap-2 sm:gap-4">
            {rankingHistory.map((entry, i) => {
              const maxRank = rankingHistory.reduce((m, e) => Math.max(m, e.rank), 0)
              const minRank = 1
              const range = maxRank - minRank
              const heightPercent = range > 0 ? ((maxRank - entry.rank) / range) * 100 : 100

              return (
                <div key={entry.year} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-esports-accent sm:text-xs">
                    #{entry.rank}
                  </span>
                  <div className="relative w-full max-w-[48px]">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-esports-accent to-esports-accent2 transition-all duration-500"
                      style={{ height: `${Math.max(heightPercent, 8)}%`, minHeight: "24px" }}
                    />
                    {entry.rank === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs">
                        👑
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-medium text-zinc-500 sm:text-xs">
                      {entry.year}
                    </span>
                    {i === 0 && (
                      <span className="text-[8px] text-esports-muted">Earliest</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 rounded-lg bg-esports-card/50 px-4 py-3 text-center">
            <p className="text-sm text-zinc-400">
              Highest Rank: <span className="font-bold text-esports-gold">#1</span> &middot;
              Consecutive Years at #1: <span className="font-bold text-esports-gold">4</span>
            </p>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {news.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle
            title="Latest News"
            subtitle="Stay up to date with the JITTER LEGENDS universe"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((article, i) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group glass rounded-xl p-6 transition-all duration-300 hover:border-esports-accent/30 hover:shadow-lg hover:shadow-esports-accent/5"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-esports-accent" />
                  <span className="text-[11px] font-medium tracking-wider text-esports-accent uppercase">
                    News
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-esports-accent">
                  {article.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-esports-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read more
                    <span className="text-[10px]">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle
            title="Notable Achievements"
            subtitle="Milestones that shaped a legendary career"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach, i) => (
              <div
                key={ach.id}
                className="glass group flex items-start gap-4 rounded-xl p-5 transition-all duration-300 hover:border-esports-accent/20"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-esports-accent/10 text-lg">
                  {ach.icon === "trophy" ? "🏆" : ach.icon === "star" ? "⭐" : "🎯"}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{ach.name}</h4>
                  <p className="mt-0.5 text-sm text-zinc-400">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-2xl border-esports-accent/10 p-10 text-center sm:p-16">
          <div className="absolute inset-0 bg-gradient-to-r from-esports-accent/5 via-transparent to-esports-accent2/5" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Witness Greatness
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-zinc-400">
              Dive deep into the complete career of Jacob &ldquo;Jitter&rdquo; Powell &mdash; every match, every tournament, every moment of brilliance.
            </p>
            <Link
              href="/player/jitter"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-esports-accent to-esports-accent2 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-esports-accent/30"
            >
              Explore Full Profile
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
