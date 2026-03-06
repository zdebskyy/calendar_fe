import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const theme = {
  pageBg: '#e2e4e6',
  headerBg: '#ffffff',
  cellBg: '#f4f5f7',
  cellBgHover: '#ebecef',
  cardBg: '#ffffff',
  border: '#d9dce0',
  text: '#172b4d',
  textMuted: '#5e6c84',
  textDim: '#97a0af',
  accent: '#0079bf',
  today: '#0079bf',
  holiday: '#eb5a46',
  danger: '#eb5a46',
  cardShadow: '0 1px 3px rgba(9,30,66,0.13), 0 0 0 1px rgba(9,30,66,0.08)',
  cardShadowHover: '0 4px 8px rgba(9,30,66,0.16), 0 0 0 1px rgba(9,30,66,0.10)',
  labelColors: ['#61bd4f','#f2d600','#ff9f1a','#eb5a46','#c377e0','#0079bf','#00c2e0','#51e898','#ff78cb','#344563'],
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ─── App Shell ────────────────────────────────────────────────────────────────

export const AppWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.pageBg};
  color: ${theme.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const LoadingBar = styled.div<{ visible: boolean }>`
  height: 2px;
  background: ${theme.accent};
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 999;
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: opacity 0.3s;
`;

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 44px;
  background: ${theme.headerBg};
  border-bottom: 1px solid ${theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const MonthLabel = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.text};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  pointer-events: none;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  border: none;
  rotate: 90deg;
  color: ${theme.textMuted};
  font-size: 16px;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  &:hover { background: #dfe1e6; color: ${theme.text}; }
`;

export const TodayButton = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid ${theme.border};
  background: transparent;
  color: ${theme.textMuted};
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.1s, color 0.1s;
  &:hover { background: #dfe1e6; color: ${theme.text}; }
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const SearchInput = styled.input`
  background: #fafbfc;
  border: 1px solid ${theme.border};
  border-radius: 3px;
  padding: 5px 8px 5px 26px;
  color: ${theme.text};
  font-size: 13px;
  width: 160px;
  height: 28px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, width 0.2s;
  &::placeholder { color: ${theme.textDim}; }
  &:focus { border-color: ${theme.accent}; width: 200px; background: #fff; }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 8px;
  color: ${theme.textDim};
  font-size: 12px;
  pointer-events: none;
`;

// ─── Calendar Grid ────────────────────────────────────────────────────────────

export const CalendarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: ${theme.headerBg};
  border-bottom: 1px solid ${theme.border};
`;

export const WeekdayLabel = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: ${theme.textMuted};
  padding: 7px 0;
  text-transform: uppercase;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  border-left: 1px solid ${theme.border};
  border-top: 1px solid ${theme.border};
`;

// ─── Day Cell ─────────────────────────────────────────────────────────────────

export const DayCell = styled.div<{
  isCurrentMonth: boolean;
  isToday: boolean;
  isDragOver: boolean;
}>`
  min-height: 120px;
  background: ${({ isDragOver }) => isDragOver ? '#e4f0f6' : theme.cellBg};
  border-right: 1px solid ${theme.border};
  border-bottom: 1px solid ${theme.border};
  padding: 6px 5px 4px;
  opacity: ${({ isCurrentMonth }) => isCurrentMonth ? 1 : 0.45};
  transition: background 0.1s;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;
  &:hover {
    background: ${({ isDragOver }) => isDragOver ? '#e4f0f6' : theme.cellBgHover};
  }
`;

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 1px;
`;

export const DayNumber = styled.span<{ isToday: boolean }>`
  font-size: 13px;
  font-weight: ${({ isToday }) => isToday ? '700' : '400'};
  color: ${({ isToday }) => isToday ? '#fff' : theme.text};
  background: ${({ isToday }) => isToday ? theme.today : 'transparent'};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardCount = styled.span`
  font-size: 11px;
  color: ${theme.textDim};
  font-weight: 400;
`;

export const HolidayBadge = styled.div`
  font-size: 11px;
  color: ${theme.holiday};
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  cursor: default;
  user-select: none;
  font-weight: 500;
  padding: 1px 0;
`;

export const TaskDropIndicator = styled.div<{ visible: boolean }>`
  height: ${({ visible }) => visible ? '4px' : '0'};
  background: ${theme.accent};
  border-radius: 2px;
  opacity: ${({ visible }) => visible ? 0.7 : 0};
  transition: height 0.08s, opacity 0.08s;
  margin: 1px 0;
  flex-shrink: 0;
`;

export const AddTaskInput = styled.input`
  background: #fff;
  border: 1px solid ${theme.accent};
  border-radius: 3px;
  color: ${theme.text};
  font-size: 12px;
  padding: 4px 6px;
  outline: none;
  width: 100%;
  font-family: inherit;
  box-shadow: 0 0 0 2px rgba(0,121,191,0.15);
  &::placeholder { color: ${theme.textDim}; }
`;

export const AddTaskButton = styled.button`
  background: none;
  border: none;
  color: ${theme.textDim};
  font-size: 12px;
  cursor: pointer;
  padding: 2px 4px;
  text-align: left;
  border-radius: 3px;
  opacity: 0;
  font-family: inherit;
  transition: opacity 0.15s, color 0.1s, background 0.1s;
  margin-top: auto;
  ${DayCell}:hover & { opacity: 1; }
  &:hover { color: ${theme.text}; background: rgba(9,30,66,0.06); }
`;

// ─── Task Card ────────────────────────────────────────────────────────────────

export const TaskCardWrapper = styled.div<{ isDragging: boolean; isFiltered: boolean }>`
  background: ${theme.cardBg};
  border-radius: 3px;
  box-shadow: ${theme.cardShadow};
  padding: 6px 8px 7px;
  cursor: grab;
  animation: ${fadeIn} 0.15s ease;
  opacity: ${({ isDragging, isFiltered }) => isDragging ? 0.35 : isFiltered ? 1 : 0.2};
  transition: box-shadow 0.1s, opacity 0.15s;
  position: relative;
  &:active { cursor: grabbing; }
  &:hover { box-shadow: ${theme.cardShadowHover}; }
`;

export const LabelStrip = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

export const LabelPill = styled.div<{ color: string }>`
  width: 40px;
  height: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
  flex-shrink: 0;
`;

export const TaskTitle = styled.div`
  font-size: 13px;
  color: ${theme.text};
  line-height: 1.4;
  word-break: break-word;
  padding-right: 16px;
`;

export const TaskActions = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
  gap: 2px;
  ${TaskCardWrapper}:hover & { display: flex; }
`;

export const TaskActionBtn = styled.button`
  background: rgba(9,30,66,0.06);
  border: none;
  border-radius: 3px;
  color: ${theme.textMuted};
  cursor: pointer;
  font-size: 11px;
  padding: 2px 5px;
  line-height: 1.4;
  transition: background 0.1s, color 0.1s;
  &:hover { background: rgba(9,30,66,0.14); color: ${theme.text}; }
`;

export const DeleteBtn = styled(TaskActionBtn)`
  &:hover { background: ${theme.danger}; color: #fff; }
`;

export const EditInput = styled.input`
  background: #fff;
  border: 1px solid ${theme.accent};
  border-radius: 3px;
  color: ${theme.text};
  font-size: 13px;
  padding: 3px 6px;
  outline: none;
  width: 100%;
  font-family: inherit;
  box-shadow: 0 0 0 2px rgba(0,121,191,0.2);
`;
