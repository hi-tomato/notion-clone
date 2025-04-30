import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewTodoInput, TodoItem, TodoUpdateInput } from '@/types/todo-type';
import {
  addTodoDocument,
  deleteTodoDocument,
  getTodoDocument,
  updateTodoDocument,
} from '@/firebase/firebase';

interface TodoStore {
  todos: TodoItem[];
  dragOverItemId?: string | null;

  addTodo: (todo: NewTodoInput, selectedDate: Date) => void;
  updateTodo: (id: string, todo: TodoUpdateInput) => void;
  deleteTodo: (id: string) => void;
  setDragOverItemId: (id: string | null) => void;
  updateTodoOrder: (updates: { id: string; order: number }[]) => void;

  getTodos: () => Promise<void>;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: async (todo, selectedDate) => {
        const newTodo = {
          ...todo,
          createdAt: new Date().toISOString(),
          dueDate: selectedDate
            ? selectedDate.toISOString()
            : new Date().toISOString(),
        };

        try {
          const docRef = await addTodoDocument(newTodo);
          // 로컬 상태 업데이트 (Firebase에서 생성된 ID 사용)
          set((state) => ({
            todos: [...state.todos, { ...newTodo, id: docRef.id }],
          }));
          return docRef.id;
        } catch (error) {
          console.error('Todo 추가 중 오류 발생:', error);
        }
      },

      updateTodo: async (id, updatedTodo) => {
        try {
          await updateTodoDocument(id, updatedTodo);
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, ...updatedTodo } : t
            ),
          }));
        } catch (error) {
          console.error('Error updating todo: ', error);
        }
      },

      deleteTodo: async (id) => {
        try {
          await deleteTodoDocument(id);
          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
          }));
          console.log('Firebase에 연동되어 있는 투두 아이템 삭제');
        } catch (error) {
          console.error('데이터를 삭제하는데 문제가 발생하였습니다.', error);
        }
      },

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

      // firebase get Todos Documents
      getTodos: async () => {
        try {
          const todos = await getTodoDocument();
          set({ todos });
        } catch (error) {
          console.error(
            'firebase에서 데이터를 받아오는 데, 문제가 발생하였습니다.',
            error
          );
        }
      },
    }),

    {
      name: 'todo-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useTodoStore;
