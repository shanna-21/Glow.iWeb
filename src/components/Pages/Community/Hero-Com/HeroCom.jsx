import React, {useState, useEffect} from 'react'
import './HeroCom.css'
// import arrow from '../../assets/arrow.png'
// import mail from '../../assets/email-icon.png'

const Hero = () => {
  const [text, setText] = useState('')
  const message = ".Community";
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
    <div className="hero-com-container">
      <div className="hero-text">
        <h1>{text}</h1>
      </div>
    </div>
  )
}


export default Hero