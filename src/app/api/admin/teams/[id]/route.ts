import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const team = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
        acronym: body.acronym,
        description: body.description,
        logoUrl: body.logoUrl || null,
        primaryColor: body.primaryColor || "#6366f1",
        secondaryColor: body.secondaryColor || "#06b6d4",
      },
    })
    return NextResponse.json(team)
  } catch (error) {
    console.error("Update team error:", error)
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.team.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete team error:", error)
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 })
  }
}
