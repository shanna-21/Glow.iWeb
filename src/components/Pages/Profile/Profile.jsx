import React from "react"
import './Profile.css'
import User from '../Profile/User/User'
import Hero from '../Profile/Hero-profile/Hero-profile'

const Profile = () => {
    return (
      <div>
        <Hero/>
      <div className="user-container">
          <User/>
      </div>
      </div>
  )
};

export default Profile;