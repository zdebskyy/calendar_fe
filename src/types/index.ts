export interface Task {
  _id: string;
  title: string;
  date: string;
  order: number;
  color: string;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface CalendarDay {
  date: Date;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
  holidays: Holiday[];
}

export interface DragState {
  taskId: string | null;
  fromDate: string | null;
  fromIndex: number | null;
  overDate: string | null;
  overIndex: number | null;
}
