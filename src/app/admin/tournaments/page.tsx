"use client"

import { useState, useEffect, FormEvent } from "react"
import { formatCurrency } from "@/lib/utils"

interface Tournament {
  id: string
  name: string
  location: string
  prizePool: number
  tier: string
  status: string
  startDate: string
  endDate: string
  winner: { name: string; acronym: string } | null
  mvp: { ign: string } | null
  _count: { matches: number }
}

const defaultForm = {
  name: "",
  location: "",
  description: "",
  prizePool: "",
  tier: "A",
  status: "completed",
  startDate: "",
  endDate: "",
  winnerId: "",
  mvpId: "",
}

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/tournaments")
      setTournaments(await res.json())
    } catch {
      setError("Failed to load tournaments")
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

  function openEdit(t: Tournament) {
    setForm({
      name: t.name,
      location: t.location,
      description: "",
      prizePool: String(t.prizePool),
      tier: t.tier,
      status: t.status,
      startDate: t.startDate.slice(0, 10),
      endDate: t.endDate.slice(0, 10),
      winnerId: "",
      mvpId: "",
    })
    setEditingId(t.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const url = editingId ? `/api/admin/tournaments/${editingId}` : "/api/admin/tournaments"
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
    if (!confirm("Delete this tournament?")) return
    try {
      const res = await fetch(`/api/admin/tournaments/${id}`, { method: "DELETE" })
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
          <h1 className="text-2xl font-bold text-zinc-100">Tournaments</h1>
          <p className="mt-1 text-sm text-zinc-500">{tournaments.length} tournaments</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Tournament
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Tournament" : "Add Tournament"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Prize Pool ($)</label>
              <input
                type="number"
                value={form.prizePool}
                onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Tier</label>
              <select
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              >
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
              <th className="px-4 py-3 font-medium text-zinc-400">Name</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Location</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Prize</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Tier</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Matches</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Winner</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((t) => (
              <tr key={t.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="px-4 py-3 text-zinc-200">{t.name}</td>
                <td className="px-4 py-3 text-zinc-400">{t.location}</td>
                <td className="px-4 py-3 font-mono text-zinc-300">{formatCurrency(t.prizePool)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                    t.tier === "S" ? "bg-amber-500/20 text-amber-400" :
                    t.tier === "A" ? "bg-purple-500/20 text-purple-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>{t.tier}</span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{t._count.matches}</td>
                <td className="px-4 py-3 text-zinc-400">{t.winner?.acronym || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20">Edit</button>
                    <button onClick={() => handleDelete(t.id)} className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {tournaments.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-zinc-600">No tournaments found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
