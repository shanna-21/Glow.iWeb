import React, {useState, useEffect} from 'react'
import './Hero.css'
// import arrow from '../../assets/arrow.png'
// import mail from '../../assets/email-icon.png'
import { Link } from 'react-router-dom';

const Hero = () => {
  const [text, setText] = useState('');
  const [showScan, setShowScan] = useState(false);
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
    <div className="hero container">
      <div className="hero-text">
        <h1>{text}</h1>
        <p> 
          Welcome to glow.i!
          Here, your skincare journey starts.
          Let's scan your face!
        </p>

        <Link to={'/scan'}>
          <button onClick={'/scan'} className='btn'>
            Scan Face 
          </button>
        </Link>
        
      </div>
    </div>
  );
};


export default Hero