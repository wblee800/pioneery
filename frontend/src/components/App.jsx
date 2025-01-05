import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Form from "./Form"
import Sum from "./Sum"
import ImmigrationTest from "./ImmigrationTest";
import MapViewerTest from "./MapViewerTest";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Sum" element={<Sum />} />
      <Route path="/ImmigrationTest" element={<ImmigrationTest />} />
      <Route path="/MapTest" element={<MapViewerTest />} />
    </Routes>
  </Router>
);

export default App;