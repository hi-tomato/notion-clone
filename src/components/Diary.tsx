import MarkdownEditor from '@/components/MarkdownEditor';
import PreviewDiary from '@/components/DiaryPreview';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import React, { useState } from 'react';
import { BiBookOpen, BiCalendar } from 'react-icons/bi';

const Diary = () => {
  const [showTip, setShowTip] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showPreview, setShowPreview] = useState<boolean>(false);

  if (showPreview) return <PreviewDiary />;

  return (
    <div className="bg-gray-800 p-6 md:p-10 rounded-xl shadow-xl w-full max-w-3xl mx-auto mt-10 text-white transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
        <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-3 text-white leading-snug">
          <BiBookOpen className="text-blue-400" size={28} />
          오늘 배운 것들을 기록해보세요!✌️
        </h2>
        <div className="text-gray-400 flex items-center text-sm md:text-base gap-2">
          <BiCalendar className="text-blue-400" size={18} />
          <span>{formatDate(new Date())}</span>
        </div>
      </div>

      {/* 상단에 Tip ToolBar */}
      {showTip && (
        <div className="bg-blue-900/20 p-4 md:p-6 rounded-lg mb-6 border-l-4 border-blue-500 backdrop-blur-sm">
          <div className="flex justify-between items-start gap-4">
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              <span className="font-semibold">TIP:</span> 오늘 배운 내용을
              기록하면 지식이 더 오래 기억됩니다. 구체적인 예시와 함께
              적어보세요!
            </p>
            <Button
              onClick={() => setShowTip(false)}
              className="text-gray-400 hover:text-white text-sm"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      <MarkdownEditor />
    </div>
  );
};

export default Diary;
