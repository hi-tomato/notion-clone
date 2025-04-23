import useTodoStore from '@/store/todoStore';
import { TodoItem } from '@/types/todo-type';
import React, { useState } from 'react';

interface TodoCardProps {
  todo: TodoItem;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const { updateTodo, deleteTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setIsEditing(false);
              setEditTitle(todo.title);
            }}
            className="px-2 py-1 text-xs bg-gray-200 rounded"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <h4>{todo.title}</h4>
        <span>{todo.category}</span>
        <span>{todo.priority}</span>
      </div>

      <div>
        {todo.description && (
          <p className="text-bold text-gray-600 mb-2">{todo.description}</p>
        )}
      </div>

      <div>
        <div>
          <button onClick={() => setIsEditing(true)}>수정하기</button>
          <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
