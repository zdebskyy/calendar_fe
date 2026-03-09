export const formatDate = (d: Date): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const getMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export const groupByDate = <T extends { date: string }>(
  items: T[],
): Map<string, T[]> => {
  return items.reduce<Map<string, T[]>>((map, item) => {
    const list = map.get(item.date) ?? []
    list.push(item)
    map.set(item.date, list)
    return map
  }, new Map<string, T[]>())
}

export const formatDisplayDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  if (dateStr === formatDate(today)) return 'Today'
  if (dateStr === formatDate(tomorrow)) return 'Tomorrow'
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}