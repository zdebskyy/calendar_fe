import { useState, useEffect, useCallback, useMemo } from 'react'
import { Task, Holiday, CalendarDay, DragState } from '../types'
import { taskService, holidayService } from '../services/api'
import { formatDate, getMonthKey, groupByDate } from '../helpers/dateHelpers'

const GRID_ITEMS = 42

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragState, setDragState] = useState<DragState>({
    taskId: null,
    fromDate: null,
    fromIndex: null,
    overDate: null,
    overIndex: null,
  })

  const today = formatDate(new Date())
  const monthKey = getMonthKey(currentDate)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const [fetchedTasks, fetchedHolidays] = await Promise.all([
          taskService.getByMonth(monthKey),
          holidayService.getByYear(currentDate.getFullYear()),
        ])
        if (!cancelled) {
          setTasks(fetchedTasks)
          setHolidays(fetchedHolidays)
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [monthKey, currentDate])

  const calendarDays = useMemo((): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDay = new Date(firstDay)
    startDay.setDate(startDay.getDate() - startDay.getDay())

    const holidayMap = groupByDate(holidays)

    const filteredTasks = searchText.trim()
      ? tasks.filter((t) =>
          t.title.toLowerCase().includes(searchText.toLowerCase()),
        )
      : tasks

    const taskMap = groupByDate(tasks)

    taskMap.forEach((arr) => arr.sort((a, b) => a.order - b.order))

    const filteredIds = new Set(filteredTasks.map((t) => t._id))

    const days: CalendarDay[] = []
    for (let i = 0; i < GRID_ITEMS; i++) {
      const d = new Date(startDay)
      d.setDate(d.getDate() + i)
      const dateStr = formatDate(d)
      days.push({
        date: d,
        dateStr,
        isCurrentMonth: d.getMonth() === month,
        isToday: dateStr === today,
        tasks: (taskMap.get(dateStr) || []).map((t) => ({
          ...t,
          _filtered: filteredIds.has(t._id),
        })) as Task[],
        holidays: holidayMap.get(dateStr) || [],
      })
    }
    return days
  }, [currentDate, tasks, holidays, searchText, today])

  const prevMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }, [])

  const nextMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }, [])

  const goToToday = useCallback(() => setCurrentDate(new Date()), [])

  const addTask = useCallback(
    async (date: string, title: string, labels?: string[]) => {
      try {
        const newTask = await taskService.create({
          title,
          date,
          labels: labels || [],
        })
        setTasks((prev) => [...prev, newTask])
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  const editTask = useCallback(async (id: string, title: string) => {
    try {
      const updated = await taskService.update(id, { title })
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
    } catch (e) {
      console.error(e)
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskService.delete(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (e) {
      console.error(e)
    }
  }, [])

  const onDragStart = useCallback(
    (taskId: string, fromDate: string, fromIndex: number) => {
      setDragState({
        taskId,
        fromDate,
        fromIndex,
        overDate: null,
        overIndex: null,
      })
    },
    [],
  )

  const onDragOver = useCallback((overDate: string, overIndex: number) => {
    setDragState((prev) => ({ ...prev, overDate, overIndex }))
  }, [])

  const onDrop = useCallback(
    async (toDate: string, toIndex: number) => {
      const { taskId, fromDate } = dragState
      if (!taskId || !fromDate) return

      setDragState({
        taskId: null,
        fromDate: null,
        fromIndex: null,
        overDate: null,
        overIndex: null,
      })

      setTasks((prev) => {
        const allTasks = [...prev]
        const taskIdx = allTasks.findIndex((t) => t._id === taskId)
        if (taskIdx === -1) return prev

        const task = { ...allTasks[taskIdx], date: toDate }
        allTasks.splice(taskIdx, 1)

        const targetDayTasks = allTasks
          .filter((t) => t.date === toDate)
          .sort((a, b) => a.order - b.order)
        const clampedIndex = Math.min(toIndex, targetDayTasks.length)
        targetDayTasks.splice(clampedIndex, 0, task)

        const updatedTasks: Array<{
          id: string
          date: string
          order: number
        }> = []
        targetDayTasks.forEach((t, idx) =>
          updatedTasks.push({ id: t._id, date: toDate, order: idx }),
        )

        if (fromDate !== toDate) {
          allTasks
            .filter((t) => t.date === fromDate)
            .sort((a, b) => a.order - b.order)
            .forEach((t, idx) =>
              updatedTasks.push({ id: t._id, date: fromDate, order: idx }),
            )
        }

        taskService.reorder(updatedTasks).catch(console.error)

        return allTasks
          .map((t) => {
            const u = updatedTasks.find((x) => x.id === t._id)
            return u ? { ...t, date: u.date, order: u.order } : t
          })
          .concat({ ...task, order: clampedIndex })
      })
    },
    [dragState],
  )

  const onDragEnd = useCallback(() => {
    setDragState({
      taskId: null,
      fromDate: null,
      fromIndex: null,
      overDate: null,
      overIndex: null,
    })
  }, [])

  return {
    currentDate,
    calendarDays,
    searchText,
    setSearchText,
    loading,
    dragState,
    prevMonth,
    nextMonth,
    goToToday,
    addTask,
    editTask,
    deleteTask,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
  }
}
