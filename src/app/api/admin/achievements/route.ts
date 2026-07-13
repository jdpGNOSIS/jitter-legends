import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { unlockedAt: "desc" },
    include: {
      player: { select: { ign: true, name: true } },
    },
  })
  return NextResponse.json(achievements)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const achievement = await prisma.achievement.create({
      data: {
        playerId: body.playerId,
        name: body.name,
        description: body.description || "",
        icon: body.icon || "trophy",
        unlockedAt: body.unlockedAt ? new Date(body.unlockedAt) : new Date(),
      },
    })
    return NextResponse.json(achievement, { status: 201 })
  } catch (error) {
    console.error("Create achievement error:", error)
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 })
  }
}
