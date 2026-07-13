import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        imageUrl: body.imageUrl || null,
        featured: body.featured === true,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      },
    })
    return NextResponse.json(article)
  } catch (error) {
    console.error("Update article error:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.newsArticle.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}
