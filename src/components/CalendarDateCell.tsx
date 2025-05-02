import { CalendarCellProps } from '@/types/calendar';
// import { TodoPriority } from '@/types/todo-type';
import { format, isToday } from 'date-fns';
import React, { useMemo } from 'react';
import CalendarTooltip from './CalendarTooltip';
import CalendarDots from './CalendarDots';

const CalendarDateCell = ({
  date,
  isCurrentMonth,
  isSelected,
  todos,
  onDateClick,
}: CalendarCellProps) => {
  const isTodayDate = isToday(date);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const todosForDate = useMemo(() => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt);
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
  }, [todos, date]);

  return (
    <div
      onClick={() => onDateClick(date)}
      className={`border border-[#2f343f] p-1 cursor-pointer transition-colors relative group
      ${
        !isCurrentMonth
          ? 'bg-[#1c1f26] text-gray-500'
          : 'bg-[#23272f] text-gray-200'
      }
      hover:bg-[#2e333d]
    `}
    >
      <div
        className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-sm
        ${isSelected ? 'bg-blue-500 text-white' : ''}
        ${
          isTodayDate && !isSelected
            ? 'border border-blue-400 text-blue-400'
            : ''
        }
        ${
          isWeekend && isCurrentMonth
            ? date.getDay() === 0
              ? 'text-red-400'
              : 'text-blue-400'
            : ''
        }
      `}
      >
        {format(date, 'd')}
      </div>

      {/* 이벤트 도트 */}
      <CalendarDots todos={todosForDate} />

      {/* Tool Tip */}
      {todosForDate.length > 0 && <CalendarTooltip todos={todosForDate} />}
    </div>
  );
};

export default CalendarDateCell;
