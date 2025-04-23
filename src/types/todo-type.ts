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
}

export interface NewTodoInput {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date;
}

export interface TodoUpdateInput {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  category?: TodoCategory;
}
