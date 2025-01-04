import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../build/static/images/logo.png';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  background: linear-gradient(135deg, #0D1117, #161B22);
  color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header {
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 200px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

footer {
  text-align: center;
  padding: 10px;
  font-size: 0.9rem;
  color: #888;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
`;

const StyledImg = styled.img`
  width: 200px;
`;

const StyledH1 = styled.h1.attrs({
  className: "background-text",
})`
  color: rgb(255, 255, 255, 0.2);
`

const StyledButton = styled.button.attrs({
  className: "cta-button",
})`
  background: linear-gradient(90deg, #7F5AF0, #2CB1FF);
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  color: #FFFFFF;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 210px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(88, 166, 255, 0.5);
  }
`

const Home = () => {
  const navigate = useNavigate();
  const goToForm = () => {
    navigate('/Form');
  };

  return (
    <div>
      <GlobalStyle />
      <header>
        <StyledImg src={logo} alt="Pioneer Logo" />
      </header>

      <main>
        <StyledH1>Welcome to Pioneer</StyledH1>
        <StyledButton onClick={goToForm}><b>Get Started</b></StyledButton>
      </main>

      <footer>
        <p>&copy; 2025 Pioneer. All rights reserved.</p>
      </footer>
    </div>);
};

export default Home;

