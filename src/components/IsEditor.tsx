import useTodoStore from '@/store/todoStore';
import React, { useEffect, useState } from 'react';
import { TodoItem } from '@/types/todo-type';

interface IsEditorProps {
  todo: TodoItem;
  onCancel: () => void;
}
const IsEditor = ({ todo, onCancel }: IsEditorProps) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const [editTitle, setEditTitle] = useState(todo.title || '');
  const [editDescription, setEditDescription] = useState(
    todo.description || ''
  );

  useEffect(() => {
    setEditTitle(todo.title || '');
    setEditDescription(todo.description || '');
  }, [todo]);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    updateTodo(todo.id, {
      ...todo,
      title: editTitle,
      description: editDescription,
    });
    onCancel();
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="제목 변경 (필수)"
        className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />

      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="설명 추가 (선택사항)"
        className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors duration-200"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default IsEditor;
