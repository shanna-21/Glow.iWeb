import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../../../Backend/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import { IoIosArrowBack } from "react-icons/io";
import './Post.css';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Posts = ({ post, onBack }) => {
  const commentRef = useRef();
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize navigate

  // Fetch user details correctly
  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data()); // Store user details
      } else {
        console.error("No user details found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid); // Fetch user details if authenticated
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentText = commentRef.current.value.trim();
    if (!commentText) return;

    const usernameToUse = userDetails.firstName || "Anonymous"; // Use 'Anonymous' if firstName is unavailable

    try {
      await addDoc(collection(db, 'posts', post.id, 'comments'), {
        comment: commentText,
        username: usernameToUse,
        createdAt: serverTimestamp(),
      });

      setComments((prevComments) => [
        ...prevComments,
        { comment: commentText, username: usernameToUse },
      ]);

      commentRef.current.value = ''; // Clear input
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsCollection = collection(db, 'posts', post.id, 'comments');
        const snapshot = await getDocs(commentsCollection);
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [post]);

  const handleSaveToggle = (index) => {
    const updatedSavedPosts = [...savedPosts];
    updatedSavedPosts[index] = !updatedSavedPosts[index];
    setSavedPosts(updatedSavedPosts);
  };

  const handleLikeToggle = (index) => {
    const updatedLikedPosts = [...likedPosts];
    updatedLikedPosts[index] = !updatedLikedPosts[index];
    setLikedPosts(updatedLikedPosts);
  };

  const handleCommentLikeToggle = (commentId) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }));
  };

  if (!post) {
    return <div>Post not found</div>;
  }
  
  const handleBack = () => {
    navigate('/community'); // Navigate back to the community page
  };

  return (
    <div className="full-post">
      <div className="block-post">
        <button onClick={onBack}> 
          <IoIosArrowBack />
        </button>
        <div className="in-post">
          <h2><CgProfile /> {post.user}</h2>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" />}
        </div>
        <div className="post-add">
          <h6>{post.createdAt.toDate().toLocaleDateString()}</h6>
          <div className="post-icons">
            <FontAwesomeIcon
              icon={savedPosts[post.id - 1] ? saved : save}
              onClick={() => handleSaveToggle(post.id - 1)}
              style={{ cursor: 'pointer' }}
            />
            <FontAwesomeIcon
              icon={likedPosts[post.id - 1] ? liked : like}
              onClick={() => handleLikeToggle(post.id - 1)}
              style={{ cursor: 'pointer' }}
            />
            <FontAwesomeIcon icon={faShare} />
          </div>
        </div>
        <div className="post-desc">
          <h5>{post.views} views </h5>
          <h5>{comments.length} comments </h5>
          <h5>{post.likes} likes </h5>
        </div>
      </div>

      <div className="comment-block">
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" ref={commentRef} placeholder="Write a comment..." required />
          <button type="submit">Post</button>
        </form>
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((com) => (
            <div key={com.id} className="com-sep">
              <h4><CgProfile /> {com.username}</h4>
              <p>{com.comment}</p>
              <div className="comment-details">
                <h6>{new Date(com.createdAt?.toDate()).toLocaleDateString()}</h6>
                <FontAwesomeIcon
                  icon={likedComments[com.id] ? liked : like}
                  onClick={() => handleCommentLikeToggle(com.id)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
