import React, { useState, useRef, useEffect } from "react";
import { auth, db } from "../../../../../Backend/config"
import { addDoc, collection, getDocs, query, orderBy, serverTimestamp} from "@firebase/firestore";
import './User.css';
import { useLocation } from "react-router-dom";
import profile_img from '../../../../assets/profile-img.jfif';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import Footer from '../../../Footer/Footer';
import Hero from '../Hero-profile/HeroProfile';
import { Line } from 'react-chartjs-2';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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

    const [posts, setPosts] = useState([]);
    const [savedIndex, setSavedIndex] = useState(null);
    const [cartItems] = useState([]); // Initialize cartItems
    const [visibleSection, setVisibleSection] = useState('posts');
    const [selectedPost, setSelectedPost] = useState(null);
    const [isJourneyOpen, setJourneyOpen] = useState(false);
    const [isRoutineOpen, setRoutineOpen] = useState(false);
    const [isPredictOpen, setPredictOpen] = useState(false);
    const [commentText, setCommentText] = useState(''); 
    const commentRef = useRef();
    const auth = getAuth(); // Initialize Auth
    const user = auth.currentUser; // Check the current user
    const ref = collection(db, "comments");

    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
        console.log(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
        } else {
            console.log("User is not logged in");
        }
        });
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, "posts");
                const q = query(postsCollection, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Fetched posts:", postsData);
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleSave = (index) => {
        setSavedIndex(savedIndex === index ? null : index);
    };

    const handleLike = async (index) => {
        const post = posts[index];
        const postRef = doc(db, "posts", post.id);
    
        const updatedPosts = posts.map((post, i) =>
        i === index
            ? { ...post, liked: !post.liked, likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1 }
            : post
        );
        setPosts(updatedPosts);
    
        try {
        await updateDoc(postRef, {
            liked: !post.liked,
            likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
        });
        } catch (error) {
        console.error("Error updating likes: ", error);
        }
    };
    
    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const commentText = commentRef.current.value; // Get the comment from the input
    
        if (!commentText) return; // Exit if the input is empty
    
        // Check if user is defined and has a username
        console.log('Username:', user.username); // Debugging line
    
        const usernameToUse = userDetails.firstName || 'Anonymous'; // Default if username is undefined
    
        try {
            console.log('Adding comment:', commentText);
            console.log('Selected Post ID:', selectedPost.id);
    
            // Add the comment to the Firestore sub-collection
            await addDoc(collection(db, 'posts', selectedPost.id, 'comments'), {
                comment: commentText,
                username: usernameToUse,
                createdAt: serverTimestamp(),
            });
    
            // Update local state to add the new comment to the selected post
            setSelectedPost((prevPost) => ({
                ...prevPost,
                comments: [...(prevPost.comments || []), { comment: commentText, username: usernameToUse }],
            }));
              
    
            // Clear the input field
            commentRef.current.value = '';
        } catch (error) {
            console.error("Error adding comment: ", error.message);
            alert("Failed to add comment: " + error.message);
        }
    };
    
    
    
    

    const showSection = (section) => {
        setVisibleSection(section);
        setSelectedPost(null); // Reset selected post when navigating to another section
    };

    const showFullPost = async(post) => {
        setSelectedPost(post); // Set the clicked post as selected
        setVisibleSection('fullPost'); // Switch to the full post view

        try {
            const commentsCollection = collection(db, 'posts', post.id, 'comments');
            const q = query(commentsCollection, orderBy('createdAt', 'asc')); // Order comments by creation time
            const querySnapshot = await getDocs(q);
    
            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            // Update selected post with fetched comments
            setSelectedPost((prevPost) => ({
                ...prevPost,
                comments: commentsData,
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const toggleJourney = () => {
        setJourneyOpen(!isJourneyOpen);
    };

    const toggleRoutine = () => {
        setRoutineOpen(!isRoutineOpen);
    };

    const togglePredict = () => {
        setPredictOpen(!isPredictOpen);
    };

    const handleLogout = async() => {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState("")

    const handleAddPost = async () => {
        if (!content.trim()) {
        alert("Post content cannot be empty!");
        return;
        }
    
        if (!user) {
        alert("User not logged in!");
        return;
        }
    
        setLoading(true);
        try {
        await addDoc(collection(db, "posts"), {
            username: user.displayName || userDetails.firstName,
            content: content,
            likeCount: 0,
            liked: false,
            createdAt: new Date(),
        });
        setContent(""); // Clear the input after submitting
        alert("Post added successfully!");
        } catch (error) {
        console.error("Error adding post:", error);
        alert("Failed to add post.");
        } finally {
        setLoading(false);
        }
    };
    


  return (
    <div className="grand-user-container">
      <Hero/>
      <div className="profile-page-container">
        <div className="profile-section">
            {userDetails ? (
                <div className="profile-header">
                    <img src={profile_img} className="profile-pict" alt="profile" />
                    <h2 className="profile-username">{userDetails.firstName}</h2>
                    <p className="profile-bio">{userDetails.email}</p>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}

          {/* Add the Journey, Routine, and Predict sections here */}
          <div className="profile-details">
            <h3 onClick={toggleJourney} className="toggle-section">Journey</h3>
            {isJourneyOpen && 
              <div className="line-chart-container">
                <p>Here's your skincare journey! Tracking your skin progress over time:</p>
                <LineChart />
              </div>
            }

            <h3 onClick={toggleRoutine} className="toggle-section">Routine</h3>
            {isRoutineOpen && 
              <div className="routine-section">
                <p>Here's your skincare routine:</p>
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
              </div>
            }

            <h3 onClick={togglePredict} className="toggle-section">Predict</h3>
            {isPredictOpen && 
              <div>
                <p>Skin prediction analysis will be displayed here.</p>
              </div>
            }
          </div>

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
                  <p>No liked forums yet.</p>
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
                  <p>No saved forums yet.</p>
                )}
              </ul>
            </div>
          )}

          {/* List of posts */}
          {visibleSection === 'posts' && (
            <div className="activity-container" id="posts-section">
              <h3>Your Posts</h3>
              <div className="add-post-container">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something..."
                    />
                    <button onClick={handleAddPost} disabled={loading}>
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
                <h2>{posts.length} Post{posts.length !== 1 ? 's' : ''}</h2>
                <ul>
                    {posts.map((post, index) => (
                        <li key={post.id} className="post-item" onClick={() => showFullPost(post)}>
                        <div className="post-header">
                            <img src={profile_img} alt="profile" className="post-profile-pict" />
                            <h4>{post.username}</h4>
                        </div>
                        <p className="content-your-post">{post.content}</p>
                        <div className="post-actions">
                            <div className="liked-button">
                            <IonIcon
                                icon={heart}
                                className={post.liked ? "active" : ""}
                                onClick={() => handleLike(index)}
                            />
                            <p>{post.likeCount} {post.likeCount === 1 ? 'Like' : 'Likes'}</p>
                            </div>
                            <button
                            className="save-btn"
                            onClick={() => handleSave(index)}
                            >
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
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
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

                <div className="add-comment-section">
                    <form onSubmit={handleAddComment}>
                        <input type="text" ref={commentRef} placeholder="Write a comment..." required />
                        <button type="submit">Post</button>
                    </form>
                </div>

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