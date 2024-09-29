import React, {useState, useEffect} from 'react'
import '../../Profile/Hero-profile/Hero-profile.css'
import derma from '../../../../assets/derma.jpg'
// import arrow from '../../assets/arrow.png'
// import mail from '../../assets/email-icon.png'

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
    <div className='hero-profile'>
      <div className="hero-text">
        <h1>{text}</h1>

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