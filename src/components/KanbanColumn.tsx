import TodoCard from '@/components/TodoCard';
import useTodoStore from '@/store/todoStore';
import { TodoItem, TodoStatus } from '@/types/todo-type';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

interface KanbanColumnProps {
  title: string;
  status: string;
  items: TodoItem[];
  color: string;
}

const KanbanColumn = ({ title, status, items, color }: KanbanColumnProps) => {
  const todos = useTodoStore((state) => state.todos);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const todoID = e.dataTransfer.getData('todoId');

    const draggedTodo = todos.find((t) => t.id === todoID);
    if (draggedTodo && draggedTodo.status !== status) {
      updateTodo(todoID, { status: status as TodoStatus });
    }
  };

  return (
    <div
      className="flex flex-col h-full rounded-lg overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`${color} px-4 py-3`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-200">{title}</h3>
          {status === 'todo' && (
            <button className="text-gray-400 hover:text-gray-200 transition-colors">
              <BiPlus size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="p-3 space-y-3 bg-gray-800 flex-grow">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-4 text-sm">
            표시할 항목이 없습니다.
          </div>
        ) : (
          items.map((item) => <TodoCard key={item.id} todo={item} />)
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
