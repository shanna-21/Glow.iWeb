import React from 'react'
import './About.css'
import portrait from '../../assets/self-portrait.jpg'

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={portrait} alt="" />
        </div>
        <div className="about-right">
            <h3>ABOUT ME</h3>
            <h2>A Tech Enthusiast with a Creative Mind</h2>
            <p>
            I am currently a third-year student at Bina Nusantara University, working on various projects. At the same time, I am undertaking a part-time job teaching English in Guidance School.
            <br /><br />
            <p>
            Here are some languages and technologies I have been working with:
              <li>React.js</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>C</li>
              <br />
              In my free time, I devote time to studying the Bible. I also enjoy expressing my creativity through drawing, content creation, and making TikToks.
            </p>
            
            </p>

            <div className='buttons'>

              <button onClick={()=> window.location.href='https://drive.google.com/file/d/1cTUIYaEvrLWLXJ4DFpGyzhMjGcxX5GGe/view?usp=sharing'} className='btn-resume'>
                Resume 
              </button>
              <button onClick={()=> window.location.href='https://drive.google.com/drive/folders/1VVE37_hxOXMyVqyINUSK-pxFOdWpSwiC?usp=sharing'} className='btn-resume'>
                Certificates 
              </button>
              <button onClick={()=> window.location.href='https://drive.google.com/file/d/1cTUIYaEvrLWLXJ4DFpGyzhMjGcxX5GGe/view?usp=sharing'} className='btn-resume'>
                Competition 
              </button>
            </div>
        </div>
    </div>
  )
}

export default About