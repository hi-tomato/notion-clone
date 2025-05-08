import { useEffect } from 'react';
import { useNotificationStore } from '@/store/NotificationStore';
import { TodoItem } from '@/types/todo-type';

const useLocalTodos = () => {
  const { setTodayTodos, shouldShowNotification } = useNotificationStore();

  useEffect(() => {
    const loadTodosFromLocalStorage = () => {
      try {
        // 로컬 스토리지에서 전체 할 일 목록 가져오기
        const localTodosString = localStorage.getItem('todos');

        if (localTodosString) {
          const localTodos = JSON.parse(localTodosString);

          // 오늘 날짜 설정
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          // 오늘 날짜의 미완료 할 일 필터링
          const todayTodos = localTodos.filter((todo: TodoItem) => {
            const dueDate = new Date(todo.dueDate);
            return (
              dueDate >= today && dueDate < tomorrow && todo.status !== 'done'
            );
          });

          console.log('로컬 스토리지에서 로드한 오늘의 할 일:', todayTodos);

          // 알림 스토어에 설정
          setTodayTodos(todayTodos);

          // 알림 표시 여부 확인
          if (shouldShowNotification() && todayTodos.length > 0) {
            useNotificationStore.setState({ showTodoNotification: true });
          }
        }
      } catch (error) {
        console.error(
          '로컬 스토리지에서 할 일을 로드하는 중 오류 발생:',
          error
        );
      }
    };

    // 초기 로드
    loadTodosFromLocalStorage();

    // 로컬 스토리지 변경 이벤트 리스너
    const handleStorageChange = (e) => {
      if (e.key === 'todos') {
        loadTodosFromLocalStorage();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setTodayTodos, shouldShowNotification]);
};

export default useLocalTodos;
