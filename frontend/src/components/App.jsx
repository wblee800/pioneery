import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Info from "./Info"

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Info" element={<Info />} />
    </Routes>
  </Router>
);

export default App;