"use client"

import { useState, useEffect, FormEvent } from "react"

interface Team {
  id: string
  name: string
  acronym: string
  description: string
  primaryColor: string
  _count: { players: number }
  slug: string
}

const defaultForm = {
  name: "",
  acronym: "",
  description: "",
  logoUrl: "",
  primaryColor: "#6366f1",
  secondaryColor: "#06b6d4",
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState("")

  async function fetchTeams() {
    try {
      const res = await fetch("/api/admin/teams")
      setTeams(await res.json())
    } catch {
      setError("Failed to load teams")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTeams() }, [])

  function openCreate() {
    setForm(defaultForm)
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(team: Team) {
    setForm({
      name: team.name,
      acronym: team.acronym,
      description: team.description,
      logoUrl: "",
      primaryColor: team.primaryColor,
      secondaryColor: "",
    })
    setEditingId(team.id)
    setShowForm(true)
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const url = editingId ? `/api/admin/teams/${editingId}` : "/api/admin/teams"
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
      fetchTeams()
    } catch {
      setError("Network error")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team?")) return
    try {
      const res = await fetch(`/api/admin/teams/${id}`, { method: "DELETE" })
      if (res.ok) fetchTeams()
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
          <h1 className="text-2xl font-bold text-zinc-100">Teams</h1>
          <p className="mt-1 text-sm text-zinc-500">{teams.length} teams</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Team
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-200">
            {editingId ? "Edit Team" : "Add Team"}
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
              <label className="mb-1 block text-xs font-medium text-zinc-500">Acronym</label>
              <input
                value={form.acronym}
                onChange={(e) => setForm({ ...form, acronym: e.target.value })}
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
              <label className="mb-1 block text-xs font-medium text-zinc-500">Primary Color</label>
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Logo URL</label>
              <input
                value={form.logoUrl}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
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
              <th className="px-4 py-3 font-medium text-zinc-400">Acronym</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Players</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Color</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-b border-zinc-800/30 transition-colors hover:bg-zinc-800/20">
                <td className="px-4 py-3 text-zinc-200">{team.name}</td>
                <td className="px-4 py-3 font-medium text-zinc-100">{team.acronym}</td>
                <td className="px-4 py-3 text-zinc-400">{team._count.players}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block h-5 w-5 rounded-full border border-zinc-700"
                    style={{ backgroundColor: team.primaryColor }}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(team)}
                      className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-600">No teams found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
