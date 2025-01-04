import React from 'react';
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

function App() {
  const generateCharacterByCharacterSummary = () => {
    const params = new URLSearchParams(window.location.search);
    const userData = Object.fromEntries(params.entries());

    const summaryElement = document.getElementById('summary-content');
    summaryElement.innerText = '';

    const insights = [];

    if (userData.age) {
      insights.push(`Based on your age (${userData.age}), there are many tailored immigration and job programs.`);
    }

    if (userData.job) {
      insights.push(`Your job as a ${userData.job} has great demand in both Canada and the US.`);
    }

    if (userData.language && userData.language !== 'none') {
      insights.push(`Having a ${userData.language} certificate can boost your chances in skilled worker programs.`);
    }

    if (userData.nationality) {
      insights.push(`As a citizen of ${userData.nationality}, there are specific agreements and opportunities.`);
    }

    if (userData.marital) {
      insights.push(`Your marital status (${userData.marital}) may influence visa or residency applications.`);
    }

    if (userData.linkedin || userData.github) {
      insights.push('Having profiles on LinkedIn or GitHub showcases your professional presence.');
    }

    // Combine elements of an array into a single string with '\n'
    let fullText = insights.join('\n\n');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        summaryElement.innerText += fullText[currentIndex]; // Add and output one letter at a time
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust speed as needed
  };

  return (
    <div style={{ display: 'flex' }}>
      <GlobalStyle />
      <Sidebar>
        <SidebarHeader>Pioneer</SidebarHeader>
        <SidebarLink href="#profile">Profile</SidebarLink>
        <SidebarLink href="#skills">Skills</SidebarLink>
        <SidebarLink href="#summary">Summary</SidebarLink>
        <SidebarLink href="#recommendations">Recommendations</SidebarLink>
      </Sidebar>
      <MainContent>
        <Header>Personalized Summary</Header>
        <Summary id="summary-content">
          Connecting to retrieve your personalized insights...
        </Summary>
        <Compose>
          <ComposeButton onClick={generateCharacterByCharacterSummary}>
            Reload Insights
          </ComposeButton>
        </Compose>
      </MainContent>
    </div>
  );
}

export default App;
