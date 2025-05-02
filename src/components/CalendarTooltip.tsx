import { TodoItem } from '@/types/todo-type';
import React from 'react';

interface TodoTooltipProps {
  todos: TodoItem[];
}

const CalendarTooltip = ({ todos }: TodoTooltipProps) => {
  if (todos.length === 0) return null;

  return (
    <div className="absolute z-10 hidden group-hover:block bg-[#1a1d24] border border-[#383e4a] text-white p-2 rounded shadow-lg w-48 left-1/2 transform -translate-x-1/2 mt-1">
      <div className="text-xs font-semibold mb-1">할 일 목록</div>
      <ul className="text-xs">
        {todos.map((todo, idx) => (
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
  );
};

export default CalendarTooltip;
