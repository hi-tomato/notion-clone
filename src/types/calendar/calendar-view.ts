// /types/calendar/calendar-view.ts

import { TodoItem } from '../todo-type';

export interface CalendarCellProps {
  date: Date;
  currentDate: Date;
  selectedDate: Date | null;
  isCurrentMonth: boolean;
  isSelected: boolean | null;
  todos: TodoItem[];
  onDateClick: (date: Date) => void;
}

export interface CalendarContentsProps {
  currentDate: Date;
  calendarMatrix: Date[][];
  selectedDate: Date | null;
  handleDateClick: (date: Date) => void;
  todos: TodoItem[];
}
