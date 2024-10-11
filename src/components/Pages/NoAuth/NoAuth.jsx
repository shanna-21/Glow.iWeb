import React from "react"
import Hero from '../../Hero/Hero';
import About from './About/About';
import Recommendation from './Recommendation/Recommendation';
import Title from './Title/Title';
import Tips from './Tips/Tips';
import Navbar from'./LandingNavbar/LandingNavbar'
// import Footer from '../../Footer/Footer'

import './NoAuth.css'

const NoAuth = () => {
    return (
    <div className="homecon">
        <Navbar/>
        <Hero/>
        <About/>
        <Tips/>
        <Title subTitle="RECOMMENDATION" title="What You Can Do" />
        <Recommendation/>
        {/* <Footer /> */}
    </div>
  );
};

export default NoAuth;