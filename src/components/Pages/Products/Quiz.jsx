import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Quiz.css";
import successmascot from "../../../assets/mascot-2.png";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSkincareRoutine, setSelectedSkincareRoutine] = useState(null);
  const [skincareConcern, setSkincareConcern] = useState([]);
  const [eyeAreaConcern, setEyeAreaConcern] = useState(null);
  const [skinType, setSkinType] = useState(null);
  const [skinSensitive, setSkinSensitive] = useState(null);
  const [hasAllergy, setHasAllergy] = useState(null);
  const [allergyInput, setAllergyInput] = useState("");
  const [email, setEmail] = useState("");

  const submitData = async () => {
    const formData = {
      selectedDate,
      selectedGender,
      selectedSkincareRoutine,
      skincareConcern,
      eyeAreaConcern,
      skinType,
      skinSensitive,
      hasAllergy,
      allergyInput,
      email,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Data submitted:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === 10) {
      submitData();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkincareConcern = (concern) => {
    if (skincareConcern.includes(concern)) {
      setSkincareConcern(skincareConcern.filter((item) => item !== concern));
    } else {
      setSkincareConcern([...skincareConcern, concern]);
    }
  };

  const isNextEnabled = () => {
    if (currentQuestion === 1) {
      return selectedDate !== null;
    } else if (currentQuestion === 2) {
      return selectedGender !== null;
    } else if (currentQuestion === 3) {
      return selectedSkincareRoutine !== null;
    } else if (currentQuestion === 4) {
      return skincareConcern.length > 0;
    } else if (currentQuestion === 5) {
      return eyeAreaConcern !== null;
    } else if (currentQuestion === 6) {
      return skinType !== null;
    } else if (currentQuestion === 7) {
      return skinSensitive !== null;
    } else if (currentQuestion === 8) {
      return (
        hasAllergy === "No" || (hasAllergy === "Yes" && allergyInput !== "")
      );
    } else if (currentQuestion === 9) {
      return email !== "";
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
            className="datepicker-input"
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

      {currentQuestion === 3 && (
        <>
          <p>What kind of skincare routine are you looking for?</p>
          <div className="gender-options">
            <button
              className={`gender-btn ${
                selectedSkincareRoutine === "Keep it simple - Im a basic person"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedSkincareRoutine("Keep it simple - Im a basic person")
              }
            >
              Keep it simple - Im a basic person
            </button>
            <button
              className={`gender-btn ${
                selectedSkincareRoutine ===
                "Advanced skincare - I’m ready to level up my routine"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedSkincareRoutine(
                  "Advanced skincare - I’m ready to level up my routine"
                )
              }
            >
              Advanced skincare - I’m ready to level up my routine
            </button>
            <button
              className={`gender-btn ${
                selectedSkincareRoutine ===
                "I dont know 😭 - I’m new to skincare"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedSkincareRoutine(
                  "I dont know 😭 - I’m new to skincare"
                )
              }
            >
              I dont know 😭 - I’m new to skincare
            </button>
          </div>
        </>
      )}

      {currentQuestion === 4 && (
        <>
          <p>What is your main skincare concern? Select one or more options.</p>
          <div className="skincare-concern-options">
            {[
              "Blemishes & breakout",
              "Uneven skin texture",
              "Fine lines & wrinkles",
              "Blackheads",
            ].map((concern) => (
              <button
                key={concern}
                className={`gender-btn ${
                  skincareConcern.includes(concern) ? "selected" : ""
                }`}
                onClick={() => handleSkincareConcern(concern)}
              >
                {concern}
              </button>
            ))}
          </div>
        </>
      )}

      {currentQuestion === 5 && (
        <>
          <p>Do you have any eye area concerns?</p>
          <div className="eye-area-options">
            {[
              "Dark circles",
              "Fine lines & wrinkles",
              "Under eye puffiness",
              "All three",
              "None",
            ].map((concern) => (
              <button
                key={concern}
                className={`gender-btn ${
                  eyeAreaConcern === concern ? "selected" : ""
                }`}
                onClick={() => setEyeAreaConcern(concern)}
              >
                {concern}
              </button>
            ))}
          </div>
        </>
      )}

      {currentQuestion === 6 && (
        <>
          <p>Which of the below best describes your skin type?</p>
          <div className="skin-type-options">
            {["Combination", "Dry skin", "Normal skin", "Oily skin"].map(
              (type) => (
                <button
                  key={type}
                  className={`gender-btn ${
                    skinType === type ? "selected" : ""
                  }`}
                  onClick={() => setSkinType(type)}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </>
      )}
      {currentQuestion === 7 && (
        <>
          <p>Is your skin sensitive?</p>
          <div className="skin-senstive-options">
            <button
              className={`gender-btn ${
                skinSensitive === "Yes" ? "selected" : ""
              }`}
              onClick={() => setSkinSensitive("Yes")}
            >
              Yes
            </button>
            <button
              className={`gender-btn ${
                skinSensitive === "No" ? "selected" : ""
              }`}
              onClick={() => setSkinSensitive("No")}
            >
              No
            </button>
            <button
              className={`gender-btn ${
                skinSensitive === "A Little" ? "selected" : ""
              }`}
              onClick={() => setSkinSensitive("No")}
            >
              A Little
            </button>
          </div>
        </>
      )}
      {currentQuestion === 8 && (
        <>
          <p>Do you have any allergy?</p>
          <div className="allergy-options">
            <button
              className={`gender-btn ${hasAllergy === "Yes" ? "selected" : ""}`}
              onClick={() => setHasAllergy("Yes")}
            >
              Yes
            </button>
            <button
              className={`gender-btn ${hasAllergy === "No" ? "selected" : ""}`}
              onClick={() => setHasAllergy("No")}
            >
              No
            </button>
          </div>
          {hasAllergy === "Yes" && (
            <div className="allergy-input">
              <input
                type="text"
                placeholder="Type your allergy"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
              />
            </div>
          )}
        </>
      )}

      {currentQuestion === 9 && (
        <>
          <p>Would you like your skincare routine sent to your email?</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="email-input"
          />
        </>
      )}

      {currentQuestion === 10 && (
        <>
          <h2>You’re all set!</h2>
          <img src={successmascot} alt="Success" />
        </>
      )}
      <div className="container-bottom-form-quiz">
        <button className="back-button" onClick={handleBack}>
          &#8592;
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!isNextEnabled()}
        >
          &#8594;
        </button>
      </div>
      <h6>{currentQuestion} of 10</h6>
    </div>
  );
}

export default Quiz;
