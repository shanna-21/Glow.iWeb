import React from "react"
import {isValidElement, useState} from "react"
import comimg from '../../../assets/community.png'
import './Community.css'
import Posts from './Posts/Post'
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import img1 from '../../../assets/post-review.jpg'

const Community = () => {

  const [activeItem, setActiveItem] = useState('Trending'); 
  const [selectedPost, setSelectedPost] = useState(null);
    
  return (
      <div className="community-page">
        {/* header */}
        <div className="comhead">
          <img src={comimg} className="comheadpic"/>
        </div>
        
        <h1>Forum</h1>

        <div className="comcontent">
          {/* sidebar */}
          <div className="comsidebar">
            <div className="insidebar">
              <h3 className={activeItem === 'Trending' ? 'active' : ''} 
                onClick={() => {setActiveItem('Trending'); setSelectedPost(null); }}>
                Trending </h3>
              <h3 className={activeItem === 'TopForum' ? 'active' : ''} 
                onClick={() => {setActiveItem('TopForum'); setSelectedPost(null); }}> 
                Top Forum </h3>
              <h3 className={activeItem === 'MostLiked' ? 'active' : ''} 
                onClick={() => {setActiveItem('MostLiked'); setSelectedPost(null); }}> 
                Most Liked </h3>
            </div>
          </div>

          {/* Content area where the "pages" are rendered based on activeItem */}
          <div className="forumcontent">
            {!selectedPost ? (
              <>
                {activeItem === 'Trending' && <Trending onSelectPost={setSelectedPost} />}
                {activeItem === 'TopForum' && <TopForum onSelectPost={setSelectedPost} />}
                {activeItem === 'MostLiked' && <MostLiked onSelectPost={setSelectedPost} />}
              </>
            ) : (
              <Posts post={selectedPost} onBack={() => setSelectedPost(null)} />
            )}
          </div>
        </div>
      </div>
  );
};

const Trending = ({ onSelectPost }) => {

  const posts = [
    { id: 1, user: 'Sarah Linster', comments: 34, likes: '21.1k', content: 'This skincare is top notch!', image: img1},
    { id: 2, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' },
    { id: 3, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' }
  ];

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

  return (
    <div className="com-scroll">
      {posts.map((post, index) => (
        // <div className="blocks" key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
        <div className="blocks">
          <div className="trend-post" key={post.id} onClick={() => onSelectPost(post)}>
            <h4><CgProfile /> {post.user}</h4>
            <p>{post.content}</p>
            <h5>{post.comments} comments</h5>
          </div>
          <div className="com-icon">
            <div>
              <FontAwesomeIcon icon={savedPosts[index] ? saved : save}
                onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }}/>
            </div>
            <div>
              <FontAwesomeIcon icon={likedPosts[index] ? liked : like}
                onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }}/>
              <h6>{post.likes}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TopForum = ({ onSelectPost }) => {
  const posts = [
    { id: 1, user: 'Nicki Minah', comments: 104, likes: '99k', content: 'Ga boong ini jelekkk banget' },
    { id: 2, user: 'Dr.Lee Dyah', comments: 32, likes: '51.2k', content: 'Hati-hati dengan merk..' },
    { id: 3, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' },
    { id: 3, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' }
  ];

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

  return (
    <div className="com-scroll">
      {posts.map((post, index) => (
        // <div className="blocks" key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
        <div className="blocks">
          <div className="trend-post" key={post.id} onClick={() => onSelectPost(post)}>
            <h4><CgProfile /> {post.user}</h4>
            <p>{post.content}</p>
            <h5>{post.comments} comments</h5>
          </div>
          <div className="com-icon">
            <div>
              <FontAwesomeIcon icon={savedPosts[index] ? saved : save}
                onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }}/>
            </div>
            <div>
              <FontAwesomeIcon icon={likedPosts[index] ? liked : like}
                onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }}/>
              <h6>{post.likes}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MostLiked = ({ onSelectPost }) => {
  const posts = [
    { id: 1, user: 'Nicki Minah', comments: 104, likes: '99k', content: 'Ga boong ini jelekkk banget' },
    { id: 2, user: 'Dr.Lee Dyah', comments: 32, likes: '51.2k', content: 'Hati-hati dengan merk..' },
    { id: 3, user: 'John Doe', comments: 12, likes: '5.2k', content: 'Great product, highly recommend!' }
  ];

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

  return (
    <div className="com-scroll">
      {posts.map((post, index) => (
        // <div className="blocks" key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
        <div className="blocks">
          <div className="trend-post" key={post.id} onClick={() => onSelectPost(post)}>
            <h4><CgProfile /> {post.user}</h4>
            <p>{post.content}</p>
            <h5>{post.comments} comments</h5>
          </div>
          <div className="com-icon">
            <div>
              <FontAwesomeIcon icon={savedPosts[index] ? saved : save}
                onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }}/>
            </div>
            <div>
              <FontAwesomeIcon icon={likedPosts[index] ? liked : like}
                onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }}/>
              <h6>{post.likes}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;