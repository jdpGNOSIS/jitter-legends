import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const tournament = await prisma.tournament.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        prizePool: parseFloat(body.prizePool) || 0,
        tier: body.tier,
        status: body.status,
        winnerId: body.winnerId || null,
        mvpId: body.mvpId || null,
      },
    })
    return NextResponse.json(tournament)
  } catch (error) {
    console.error("Update tournament error:", error)
    return NextResponse.json({ error: "Failed to update tournament" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.tournament.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete tournament error:", error)
    return NextResponse.json({ error: "Failed to delete tournament" }, { status: 500 })
  }
}
