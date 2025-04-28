import KanbanColumn from '@/components/KanbanColumn';
import useTodoStore from '@/store/todoStore';
import { createKanbanColumns } from '@/utils/createKanbanColumns';
import React, { useEffect, useMemo } from 'react';

const KanbanBoard = () => {
  const todos = useTodoStore((state) => state.todos);
  const getTodos = useTodoStore((state) => state.getTodos);

  const columns = useMemo(() => createKanbanColumns(todos), [todos]);
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto p-4 text-gray-200">
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
