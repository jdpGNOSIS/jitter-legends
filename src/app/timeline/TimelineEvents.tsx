"use client"

import { motion } from "framer-motion"

interface CareerEvent {
  id: string
  title: string
  description: string
  date: Date
  type: string
}

interface TimelineEventsProps {
  events: CareerEvent[]
}

const typeConfig: Record<string, { bg: string; border: string; text: string; label: string }> = {
  milestone: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    label: "Milestone",
  },
  achievement: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    label: "Achievement",
  },
  transfer: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    label: "Transfer",
  },
}

export default function TimelineEvents({ events }: TimelineEventsProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-esports-accent via-esports-accent2 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

      <div className="relative space-y-12">
        {events.map((event, i) => {
          const cfg = typeConfig[event.type] ?? typeConfig.milestone
          const isLeft = i % 2 === 0

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`relative flex items-start gap-6 sm:gap-8 ${
                isLeft ? "flex-row sm:flex-row" : "flex-row sm:flex-row-reverse"
              }`}
            >
              <div
                className={`flex-1 pl-10 sm:pl-0 ${
                  isLeft ? "sm:text-right" : "sm:text-left"
                }`}
              >
                <div
                  className={`glass inline-block w-full rounded-xl p-5 ${
                    isLeft ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  <div
                    className={`mb-2 flex flex-wrap items-center gap-2 ${
                      isLeft ? "sm:justify-end" : ""
                    }`}
                  >
                    <span
                      className={`rounded-full border px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase ${cfg.bg} ${cfg.border} ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="mb-1 text-xs text-zinc-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-base font-bold text-white">{event.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{event.description}</p>
                </div>
              </div>

              <div className="absolute left-[14px] z-10 flex shrink-0 items-center justify-center sm:static">
                <div
                  className={`h-3.5 w-3.5 rounded-full border-2 sm:h-4 sm:w-4 ${cfg.border} ${cfg.bg}`}
                />
              </div>

              <div className="hidden flex-1 sm:block" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
