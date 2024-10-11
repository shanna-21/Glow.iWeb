import React, { useEffect, useState } from "react";
import comimg from '../../../assets/community.png';
import './Community.css';
import Posts from './Posts/Post';
import { CgProfile } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as save } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as saved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../Backend/config"; // Import Firestore

const Community = () => {
  const [activeItem, setActiveItem] = useState('Trending');
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="community-page">
      <div className="comhead">
        <img src={comimg} className="comheadpic" alt="Community" />
      </div>

      <h1>Forum</h1>

      <div className="comcontent">
        <div className="comsidebar">
          <div className="insidebar">
            <h3 className={activeItem === 'Trending' ? 'active' : ''}
              onClick={() => { setActiveItem('Trending'); setSelectedPost(null); }}>
              Trending
            </h3>
            <h3 className={activeItem === 'TopForum' ? 'active' : ''}
              onClick={() => { setActiveItem('TopForum'); setSelectedPost(null); }}>
              Top Forum
            </h3>
            <h3 className={activeItem === 'MostLiked' ? 'active' : ''}
              onClick={() => { setActiveItem('MostLiked'); setSelectedPost(null); }}>
              Most Liked
            </h3>
          </div>
        </div>

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

// Fetch posts from Firebase with error handling
const fetchPostsFromFirestore = async () => {
  try {
    const postsCollection = collection(db, 'posts'); // Use collection
    const snapshot = await getDocs(postsCollection); // Use getDocs
    const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Posts data:', postsData);
    return postsData;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
};


const Trending = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchPostsFromFirestore();
      if (posts.length > 0) {
        setPosts(posts);
        setSavedPosts(Array(posts.length).fill(false));
        setLikedPosts(Array(posts.length).fill(false));
      }
    };
    fetchPosts();
  }, []);

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

  return (
    <div className="com-scroll">
      {/* <div className="add-post-container">
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <button onClick={handleAddPost} disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
                </div> */}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <div className="blocks" key={post.id}>
            <div className="trend-post" onClick={() => onSelectPost(post)}>
              <h4><CgProfile /> {post.user}</h4>
              <p>{post.content}</p>
              <h5>{post.comments} comments</h5>
            </div>
            <div className="com-icon">
              <div>
                <FontAwesomeIcon icon={savedPosts[index] ? saved : save}
                  onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }} />
              </div>
              <div>
                <FontAwesomeIcon icon={likedPosts[index] ? liked : like}
                  onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }} />
                <h6>{post.likes}</h6>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const TopForum = (props) => <Trending {...props} />;
const MostLiked = (props) => <Trending {...props} />;

export default Community;
