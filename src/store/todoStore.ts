import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { NewTodoInput, TodoItem, TodoUpdateInput } from '@/types/todo-type';

interface TodoStore {
  todos: TodoItem[];
  addTodo: (todo: NewTodoInput) => void;
  updateTodo: (id: string, todo: TodoUpdateInput) => void;
  deleteTodo: (id: string) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { ...todo, id: uuidv4(), createdAt: new Date() },
          ],
        })),

      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...updatedTodo } : t
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'todo-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useTodoStore;
