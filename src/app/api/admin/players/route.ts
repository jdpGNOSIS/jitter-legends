import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/utils"

export async function GET() {
  const players = await prisma.player.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teamHistory: {
        include: { team: true },
        orderBy: { startDate: "desc" },
        take: 1,
      },
    },
  })
  return NextResponse.json(players)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const slug = generateSlug(body.ign)

    const player = await prisma.player.create({
      data: {
        slug,
        name: body.name,
        ign: body.ign,
        age: parseInt(body.age),
        country: body.country,
        biography: body.biography || "",
        careerEarnings: parseFloat(body.careerEarnings) || 0,
        mvpCount: parseInt(body.mvpCount) || 0,
        tournamentWins: parseInt(body.tournamentWins) || 0,
        rating: parseFloat(body.rating) || 0,
        kdRatio: parseFloat(body.kdRatio) || 0,
        imageUrl: body.imageUrl || null,
      },
    })

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error("Create player error:", error)
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 })
  }
}
