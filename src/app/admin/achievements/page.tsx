"use client"

import { useState, useEffect, FormEvent } from "react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
  player: { ign: string; name: string }
}

interface Player {
  id: string
  ign: string
  name: string
}

const defaultForm = {
  playerId: "",
  name: "",
  description: "",
  icon: "trophy",
  unlockedAt: "",
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchData() {
    try {
      const [aRes, pRes] = await Promise.all([
        fetch("/api/admin/achievements"),
        fetch("/api/admin/players"),
      ])
      setAchievements(await aRes.json())
      setPlayers(await pRes.json())
    } catch {
      setError("Failed to load achievements")
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

  function openEdit(a: Achievement) {
    setForm({
      playerId: "",
      name: a.name,
      description: a.description,
      icon: a.icon,
      unlockedAt: a.unlockedAt.slice(0, 10),
    })
    setEditingId(a.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const url = editingId ? `/api/admin/achievements/${editingId}` : "/api/admin/achievements"
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
    if (!confirm("Delete this achievement?")) return
    try {
      const res = await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" })
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
          <h1 className="text-2xl font-bold text-zinc-100">Achievements</h1>
          <p className="mt-1 text-sm text-zinc-500">{achievements.length} achievements</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Achievement
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Achievement" : "Add Achievement"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Player</label>
              <select
                value={form.playerId}
                onChange={(e) => setForm({ ...form, playerId: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              >
                <option value="">Select player</option>
                {players.map((p) => (
                  <option key={p.id} value={p.id}>{p.ign} ({p.name})</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Achievement Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Icon</label>
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              >
                <option value="trophy">Trophy</option>
                <option value="star">Star</option>
                <option value="sword">Sword</option>
                <option value="shield">Shield</option>
                <option value="crown">Crown</option>
                <option value="zap">Zap</option>
                <option value="heart">Heart</option>
                <option value="target">Target</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Unlocked Date</label>
              <input
                type="date"
                value={form.unlockedAt}
                onChange={(e) => setForm({ ...form, unlockedAt: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
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
              <th className="px-4 py-3 font-medium text-zinc-400">Player</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Achievement</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Icon</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Unlocked</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((a) => (
              <tr key={a.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="px-4 py-3 font-medium text-zinc-200">{a.player.ign}</td>
                <td className="px-4 py-3">
                  <div className="text-zinc-200">{a.name}</div>
                  <div className="mt-0.5 text-xs text-zinc-500 line-clamp-1">{a.description}</div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{a.icon}</td>
                <td className="px-4 py-3 text-zinc-400">{new Date(a.unlockedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(a)} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20">Edit</button>
                    <button onClick={() => handleDelete(a.id)} className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {achievements.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-600">No achievements found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
