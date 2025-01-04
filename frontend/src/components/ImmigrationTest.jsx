import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; // Markdown 변환 라이브러리

const ImmigrationAnswer = () => {
  const [content, setContent] = useState(''); // 전체 응답 내용을 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // EventSource를 사용하여 스트리밍 데이터 수신
        const response = await fetch('/api/search/ai/immigration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stream: true }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader(); // 스트리밍 데이터 reader
        const decoder = new TextDecoder('utf-8');
        let fullContent = ''; // 응답 내용을 저장

        while (true) {
          const { done, value } = await reader.read();
          // 스트림이 종료되면 break
          if (done) break;

          // 받은 데이터를 디코딩
          const chunk = decoder.decode(value, { stream: true });

          // 스트림 데이터에서 `data: ...` 만 추출
          chunk.split('\n').forEach((line) => {
            if (line.startsWith('data:')) {
              const data = line.replace('data: ', '').trim();

              // 스트리밍 종료 지점인 [DONE] 무시
              if (data === '[DONE]') return;

              // JSON 파싱 후 내용 저장
              try {
                const parsed = JSON.parse(data);
                fullContent += parsed.content;

                // Markdown -> HTML 변환 후 저장
                const htmlContent = marked.parse(fullContent);
                setContent(htmlContent); // HTML로 렌더링
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

    // cleanup effect
    return () => {
      // 필요 시 추가적인 종료 처리 작성
    };
  }, []);

  return (
    <div>
      <h1>AI Immigration Answer</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 스트리밍된 데이터를 실시간으로 표시 (HTML로 렌더링) */}
      <div
        style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ImmigrationAnswer;