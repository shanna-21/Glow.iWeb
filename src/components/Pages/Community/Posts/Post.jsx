import React, { useEffect, useState } from "react";
import { db } from "../../../../../Backend/config"; // Import Firestore
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import { IoIosArrowBack } from "react-icons/io";
import './Post.css'
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { useLocation } from 'react-router-dom'; // Add this import

const Posts = ({ post, onBack }) => {
    const { state } = useLocation();

    if (!post) {
      return <div>Post not found</div>; 
    }
    
    const [comments, setComments] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [likedComments, setLikedComments] = useState({});
    const [loading, setLoading] = useState(false);
  
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
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          setLoading(true); // Set loading state
          const commentsCollection = collection(db, 'posts', post.id, 'comments'); // Get comments collection
          const snapshot = await getDocs(commentsCollection); // Fetch comments
          const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to usable format
          setComments(commentsData); // Set comments to state
        } catch (error) {
          console.error("Error fetching comments: ", error);
        } finally {
          setLoading(false); // Reset loading state
        }
      };
  
      fetchComments();
    }, [post]);

    return(
        <div className="full-post">
            <div className="block-post"> 
              <button onClick={onBack}><IoIosArrowBack /></button>
              <div className="in-post">
                <h2><CgProfile /> {post.user}</h2>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Post" />} {/* Add alt text for accessibility */}
              </div>
              <div className="post-add">
                <h6>{post.createdAt.toDate().toLocaleDateString()}</h6> {/* Ensure createdAt is a Firestore timestamp */}
                <div className="post-icons">
                  <FontAwesomeIcon icon={savedPosts[post.id - 1] ? saved : save}
                    onClick={() => handleSaveToggle(post.id - 1)} style={{ cursor: 'pointer' }} />
                  <FontAwesomeIcon icon={likedPosts[post.id - 1] ? liked : like}
                    onClick={() => handleLikeToggle(post.id - 1)} style={{ cursor: 'pointer' }} />
                  <FontAwesomeIcon icon={faShare} />
                </div>
              </div>
              <div className="post-desc">
                  <h5>{post.views} views</h5>
                  <h5>{comments.length} comments</h5> {/* Updated to show dynamic comment count */}
                  <h5>{post.likes} likes</h5>
              </div>
            </div>

            <div className="comment-block">
              <h3>Comments</h3>
              
              {loading ? ( // Show loading state while fetching
                <p>Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map((com) => (
                  <div key={com.id} className="com-sep"> {/* Use com.id as key */}
                    <h4><CgProfile /> {com.user}</h4>
                    <p>{com.comment}</p>
                    <div className="comment-details">
                      <div className="date-reply">
                        <h6>{new Date(com.date).toLocaleDateString()}</h6> {/* Adjust according to your data format */}
                        <h6>Reply</h6>
                      </div>
                      <div className="comment-likes">
                        <h6>{com.likes}</h6>
                        <FontAwesomeIcon icon={likedComments[com.id] ? liked : like}
                          onClick={() => handleCommentLikeToggle(com.id)} style={{ cursor: 'pointer' }} />
                      </div>
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
