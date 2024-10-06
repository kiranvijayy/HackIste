import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";

import Auth from "./pages/Auth/Auth.jsx";

import Reg from "./pages/Reg/Reg.jsx";


const App = () => {
  return (
    <Router>
      <div className="container justify-center" style={{ margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Self-closing */}
         
          

          <Route path='/auth' element={<Auth />} /> {/* Self-closing */}

          <Route path='/Register' element={<Reg />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
