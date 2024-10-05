import React from "react";
import './News.css';
import Hero from '../News/HeroNews/HeroNews'

const NewsPage = () => {
  const articles = [
    {
      title: "Breaking News: Major Event Happening Now",
      date: "October 5, 2024",
      content: "Details about the major event happening right now in the world...",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "New Study Reveals Surprising Findings",
      date: "October 4, 2024",
      content: "A new study published today has revealed surprising findings about...",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Technology Advancements in 2024",
      date: "October 3, 2024",
      content: "In 2024, technology has advanced in remarkable ways, including...",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Health Tips for a Better Life",
      date: "October 2, 2024",
      content: "To maintain a healthy lifestyle, consider these tips and tricks...",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="grand-news">
        <Hero/>
        <div className="news-page-container">
        <header className="news-header">
        <h1>Latest News</h1>
      </header>
      
      <div className="news-content">
        <main className="news-articles">
          {articles.map((article, index) => (
            <article key={index} className="news-article">
              <img src={article.image} alt={article.title} className="article-image" />
              <h2 className="article-title">{article.title}</h2>
              <p className="article-date">{article.date}</p>
              <p className="article-content">{article.content}</p>
              <button className="read-more">Read More</button>
            </article>
          ))}
        </main>

        <aside className="news-sidebar">
          <h2>Trending Topics</h2>
          <ul>
            <li><a href="#link1">Topic 1</a></li>
            <li><a href="#link2">Topic 2</a></li>
            <li><a href="#link3">Topic 3</a></li>
            <li><a href="#link4">Topic 4</a></li>
          </ul>
        </aside>
      </div>
      
      <footer className="news-footer">
        <p>&copy; 2024 News Company. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default NewsPage;
