import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
const Error = () => {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate("/");
  };
  return (
    <>
      <div className="main-container">
        <div className="error">
          <h1>Error: Page not found.</h1>
          <button className="btn btn-primary" onClick={changeRoute}>
            Go to Landing Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
