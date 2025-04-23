import TodoCard from '@/components/TodoCard';
import { TodoItem } from '@/types/todo-type';
import React from 'react';

interface KanbanColumnProps {
  title: string;
  status: string;
  items: TodoItem[];
}

const KanbanColumn = ({ title, items }: KanbanColumnProps) => {
  return (
    <div>
      <h3>
        {title} ({items.length})
      </h3>

      <div>
        {items.length === 0 ? (
          <p>표시할 항목이 없습니다.</p>
        ) : (
          items.map((item) => <TodoCard key={item.id} todo={item} />)
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
