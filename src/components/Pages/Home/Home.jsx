import React from "react"
import Hero from '../../Hero/Hero';
import About from './About/About';
import Recommendation from './Recommendation/Recommendation';
import Title from './Title/Title';
import Tips from './Tips/Tips';
import Footer from '../../Footer/Footer'

import './Home.css'

const Home = () => {
    return (
    <div className="homecon">
        <Hero/>
        <About/>
        <Tips/>
        <Title subTitle="RECOMMENDATION" title="What You Can Do" />
        <Recommendation/>
        <Footer />
    </div>
  );
};

export default Home;