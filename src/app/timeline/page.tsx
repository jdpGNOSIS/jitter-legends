import { prisma } from "@/lib/prisma"
import TimelineEvents from "./TimelineEvents"

export default async function TimelinePage() {
  const events = await prisma.careerEvent.findMany({
    orderBy: { date: "asc" },
  })

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <h1 className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-7xl">
            CAREER TIMELINE
          </h1>
          <p className="mt-4 text-zinc-400">
            The journey of a legend, moment by moment
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <TimelineEvents events={events} />
      </section>
    </div>
  )
}
