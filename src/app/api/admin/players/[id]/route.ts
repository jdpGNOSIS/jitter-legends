import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const player = await prisma.player.update({
      where: { id },
      data: {
        name: body.name,
        ign: body.ign,
        age: parseInt(body.age),
        country: body.country,
        biography: body.biography,
        careerEarnings: parseFloat(body.careerEarnings) || 0,
        mvpCount: parseInt(body.mvpCount) || 0,
        tournamentWins: parseInt(body.tournamentWins) || 0,
        rating: parseFloat(body.rating) || 0,
        kdRatio: parseFloat(body.kdRatio) || 0,
        imageUrl: body.imageUrl || null,
      },
    })
    return NextResponse.json(player)
  } catch (error) {
    console.error("Update player error:", error)
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.player.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete player error:", error)
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 })
  }
}
