import React from 'react'
import './About.css'
import bubbles from '../../../../assets/mascot-1.png'

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={bubbles} alt="" />
        </div>
        <div className="about-right">
            <h3>ABOUT GLOW.I</h3>
            {/* <h2>A Tech Enthusiast with a Creative Mind</h2> */}
            <p>
            Glow.i is a personalized AI-powered skincare app that helps users find the 
            best skincare products based on their unique skin type and concerns. 
            The app uses advanced technology, including facial scanning, to provide 
            tailored product recommendations and lifestyle advice, helping users achieve
            healthier skin. Glow.i also supports local brands, contributing to sustainable
            development and providing a space for users to share experiences and discover 
            new skincare trends.
            <br /><br />
            <p>
            Main Features:
              <li><b>AI Face Scan:</b> Analyzes skin condition using AI to recommend suitable products.</li>
              <li><b>Personalized Recommendations:</b> Suggests skincare routines and products tailored to the user’s skin.</li>
              <li><b>Lifestyle Advice:</b> Offers tips beyond skincare, like improving sleep to address skin concerns.</li>
              <li><b>Product Suitability:</b> Shows product suitability percentages (e.g., 70% match) for each user.</li>
              <br />
              {/* In my free time, I devote time to studying the Bible. I also enjoy expressing my creativity through drawing, content creation, and making TikToks. */}
            </p>
            
            </p>

            {/* <div className='buttons'>

              <button onClick={()=> window.location.href='https://drive.google.com/file/d/1cTUIYaEvrLWLXJ4DFpGyzhMjGcxX5GGe/view?usp=sharing'} className='btn-resume'>
                Resume 
              </button>
              <button onClick={()=> window.location.href='https://drive.google.com/drive/folders/1VVE37_hxOXMyVqyINUSK-pxFOdWpSwiC?usp=sharing'} className='btn-resume'>
                Certificates 
              </button>
              <button onClick={()=> window.location.href='https://drive.google.com/file/d/1cTUIYaEvrLWLXJ4DFpGyzhMjGcxX5GGe/view?usp=sharing'} className='btn-resume'>
                Competition 
              </button>
            </div> */}
        </div>
    </div>
  )
}

export default About