import React, { useEffect, useState } from 'react'
import './LandingNavbar.css'
// import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import logo from '../../../../assets/logo-glowi-2.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
const[sticky, setSticky] = useState(false);

useEffect(()=>{
    window.addEventListener('scroll', ()=>{
        window.scrollY > 100 ? setSticky(true) : setSticky(false)
    })
},[])

// const scrollToSection = (sectionId) => {
//   document.getElementById(selectId).scrollIntoView({behavior: 'smooth'});
// };

  return (
    <nav className={`container ${sticky? 'dark-nav' : 'light-nav'}`}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li><Link to='/login'>Home</Link></li>
            <li><Link to='/login'>Quiz</Link></li>
            <li><Link to='/login'>Products</Link></li>
            <li><Link to='/login'>Community</Link></li>
            {/* <li><Link to='/profile'>Profile</Link></li> */}
            <li><Link to='/login'>News</Link></li>
            
            <li>
            <Link to='/login'>
                <button className="sign-in-btn">Sign In</button>
            </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar