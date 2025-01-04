import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Form from "./Form"
import Sum from "./Sum"

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Sum" element={<Sum />} />
    </Routes>
  </Router>
);

export default App;