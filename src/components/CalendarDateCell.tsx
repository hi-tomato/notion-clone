import { CalendarCellProps } from '@/types/calendar';
import { TodoPriority } from '@/types/todo-type';
import { format, isToday } from 'date-fns';
import React from 'react';

const CalendarDateCell = ({
  date,
  isCurrentMonth,
  isSelected,
  todos,
  onDateClick,
}: CalendarCellProps) => {
  const isTodayDate = isToday(date);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const hasTodosForDate = (date: Date, priority: TodoPriority) => {
    return todos.some((todo) => {
      const todoDate = new Date(todo.createdAt);
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear() &&
        todo.priority === priority
      );
    });
  };

  const getTodosForDate = (date: Date) => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt);
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
  };

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
      <div className="mt-1 flex justify-center space-x-1">
        {hasTodosForDate(date, 'high') && (
          <div className="w-2 h-2 rounded-full bg-red-500" />
        )}
        {hasTodosForDate(date, 'medium') && (
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
        )}
        {hasTodosForDate(date, 'low') && (
          <div className="w-2 h-2 rounded-full bg-green-500" />
        )}
      </div>

      {/* Tool Tip */}
      {getTodosForDate(date).length > 0 && (
        <div className="absolute z-10 hidden group-hover:block bg-[#1a1d24] border border-[#383e4a] text-white p-2 rounded shadow-lg w-48 left-1/2 transform -translate-x-1/2 mt-1">
          <div className="text-xs font-semibold mb-1">할 일 목록</div>
          <ul className="text-xs">
            {getTodosForDate(date).map((todo, idx) => (
              <li
                key={idx}
                className="py-1 border-b border-[#383e4a] last:border-0"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 
                    ${
                      todo.priority === 'high'
                        ? 'bg-red-500'
                        : todo.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <span className="truncate">{todo.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarDateCell;
