import React, { useState } from 'react';
import profile_img from '../../../../assets/profile-img.jfif';
import './Posts.css';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons'

const Post = ({ username, content }) => {
    const [active, setActive] = useState(false); // Track likes
  const [saved, setSaved] = useState(false); // Track save status

  const handleClick = () => {
    setActive(!active);
  };

  const handleSave = () => {
    setSaved(!saved); // Toggle save status
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={profile_img} className="post-profile-pic" alt="profile" />
        <h4 className="post-username">{username}</h4>
      </div>
      <p className="post-content">{content}</p>
      <div className="post-actions">
        <div className="large-font text-center top-20">
      <IonIcon
        icon={heart}
        className={active ? "active" : ""}
        onClick={handleClick}
      />
      <div className="red-bg"></div>
    </div>
        <button className="save-btn" onClick={handleSave}>
          {saved ? 'Unsave' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Post;
