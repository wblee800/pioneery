import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: #f9fafb;
    color: #333;
    display: flex;
    height: 100vh;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: #161b22;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: #ccc;
  margin-bottom: 15px;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover {
    color: white;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #eaf4fe;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background: #5c67f2;
  color: white;
  padding: 20px;
  font-size: 1.5rem;
  border-radius: 20px 20px 0 0;
`;

const Summary = styled.div`
  padding: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  text-align: justify;
  white-space: pre-wrap;
`;

const Compose = styled.div`
  padding: 20px;
  background: #f9fafb;
  display: flex;
  gap: 10px;
  border-top: 1px solid #ddd;
  border-radius: 0 0 20px 20px;
`;

const ComposeButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background: #5c67f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #4a56d2;
  }
`;

const SidebarHeadings = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarHeading = styled.li`
  margin-left: ${({ level }) => `${(level - 1) * 10}px`};
  cursor: pointer;
  color: ${({ level }) => (level === 1 ? 'white' : '#ccc')};
  &:hover {
    color: white;
  }
`;

function Sum() {
  const [content, setContent] = useState('');
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/search/ai/immigration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key1: "value1",
          key2: "value2",
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error while streaming data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <GlobalStyle />
      <Sidebar>
        <SidebarHeader>Pioneer</SidebarHeader>
        <SidebarLink href="#profile">Profile</SidebarLink>
        <SidebarLink href="#skills">Skills</SidebarLink>
        <SidebarLink href="#summary">Summary</SidebarLink>
        <SidebarLink href="#recommendations">Recommendations</SidebarLink>
        <h3>Navigation</h3>
        <SidebarHeadings>
          {headings.map((heading, index) => (
            <SidebarHeading
              key={index}
              level={heading.level}
              onClick={() => handleHeadingClick(heading.id)}
            >
              {heading.title}
            </SidebarHeading>
          ))}
        </SidebarHeadings>
      </Sidebar>
      <MainContent>
        <Header>Personalized Insights & Immigration Answer</Header>
        <Summary>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div
            id="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Summary>
        <Compose>
          <ComposeButton onClick={fetchData}>Reload Stream</ComposeButton>
        </Compose>
      </MainContent>
    </div>
  );
}

export default Sum;
