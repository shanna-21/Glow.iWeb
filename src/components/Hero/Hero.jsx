import React, {useState, useEffect} from 'react'
import './Hero.css'
import Scan from '../Scan/Scan'

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
      {showScan ? (
        <Scan /> // Display Scan component when showScan is true
      ) : (
        <div className="hero-text">
          <h1>{text}</h1>
          <p>
            Welcome to glow.i! <br />
            Here, your skincare journey starts. <br />
            Let's scan your face!
          </p>
          <button onClick={() => setShowScan(true)} className="btn">
            Scan Face
          </button>
        </div>
      )}
    </div>
  );
};


export default Hero