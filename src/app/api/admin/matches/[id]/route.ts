import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const match = await prisma.match.update({
      where: { id },
      data: {
        tournamentId: body.tournamentId,
        team1Id: body.team1Id,
        team2Id: body.team2Id,
        team1Score: parseInt(body.team1Score) || 0,
        team2Score: parseInt(body.team2Score) || 0,
        date: new Date(body.date),
        round: body.round,
        status: body.status,
        winnerId: body.winnerId || null,
        format: body.format,
      },
    })
    return NextResponse.json(match)
  } catch (error) {
    console.error("Update match error:", error)
    return NextResponse.json({ error: "Failed to update match" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.match.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete match error:", error)
    return NextResponse.json({ error: "Failed to delete match" }, { status: 500 })
  }
}
