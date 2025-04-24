import { TodoItem, TodoStatus } from '@/types/todo-type';

export const getProgressColor = (progress: number) => {
  if (progress < 3) return '#ef4444 '; // 노란색
  if (progress < 6) return '#eab308 '; // 초록색
  return '#22c55e'; // 빨간색
};

export const getStatusByProgress = (progress: number): TodoStatus => {
  if (progress >= 1 && progress <= 3) {
    return 'todo';
  } else if (progress >= 3 && progress <= 7) {
    return 'inProgress';
  } else if (progress >= 7 && progress <= 10) {
    return 'done';
  }
  return 'todo';
};

export const getTodoUpdateByProgress = (todo: TodoItem, progress: number) => {
  const status = getStatusByProgress(progress);

  return {
    ...todo,
    progress,
    status,
    createdAt: todo.createdAt,
  };
};
