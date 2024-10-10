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

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/login", "/signup"];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/take-quiz" element={<Products />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/products-search" element={<ProductSearch />} />
        <Route path="/article/:id" element={<NewsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Authentication />} />
        <Route path="/news" element={<News />} />
      </Routes>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default App;
