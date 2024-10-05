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
  CategoryScale, // For X axis
  LinearScale, // For Y axis
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

// LineChart component (integrated directly here)
const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Time labels for X-axis
    datasets: [
      {
        label: 'Skincare Routine Progress',
        data: [12, 19, 3, 5, 2, 3], // Sample data
        borderColor: '#88CFF1',
        backgroundColor: 'rgba(136, 207, 241, 0.2)',
        tension: 0.4, // Curve of the line
        pointRadius: 5, // Point radius
        pointBackgroundColor: '#224f64', // Color of points
        fill: true, // Fill under the line
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
      username: "user123", 
      content: "I started using a vitamin C serum, and my skin has never looked brighter! 🌟 #skincare", 
      liked: false, likeCount: 5 
    },
    { username: "user456", content: "Post 2 content here", liked: false, likeCount: 10 },
    { username: "user789", content: "Post 3 content here", liked: false, likeCount: 0 }
  ]);
  const [cartItems] = useState(["Skincare Item 1", "Skincare Item 2"]);
  const [likedForums] = useState(["Liked Forum 1", "Liked Forum 2"]);
  const [savedForums] = useState(["Saved Forum 1", "Saved Forum 2"]);

  const [savedIndex, setSavedIndex] = useState(null);

  const handleSave = (index) => {
      setSavedIndex(savedIndex === index ? null : index); // Toggle between saved and unsaved
  };

  const [journey, setJourney] = useState("Here is the user's skincare journey.");
  const [routine, setRoutine] = useState("Here is the user's skincare routine.");
  const [predict, setPredict] = useState("Here is the user's skincare prediction.");
  
  const [isJourneyOpen, setJourneyOpen] = useState(false);
  const [isRoutineOpen, setRoutineOpen] = useState(false);
  const [isPredictOpen, setPredictOpen] = useState(false);

  const toggleJourney = () => setJourneyOpen(!isJourneyOpen);
  const toggleRoutine = () => setRoutineOpen(!isRoutineOpen);
  const togglePredict = () => setPredictOpen(!isPredictOpen);

  const handleLike = (index) => {
      const updatedPosts = [...posts];
      if (updatedPosts[index].liked) {
          updatedPosts[index].likeCount -= 1;
      } else {
          updatedPosts[index].likeCount += 1;
      }
      updatedPosts[index].liked = !updatedPosts[index].liked;
      setPosts(updatedPosts);
  };

  const [visibleSection, setVisibleSection] = useState('posts'); // Default to 'posts'

  const showSection = (section) => {
      setVisibleSection(section); // Set the visible section based on the button clicked
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

        <div className="profile-details">
          <h3 onClick={toggleJourney} className="toggle-section">Journey</h3>
          {isJourneyOpen && 
          
            <div className="line-chart-container">
              <p>{journey}</p>
              <LineChart />
              {/* <Line data={data} options={options} /> */}
            </div>
          }
          

          <h3 onClick={toggleRoutine} className="toggle-section">Routine</h3>
          {isRoutineOpen && 
              <div className="routine-section">
                <p>{routine}</p>
                <div className="schedule-container">
                  <h1>My Skincare Schedule</h1>

                    <div className="schedule-section">
                      <h2>Morning Routine</h2>
                      <ul>
                        <li>Cleanser</li>
                        <li>Toner</li>
                        <li>Serum (Vitamin C)</li>
                        <li>Moisturizer</li>
                        <li>Sunscreen</li>
                      </ul>
                    </div>

                    <div className="schedule-section">
                      <h2>Afternoon Routine</h2>
                      <ul>
                        <li>Hydrating Mist</li>
                        <li>Reapply Sunscreen</li>
                        <li>Eye Cream</li>
                      </ul>
                    </div>

                    <div className="schedule-section">
                      <h2>Night Routine</h2>
                      <ul>
                        <li>Makeup Remover</li>
                        <li>Cleanser</li>
                        <li>Toner</li>
                        <li>Retinol Serum</li>
                        <li>Moisturizer</li>
                        <li>Night Cream</li>
                      </ul>
                    </div>
                  </div>

                  {/* Add the line chart (skincare progress graph) here */}
              </div>
          }

          <h3 onClick={togglePredict} className="toggle-section">Predict</h3>
          {isPredictOpen &&
              <p>{predict}</p>
          }
        </div>
      </div>

      {/* Rest of the component logic remains the same */}
      <div className="activity-section">
        <div className="navigation-buttons">
          <button onClick={() => showSection('posts')}>Your Posts</button>
          <button onClick={() => showSection('cart')}>Your Cart</button>
          <button onClick={() => showSection('likedForums')}>Liked Forum</button>
          <button onClick={() => showSection('savedForums')}>Saved Forum</button>
        </div>

        {visibleSection === 'posts' && (
          <div className="activity-container" id="posts-section">
            <h3>Your Posts</h3>
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="post-item">
                  <div className="post-header">
                    <img src={profile_img} alt="profile" className="post-profile-pict" />
                    <h4>{post.username}</h4>
                  </div>
                  <p className="content-your-post">{post.content}</p>
                  <div className="post-actions">
                    <div className="liked-button">
                      <IonIcon
                        icon={heart}
                        className={post.liked ? 'active' : ''}
                        onClick={() => handleLike(index)}
                      />
                      <p>{post.likeCount} {post.likeCount <= 1 ? 'Like' : 'Likes'}</p>
                    </div>
                    <button className="save-btn" onClick={() => handleSave(index)}>
                      {savedIndex === index ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'cart' && (
          <div className="activity-container" id="cart-section">
            <h3>Your Cart</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'likedForums' && (
          <div className="activity-container" id="liked-forum-section">
            <h3>Liked Forum</h3>
            <ul>
              {likedForums.map((forum, index) => (
                <li key={index}>{forum}</li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'savedForums' && (
          <div className="activity-container" id="saved-forum-section">
            <h3>Saved Forum</h3>
            <ul>
              {savedForums.map((forum, index) => (
                <li key={index}>{forum}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default User;
