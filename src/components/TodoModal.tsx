import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import useToast from '@/store/toastStore';
import useTodoStore from '@/store/todoStore';
import { TodoCategory, TodoPriority, TodoStatus } from '@/types/todo-type';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TodoModalProps {
  modalStatus: boolean;
  closeModal: () => void;
  showToast?: (message: string, type: 'success' | 'error' | 'info') => void;
  selectedDate?: Date | null;
}

const TodoModal = ({
  modalStatus,
  closeModal,
  selectedDate,
}: TodoModalProps) => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<TodoStatus>('todo');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [category, setCategory] = useState<TodoCategory>('work');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length === 0) return;

    const todoDate = selectedDate || new Date();
    addTodo(
      {
        id: uuidv4(),
        title,
        description,
        status,
        priority,
        category,
        createdAt: todoDate,
        // dueDate: todoDate,
      },
      todoDate
    );

    // 폼 초기화
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('work');
    setStatus('todo');

    useToast.getState().showToast('할 일이 추가되었습니다', 'success');

    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  if (!modalStatus) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] backdrop-filter backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-[var(--card-border)]">
          <h2 className="text-xl font-bold">New Task</h2>
          <Button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            text="x"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <Select<TodoStatus>
            label="상태"
            className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg)]"
            aria-label="status"
            value={status}
            options={[
              { value: 'todo', label: '할 일' },
              { value: 'inProgress', label: '진행 중' },
              { value: 'done', label: '완료' },
            ]}
            onChange={(value) => setStatus(value)}
          />

          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <Input
              type="text"
              placeholder="할 일을 입력하세요."
              value={title}
              onChange={(value) => setTitle(value)}
              className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              자세한 내용
            </label>
            <textarea
              placeholder="상세 설명 (선택사항)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg)]"
            />
          </div>

          <Select<TodoPriority>
            label="중요도"
            value={priority}
            onChange={(value) => setPriority(value)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg)]"
          />

          <Select<TodoCategory>
            label="카테고리"
            value={category}
            onChange={(value) => setCategory(value)}
            options={[
              { value: 'work', label: '업무' },
              { value: 'personal', label: '개인' },
              { value: 'study', label: '공부' },
            ]}
          />

          {/*💄 Modal: Cancel, Submit (Button) */}
          <div className="flex space-x-2 pt-2">
            <Button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              text="취소"
            />
            <Button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              text="추가하기"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
