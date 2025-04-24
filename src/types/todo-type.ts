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
  createdAt: Date;
  progress?: number;
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
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  category?: TodoCategory;
  progress?: number;
  createdAt?: Date;
}
