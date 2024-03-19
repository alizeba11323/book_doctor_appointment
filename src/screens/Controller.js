import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home baseUrl={baseUrl} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Controller;
