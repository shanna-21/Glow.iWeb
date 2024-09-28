import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleNext = () => {
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isNextEnabled = () => {
    if (currentQuestion === 1) {
      return selectedDate !== null;
    } else if (currentQuestion === 2) {
      return selectedGender !== null;
    }
    return true;
  };

  return (
    <div className="quiz-container">
      <h1>Question {currentQuestion}</h1>

      {currentQuestion === 1 && (
        <>
          <p>What's your date of birth?</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select Date"
          />
        </>
      )}

      {currentQuestion === 2 && (
        <>
          <p>What gender do you relate to?</p>
          <div className="gender-options">
            <button
              className={`gender-btn ${
                selectedGender === "Male" ? "selected" : ""
              }`}
              onClick={() => setSelectedGender("Male")}
            >
              Male
            </button>
            <button
              className={`gender-btn ${
                selectedGender === "Female" ? "selected" : ""
              }`}
              onClick={() => setSelectedGender("Female")}
            >
              Female
            </button>
          </div>
        </>
      )}

      <div className="quiz-navigation">
        {currentQuestion > 1 && (
          <button className="back-btn" onClick={handleBack}>
            &#8592; Back
          </button>
        )}
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!isNextEnabled()}
        >
          Next &#8594;
        </button>
      </div>

      <p>{currentQuestion} of 10</p>
    </div>
  );
}

export default Quiz;
