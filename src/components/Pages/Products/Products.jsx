import React, { useEffect, useState } from "react"; // Make sure to import useState and useEffect
import "./Products.css";
import { useNavigate } from "react-router-dom";
import mascot from "../../../assets/mascot-1.png";
import Hero from "./HeroQuiz";
import { auth, db } from "../../../../Backend/config"; // Ensure correct imports for auth and db
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

const Products = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null); // Initialize state for user details

  const handleTakeQuiz = () => {
    navigate("/quiz");
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Check if userDetails is null before accessing its properties
  return (
    <div>
      <div className="hero-container-take-quiz-first">
        <Hero />
      </div>
      <div className="container-form">
        <div className="content-form">
          {/* Check if userDetails is available before rendering */}
          {userDetails ? (
            <>
              <h1>Hi, {userDetails.firstName}!</h1>
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
            </>
          ) : (
            <p>Loading user data...</p> // Show a loading message or a placeholder while fetching user data
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
