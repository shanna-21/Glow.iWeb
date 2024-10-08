import React, { useState } from "react";
import './User.css';
import profile_img from '../../../../assets/profile-img.jfif';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import Footer from '../../../Footer/Footer';
import Hero from '../Hero-profile/HeroProfile';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Skincare Routine Progress',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#88CFF1',
        backgroundColor: 'rgba(136, 207, 241, 0.2)',
        tension: 0.4, 
        pointRadius: 5, 
        pointBackgroundColor: '#224f64', 
        fill: true, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Skin Improvement (%)',
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <h2 className="chart-title">Skincare Progress Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

const User = () => {
  const [username] = useState("user123");
  const [bio] = useState("This is a short bio about the user.");
  const [posts, setPosts] = useState([
    { 
      id: 1,
      username: "user123", 
      content: "I started using a vitamin C serum, and my skin has never looked brighter! 🌟 #skincare", 
      liked: false, 
      likeCount: 5,
      comments: [
        { username: "commenter1", comment: "That's amazing! What brand are you using?" },
        { username: "commenter2", comment: "I love vitamin C serums too!" },
      ]
    },
    { id: 2, username: "user456", content: "Post 2 content here", liked: false, likeCount: 10, comments: [] },
    { id: 3, username: "user789", content: "Post 3 content here", liked: false, likeCount: 0, comments: [] }
  ]);
  
  const [savedIndex, setSavedIndex] = useState(null);
  const [cartItems] = useState([]); // Initialize cartItems
  const [visibleSection, setVisibleSection] = useState('posts'); // Default to 'posts'
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post

  const handleSave = (index) => {
    setSavedIndex(savedIndex === index ? null : index);
  };

  const handleLike = (index) => {
    const updatedPosts = posts.map((post, i) =>
      i === index ? { ...post, liked: !post.liked, likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const showSection = (section) => {
    setVisibleSection(section);
    setSelectedPost(null); // Reset selected post when navigating to another section
  };

  const showFullPost = (post) => {
    setSelectedPost(post); // Set the clicked post as selected
    setVisibleSection('fullPost'); // Switch to the full post view
  };

  return (
    <div className="grand-user-container">
      <Hero/>
      <div className="profile-page-container">
        <div className="profile-section">
          <div className="profile-header">
            <img src={profile_img} className="profile-pict" alt="profile"/>
            <h2 className="profile-username">{username}</h2>
            <p className="profile-bio">{bio}</p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          {/* Add your sections like Journey, Routine, and Predict here */}

        </div>

        {/* Render different sections based on visibleSection */}
        <div className="activity-section">
          <div className="navigation-buttons">
            <button onClick={() => showSection('posts')}>Your Posts</button>
            <button onClick={() => showSection('cart')}>Your Cart</button>
            <button onClick={() => showSection('likedForums')}>Liked Forum</button>
            <button onClick={() => showSection('savedForums')}>Saved Forum</button>
          </div>

          {visibleSection === 'cart' && (
            <div className="activity-container" id="cart-section">
              <h3>Your Cart</h3>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>No items in your cart yet.</p>
                )}
              </ul>
            </div>
          )}
          {visibleSection === 'likedForums' && (
            <div className="activity-container" id="cart-section">
              <h3>Liked Forums</h3>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>No items in your cart yet.</p>
                )}
              </ul>
            </div>
          )}
          {visibleSection === 'savedForums' && (
            <div className="activity-container" id="cart-section">
              <h3>Saved Forum</h3>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>No items in your cart yet.</p>
                )}
              </ul>
            </div>
          )}

          

          {/* List of posts */}
          {visibleSection === 'posts' && (
            <div className="activity-container" id="posts-section">
              <h3>Your Posts</h3>
              <ul>
                {posts.map((post, index) => (
                  <li key={index} className="post-item" onClick={() => showFullPost(post)}>
                    <div className="post-header">
                      <img src={profile_img} alt="profile" className="post-profile-pict" />
                      <h4>{post.username}</h4>
                    </div>
                    <p className="content-your-post">{post.content}</p>
                    <div className="post-actions">
                      <div className="liked-button" onClick={(e) => e.stopPropagation() /* Prevent event propagation */}>
                        <IonIcon
                          icon={heart}
                          className={post.liked ? 'active' : ''}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event propagation to parent
                            handleLike(index);
                          }}
                        />
                        <p>{post.likeCount} {post.likeCount <= 1 ? 'Like' : 'Likes'}</p>
                      </div>
                      <button className="save-btn" onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation to parent
                        handleSave(index);
                      }}>
                        {savedIndex === index ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full post view */}
          {visibleSection === 'fullPost' && selectedPost && (
              <div className="full-post-container">
                <div className="full-post-header">
                  <img src={profile_img} alt="" className="post-profile-pict" />
                  <h3>{selectedPost.username}'s Post</h3>
                </div>
                <p>{selectedPost.content}</p>
                <div className="post-action-full">
                  <div className="liked-button">
                    <IonIcon
                      icon={heart}
                      className={selectedPost.liked ? 'active' : ''}
                      onClick={() => {
                        
                        const postIndex = posts.findIndex(post => post.id === selectedPost.id);
                        const updatedPosts = [...posts];
                        updatedPosts[postIndex].liked = !updatedPosts[postIndex].liked;
                        updatedPosts[postIndex].likeCount += updatedPosts[postIndex].liked ? 1 : -1;
                        setPosts(updatedPosts);
                        setSelectedPost(updatedPosts[postIndex]);
                      }}
                    />
                    <p>{selectedPost.likeCount} {selectedPost.likeCount <= 1 ? 'Like' : 'Likes'}</p>
                  </div>
                  <button
                    className="save-btn"
                    onClick={() => handleSave(posts.findIndex(post => post.id === selectedPost.id))}
                  >
                    {savedIndex === posts.findIndex(post => post.id === selectedPost.id) ? 'Saved' : 'Save'}
                  </button>
                </div>

                {/* Display post comments */}
                <h4>Comments</h4>
                <ul>
                  {selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment, index) => (
                      <li key={index}>
                        <div className="comment-header">
                          <img src={profile_img} alt="" className="post-profile-pict" />
                          <strong>{comment.username}</strong>
                        </div>
                        <p>{comment.comment}</p>
                      </li>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </ul>

                <button className="back-post-btn" onClick={() => setVisibleSection('posts')}>Back to Posts</button>
              </div>
            )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default User;
