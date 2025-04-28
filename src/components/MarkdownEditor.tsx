import React, { useState, ChangeEvent } from 'react'; // ChangeEvent 타입을 가져옵니다.
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const MarkdownEditor: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMarkdownText(event.target.value);
  };
  // Tailwind 클래스를 적용할 커스텀 컴포넌트들 정의
  const components = {
    // H1 태그에 Tailwind 클래스 적용
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />
    ),
    // H2 태그에 Tailwind 클래스 적용
    h2: ({ node, ...props }) => (
      <h2
        className="text-xl font-semibold mt-5 mb-2 border-b pb-1"
        {...props}
      />
    ),
    // H3 태그에 Tailwind 클래스 적용
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
    ),
    // P 태그에 Tailwind 클래스 적용
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-relaxed" {...props} />
    ),
    // A (링크) 태그에 Tailwind 클래스 적용
    a: ({ node, ...props }) => (
      <a className="text-blue-600 hover:underline" {...props} />
    ),
    // UL (순서 없는 목록) 태그에 Tailwind 클래스 적용
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside mb-4 pl-5" {...props} />
    ),
    // OL (순서 있는 목록) 태그에 Tailwind 클래스 적용
    ol: ({ node, ...props }) => (
      <ol className="list-decimal list-inside mb-4 pl-5" {...props} />
    ),
    // LI (목록 아이템) 태그에 Tailwind 클래스 적용
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    // Blockquote 태그에 Tailwind 클래스 적용
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic my-4"
        {...props}
      />
    ),
    // 코드 블록 (pre -> code)
    // rehypeHighlight와 함께 사용할 때 className, children 등을 prop으로 받게 됩니다.
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      // 인라인 코드가 아니고, language 클래스가 있을 경우 (코드 블록인 경우)
      if (!inline && match) {
        return (
          // pre 태그에 Tailwind 클래스 적용
          <pre
            className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4"
            {...props}
          >
            {/* code 태그에는 rehype-highlight가 추가한 클래스 유지 및 추가 스타일 (선택 사항) */}
            {/* children 안에 rehype-highlight가 만든 <span> 태그들이 포함됩니다. */}
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        );
      }
      // 인라인 코드인 경우
      return (
        // 인라인 코드에 Tailwind 클래스 적용
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
    <div className="markdown-container">
      <div className="markdown-input-pane">
        <h2>Markdown Input</h2>
        <textarea
          className="markdown-textarea"
          value={markdownText}
          onChange={handleInputChange}
          placeholder="Enter your Markdown here..."
          rows={10}
          cols={50}
        />
      </div>
      <div className="markdown-preview-pane">
        <h2>Preview</h2>
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]} // 문법 강조 필요시 유지
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
