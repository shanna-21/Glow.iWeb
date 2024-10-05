import React from "react"
import {isValidElement, useState} from "react"
import './Post.css'
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const Posts = () => {

    const { postId } = useParams();

    const posts = [
      { id: 1, postId, user: 'Nicki Minah', comments: 104, likes: '99k', content: 'Ga boong ini jelekkk banget' },
      { id: 2, user: 'Dr.Lee Dyah', comments: 32, likes: '51.2k', content: 'Hati-hati dengan merk..' },
      { id: 3, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' }
    ];

    const post = posts.find(p => p.id === postId);

    if (!post) {
      return <div>Post not found</div>; 
    }
    
    const [savedPosts, setSavedPosts] = useState(Array(posts.length).fill(false));
    const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));
  
    const handleSaveToggle = (index) => {
      const updatedSavedPosts = [...savedPosts];
      updatedSavedPosts[index] = !updatedSavedPosts[index];
      setSavedPosts(updatedSavedPosts);
    };
  
    // Toggle like status for a specific post by index
    const handleLikeToggle = (index) => {
      const updatedLikedPosts = [...likedPosts];
      updatedLikedPosts[index] = !updatedLikedPosts[index];
      setLikedPosts(updatedLikedPosts);
    };
  
    return(
        <div className="block-post"> 
          <button onClick={() => navigate('/community')}>Back to list</button>
          <div className="in-post">
            <h2><CgProfile /> {post.user}</h2>
            <p>{post.content}</p>
            <h6>08-18-2024</h6>
          </div>
          <div className="post-icons">
            <FontAwesomeIcon icon={savedPosts[index] ? saved : save}
              onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }}/>
            <FontAwesomeIcon icon={likedPosts[index] ? liked : like}
              onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }}/>
          </div>
          <div className="post-desc">
              <h5>50k views</h5>
              <h5>{post.comments} comments</h5>
              <h5>{post.likes} likes</h5>
          </div>
        </div>
      );
};

export default Posts; 