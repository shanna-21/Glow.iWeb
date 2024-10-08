import React from "react";
import './NewsPage.css';

const NewsLayout = () => {
    const { id } = useParams(); // Get article id from the URL

    // Example article data (in a real app, you'd fetch this from a server)
    const articleData = {
      title: "Breaking News: Major Event Happening Now",
      date: "October 5, 2024",
      author: "Jane Doe",
      content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dictum quam.
        Quisque pharetra, felis a hendrerit egestas, lacus ligula ultricies metus, vel
        tincidunt nisl nunc in sapien. Suspendisse potenti. Aliquam erat volutpat. Duis
        id vehicula mauris. Morbi at libero vitae sem egestas congue eget ut eros.
        Curabitur sollicitudin justo non lorem fermentum, et pharetra dui suscipit.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat dui
        ac metus tincidunt vehicula. Suspendisse bibendum lorem eu metus tempor, ac
        scelerisque elit facilisis. Vivamus gravida tristique gravida. Vestibulum ut
        aliquam eros. Phasellus vulputate, tortor at scelerisque fringilla, eros odio
        facilisis odio, nec finibus nisi elit et metus.
      `,
      image: "https://via.placeholder.com/600",
    };
  
    return (
      <div className="full-article-container">
        <header className="article-header">
          <h1 className="article-title">{articleData.title}</h1>
          <div className="article-meta">
            <span className="article-date">{articleData.date}</span> | 
            <span className="article-author"> by {articleData.author}</span>
          </div>
        </header>
  
        <div className="article-image-container">
          <img src={articleData.image} alt={articleData.title} className="article-image" />
        </div>
  
        <div className="article-content">
          <p>{articleData.content}</p>
        </div>
  
        <footer className="article-footer">
          <p>Share this article:</p>
          <div className="social-icons">
            <a href="#facebook" className="social-link">Facebook</a>
            <a href="#twitter" className="social-link">Twitter</a>
            <a href="#linkedin" className="social-link">LinkedIn</a>
          </div>
        </footer>
      </div>
    );
};

export default NewsLayout;
