import KanbanColumn from '@/components/KanbanColumn';
import useTodoStore from '@/store/todoStore';
import React from 'react';

const KanbanBoard = () => {
  const todos = useTodoStore((state) => state.todos);

  const todoItems = todos.filter((todo) => todo.status === 'todo');
  const inProgressItems = todos.filter((todo) => todo.status === 'inProgress');
  const doneItems = todos.filter((todo) => todo.status === 'done');

  const columns = [
    {
      title: `할 일 (${todoItems.length})`,
      status: 'todo',
      items: todoItems,
      color: 'bg-gray-800',
    },
    {
      title: `진행 중 (${inProgressItems.length})`,
      status: 'inProgress',
      items: inProgressItems,
      color: 'bg-gray-800',
    },
    {
      title: `완료 (${doneItems.length})`,
      status: 'done',
      items: doneItems,
      color: 'bg-gray-800',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto p-4 bg-gray-900 text-gray-200">
      {columns.map((column) => (
        <div
          key={column.status}
          className="min-w-[300px] flex-1 mb-4 md:mb-0 bg-gray-800 rounded-lg"
        >
          <KanbanColumn
            title={column.title}
            status={column.status}
            items={column.items}
            color={column.color}
          />
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
