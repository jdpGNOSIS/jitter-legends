"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import AnimatedCounter from "./AnimatedCounter"

interface StatCardProps {
  label: string
  value: number
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  color?: string
}

const trendIcons: Record<string, string> = {
  up: "↑",
  down: "↓",
  neutral: "→",
}

const trendColors: Record<string, string> = {
  up: "text-emerald-400",
  down: "text-red-400",
  neutral: "text-zinc-400",
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  color = "from-purple-500/20 to-cyan-500/10",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${color} p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
            {label}
          </p>
          <div className="text-2xl font-bold text-white">
            <AnimatedCounter value={value} />
          </div>
        </div>
        {icon && (
          <div className="text-2xl text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={`text-sm ${trendColors[trend]}`}
          >
            {trendIcons[trend]}
          </span>
          <span className="text-xs text-zinc-500">
            vs previous period
          </span>
        </div>
      )}
    </motion.div>
  )
}
