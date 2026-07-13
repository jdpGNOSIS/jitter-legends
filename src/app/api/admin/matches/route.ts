import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: { date: "desc" },
    include: {
      tournament: { select: { name: true } },
      team1: { select: { name: true, acronym: true } },
      team2: { select: { name: true, acronym: true } },
      _count: { select: { maps: true } },
    },
  })
  return NextResponse.json(matches)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const match = await prisma.match.create({
      data: {
        slug: body.slug || `match-${Date.now()}`,
        tournamentId: body.tournamentId,
        team1Id: body.team1Id,
        team2Id: body.team2Id,
        team1Score: parseInt(body.team1Score) || 0,
        team2Score: parseInt(body.team2Score) || 0,
        date: new Date(body.date),
        round: body.round || "Group Stage",
        status: body.status || "completed",
        winnerId: body.winnerId || null,
        format: body.format || "bo3",
      },
    })
    return NextResponse.json(match, { status: 201 })
  } catch (error) {
    console.error("Create match error:", error)
    return NextResponse.json({ error: "Failed to create match" }, { status: 500 })
  }
}
