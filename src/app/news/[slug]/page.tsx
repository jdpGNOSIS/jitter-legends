import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  })

  if (!article) notFound()

  const related = await prisma.newsArticle.findMany({
    where: { id: { not: article.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  })

  const paragraphs = article.content.split("\n").filter(Boolean)

  return (
    <div className="relative">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          Back to News
        </Link>

        <article className="glass animate-fade-in rounded-2xl p-8 sm:p-12">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="text-esports-accent font-medium">{article.author}</span>
              <span>&middot;</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-zinc-300">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-bold text-zinc-300">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/news/${r.slug}`}
                  className="glass group animate-fade-in rounded-xl p-5 transition-all duration-300 hover:border-esports-accent/30"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <h3 className="mb-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-esports-accent">
                    {r.title}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-zinc-500 line-clamp-2">
                    {r.excerpt}
                  </p>
                  <span className="text-[10px] text-zinc-600">
                    {new Date(r.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  )
}
