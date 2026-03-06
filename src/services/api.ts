import { Task, Holiday } from '../types'

const API_BASE = '/api'
const HOLIDAY_API = 'https://date.nager.at/api/v3'

export const taskService = {
  async getByMonth(month: string): Promise<Task[]> {
    const res = await fetch(`${API_BASE}/tasks?month=${month}`)
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return res.json()
  },
  async create(data: {
    title: string
    date: string
    labels?: string[]
  }): Promise<Task> {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create task')
    return res.json()
  },
  async update(id: string, data: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json()
  },
  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete task')
  },
  async reorder(
    tasks: Array<{ id: string; date: string; order: number }>,
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/tasks/reorder`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks }),
    })
    if (!res.ok) throw new Error('Failed to reorder tasks')
  },
}

const holidayCache = new Map<string, Holiday[]>()

export const holidayService = {
  async getByYear(year: number, countryCode = 'US'): Promise<Holiday[]> {
    const key = `${year}-${countryCode}`
    if (holidayCache.has(key)) return holidayCache.get(key)!
    try {
      const res = await fetch(
        `${HOLIDAY_API}/PublicHolidays/${year}/${countryCode}`,
      )
      if (!res.ok) return []
      const data: Holiday[] = await res.json()
      holidayCache.set(key, data)
      return data
    } catch {
      return []
    }
  },
  async getNextPublicHolidaysWorldwide(): Promise<Holiday[]> {
    try {
      const res = await fetch(
        `${HOLIDAY_API}/NextPublicHolidaysWorldwide`,
      )
      if (!res.ok) return []
      const data: Holiday[] = await res.json()
      return data
    } catch {
      return []
    }
  },
}
