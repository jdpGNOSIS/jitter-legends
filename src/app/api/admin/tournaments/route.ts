import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { startDate: "desc" },
    include: {
      winner: { select: { name: true, acronym: true } },
      mvp: { select: { ign: true } },
      _count: { select: { matches: true } },
    },
  })
  return NextResponse.json(tournaments)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tournament = await prisma.tournament.create({
      data: {
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        name: body.name,
        description: body.description || "",
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        prizePool: parseFloat(body.prizePool) || 0,
        tier: body.tier || "A",
        status: body.status || "completed",
        winnerId: body.winnerId || null,
        mvpId: body.mvpId || null,
      },
    })
    return NextResponse.json(tournament, { status: 201 })
  } catch (error) {
    console.error("Create tournament error:", error)
    return NextResponse.json({ error: "Failed to create tournament" }, { status: 500 })
  }
}
