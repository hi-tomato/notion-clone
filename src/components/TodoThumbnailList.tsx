// TodoThumbnailList.tsx
import React from 'react';
import { TodoItem } from '@/types/todo-type';

interface TodoThumbnailListProps {
  todos: TodoItem[];
}

const TodoThumbnailList = ({ todos }: TodoThumbnailListProps) => {
  const displayTodos = todos.slice(0, 3);

  return (
    <div className="max-h-60 overflow-y-auto">
      {displayTodos.map((todo) => (
        <div
          key={todo.id}
          className="px-3 py-2 hover:bg-gray-50 flex items-center"
        >
          {/* 우선순위 표시 */}
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              todo.priority === 'high'
                ? 'bg-red-500'
                : todo.priority === 'medium'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          />

          {/* 투두 제목 */}
          <div className="flex-1 overflow-hidden">
            <p className="text-sm text-gray-800 truncate">{todo.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoThumbnailList;
