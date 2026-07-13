import { prisma } from "@/lib/prisma"
import SearchClient from "./SearchClient"

export default async function SearchPage() {
  const [players, teams, tournaments, matches] = await Promise.all([
    prisma.player.findMany({
      select: { id: true, slug: true, name: true, ign: true, country: true },
      orderBy: { name: "asc" },
    }),
    prisma.team.findMany({
      select: { id: true, slug: true, name: true, acronym: true },
      orderBy: { name: "asc" },
    }),
    prisma.tournament.findMany({
      select: { id: true, slug: true, name: true, tier: true, location: true },
      orderBy: { startDate: "desc" },
    }),
    prisma.match.findMany({
      select: {
        id: true,
        slug: true,
        team1Score: true,
        team2Score: true,
        date: true,
        tournament: { select: { name: true } },
        team1: { select: { name: true, slug: true } },
        team2: { select: { name: true, slug: true } },
      },
      orderBy: { date: "desc" },
    }),
  ])

  return (
    <SearchClient
      players={players}
      teams={teams}
      tournaments={tournaments}
      matches={matches}
    />
  )
}
