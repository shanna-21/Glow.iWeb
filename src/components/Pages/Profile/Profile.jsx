import React from "react"
import './Profile.css'
import User from '../Profile/User/User'
import Hero from './Hero-profile/HeroProfile'

const Profile = () => {
    return (
      <div className="profile-container">
        <Hero/>
        <User/>
      </div>
  )
};

export default Profile;