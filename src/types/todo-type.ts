export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoStatus = 'todo' | 'inProgress' | 'done';
export type TodoCategory = 'work' | 'personal' | 'study';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date | string;
  dueDate?: Date | string;
  progress?: number;
  order?: number;
}

export interface NewTodoInput {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date;
  progress?: number;
}

export interface TodoUpdateInput {
  id?: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  category?: TodoCategory;
  createdAt?: Date | string; // Date 또는 string 허용
  progress?: number;
  order?: number;
  // 인덱스 시그니처 추가
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
