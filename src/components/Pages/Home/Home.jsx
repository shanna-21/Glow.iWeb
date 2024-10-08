import React from "react"
import Hero from '../../Hero/Hero';
import About from './About/About';
import Programs from './Programs/Programs';
import Title from './Title/Title';
import Tips from './Tips/Tips';
import './Home.css'

const Home = () => {
    return (
    <div className="homecon">
        <Hero/>
        <About/>
        {/* <Title subTitle="PROJECTS" title="Some Projects I did in My Leisure Time" /> */}
        <Tips/>
        <Title subTitle="RECOMMENDATION" title="What You Can Do" />
        <Programs/>
    </div>
  );
};

export default Home;