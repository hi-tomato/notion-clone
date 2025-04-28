import TodoCard from '@/components/TodoCard';
import useTodoStore from '@/store/todoStore';
import { TodoItem, TodoStatus } from '@/types/todo-type';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
interface KanbanColumnProps {
  title: string;
  status: string;
  items: TodoItem[];
  color: string;
}

const KanbanColumn = ({ title, status, items, color }: KanbanColumnProps) => {
  const {
    todos,
    updateTodo,
    updateTodoOrder,
    dragOverItemId,
    setDragOverItemId,
  } = useTodoStore();
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('todoId');
    const draggedTodo = todos.find((t) => t.id === todoId);
    // Early Return: 드래그된 투두가 없을 땐, handleDrop 함수 종료
    if (!draggedTodo) return;
    // 다른 컬럼에 있는 투두를 가져올 때,
    if (draggedTodo.status !== status) {
      updateTodo(todoId, { status: status as TodoStatus });
    }

    if (dragOverItemId && dragOverItemId !== todoId) {
      // dragOverItemId && dragOverItemId !== todoId (다른 열에서 투두를 가져올 때)
      const columnItems = todos
        .filter((t) => t.status === status)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const draggedIndex = columnItems.findIndex((item) => item.id === todoId);
      const targetIndex = columnItems.findIndex(
        (item) => item.id === dragOverItemId
      );
      // FindIndex에서 찾을 수 없는 값은 -1이 출력된다. 따라서 조건문을 -1로 걸어준 것.
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newItems = [...columnItems];
        const [removed] = newItems.splice(draggedIndex, 1);
        // 기존 배열에서 아무것도 삭제하지 않고 targetIndex 위치에 removed 요소를 끼워넣는 작업.
        // targetIndex 위치와 그 이후의 요소들은 모두 한 칸씩 뒤로 밀리게 된다.
        newItems.splice(targetIndex, 0, removed);

        const updates = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));

        updateTodoOrder(updates);
      }
    }

    setDragOverItemId(null);
  };

  const sortedItems = [...items].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div
      className="flex flex-col h-full rounded-lg overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`${color} px-4 py-3`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-200">{title}</h3>
          {status === 'todo' && (
            <button className="text-gray-400 hover:text-gray-200 transition-colors">
              <BiPlus size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="p-3 space-y-3 bg-gray-800 flex-grow">
        {sortedItems.length === 0 ? (
          <div className="text-center text-gray-400 py-4 text-sm">
            표시할 항목이 없습니다.
          </div>
        ) : (
          sortedItems.map((item) => (
            <div key={item.id}>
              <TodoCard todo={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
