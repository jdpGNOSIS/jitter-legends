"use client"

import { useState, useEffect, FormEvent } from "react"

interface Article {
  id: string
  title: string
  excerpt: string
  author: string
  featured: boolean
  publishedAt: string
  slug: string
}

const defaultForm = {
  title: "",
  excerpt: "",
  content: "",
  author: "JITTER LEGENDS Staff",
  imageUrl: "",
  featured: false,
  publishedAt: "",
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/news")
      setArticles(await res.json())
    } catch {
      setError("Failed to load articles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  function openCreate() {
    setForm(defaultForm)
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(a: Article) {
    setForm({
      title: a.title,
      excerpt: a.excerpt,
      content: "",
      author: a.author,
      imageUrl: "",
      featured: a.featured,
      publishedAt: a.publishedAt.slice(0, 10),
    })
    setEditingId(a.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const url = editingId ? `/api/admin/news/${editingId}` : "/api/admin/news"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Operation failed")
        return
      }
      setShowForm(false)
      setEditingId(null)
      setForm(defaultForm)
      fetchData()
    } catch {
      setError("Network error")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" })
      if (res.ok) fetchData()
    } catch {
      setError("Failed to delete")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-zinc-500">Loading...</div>
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">News Articles</h1>
          <p className="mt-1 text-sm text-zinc-500">{articles.length} articles</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Article
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Article" : "Add Article"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={6}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Author</label>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Published Date</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-purple-600"
                />
                <span className="text-xs font-medium text-zinc-500">Featured</span>
              </label>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <button type="submit" className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white hover:opacity-90">
                {editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-zinc-700 px-6 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-zinc-800/50">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
              <th className="px-4 py-3 font-medium text-zinc-400">Title</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Author</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Date</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Featured</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="max-w-xs truncate px-4 py-3 text-zinc-200">{a.title}</td>
                <td className="px-4 py-3 text-zinc-400">{a.author}</td>
                <td className="px-4 py-3 text-zinc-400">{new Date(a.publishedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  {a.featured ? (
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">Featured</span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(a)} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20">Edit</button>
                    <button onClick={() => handleDelete(a.id)} className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-600">No articles found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
