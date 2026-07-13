"use client"

import { motion } from "framer-motion"

const achievements = [
  {
    title: "14 Major Championships",
    icon: "🏆",
    description:
      "More than any player in history, including the legendary Grand Slam sweep of 2022-2023.",
    color: "from-yellow-500/20 to-orange-500/10",
  },
  {
    title: "31 MVP Medals",
    icon: "⭐",
    description:
      "Awarded for exceptional performance across every major tournament circuit.",
    color: "from-yellow-400/20 to-amber-500/10",
  },
  {
    title: "95% Pistol Round Win Rate",
    icon: "🎯",
    description:
      "Tournament organizers considered banning him from using pistols altogether.",
    color: "from-yellow-500/20 to-amber-400/10",
  },
  {
    title: "10,000+ Career Kills",
    icon: "💀",
    description:
      "A kill count that rivals small armies. Each one more stylish than the last.",
    color: "from-amber-500/20 to-red-500/10",
  },
  {
    title: "Invented Every Meta",
    icon: "🧠",
    description:
      "Every strategy you use? He thought of it first. Three years ago. In his sleep.",
    color: "from-yellow-500/20 to-purple-500/10",
  },
  {
    title: "Never Lost a Knife Round",
    icon: "🔪",
    description:
      "Opponents have been known to forfeit knife rounds just to avoid the embarrassment.",
    color: "from-yellow-600/20 to-orange-600/10",
  },
]

export default function CardsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-xl border border-esports-gold/20 bg-gradient-to-br ${ach.color} p-6 backdrop-blur-md transition-all duration-300 hover:border-esports-gold/40 hover:shadow-lg hover:shadow-esports-gold/10`}
          >
            <div className="absolute -right-4 -top-4 text-6xl opacity-5 transition-opacity duration-300 group-hover:opacity-10">
              {ach.icon}
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-esports-gold/10 text-2xl">
                {ach.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{ach.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{ach.description}</p>
            </div>
            <div className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-esports-gold to-yellow-300 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="glass inline-block rounded-2xl border-esports-gold/10 px-8 py-6">
          <p className="text-sm text-zinc-500">
            Inducted{" "}
            <span className="text-esports-gold font-semibold">Class of 2025</span>{" "}
            &middot; Unanimous Decision &middot; First Ballot
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-lg">
            <span>🏆</span>
            <span>⭐</span>
            <span>👑</span>
            <span>💎</span>
            <span>🏆</span>
            <span>⭐</span>
            <span>👑</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
