import React, { useState, useCallback } from 'react'
import { CalendarDay, DragState, Task } from '../types'
import { TaskCard } from './TaskCard'
import { theme } from '../styles/components'
import {
  DayCell,
  DayHeader,
  DayNumber,
  CardCount,
  HolidayBadge,
  AddTaskInput,
  AddTaskButton,
  TaskDropIndicator,
} from '../styles/components'

interface CalendarCellProps {
  day: CalendarDay
  dragState: DragState
  searchText: string
  onAddTask: (date: string, title: string, labels?: string[]) => void
  onEditTask: (id: string, title: string) => void
  onDeleteTask: (id: string) => void
  onDragStart: (taskId: string, fromDate: string, fromIndex: number) => void
  onDragOver: (date: string, index: number) => void
  onDrop: (date: string, index: number) => void
  onDragEnd: () => void
}

function randomLabels(): string[] {
  const colors = theme.labelColors
  const count = Math.floor(Math.random() * 3) + 1
  const shuffled = [...colors].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  dragState,
  searchText,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const [addingTask, setAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const isDragOver = dragState.overDate === day.dateStr
  const isDraggingAny = dragState.taskId !== null

  const handleCellDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      onDragOver(day.dateStr, day.tasks.length)
    },
    [day.dateStr, day.tasks.length, onDragOver],
  )

  const handleCellDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      onDrop(day.dateStr, day.tasks.length)
    },
    [day.dateStr, day.tasks.length, onDrop],
  )

  const handleTaskZoneDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault()
      e.stopPropagation()
      onDragOver(day.dateStr, index)
    },
    [day.dateStr, onDragOver],
  )

  const handleTaskZoneDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault()
      e.stopPropagation()
      onDrop(day.dateStr, index)
    },
    [day.dateStr, onDrop],
  )

  const handleAddKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const trimmed = newTaskTitle.trim()
      if (trimmed) onAddTask(day.dateStr, trimmed, randomLabels())
      setNewTaskTitle('')
      setAddingTask(false)
    }
    if (e.key === 'Escape') {
      setNewTaskTitle('')
      setAddingTask(false)
    }
  }

  const taskCount = day.tasks.length

  return (
    <DayCell
      isCurrentMonth={day.isCurrentMonth}
      isToday={day.isToday}
      isDragOver={isDragOver && isDraggingAny}
      onDragOver={handleCellDragOver}
      onDrop={handleCellDrop}
    >
      {/* Day header: number + card count */}
      <DayHeader>
        <DayNumber isToday={day.isToday}>{day.date.getDate()}</DayNumber>
        {taskCount > 0 && (
          <CardCount>
            {taskCount} {taskCount === 1 ? 'card' : 'cards'}
          </CardCount>
        )}
      </DayHeader>

      {/* Holidays — fixed, non-draggable */}
      {day.holidays.map((h) => (
        <HolidayBadge key={h.date + h.name} title={h.name}>
          🎉 {h.localName}
        </HolidayBadge>
      ))}

      {/* Tasks with drop indicators */}
      {day.tasks.map((task, idx) => {
        const showDrop =
          isDragOver &&
          dragState.overIndex === idx &&
          dragState.taskId !== task._id
        return (
          <React.Fragment key={task._id}>
            <TaskDropIndicator
              visible={showDrop}
              onDragOver={(e) => handleTaskZoneDragOver(e, idx)}
              onDrop={(e) => handleTaskZoneDrop(e, idx)}
            />
            <div
              onDragOver={(e) => handleTaskZoneDragOver(e, idx)}
              onDrop={(e) => handleTaskZoneDrop(e, idx)}
            >
              <TaskCard
                task={task as Task & { _filtered?: boolean }}
                index={idx}
                isDragging={dragState.taskId === task._id}
                searchActive={searchText.trim().length > 0}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            </div>
          </React.Fragment>
        )
      })}

      {/* Drop zone at end */}
      <TaskDropIndicator
        visible={isDragOver && dragState.overIndex === day.tasks.length}
        onDragOver={(e) => handleTaskZoneDragOver(e, day.tasks.length)}
        onDrop={(e) => handleTaskZoneDrop(e, day.tasks.length)}
      />

      {/* Add task */}
      {addingTask ? (
        <AddTaskInput
          autoFocus
          placeholder="Task name, press Enter..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleAddKeyDown}
          onBlur={() => {
            setNewTaskTitle('')
            setAddingTask(false)
          }}
        />
      ) : (
        <AddTaskButton onClick={() => setAddingTask(true)}>
          + Add a task
        </AddTaskButton>
      )}
    </DayCell>
  )
}
