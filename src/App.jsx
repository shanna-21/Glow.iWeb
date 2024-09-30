import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import Products from "./components/Pages/Products/Products";
import Community from "./components/Pages/Community/Community";
import Profile from "./components/Pages/Profile/Profile";
import Quiz from "./components/Pages/Products/Quiz";

const App = () => {
  console.log("Home component rendered");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-quiz" element={<Products />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
