import KanbanCardList from '@/components/KanbanCardList';
import KanbanColumn from '@/components/KanbanColumn';
import useTodoStore from '@/store/todoStore';
import React from 'react';

const KanbanBoard = () => {
  const todos = useTodoStore((state) => state.todos);

  const todoItems = todos.filter((todo) => todo.status === 'todo');
  const inProgressItems = todos.filter((todo) => todo.status === 'inProgress');
  const doneItems = todos.filter((todo) => todo.status === 'done');

  return (
    <div>
      <KanbanCardList />

      <KanbanColumn title="할 일" status="todo" items={todoItems} />
      <KanbanColumn
        title="진행 중"
        status="inProgress"
        items={inProgressItems}
      />
      <KanbanColumn title="완료" status="done" items={doneItems} />
    </div>
  );
};

export default KanbanBoard;
