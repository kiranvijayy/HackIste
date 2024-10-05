import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";

const App = () => {
  return (
    <Router>
      <div className="container justify-center" style={{ margin: "0 auto" }}>
        <Routes> {/* Updated from Switch to Routes */}
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
