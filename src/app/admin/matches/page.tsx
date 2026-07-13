"use client"

import { useState, useEffect, FormEvent } from "react"

interface Match {
  id: string
  slug: string
  team1Score: number
  team2Score: number
  date: string
  round: string
  status: string
  format: string
  tournament: { name: string }
  team1: { name: string; acronym: string }
  team2: { name: string; acronym: string }
  _count: { maps: number }
}

interface Team {
  id: string
  name: string
  acronym: string
}

interface Tournament {
  id: string
  name: string
}

const defaultForm = {
  tournamentId: "",
  team1Id: "",
  team2Id: "",
  team1Score: "0",
  team2Score: "0",
  date: "",
  round: "Group Stage",
  status: "completed",
  format: "bo3",
  winnerId: "",
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchData() {
    try {
      const [mRes, tRes, tourRes] = await Promise.all([
        fetch("/api/admin/matches"),
        fetch("/api/admin/teams"),
        fetch("/api/admin/tournaments"),
      ])
      setMatches(await mRes.json())
      setTeams(await tRes.json())
      setTournaments(await tourRes.json())
    } catch {
      setError("Failed to load data")
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

  function openEdit(m: Match) {
    setForm({
      tournamentId: "",
      team1Id: "",
      team2Id: "",
      team1Score: String(m.team1Score),
      team2Score: String(m.team2Score),
      date: m.date.slice(0, 10),
      round: m.round,
      status: m.status,
      format: m.format,
      winnerId: "",
    })
    setEditingId(m.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const url = editingId ? `/api/admin/matches/${editingId}` : "/api/admin/matches"
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
    if (!confirm("Delete this match?")) return
    try {
      const res = await fetch(`/api/admin/matches/${id}`, { method: "DELETE" })
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
          <h1 className="text-2xl font-bold text-zinc-100">Matches</h1>
          <p className="mt-1 text-sm text-zinc-500">{matches.length} matches</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Match
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Match" : "Add Match"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-500">Tournament</label>
              <select
                value={form.tournamentId}
                onChange={(e) => setForm({ ...form, tournamentId: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              >
                <option value="">Select tournament</option>
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Team 1</label>
              <select
                value={form.team1Id}
                onChange={(e) => setForm({ ...form, team1Id: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              >
                <option value="">Select team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.acronym})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Team 2</label>
              <select
                value={form.team2Id}
                onChange={(e) => setForm({ ...form, team2Id: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              >
                <option value="">Select team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.acronym})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Team 1 Score</label>
              <input
                type="number"
                value={form.team1Score}
                onChange={(e) => setForm({ ...form, team1Score: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Team 2 Score</label>
              <input
                type="number"
                value={form.team2Score}
                onChange={(e) => setForm({ ...form, team2Score: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Round</label>
              <input
                value={form.round}
                onChange={(e) => setForm({ ...form, round: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Format</label>
              <select
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-purple-500/50"
              >
                <option value="bo1">BO1</option>
                <option value="bo3">BO3</option>
                <option value="bo5">BO5</option>
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
              <th className="px-4 py-3 font-medium text-zinc-400">Tournament</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Team 1</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Score</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Team 2</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Format</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Date</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="px-4 py-3 text-zinc-400">{m.tournament.name}</td>
                <td className="px-4 py-3 text-zinc-200">{m.team1.acronym}</td>
                <td className="px-4 py-3">
                  <span className="font-mono font-bold text-zinc-100">{m.team1Score}</span>
                  <span className="mx-1 text-zinc-600">:</span>
                  <span className="font-mono font-bold text-zinc-100">{m.team2Score}</span>
                </td>
                <td className="px-4 py-3 text-zinc-200">{m.team2.acronym}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400">{m.format.toUpperCase()}</span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{new Date(m.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(m)} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20">Edit</button>
                    <button onClick={() => handleDelete(m.id)} className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {matches.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-zinc-600">No matches found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
