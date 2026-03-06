import React, { useState, useRef, useEffect } from 'react'
import { Task } from '../types'
import {
  TaskCardWrapper,
  LabelStrip,
  LabelPill,
  TaskTitle,
  TaskActions,
  TaskActionBtn,
  DeleteBtn,
  EditInput,
} from '../styles/components'

interface TaskCardProps {
  task: Task & { _filtered?: boolean }
  index: number
  isDragging: boolean
  searchActive: boolean
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
  onDragStart: (taskId: string, fromDate: string, fromIndex: number) => void
  onDragEnd: () => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  isDragging,
  searchActive,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
}) => {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditValue(task.title)
    setEditing(true)
  }

  const handleSave = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== task.title) onEdit(task._id, trimmed)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setEditing(false)
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (editing) {
      e.preventDefault()
      return
    }
    e.stopPropagation()
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', task._id)
    onDragStart(task._id, task.date, index)
  }

  const isFiltered =
    !searchActive ||
    (task as Task & { _filtered?: boolean })._filtered !== false

  const labels = task.labels?.length ? task.labels : [task.color]

  return (
    <TaskCardWrapper
      isDragging={isDragging}
      isFiltered={isFiltered}
      draggable={!editing}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Color label bars at top — Trello style */}
      <LabelStrip>
        {labels.map((color, i) => (
          <LabelPill key={i} color={color} />
        ))}
      </LabelStrip>

      {editing ? (
        <EditInput
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskActions>
            <TaskActionBtn
              title="Edit"
              onClick={(e) => {
                e.stopPropagation()
                setEditValue(task.title)
                setEditing(true)
              }}
            >
              ✎
            </TaskActionBtn>
            <DeleteBtn
              title="Delete"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(task._id)
              }}
            >
              ✕
            </DeleteBtn>
          </TaskActions>
        </>
      )}
    </TaskCardWrapper>
  )
}
