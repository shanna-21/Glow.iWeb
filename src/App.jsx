import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Programs from './components/Programs/Programs'
import Title from './components/Title/Title'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div>
        <About/>
        <Title subTitle='INTERESTS' title='What I Offer'/>
        <Programs/>
        <Title subTitle='PROJECTS' title='Some Projects I did in My Leisure Time'/>
        <Projects/>
        <Footer/>
      </div>
    </div>
  )
}

export default App