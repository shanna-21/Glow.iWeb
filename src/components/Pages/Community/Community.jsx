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
import Hero from "./Hero-Com/HeroCom"
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Auth
import { doc, getDoc, addDoc } from "firebase/firestore"; // Import Firestore functions
import profile_img from '../../../assets/profile-img.jfif';

const Community = () => {
  const [activeItem, setActiveItem] = useState('Trending');
  const [selectedPost, setSelectedPost] = useState(null);
  const auth = getAuth(); // Initialize Auth
  const [content, setContent] = useState(""); 
  const [user, setUser] = useState(null); // Updated during authentication check
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  
  // const ref = collection(db, "comments");
  const fetchUserData = async () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Store the user
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("User details:", docSnap.data());
        } else {
          console.error("No user details found");
        }
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });
  };
  

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser);
        setUser(currentUser);
        fetchUserData(currentUser.uid); // Fetch user details if logged in
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });
    
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);
  
  const handleAddPost = async () => {
    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    if (!user || !userDetails) {
      alert("You must be logged in to post!");
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
    <div className="community-page">
      <Hero/>


      <div className="comcontent">
        <div className="comsidebar">
          <h1>Forum</h1>
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

          <div className="add-post-container">
          <h2>Post Forum</h2>
            
             <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="Write something..."
              />
              <button onClick={handleAddPost} disabled={loading}>
                {loading ? "Posting..." : "Post"}
              </button>
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
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <div className="blocks" key={post.id}>
            <div className="trend-post" onClick={() => onSelectPost(post)}>
              <img src={profile_img} alt="profile" className="post-profile-pict" />
              <h3>{post.username}</h3>
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