import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { NewTodoInput, TodoItem, TodoUpdateInput } from '@/types/todo-type';

interface TodoStore {
  todos: TodoItem[];
  dragOverItemId?: string | null;

  addTodo: (todo: NewTodoInput) => void;
  updateTodo: (id: string, todo: TodoUpdateInput) => void;
  deleteTodo: (id: string) => void;
  setDragOverItemId: (id: string | null) => void;
  updateTodoOrder: (updates: { id: string; order: number }[]) => void;
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

      //🚀 [Drag&Drop Refactor]
      // dragOverItem 타입을 추가해줘야함.
      setDragOverItemId: (id) => set({ dragOverItemId: id }),

      updateTodoOrder: (updates) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            const update = updates.find((u) => u.id === todo.id);
            return update ? { ...todo, order: update.order } : todo;
          }),
        })),
    }),

    {
      name: 'todo-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useTodoStore;
