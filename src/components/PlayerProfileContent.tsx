"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import SectionTitle from "@/components/SectionTitle"
import PlayerRadar from "@/components/PlayerRadar"

interface TeamInfo {
  id: string
  name: string
  acronym: string
  slug: string
}

interface TeamHistoryEntry {
  id: string
  startDate: Date
  endDate: Date | null
  role: string
  team: TeamInfo
}

interface AchievementData {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
}

interface CareerEventData {
  id: string
  title: string
  description: string
  date: Date
  type: string
}

interface MatchStatData {
  id: string
  kills: number
  deaths: number
  assists: number
  rating: number
  match: {
    id: string
    slug: string
    date: Date
    team1Score: number
    team2Score: number
    tournament: { name: string; slug: string }
    team1: { name: string; acronym: string }
    team2: { name: string; acronym: string }
  }
  team: { acronym: string }
}

interface TournamentWinData {
  id: string
  name: string
  tier: string
  prizePool: number
  startDate: Date
}

interface PlayerProfileData {
  id: string
  slug: string
  name: string
  ign: string
  age: number
  country: string
  biography: string
  careerEarnings: number
  mvpCount: number
  tournamentWins: number
  kdRatio: number
  rating: number
  headshotPercentage: number
  mapsPlayed: number
  clutchesWon: number
  totalKills: number
  signatureWeapon: string
  imageUrl: string | null
  teamHistory: TeamHistoryEntry[]
  achievements: AchievementData[]
  careerEvents: CareerEventData[]
  matchStats: MatchStatData[]
  tournamentMvps: TournamentWinData[]
}

const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  BR: "🇧🇷",
  SE: "🇸🇪",
  DK: "🇩🇰",
  PL: "🇵🇱",
  RU: "🇷🇺",
  CN: "🇨🇳",
  KR: "🇰🇷",
  JP: "🇯🇵",
  AU: "🇦🇺",
  CA: "🇨🇦",
}

function getFlag(code: string): string {
  return countryFlags[code.toUpperCase()] ?? "🌍"
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export default function PlayerProfileContent({ player }: { player: PlayerProfileData }) {
  const totalMatches = player.matchStats.length
  const statsGrid = [
    { label: "K/D Ratio", value: player.kdRatio.toFixed(2) },
    { label: "Rating", value: player.rating.toFixed(2) },
    { label: "Headshot %", value: `${player.headshotPercentage}%` },
    { label: "Maps Played", value: player.mapsPlayed },
    { label: "Clutches Won", value: player.clutchesWon },
    { label: "Total Kills", value: player.totalKills },
  ]

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-24 pb-24">
      {/* Hero Card */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-10">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-esports-accent/5 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-esports-accent/20 to-esports-accent2/10 text-6xl sm:h-36 sm:w-36 sm:text-7xl">
              {getFlag(player.country)}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {player.name}
                </h1>
                <span className="rounded-full border border-esports-gold/30 bg-esports-gold/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-esports-gold uppercase">
                  S-Tier
                </span>
              </div>
              <p className="mb-4 text-lg font-medium text-esports-accent sm:text-xl">
                &ldquo;{player.ign}&rdquo;
              </p>
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-zinc-600">Age:</span>
                  <span className="font-medium text-white">{player.age}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-zinc-600">Country:</span>
                  <span className="font-medium text-white">
                    {getFlag(player.country)} {player.country}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-zinc-600">Earnings:</span>
                  <span className="font-medium text-esports-gold">
                    ${(player.careerEarnings / 1000000).toFixed(2)}M
                  </span>
                </span>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                {player.biography}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Stats Grid */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Career Statistics" subtitle="Core performance metrics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statsGrid.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-5 text-center transition-all duration-300 hover:border-esports-accent/20"
            >
              <div className="stat-value bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-2xl text-transparent sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Signature Weapon */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl border-esports-accent/10 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-esports-accent/20 to-esports-accent2/10 text-4xl">
              🔫
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-esports-accent uppercase">
                Signature Weapon
              </p>
              <h3 className="text-2xl font-black text-white">{player.signatureWeapon}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                The tool of destruction that defined a legacy. Unmatched precision and deadly accuracy.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Radar & Achievements */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Radar Chart */}
          <div>
            <SectionTitle title="Player Skills" subtitle="Ability breakdown" />
            <div className="glass rounded-xl p-4 sm:p-6">
              <PlayerRadar />
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs text-zinc-500">
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">97</span> Aim
                </div>
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">95</span> Reflexes
                </div>
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">88</span> Strategy
                </div>
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">85</span> Teamwork
                </div>
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">93</span> Consistency
                </div>
                <div className="rounded-lg bg-esports-card/50 px-2 py-1.5">
                  <span className="font-bold text-emerald-400">96</span> Clutch
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <SectionTitle title="Achievements" subtitle="Career milestones" />
            <div className="space-y-3">
              {player.achievements.length > 0 ? (
                player.achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="glass flex items-start gap-4 rounded-xl p-4 transition-all duration-200 hover:border-esports-accent/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-esports-accent/10 text-lg">
                      {ach.icon === "trophy" ? "🏆" : ach.icon === "star" ? "⭐" : "🎯"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{ach.name}</h4>
                      <p className="text-sm text-zinc-400">{ach.description}</p>
                      <p className="mt-1 text-[11px] text-zinc-600">
                        {new Date(ach.unlockedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass rounded-xl p-8 text-center">
                  <p className="text-sm text-zinc-500">No achievements recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team History Timeline */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Team History" subtitle="Organizations &amp; roles across the career" />
        {player.teamHistory.length > 0 ? (
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-esports-accent/40 via-esports-accent/20 to-transparent sm:left-8" />
            <div className="space-y-6">
              {player.teamHistory.map((entry, i) => (
                <div key={entry.id} className="relative flex items-start gap-5 sm:gap-6">
                  <div className="relative z-10 mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-esports-accent/20 bg-esports-card text-sm font-bold text-esports-accent sm:h-14 sm:w-14">
                    {i + 1}
                  </div>
                  <div className="glass flex-1 rounded-xl p-4 sm:p-5">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/teams/${entry.team.slug}`}
                        className="text-lg font-bold text-white hover:text-esports-accent"
                      >
                        {entry.team.name}
                      </Link>
                      <span className="rounded bg-esports-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-esports-accent uppercase">
                        {entry.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>
                        {new Date(entry.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>→</span>
                      <span>
                        {entry.endDate
                          ? new Date(entry.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "Present"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-sm text-zinc-500">No team history available.</p>
          </div>
        )}
      </motion.section>

      {/* Career Events */}
      {player.careerEvents.length > 0 && (
        <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Career Timeline" subtitle="Key moments and milestones" />
          <div className="space-y-4">
            {player.careerEvents.map((event) => (
              <div
                key={event.id}
                className="glass flex items-start gap-4 rounded-xl p-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-esports-accent/20 bg-esports-accent/5 text-sm">
                  {event.type === "milestone" ? "🎯" : event.type === "achievement" ? "🏆" : "📅"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <p className="text-sm text-zinc-400">{event.description}</p>
                  <p className="mt-1 text-xs text-zinc-600">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Recent Matches */}
      <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Recent Matches" subtitle="Latest performances" />
        {player.matchStats.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Tournament", "Match", "Result", "K", "D", "A", "Rating"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {player.matchStats.slice(0, 8).map((stat) => (
                    <tr
                      key={stat.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 text-zinc-300">
                        <Link
                          href={`/tournaments/${stat.match.tournament.slug}`}
                          className="hover:text-esports-accent"
                        >
                          {stat.match.tournament.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-zinc-300">
                          {stat.match.team1.acronym} vs {stat.match.team2.acronym}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-semibold">
                          <span
                            className={
                              stat.match.team1Score > stat.match.team2Score ? "text-emerald-400" : "text-red-400"
                            }
                          >
                            {stat.match.team1Score}
                          </span>
                          <span className="text-zinc-600"> : </span>
                          <span
                            className={
                              stat.match.team2Score > stat.match.team1Score ? "text-emerald-400" : "text-red-400"
                            }
                          >
                            {stat.match.team2Score}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-300">{stat.kills}</td>
                      <td className="px-4 py-3 font-mono text-zinc-300">{stat.deaths}</td>
                      <td className="px-4 py-3 font-mono text-zinc-300">{stat.assists}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono font-semibold ${
                            stat.rating >= 1.2
                              ? "text-emerald-400"
                              : stat.rating >= 1.0
                                ? "text-esports-gold"
                                : "text-red-400"
                          }`}
                        >
                          {stat.rating.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-sm text-zinc-500">No match data available.</p>
          </div>
        )}
      </motion.section>

      {/* Tournament MVP Wins */}
      {player.tournamentMvps.length > 0 && (
        <motion.section variants={fadeUp} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Tournament MVP Wins" subtitle="Dominating the biggest stages" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {player.tournamentMvps.map((t) => (
              <div
                key={t.id}
                className="glass rounded-xl p-5 transition-all duration-300 hover:border-esports-gold/20"
              >
                <span className="mb-2 inline-block rounded border border-esports-gold/20 bg-esports-gold/5 px-2 py-0.5 text-[10px] font-bold tracking-wider text-esports-gold uppercase">
                  {t.tier}-Tier
                </span>
                <h4 className="mb-1 font-semibold text-white">{t.name}</h4>
                <p className="text-xs text-zinc-500">
                  {new Date(t.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}
