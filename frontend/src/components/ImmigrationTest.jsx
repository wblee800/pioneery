import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked'; // Markdown 변환 라이브러리

const ImmigrationAnswer = () => {
  const [content, setContent] = useState(''); // 전체 HTML 응답 내용
  const [headings, setHeadings] = useState([]); // 목차(헤더) 정보
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const contentRef = useRef(null); // 본문 영역 참조

  const generateHeadings = (markdownContent) => {
    const headingRegex = /^(#{1,6})\s+(.*)/gm; // Markdown 헤딩(# ~ ######) 정규식
    const matches = [];
    let match;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const [_, hashes, title] = match; // '#' 개수와 제목
      const level = hashes.length; // 헤더 레벨 (# = 1, ## = 2, ...)
      const id = title.toLowerCase().replace(/\s+/g, '-'); // id를 생성
      matches.push({ level, title, id });
    }

    setHeadings(matches); // 목차 업데이트
  };

  const handleHeadingClick = (id) => {
    const element = document.getElementById(id); // 해당 id의 요소를 찾음
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 부드럽게 스크롤 이동
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/search/ai/immigration/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfo: {
              "age": 25,
              "name": "John Doe",
                "occupation": "Software Engineer",
                "country": "United States",
                "education": "Bachelor's Degree",
                "experience": "5 years",
                "language": "English",
                "family": "Single",

            },
            stream: true
          }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break; // 스트림이 종료되면 반복 종료

          const chunk = decoder.decode(value, { stream: true });

          chunk.split('\n').forEach((line) => {
            if (line.startsWith('data:')) {
              const data = line.replace('data: ', '').trim();

              if (data === '[DONE]') {
                setLoading(false);
                return;
              }

              try {
                const parsed = JSON.parse(data);
                fullContent += parsed.content;

                generateHeadings(fullContent); // 헤더 생성
                const htmlContent = marked.parse(fullContent);
                setContent(htmlContent); // HTML로 렌더링 업데이트
              } catch (e) {
                console.error('Error parsing stream chunk:', e);
              }
            }
          });
        }
      } catch (err) {
        console.error('Error while streaming data:', err);
        setError('An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* 목차를 사이드바에 렌더링 */}
      <div
        style={{
          width: '20%',
          padding: '10px',
          borderRight: '1px solid #ddd',
          overflowY: 'auto', // 목차 영역만 스크롤 가능
          position: 'sticky',
          top: 0, // 목차가 화면에 고정되도록 설정
          maxHeight: '100vh',
        }}
      >
        <h2>Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{
                marginLeft: `${(heading.level - 1) * 10}px`,
                cursor: 'pointer',
              }}
              onClick={() => handleHeadingClick(heading.id)} // 목차 클릭 이벤트
            >
              {/* 제목을 HTML로 렌더링 */}
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(heading.title),
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* 본문 컨텐츠 */}
      <div
        style={{ width: '80%', padding: '20px', overflowY: 'auto' }}
        ref={contentRef}
      >
        <h1>AI Immigration Answer</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div
          style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ImmigrationAnswer;