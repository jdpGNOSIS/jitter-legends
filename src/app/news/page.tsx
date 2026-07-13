import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function NewsPage() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  })

  const featured = articles.find(a => a.featured)
  const rest = featured ? articles.filter(a => a.id !== featured.id) : articles

  return (
    <div className="relative">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-accent/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <h1 className="animate-gradient bg-gradient-to-r from-esports-accent via-esports-accent2 to-esports-purple bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-7xl">
            NEWS
          </h1>
          <p className="mt-4 text-zinc-400">
            Stories from the world of JITTER LEGENDS
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {featured && (
          <Link
            href={`/news/${featured.slug}`}
            className="group glass mb-12 flex animate-fade-in flex-col gap-6 rounded-2xl border-esports-accent/10 p-8 transition-all duration-300 hover:border-esports-accent/30 sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <span className="mb-3 inline-block rounded-full border border-esports-accent/30 bg-esports-accent/10 px-3 py-1 text-[10px] font-bold tracking-widest text-esports-accent uppercase">
                Featured Story
              </span>
              <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-esports-accent sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-600">
                <span>{featured.author}</span>
                <span>&middot;</span>
                <span>
                  {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <span className="hidden shrink-0 text-3xl text-zinc-600 transition-colors group-hover:text-esports-accent sm:block">
              →
            </span>
          </Link>
        )}

        {rest.length === 0 && !featured ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-zinc-500">No articles yet</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group glass animate-fade-in rounded-xl p-6 transition-all duration-300 hover:border-esports-accent/30"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-esports-accent" />
                  <span className="text-[11px] font-medium tracking-wider text-esports-accent uppercase">
                    News
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-esports-accent">
                  {article.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-esports-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read more
                    <span className="text-[10px]">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
