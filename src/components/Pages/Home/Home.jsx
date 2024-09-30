import React from "react"
import Navbar from '../../Navbar/Navbar'
import Hero from '../../Hero/Hero';
import About from '../../About/About';
import Programs from '../../Programs/Programs';
import Title from '../../Title/Title';
import Projects from '../../Projects/Projects';

const Home = () => {
    return (
    <div>
        <Navbar/>
        <Hero />
        <About />
        <Title subTitle="INTERESTS" title="What I Offer" />
        <Programs />
        <Title subTitle="PROJECTS" title="Some Projects I did in My Leisure Time" />
        <Projects />
    </div>
  );
};

export default Home;