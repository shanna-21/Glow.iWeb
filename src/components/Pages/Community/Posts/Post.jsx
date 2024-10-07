import React from "react"
import {isValidElement, useState} from "react"
import './Post.css'
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { faShare } from '@fortawesome/free-solid-svg-icons';

const Posts = ({ post, onBack }) => {

    const navigate = useNavigate();
    const { state } = useLocation();

    if (!post) {
      return <div>Post not found</div>; 
    }
    
    const [savedPosts, setSavedPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [likedComments, setLikedComments] = useState({});
  
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
  
    const comments = [
      {id: 1, user: 'Sarah Linster', comment: 'Setuju banget!!!', date: '08-18-2024', like: 30},
      {id: 2, user: 'Hans', comment: 'Sangat recommended!!', date: '08-18-2024', like: 17},
      {id: 3, user: 'Jonathan', comment: 'Langsung mau beli lagii', date: '08-18-2024', like: 14},
      {id: 4, user: 'Miley Cyrus', comment: 'Kerasa banget efeknyaa!', date: '08-18-2024', like: 10}
    ]

    return(
        <div className="full-post">
            <div className="block-post"> 
              <button onClick={onBack}><IoIosArrowBack /></button>
              <div className="in-post">
                <h2><CgProfile /> {post.user}</h2>
                <p>{post.content}</p>
                <img src={post.image}/>
              </div>
              <div className="post-add">
                <h6>08-18-2024</h6>
                <div className="post-icons">
                  <FontAwesomeIcon icon={savedPosts[post.id - 1] ? saved : save}
                    onClick={() => handleSaveToggle(post.id - 1)} style={{ cursor: 'pointer' }}/>
                  <FontAwesomeIcon icon={likedPosts[post.id - 1] ? liked : like}
                    onClick={() => handleLikeToggle(post.id - 1)} style={{ cursor: 'pointer' }}/>
                  <FontAwesomeIcon icon={faShare} />
                </div>
              </div>
              <div className="post-desc">
                  <h5>50k views</h5>
                  <h5>{post.comments} comments</h5>
                  <h5>{post.likes} likes</h5>
              </div>
            </div>

            <div className="comment-block">
              <h3>Comments</h3>
              <div className="comment-type">
                <textarea name="commentbox" id="comtype" placeholder="Leave a comment here..."></textarea>
              </div>
              <div className="comments">
                {comments.map((com, index) => (
                  <div key={index} className="com-sep">
                    <h4><CgProfile /> {com.user} </h4> 
                    <p>{com.comment}</p>
                    <div className="comment-details">
                      <div className="date-reply">
                        <h6>{com.date}</h6>
                        <h6>Reply</h6>
                      </div>
                      <div className="comment-likes">
                        <h6>{com.like}</h6>
                        <FontAwesomeIcon icon={likedComments[com.id - 1] ? liked : like}
                          onClick={() => handleCommentLikeToggle(com.id - 1)} style={{ cursor: 'pointer' }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      );
};

export default Posts;