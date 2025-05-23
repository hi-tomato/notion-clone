import Button from '@/components/ui/Button';
import useDiaryStore from '@/store/useDiaryStore';
import React, { ChangeEvent } from 'react';
import { BiSave } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const MarkdownEditor: React.FC = () => {
  const navigate = useNavigate();
  const {
    markDownText,
    tags,
    setMarkDownText,
    setTags,
    saveDiary,
    showErrorToast,
    showSuccess,
    toast,
  } = useDiaryStore();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setMarkDownText(event.target.value);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTags(e.target.value);

  const handlePreview = () => {
    setMarkDownText(markDownText);
    setTags(tags);
    navigate('/diary/preview');
  };

  const handleSaved = async () => {
    if (markDownText.trim().length === 0 || tags.trim().length === 0) {
      showErrorToast('내용과 태그를 모두 입력해주세요.');
      return;
    }
    try {
      await saveDiary();
      setMarkDownText('');
      setTags('');
      showSuccess('오늘의 기록을 저장하였습니다.');
    } catch (error) {
      console.error('저장 중 오류가 발생', error);
      showErrorToast('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <textarea
          className="w-full p-4 bg-gray-700 text-white rounded-md min-h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={markDownText}
          onChange={handleInputChange}
          placeholder="Enter your Markdown here..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">
          태그 (쉼표로 구분)
        </label>
        <input
          type="text"
          value={tags}
          onChange={handleTagChange}
          placeholder="javascript, react, css..."
          className="w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <Button
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg shadow-sm transition-all flex items-center justify-center"
          onClick={handleSaved}
        >
          <BiSave className="mr-2" size={20} />
          기록하기
        </Button>
        <Button
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg border border-gray-600 text-base md:text-lg shadow-sm transition-all"
          text="미리보기"
          onClick={handlePreview}
        />

        {toast.showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
            {toast.successMessage}
          </div>
        )}

        {toast.showError && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg">
            {toast.errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
