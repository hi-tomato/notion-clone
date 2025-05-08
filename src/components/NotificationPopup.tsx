// components/notifications/NotificationPopup.tsx
import React from 'react';
import { TodoItem } from '@/types/todo-type';
import Button from '@/components/ui/Button';

interface NotificationPopupProps {
  todos: TodoItem[];
  onClose: () => void;
}

const NotificationPopup = ({ todos, onClose }: NotificationPopupProps) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">방금 등록된 할 일</h3>
        <Button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          text="✕"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    todo.priority === 'high'
                      ? 'bg-red-500'
                      : todo.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />

                <h4 className="font-medium text-gray-800">{todo.title}</h4>
              </div>

              {todo.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {todo.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">
            오늘의 할 일이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
