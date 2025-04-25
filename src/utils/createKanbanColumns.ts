import { TodoItem } from '@/types/todo-type';

export const createKanbanColumns = (todos: TodoItem[]) => {
  const todoItems = todos.filter((todo) => todo.status === 'todo');
  const inProgressItems = todos.filter((todo) => todo.status === 'inProgress');
  const doneItems = todos.filter((todo) => todo.status === 'done');

  return [
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
};
