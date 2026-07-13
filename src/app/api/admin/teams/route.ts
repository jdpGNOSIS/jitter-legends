import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const teams = await prisma.team.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { players: true } } },
  })
  return NextResponse.json(teams)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const team = await prisma.team.create({
      data: {
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        name: body.name,
        acronym: body.acronym,
        description: body.description || "",
        logoUrl: body.logoUrl || null,
        primaryColor: body.primaryColor || "#6366f1",
        secondaryColor: body.secondaryColor || "#06b6d4",
      },
    })
    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    console.error("Create team error:", error)
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
  }
}
