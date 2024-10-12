import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import Products from "./components/Pages/Products/Products";
import Community from "./components/Pages/Community/Community";
import Profile from "./components/Pages/Profile/Profile";
import Quiz from "./components/Pages/Products/Quiz";
import ProductSearch from "../src/components/Pages/ProductSearch/Product-search.jsx";
import ProductDetail from "./components/Pages/ProductSearch/Product-Detail.jsx";
import News from "./components/Pages/News/News.jsx";
import NewsPage from "./components/Pages/News/NewsPage/NewsPage.jsx";
import Authentication from "./components/Pages/login/firstPage.jsx";
import Landingpage from "./components/Pages/NoAuth/NoAuth.jsx"
import Login from "./components//Pages/login/login.jsx"
import Scan from "./components/Scan/Scan.jsx"
import { loadBundle } from "firebase/firestore";
import Post from "./components/Pages/Community/Posts/Post.jsx";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/login", "/signup"];
  const hideFooter = ["/scan"];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {/* {!hideFooter.includes(location.pathname) && <Scan />} */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/take-quiz" element={<Products />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/products-search" element={<ProductSearch />} />
        <Route path="/article/:id" element={<NewsPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Authentication/>}/>
        <Route path="/news" element={<News />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>

      <div className="footer-container">
        {/* <Footer /> */}
        {location.pathname !== '/scan' && <Footer />}
      </div>
    </div>
  );
};

export default App;
