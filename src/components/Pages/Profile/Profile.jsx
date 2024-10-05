import React from "react"
import './Profile.css'
import User from '../Profile/User/User'
import Hero from './Hero-profile/HeroProfile'
import Footer from '../../Footer/Footer'

const Profile = () => {
    return (
      <div className="profile-container">
        {/* <Hero/> */}
        <User/>
        {/* <Footer/> */}
      </div>
  )
};

export default Profile;