import React, { useState } from 'react';
import { TodoItem } from '@/types/todo-type';
import useTodoStore from '@/store/todoStore';
import Editor from './IsEditor';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { formatDate } from '@/utils/formatDate';
import {
  getProgressColor,
  getTodoUpdateByProgress,
} from '@/utils/getProgressColor';

interface TodoCardProps {
  todo: TodoItem;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // 드래그되는 카드의 ID를 dataTransfer에 저장
    e.dataTransfer.setData('todoId', todo.id);
    // 드래그 효과 설정
    e.dataTransfer.effectAllowed = 'move';
  };

  const [isEditing, setIsEditing] = useState(false);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [progress, setProgress] = useState(todo.progress || 0);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);

    const updatedData = getTodoUpdateByProgress(todo, newProgress);
    updateTodo(todo.id, updatedData);
  };

  const handleCancelEdit = () => setIsEditing(false);

  if (isEditing) return <Editor todo={todo} onCancel={handleCancelEdit} />;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="flex flex-col">
        <h4 className="text-4xl font-semibold mb-2 text-gray-800 dark:text-white">
          {todo.title}
        </h4>
      </div>

      {todo.description && (
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {todo.description}
        </p>
      )}

      <div className="w-full mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-400">{progress}/10</span>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="10"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer transition-all duration-500 ease-in-out"
            style={{
              background: `linear-gradient(to right, ${getProgressColor(
                progress
              )} 0%, ${getProgressColor(progress)} ${progress * 10}%, #374151 ${
                progress * 10
              }%, #374151 100%)`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-3">
        <button>{formatDate(todo.createdAt)}</button>
        <button
          className="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200 flex items-center"
          onClick={() => setIsEditing(true)}
        >
          <BiEdit className="mr-1 text-sm" />
          수정
        </button>
        <button
          className="px-2 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-red-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white text-xs font-medium rounded transition-colors duration-200 flex items-center"
          onClick={() => deleteTodo(todo.id)}
        >
          <BiTrash className="mr-1 text-sm" />
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
