import { TodoItem, TodoPriority } from '@/types/todo-type';
import React from 'react';

interface CalendarDotsProps {
  todos: TodoItem[];
}
const CalendarDots = ({ todos }: CalendarDotsProps) => {
  const hasPriority = (priority: TodoPriority) =>
    todos.some((todo) => todo.priority === priority);
  return (
    <div className="mt-1 flex justify-center space-x-1">
      {hasPriority('high') && (
        <div className="w-2 h-2 rounded-full bg-red-500" />
      )}
      {hasPriority('medium') && (
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
      )}
      {hasPriority('low') && (
        <div className="w-2 h-2 rounded-full bg-green-500" />
      )}
    </div>
  );
};

export default CalendarDots;
