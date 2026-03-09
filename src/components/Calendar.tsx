import React from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { CalendarCell } from './CalendarCell'
import {
  Header,
  NavGroup,
  IconButton,
  TodayButton,
  MonthLabel,
  SearchBar,
  SearchInput,
  SearchIcon,
  CalendarWrapper,
  WeekdayRow,
  WeekdayLabel,
  DaysGrid,
  LoadingBar,
} from '../styles/components'
import { MONTHS, WEEKDAYS } from '../constants'

export const Calendar: React.FC = () => {
  const {
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
  } = useCalendar()

  return (
    <>
      <LoadingBar visible={loading} />

      <Header>
        <NavGroup>
          <IconButton onClick={prevMonth} title="Previous month">
            ‹
          </IconButton>
          <IconButton onClick={nextMonth} title="Next month">
            ›
          </IconButton>
          <TodayButton onClick={goToToday}>Today</TodayButton>
        </NavGroup>

        <MonthLabel>
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthLabel>

        <SearchBar>
          <SearchIcon>⌕</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Filter..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchBar>
      </Header>

      <CalendarWrapper>
        <WeekdayRow>
          {WEEKDAYS.map((d) => (
            <WeekdayLabel key={d}>{d}</WeekdayLabel>
          ))}
        </WeekdayRow>

        <DaysGrid>
          {calendarDays.map((day) => (
            <CalendarCell
              key={day.dateStr}
              day={day}
              dragState={dragState}
              searchText={searchText}
              onAddTask={addTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
            />
          ))}
        </DaysGrid>
      </CalendarWrapper>
    </>
  )
}
