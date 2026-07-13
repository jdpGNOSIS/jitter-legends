"use client"

import { useState, useEffect, FormEvent } from "react"

interface Player {
  id: string
  name: string
  ign: string
  age: number
  country: string
  rating: number
  slug: string
  teamHistory: { team: { name: string; acronym: string } }[]
}

const defaultForm = {
  name: "",
  ign: "",
  age: "",
  country: "",
  biography: "",
  careerEarnings: "",
  mvpCount: "",
  tournamentWins: "",
  rating: "",
  kdRatio: "",
  imageUrl: "",
}

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchPlayers() {
    try {
      const res = await fetch("/api/admin/players")
      const data = await res.json()
      setPlayers(data)
    } catch {
      setError("Failed to load players")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPlayers() }, [])

  function openCreate() {
    setForm(defaultForm)
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(player: Player) {
    setForm({
      name: player.name,
      ign: player.ign,
      age: String(player.age),
      country: player.country,
      biography: "",
      careerEarnings: "",
      mvpCount: "",
      tournamentWins: "",
      rating: String(player.rating),
      kdRatio: "",
      imageUrl: "",
    })
    setEditingId(player.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    try {
      const url = editingId
        ? `/api/admin/players/${editingId}`
        : "/api/admin/players"
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
      fetchPlayers()
    } catch {
      setError("Network error")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this player?")) return
    try {
      const res = await fetch(`/api/admin/players/${id}`, { method: "DELETE" })
      if (res.ok) fetchPlayers()
    } catch {
      setError("Failed to delete")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-500">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Players</h1>
          <p className="mt-1 text-sm text-zinc-500">{players.length} players</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Player
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Player" : "Add Player"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">IGN</label>
              <input
                value={form.ign}
                onChange={(e) => setForm({ ...form, ign: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Country</label>
              <input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Rating</label>
              <input
                type="number"
                step="0.01"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">K/D Ratio</label>
              <input
                type="number"
                step="0.01"
                value={form.kdRatio}
                onChange={(e) => setForm({ ...form, kdRatio: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Biography</label>
              <textarea
                value={form.biography}
                onChange={(e) => setForm({ ...form, biography: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-zinc-700 px-6 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50"
              >
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
              <th className="px-4 py-3 font-medium text-zinc-400">Name</th>
              <th className="px-4 py-3 font-medium text-zinc-400">IGN</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Age</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Country</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Team</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Rating</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="px-4 py-3 text-zinc-200">{player.name}</td>
                <td className="px-4 py-3 font-medium text-zinc-100">{player.ign}</td>
                <td className="px-4 py-3 text-zinc-400">{player.age}</td>
                <td className="px-4 py-3 text-zinc-400">{player.country}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {player.teamHistory?.[0]?.team?.acronym || "—"}
                </td>
                <td className="px-4 py-3 font-mono text-zinc-300">{player.rating.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(player)}
                      className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-zinc-600">
                  No players found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
