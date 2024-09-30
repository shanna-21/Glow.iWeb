import React from "react";
import "./Products.css";
import {useNavigate} from "react-router-dom";
import mascot from "../../../assets/mascot-1.png";
const Products = () => {
  const navigate = useNavigate();

  const handleTakeQuiz = () => {
    navigate("/quiz");
  };
  return (
    <div>
      <div className="container-form">
        <div className="content-form">
          <h1>Hi, Tiffany!</h1>
          <p>You're almost there!</p>
          <img
            src={mascot}
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
