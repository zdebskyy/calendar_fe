import { Task, Holiday } from '../types'
import { supabase } from '../lib/supabase'

const API_BASE = '/api'
const HOLIDAY_API = 'https://date.nager.at/api/v3'

const getAuthHeaders = async (): Promise<HeadersInit> => {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const taskService = {
  async getByMonth(month: string): Promise<Task[]> {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/tasks?month=${month}`, { headers })
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return res.json()
  },

  async create(data: { title: string; date: string; labels?: string[] }): Promise<Task> {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create task')
    return res.json()
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
      headers,
    })
    if (!res.ok) throw new Error('Failed to delete task')
  },

  async reorder(tasks: Array<{ id: string; date: string; order: number }>): Promise<void> {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/tasks/reorder`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ tasks }),
    })
    if (!res.ok) throw new Error('Failed to reorder tasks')
  },
}

const holidayCache = new Map<string, Holiday[]>()

export const holidayService = {
  async getByYear(year: number, countryCode = 'UA'): Promise<Holiday[]> {
    const key = `${year}-${countryCode}`
    if (holidayCache.has(key)) return holidayCache.get(key)!
    try {
      const res = await fetch(`${HOLIDAY_API}/PublicHolidays/${year}/${countryCode}`)
      if (!res.ok) return []
      const data: Holiday[] = await res.json()
      holidayCache.set(key, data)
      return data
    } catch {
      return []
    }
  },
}
