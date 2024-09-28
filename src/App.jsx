import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import your pages
import Home from './components/Pages/Home/Home';
import Products from './components/Pages/Products/Products';
import Community from './components/Pages/Community/Community';
import Profile from './components/Pages/Profile/Profile';

const App = () => {
  console.log("Home component rendered");
  return (
    <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="/products" element={<Products/>} /> 
            <Route path="/community" element={<Community/>} /> 
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        <Footer/>
    </div>
  );
};

export default App;