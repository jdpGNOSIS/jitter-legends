"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function HeroSection({ playerName }: { playerName?: string }) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={scaleIn} className="mb-6">
          <span className="inline-block rounded-full border border-esports-gold/30 bg-esports-gold/10 px-4 py-1.5 text-xs font-bold tracking-widest text-esports-gold uppercase">
            The GOAT
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter text-transparent"
        >
          JITTER
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-lg font-medium tracking-wide text-zinc-400 sm:text-2xl"
        >
          {playerName ?? "Jacob Daniel Powell"}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-500"
        >
          The undisputed champion of competitive esports. A legacy built on precision, dominance, and an unwavering will to win.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex gap-4">
          <Link
            href="/player/jitter"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-esports-accent to-esports-accent2 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-esports-accent/30"
          >
            <span className="relative z-10">View Full Profile</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Achievements
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { label: "MVP Awards", value: "31" },
            { label: "Tournament Wins", value: "49" },
            { label: "World Records", value: "12" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-value text-3xl text-white sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs tracking-wider text-zinc-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-esports-dark to-transparent" />
    </section>
  )
}
