// stores/notificationStore.ts
import { create } from 'zustand';
import { TodoItem } from '@/types/todo-type';
import { persist } from 'zustand/middleware'; // zustand persist 미들웨어 사용

interface NotificationState {
  // 알림 상태
  showTodoNotification: boolean;
  todayTodos: TodoItem[];
  unreadCount: number;
  isHoveringIcon: boolean;

  // 액션
  setTodayTodos: (todos: TodoItem[]) => void;
  addTodoToNotification: (todo: TodoItem) => void; // 새 할 일 추가 함수
  removeTodoFromNotification: (id: string) => void; // 할 일 제거 함수
  setUnreadCount: (count: number) => void;
  setHoveringIcon: (isHovering: boolean) => void;
  toggleTodoNotification: () => void;
  dismissTodoNotification: () => void;

  // 로컬 스토리지 관련
  lastNotificationTime: Date | null;
  updateLastNotificationTime: () => void;
  shouldShowNotification: () => boolean;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      showTodoNotification: false,
      todayTodos: [],
      unreadCount: 0,
      isHoveringIcon: false,
      lastNotificationTime: null,

      // 액션
      setTodayTodos: (todos) => {
        // 오늘 날짜의 할 일만 필터링
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 오늘 날짜의 미완료 할 일만 필터링
        const todayTodos = todos.filter((todo) => {
          const dueDate = new Date(todo.dueDate as Date);
          return (
            dueDate >= today && dueDate < tomorrow && todo.status !== 'done'
          );
        });

        set({ todayTodos: todayTodos });
        set({ unreadCount: todayTodos.length });
      },

      // 새로운 할 일 추가 함수
      addTodoToNotification: (todo) => {
        // 오늘 날짜의 할 일인지 확인
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dueDate = new Date(todo.dueDate as Date);

        // 오늘 날짜의 미완료 할 일만 추가
        if (dueDate >= today && dueDate < tomorrow && todo.status !== 'done') {
          set((state) => ({
            todayTodos: [...state.todayTodos, todo],
            unreadCount: state.unreadCount + 1,
          }));
        }
      },

      // 할 일 제거 함수
      removeTodoFromNotification: (id) => {
        set((state) => {
          const updatedTodos = state.todayTodos.filter(
            (todo) => todo.id !== id
          );
          return {
            todayTodos: updatedTodos,
            unreadCount: updatedTodos.length,
          };
        });
      },

      setUnreadCount: (count) => set({ unreadCount: count }),

      setHoveringIcon: (isHovering) => set({ isHoveringIcon: isHovering }),

      toggleTodoNotification: () =>
        set((state) => ({
          showTodoNotification: !state.showTodoNotification,
        })),

      dismissTodoNotification: () => {
        set({ showTodoNotification: false });
        get().updateLastNotificationTime();
      },

      // 마지막 알림 시간 업데이트
      updateLastNotificationTime: () => {
        const now = new Date();
        set({ lastNotificationTime: now });
      },

      // 알림을 표시해야 하는지 확인
      shouldShowNotification: () => {
        const { lastNotificationTime } = get();
        const now = new Date();

        // 오늘 날짜의 시작 시간 (00:00:00)
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        // 마지막 알림이 없거나, 마지막 알림이 오늘 이전이면 true
        return (
          !lastNotificationTime || new Date(lastNotificationTime) < todayStart
        );
      },
    }),
    {
      name: 'todo-notification-storage', // 로컬 스토리지 키 이름
      partialize: (state) => ({
        todayTodos: state.todayTodos,
        lastNotificationTime: state.lastNotificationTime,
        unreadCount: state.unreadCount,
      }), // 저장할 상태 선택
    }
  )
);
