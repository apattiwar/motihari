import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to MyApp</h1>
        <p>Your simple authentication system with role-based access</p>
        <div className="landing-buttons">
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
