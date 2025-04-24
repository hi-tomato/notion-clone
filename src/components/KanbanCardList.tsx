import useTodoStore from '@/store/todoStore';
import { TodoCategory, TodoPriority, TodoStatus } from '@/types/todo-type';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const KanbanCardList = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TodoStatus>('todo');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [category, setCategory] = useState<TodoCategory>('work');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length === 0) return;

    addTodo({
      id: uuidv4(),
      title,
      description,
      status,
      priority,
      category,
      createdAt: new Date(),
    });

    // 폼 초기화
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('work');
    setStatus('todo');

    console.log(useTodoStore.getState().todos);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4  rounded-lg shadow">
      <h2 className="text-xl font-bold">Todo</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">상태</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          aria-label="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
        >
          <option value="todo">할 일</option>
          <option value="inProgress">진행 중</option>
          <option value="done">완료</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">제목</label>
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          자세한 내용
        </label>
        <textarea
          placeholder="상세 설명 (선택사항)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          중요도
        </label>
        <select
          aria-label="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TodoPriority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          카테고리
        </label>
        <select
          aria-label="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TodoCategory)}
        >
          <option value="work">업무</option>
          <option value="personal">개인</option>
          <option value="study">공부</option>
        </select>

        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          추가하기
        </button>
      </div>
    </form>
  );
};

export default KanbanCardList;
