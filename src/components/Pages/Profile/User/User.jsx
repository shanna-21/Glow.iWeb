import React, { useState } from "react";
import './User.css'
import profile_img from '../../../../assets/profile-img.jfif'
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';

const User = () => {
    const [username] = useState("user123");
    const [bio] = useState("This is a short bio about the user.");
    const [journey] = useState("Here is the user's skincare journey.");
    const [routine] = useState("Here is the user's skincare routine.");
    const [predict] = useState("Here is the user's skincare prediction.");
    const [posts, setPosts] = useState([
      { username: "user123", content: "Post 1 content here", liked: false },
      { username: "user456", content: "Post 2 content here", liked: false },
      { username: "user789", content: "Post 3 content here", liked: false }
    ]);
    const [cartItems] = useState(["Skincare Item 1", "Skincare Item 2"]);
    const [likedForums] = useState(["Liked Forum 1", "Liked Forum 2"]);
    const [savedForums] = useState(["Saved Forum 1", "Saved Forum 2"]);

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].liked = !updatedPosts[index].liked;
        setPosts(updatedPosts);
    };

    return (
      <div className="profile-page-container">
        {/* Left Side: User Info and Profile */}
        <div className="profile-section">
          <div className="profile-header">
            <img src={profile_img} className="profile-pict" alt="profile"/>
            <h2 className="profile-username">{username}</h2>
            <p className="profile-bio">{bio}</p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          {/* Profile Sections: Journey, Routine, Predict */}
          <div className="profile-details">
            <h3>Journey</h3>
            <p>{journey}</p>
            <h3>Routine</h3>
            <p>{routine}</p>
            <h3>Predict</h3>
            <p>{predict}</p>
          </div>
        </div>

        {/* Right Side: Posts, Cart, Liked Forum, Saved Forum */}
        <div className="activity-section">
          <div className="activity-container">
            <h3>Your Posts</h3>
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="post-item">
                  <div className="post-header">
                    <img src={profile_img} alt="profile" className="post-profile-pict" />
                    <h4>{post.username}</h4>
                  </div>
                  <p>{post.content}</p>
                  <div className="post-actions">
                    <IonIcon
                      icon={heart}
                      className={post.liked ? 'active' : ''}
                      onClick={() => handleLike(index)}
                    />
                    <button className="save-btn">Save</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="activity-container">
            <h3>Your Cart</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="activity-container">
            <h3>Liked Forum</h3>
            <ul>
              {likedForums.map((forum, index) => (
                <li key={index}>{forum}</li>
              ))}
            </ul>
          </div>

          <div className="activity-container">
            <h3>Saved Forum</h3>
            <ul>
              {savedForums.map((forum, index) => (
                <li key={index}>{forum}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default User;
