import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0D1117, #161B22);
  color: #ffffff;
}
`;

const Container = styled.div`
width: 90%;
max-width: 500px;
background: #161b22;
padding: 30px;
border-radius: 15px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
text-align: center;
`;

const Title = styled.h1`
font-size: 1.8rem;
margin-bottom: 20px;
`;

const Step = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  display: ${(props) => (props.active ? 'block' : 'none')};
`;

const Input = styled.input`
font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
display: block;
margin: 0 auto 20px auto;
padding: 10px;
width: 100%;
max-width: 250px;
font-size: 1rem;
border: 1px solid #30363d;
border-radius: 8px;
`;

const Select = styled.select`
font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
display: block;
margin: 0 auto 20px auto;
padding: 10px;
width: 100%;
max-width: 400px;
font-size: 1rem;
border: 1px solid #30363d;
border-radius: 8px;
`;

const Button = styled.button`
background: linear-gradient(90deg, #7F5AF0, #2CB1FF);
color: white;
border: none;
cursor: pointer;
padding: 10px 20px;
font-size: 1rem;
border-radius: 8px;
transition: transform 0.3s ease, box-shadow 0.3s ease;
&:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(88, 166, 255, 0.5);
}
`;

const WarningMessage = styled.div`
position: fixed;
bottom: 20px;
right: 20px;
display: flex;
align-items: center;
background: #161b22;
color: white;
padding: 10px 20px;
border-radius: 8px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
font-size: 0.9rem;
z-index: 1000;
`;

const WarningIcon = styled.div`
background: linear-gradient(135deg, #7F5AF0, #2CB1FF);
width: 30px;
height: 30px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
margin-right: 20px;
`;

const WarningText = styled.div`
  text-align: left;
  .warning-text {
    text-align: left;
    color: rgb(255, 255, 255, 0.5);
}
`;

const Form = () => {
  const navigate = useNavigate();
  const goToSum = () => {
    navigate('/ImmigrationTest', { state: formData });  // Pass formData to the Sum page
  };

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

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    job: '',
    etc_job: '',
    language: '',
    score: '',
    nationality: '',
    marital: '',
    spouse_nationality: '',
    linkedin: '',
    github: '',
    hobby: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hobby') {
      // Handle multiple hobbies using an array
      const updatedHobbies = [...formData.hobby];
      if (updatedHobbies.includes(value)) {
        // Remove the hobby selected already from the list
        const index = updatedHobbies.indexOf(value);
        updatedHobbies.splice(index, 1);
      } else {
        // Add a new hobby to the list
        updatedHobbies.push(value);
      }
      setFormData({
        ...formData,
        hobby: updatedHobbies,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const nextStep = (stepNumber) => {
    if (step === 1 && (formData.name === "")) {
      alert("Name cannot be empty.");
      return;
    }

    if (step === 2 && (formData.age === "" || formData.age < 0)) {
      alert("Age cannot be empty or negative.");
      return;
    }

    if (step === 3 && (formData.job === "" || (formData.job === "etc" && formData.etc_job === ""))) {
      alert("Job experience cannot be empty.");
      return;
    }

    if (step === 4 && (formData.language === "" || (formData.language !== "none" && formData.score === ""))) {
      alert("Please provide your language score. or select 'None'.");
      return;
    }

    if (step === 5 && formData.nationality === "") {
      alert("Nationality cannot be empty.");
      return;
    }

    if (step === 6 && formData.marital === "" || (formData.marital === "married" && formData.spouse_nationality === "")) {
      alert("Marital status cannot be empty. If married, please provide your spouse;s nationality.");
      return;
    }

    if (step === 7 && (formData.job === "etc" && formData.etc_hobby === "")) {
      alert("Please provide your hobbies.");
      return;
    }

    setStep(stepNumber);
  };

  const toggleScoreInput = () => {
    return (formData.language === "toefl" || formData.language === "ielts" || formData.language === "duolingo" || formData.language === "celpip" || formData.language === "tcf" || formData.language === "tef");
  };

  const toggleJobInput = () => {
    return formData.job === "etc";
  };

  const toggleSpouseNationalityInput = () => {
    return formData.marital === "married";
  };

  const toggleHobbyInput = () => {
    return formData.hobby.includes("etc");
  };

  const collectDataAndSubmit = (e) => {
    e.preventDefault();
    goToSum();  // Navigate to /sum with formData
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <form id="stepForm" onSubmit={collectDataAndSubmit}>
          <div>
            <Step active={step === 1}>
              <Title>What is your name?</Title>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              <Button type="button" onClick={() => nextStep(2)}>Next</Button>
            </Step>

            <Step active={step === 2}>
              <Title>What is your age?</Title>
              <Input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} min={0} required />
              <Button type="button" onClick={() => nextStep(3)}>Next</Button>
            </Step>

            <Step active={step === 3}>
              <Title>What is your work experience?</Title>
              <Select id="job" name="job" value={formData.job} onChange={handleInputChange} required>
                <option value="" disabled>Select your job</option>
                <option value="software_engineer">Software Engineer</option>
                <option value="web_frontend_engineer">Web Frontend Engineer</option>
                <option value="web_backend_engineer">Web Backend Engineer</option>
                <option value="gameplay_programmer">Gameplay Programmer</option>
                <option value="game_engine_programmer">Game Engine Programmer</option>
                <option value="etc">Etc</option>
              </Select>
              {toggleJobInput() && (
                <Input
                  type="text"
                  id="etc_job"
                  name="etc_job"
                  value={formData.etc_job}
                  onChange={handleInputChange}
                  placeholder="e.g. UI/UX Designer" />
              )}
              <Button type="button" onClick={() => nextStep(4)}>Next</Button>
            </Step>

            <Step active={step === 4}>
              <Title>Do you have a language certificate?</Title>
              <Select id="language" name="language" value={formData.language} onChange={handleInputChange} required>
                <option value="" disabled>Select your certificate</option>
                <option value="none">None</option>
                <option value="toefl">TOEFL</option>
                <option value="ielts">IELTS</option>
                <option value="duolingo">Duolingo</option>
                <option value="celpip">CELPIP</option>
                <option value="tcf">TCF</option>
                <option value="tef">TEF</option>
              </Select>
              {toggleScoreInput() && (
                <Input
                  type="text"
                  id="score"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  placeholder="e.g. IELTS-7.0, TOEFL-88" />
              )}
              <Button type="button" onClick={() => nextStep(5)}>Next</Button>
            </Step>

            <Step active={step === 5}>
              <Title>What is your nationality?</Title>
              <Select id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} required>
                <option value="" disabled>What is your nationality?</option>
                <option value="south_korea">South Korea</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
                <option value="canada">Canada</option>
                <option value="us">The US</option>
                <option value="mexico">Mexico</option>
              </Select>
              <Button type="button" onClick={() => nextStep(6)}>Next</Button>
            </Step>

            <Step active={step === 6}>
              <Title>What is your marital status?</Title>
              <Select id="marital" name="marital" value={formData.marital} onChange={handleInputChange} required>
                <option value="" disabled>Select your marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </Select>
              {toggleSpouseNationalityInput() && (
                <Select id="spouse_nationality" name="spouse_nationality" value={formData.spouse_nationality} onChange={handleInputChange} required>
                  <option value="" disabled>What is your spouse's nationality?</option>
                  <option value="south_korea">South Korea</option>
                  <option value="japan">Japan</option>
                  <option value="china">China</option>
                  <option value="canada">Canada</option>
                  <option value="us">The US</option>
                  <option value="mexico">Mexico</option>
                </Select>
              )}
              <Button type="button" onClick={() => nextStep(7)}>Next</Button>
            </Step>

            <Step active={step === 7}>
              <Title>Provide your LinkedIn and GitHub profiles (optional)</Title>
              <Input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="LinkedIn URL" />
              <Input type="url" id="github" name="github" value={formData.github} onChange={handleInputChange} placeholder="GitHub URL" />
              <Button type="button" onClick={() => nextStep(8)}>Next</Button>
            </Step>

            <Step active={step === 8}>
              <Title>What is your hobby? (optional)</Title>
              <Select
                id="hobby"
                name="hobby"
                value={formData.hobby}
                onChange={handleInputChange}
                multiple>
                <option value="" disabled>Select your hobbies</option>
                <option value="soccer">Soccer</option>
                <option value="swimming">Swimming</option>
                <option value="tennis">Tennis</option>
                <option value="weight_lifting">Weight Lifting</option>
                <option value="american_football">American Football</option>
                <option value="ice_hockey">Ice Hockey</option>
                <option value="badminton">Badminton</option>
                <option value="kickboxing">Kickboxing</option>
                <option value="etc">Etc</option>
              </Select>
              {toggleHobbyInput() && (
                <Input
                  type="text"
                  id="etc_hobby"
                  name="etc_hobby"
                  value={formData.etc_hobby}
                  onChange={handleInputChange}
                  placeholder="e.g. Zumba dance" />
              )}
              <Button type="submit">Submit</Button>
            </Step>
          </div>
        </form>

        <WarningMessage>
          <WarningIcon>!</WarningIcon>
          <WarningText>
            <div>Please do not refresh the page.</div>
            <div className="warning-text">All data will be lost.</div>
          </WarningText>
        </WarningMessage>
      </Container>
    </>
  );
};

export default Form;
