import { prisma } from "@/lib/prisma"

const iconMap: Record<string, string> = {
  trophy: "🏆",
  star: "⭐",
  target: "🎯",
  medal: "🏅",
  crown: "👑",
  fire: "🔥",
  diamond: "💎",
}

interface TierConfig {
  border: string
  glow: string
  iconBg: string
  accent: string
  watermark: string
}

const tierConfig: Record<string, TierConfig> = {
  gold: {
    border: "border-yellow-500/30",
    glow: "shadow-yellow-500/10",
    iconBg: "bg-yellow-500/10",
    accent: "text-yellow-400",
    watermark: "👑",
  },
  silver: {
    border: "border-zinc-400/30",
    glow: "shadow-zinc-400/10",
    iconBg: "bg-zinc-400/10",
    accent: "text-zinc-300",
    watermark: "⭐",
  },
  bronze: {
    border: "border-amber-700/30",
    glow: "shadow-amber-700/10",
    iconBg: "bg-amber-700/10",
    accent: "text-amber-600",
    watermark: "🏅",
  },
}

function getTier(icon: string): "gold" | "silver" | "bronze" {
  if (["trophy", "crown", "diamond"].includes(icon)) return "gold"
  if (["star", "fire"].includes(icon)) return "silver"
  return "bronze"
}

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { unlockedAt: "desc" },
  })

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <h1 className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-7xl">
            ACHIEVEMENTS
          </h1>
          <p className="mt-4 text-zinc-400">
            A collection of milestones that define a legendary career
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {achievements.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-zinc-500">No achievements yet</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach, i) => {
              const tier = getTier(ach.icon)
              const { border, glow, iconBg, accent, watermark } = tierConfig[tier]
              return (
                <div
                  key={ach.id}
                  className={`glass group animate-fade-in relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${border} ${glow}`}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div
                    className={`absolute -right-6 -top-6 text-5xl opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                  >
                    {watermark}
                  </div>
                  <div
                    className={`relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconBg}`}
                  >
                    {iconMap[ach.icon] ?? "🏆"}
                  </div>
                  <h3 className={`relative z-10 mb-2 text-lg font-bold text-white ${accent}`}>
                    {ach.name}
                  </h3>
                  <p className="relative z-10 mb-4 text-sm leading-relaxed text-zinc-400">
                    {ach.description}
                  </p>
                  <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-zinc-600">
                    <span>📅</span>
                    <span>
                      {new Date(ach.unlockedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
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
