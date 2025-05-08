import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewTodoInput, TodoItem, TodoUpdateInput } from '@/types/todo-type';
import {
  addTodoDocument,
  deleteTodoDocument,
  getTodoDocument,
  updateTodoDocument,
} from '@/firebase/firebase';
import { useNotificationStore } from '@/store/NotificationStore'; // 알림 스토어 가져오기

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

// 오늘 날짜 확인 헬퍼 함수
const isToday = (date: Date | string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todoDate = new Date(date);
  return todoDate >= today && todoDate < tomorrow;
};

const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: async (todo, selectedDate) => {
        const newTodo = {
          ...todo,
          createdAt: selectedDate
            ? selectedDate.toISOString()
            : new Date().toISOString(),
          dueDate: selectedDate
            ? selectedDate.toISOString()
            : new Date().toISOString(),
          completed: false, // completed 필드 명시적 추가
        };

        try {
          const docRef = await addTodoDocument(newTodo);
          const todoWithId = { ...newTodo, id: docRef.id };

          // 로컬 스토어 업데이트
          set((state) => ({
            todos: [...state.todos, todoWithId],
          }));

          // 오늘의 할 일인 경우 알림 스토어에도 추가
          if (isToday(newTodo.dueDate)) {
            const notificationStore = useNotificationStore.getState();
            notificationStore.addTodoToNotification(todoWithId);

            // 오늘 처음 추가된 할 일이면 알림 표시
            if (
              notificationStore.shouldShowNotification() &&
              notificationStore.todayTodos.length === 1
            ) {
              notificationStore.toggleTodoNotification();
            }
          }

          return docRef.id;
        } catch (error) {
          console.error('Todo 추가 중 오류 발생:', error);
        }
      },

      updateTodo: async (id, updatedTodo) => {
        try {
          await updateTodoDocument(id, updatedTodo);

          // 기존 투두 찾기
          const todos = get().todos;
          const existingTodo = todos.find((t) => t.id === id);

          // 로컬 스토어 업데이트
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, ...updatedTodo } : t
            ),
          }));

          // 알림 스토어 업데이트
          const notificationStore = useNotificationStore.getState();
          const todayTodos = notificationStore.todayTodos;
          const todoInNotification = todayTodos.find((t) => t.id === id);

          if (todoInNotification) {
            // 이미 알림에 있으면 업데이트 또는 제거
            if (
              updatedTodo.status === 'done' ||
              updatedTodo.completed === true
            ) {
              // 완료된 경우 알림에서 제거
              notificationStore.removeTodoFromNotification(id);
            } else {
              // 그 외의 업데이트는 알림에도 반영
              const updatedNotificationTodos = todayTodos.map((t) =>
                t.id === id ? { ...t, ...updatedTodo } : t
              );
              notificationStore.setTodayTodos(updatedNotificationTodos);
            }
          } else if (existingTodo) {
            // 알림에 없지만 오늘 날짜로 변경된 경우 추가
            const updatedDueDate = updatedTodo.dueDate || existingTodo.dueDate;

            if (
              isToday(updatedDueDate) &&
              updatedTodo.status !== 'done' &&
              updatedTodo.completed !== true
            ) {
              // 업데이트된 전체 투두 객체 생성
              const fullUpdatedTodo = { ...existingTodo, ...updatedTodo };
              notificationStore.addTodoToNotification(fullUpdatedTodo);
            }
          }
        } catch (error) {
          console.error('Error updating todo: ', error);
        }
      },

      deleteTodo: async (id) => {
        try {
          await deleteTodoDocument(id);

          // 로컬 스토어에서 삭제
          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
          }));

          // 알림 스토어에서도 삭제
          useNotificationStore.getState().removeTodoFromNotification(id);

          console.log('Firebase에 연동되어 있는 투두 아이템 삭제');
        } catch (error) {
          console.error('데이터를 삭제하는데 문제가 발생하였습니다.', error);
        }
      },

      //🚀 [Drag&Drop Refactor]
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

          // 오늘의 할 일을 알림 스토어에 설정
          const todayTodos = todos.filter(
            (todo) =>
              isToday(todo.dueDate as string) &&
              todo.status !== 'done' &&
              todo.completed !== true
          );

          const notificationStore = useNotificationStore.getState();
          notificationStore.setTodayTodos(todayTodos);

          // 오늘 처음 로드하고 할 일이 있으면 알림 표시
          if (
            notificationStore.shouldShowNotification() &&
            todayTodos.length > 0
          ) {
            notificationStore.toggleTodoNotification();
          }
        } catch (error) {
          console.error(
            'firebase에서 데이터를 받아오는 데, 문제가 발생하였습니다.',
            error
          );

          // Firebase 오류 시 로컬 상태만 사용
          const todos = get().todos;

          // 오늘의 할 일을 알림 스토어에 설정
          const todayTodos = todos.filter(
            (todo) =>
              isToday(todo.dueDate as string) &&
              todo.status !== 'done' &&
              todo.completed !== true
          );

          useNotificationStore.getState().setTodayTodos(todayTodos);
        }
      },
    }),

    {
      name: 'todo-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useTodoStore;
