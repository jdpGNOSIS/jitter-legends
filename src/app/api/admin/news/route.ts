import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  })
  return NextResponse.json(articles)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const article = await prisma.newsArticle.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
        title: body.title,
        excerpt: body.excerpt || "",
        content: body.content || "",
        author: body.author || "JITTER LEGENDS Staff",
        imageUrl: body.imageUrl || null,
        featured: body.featured === true,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}
