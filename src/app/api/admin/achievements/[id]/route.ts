import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const achievement = await prisma.achievement.update({
      where: { id },
      data: {
        playerId: body.playerId,
        name: body.name,
        description: body.description,
        icon: body.icon,
        unlockedAt: body.unlockedAt ? new Date(body.unlockedAt) : undefined,
      },
    })
    return NextResponse.json(achievement)
  } catch (error) {
    console.error("Update achievement error:", error)
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.achievement.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete achievement error:", error)
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 })
  }
}
