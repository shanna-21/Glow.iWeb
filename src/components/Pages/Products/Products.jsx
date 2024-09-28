import React from "react";
import Navbar from "../../../components/Navbar/Navbar";

import "./Products.css";
import {useNavigate} from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const handleTakeQuiz = () => {
    navigate("/quiz");
  };
  return (
    <div>
      <Navbar />
      <div className="container-form">
        <div className="content-form">
          <h1>Hi, Tiffany!</h1>
          <p>You're almost there!</p>
          <img
            src="https://path-to-your-jellyfish-image.png"
            alt="Jellyfish Icon"
            className="jellyfish-icon-form"
          />
          <p className="message-form">
            Please take the following questionnaire to help us get to know your
            skin better!
          </p>
          <button className="take-quiz-btn-form" onClick={handleTakeQuiz}>
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
