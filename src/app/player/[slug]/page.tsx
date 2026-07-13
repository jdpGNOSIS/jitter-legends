import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PlayerProfileContent from "@/components/PlayerProfileContent"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PlayerPage({ params }: PageProps) {
  const { slug } = await params

  const player = await prisma.player.findUnique({
    where: { slug },
    include: {
      teamHistory: {
        include: { team: true },
        orderBy: { startDate: "desc" },
      },
      achievements: {
        orderBy: { unlockedAt: "desc" },
      },
      careerEvents: {
        orderBy: { date: "desc" },
      },
      matchStats: {
        include: {
          match: {
            include: {
              tournament: true,
              team1: true,
              team2: true,
            },
          },
          team: true,
        },
        orderBy: { match: { date: "desc" } },
        take: 10,
      },
      tournamentMvps: {
        include: { winner: true },
        orderBy: { startDate: "desc" },
      },
    },
  })

  if (!player) {
    notFound()
  }

  return <PlayerProfileContent player={player} />
}
