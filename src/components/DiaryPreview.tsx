import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDiaryStore from '@store/useDiaryStore';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Button from '@/components/ui/Button';

const DiaryPreview = () => {
  const navigate = useNavigate();
  const { markDownText, tags } = useDiaryStore();

  const goBack = () => {
    navigate('/diary');
  };

  const components: Components = {
    h1: (props) => (
      <h1 className="text-2xl md:text-4xl font-bold mt-6 mb-2" {...props} />
    ),
    h2: (props) => (
      <h2
        className="text-xl md:text-3xl font-semibold mt-5 mb-2 border-b pb-1"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="text-lg md:text-2xl font-semibold mt-4 mb-2" {...props} />
    ),
    p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
    a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
    ul: (props) => (
      <ul className="list-disc list-inside mb-4 pl-5" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside mb-4 pl-5" {...props} />
    ),
    li: (props) => <li className="mb-1" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-blue-500 bg-blue-900/20 p-4 italic rounded-md my-4"
        {...props}
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        return (
          <pre
            className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4"
            {...props}
          >
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        );
      }
      return (
        <code
          className="bg-gray-200 text-red-600 px-1 py-0.5 rounded"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 md:p-10 shadow-lg w-full max-w-3xl mx-auto mt-10 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">미리보기 📖</h1>
          <p className="text-gray-400 text-sm md:text-base">
            작성한 내용을 한눈에 확인해보세요 ✨
          </p>
        </div>
        <Button
          onClick={goBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-md transition-all"
          text="편집으로 돌아가기"
        />
      </div>

      <div className="bg-gray-700 rounded-lg p-6 md:p-8 mb-6 text-white">
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markDownText}
        </ReactMarkdown>
      </div>

      {tags && (
        <div className="mt-8">
          <h3 className="text-lg md:text-2xl font-semibold mb-4 text-white">
            📌 태그 목록
          </h3>
          <div className="flex flex-wrap gap-3">
            {tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm md:text-base transition-colors"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryPreview;
