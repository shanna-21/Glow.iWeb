import React, {useState, useEffect} from 'react'
import './Hero.css'
import arrow from '../../assets/arrow.png'
import mail from '../../assets/email-icon.png'

const Hero = () => {
  const [text, setText] = useState('')
  const message = ".Better Skin, Better You";
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setText((prev) => prev + message[index]);
      if(index === message.length-1) clearInterval(interval);
    }, typingSpeed);

    return() => clearInterval(interval);
  }, []);

  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>{text}</h1>
        <p> 
          Welcome to glow.i!
          Here, your skincare journey starts.
          Let's scan your face!
        </p>

        {/* ini nanti button nya button buat ke scan (?) */}
        <button onClick={() => window.location.href='mailto:shanna.fernlie@gmail.com?subject=Hello&body=I%20wanted%20to%20reach%20out.'} className='btn'>
          Scan Face 
          {/* <img className='email' src={mail} alt="arrow" /> */}
        </button>
      </div>
    </div>
  )
}


export default Hero