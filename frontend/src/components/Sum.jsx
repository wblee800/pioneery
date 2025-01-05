import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import styled from 'styled-components';

const AppLayout = styled.main`
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f9fafc;
`;

const Sidebar = styled.aside`
  width: 20%;
  background: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  box-shadow: none;
  margin-right: 0;
  height: 100%;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;

  .sidebar-link {
    display: block;
    margin: 10px 0;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #1d72b8;
    }
  }
`;

const Content = styled.section`
  flex: 1;
  padding: 60px;
  background: linear-gradient(
    120deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 50%,
    rgba(234, 198, 214, 1) 100%
  );
  background-size: 400% 400%;
  animation: colorShift 20s ease infinite;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
  overflow-y: auto;
  transition: background 0.3s ease;

  @keyframes colorShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ProfileCard = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-out;
  position: relative;
`;

const ProfileHeader = styled.header`
  text-align: center;

  h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  .profile-title {
    margin: 5px 0;
    color: #6b7280;
    font-size: 1rem;
  }
`;

const ProgressBar = styled.div`
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  margin: 10px 0;

  .progress {
    height: 100%;
    background: #1d72b8;
    border-radius: 5px;
  }
`;

const Skills = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  li {
    background: #f3f4f6;
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 0.9rem;
    color: #374151;
  }
`;

const AnswerSection = styled.div`
  background: #ffffff;
  border-radius: 15px; /* Updated rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #111827;
  }

  .loading {
    color: #6b7280;
  }

  .error {
    color: red;
  }

  .markdown-body {
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
  }
`;

const Sum = () => {
  const [content, setContent] = useState('');
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  // Warn the user about page refresh
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Refreshing the page will return you to the Home page. Do you want to continue?';
    };

    // Attach the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Add the mousemove event listener to the profile card
  useEffect(() => {
    const profileCard = document.querySelector('.profile-card');

    const handleMouseMove = (e) => {
      const { left, top, width, height } = profileCard.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const rotateX = (y / height) * 10;
      const rotateY = -(x / width) * 10;
      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetTransform = () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    profileCard.addEventListener('mousemove', handleMouseMove);
    profileCard.addEventListener('mouseleave', resetTransform);

    return () => {
      profileCard.removeEventListener('mousemove', handleMouseMove);
      profileCard.removeEventListener('mouseleave', resetTransform);
    };
  }, []);

  const generateHeadings = (markdownContent) => {
    const headingRegex = /^(#{1,6})\s+(.*)/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const [_, hashes, title] = match;
      const level = hashes.length;
      const id = title.toLowerCase().replace(/\s+/g, '-');
      matches.push({ level, title, id });
    }

    setHeadings(matches);
  };

  const handleHeadingClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              age: 25,
              name: 'John Doe',
              occupation: 'Software Engineer',
              country: 'United States',
              education: "Bachelor's Degree",
              experience: '5 years',
              language: 'English',
              family: 'Single',
            },
            stream: true,
          }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

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

                generateHeadings(fullContent);
                const htmlContent = marked.parse(fullContent);
                setContent(htmlContent);
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
  }, []);

  return (
    <AppLayout>
      <Sidebar>
        <SidebarNav>
          <li><a href="#profile" className="sidebar-link">Profile</a></li>
          <li><a href="#messages" className="sidebar-link">Messages</a></li>
          <li><a href="#tests" className="sidebar-link">Tests</a></li>
          <li><a href="#projects" className="sidebar-link">Your projects</a></li>
        </SidebarNav>
      </Sidebar>

      <Content>
        <div className="profile-card" style={{ borderRadius: '15px', padding: '20px', background: '#fff', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-out' }}>
          <ProfileHeader>
            <h1>John Doe</h1>
            <p className="profile-title">Software Engineer</p>
          </ProfileHeader>
          <ProgressBar>
            <div className="progress" style={{ width: '75%' }}></div>
          </ProgressBar>
          <Skills>
            <li>JavaScript</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>TailwindCSS</li>
          </Skills>
        </div>

        <AnswerSection>
          <h1>AI Immigration Answer</h1>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </AnswerSection>
      </Content>
    </AppLayout>
  );
};

export default Sum;
