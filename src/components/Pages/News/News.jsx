import React from "react";
import './News.css';
import Hero from '../News/HeroNews/HeroNews'
import image1 from '../../../assets/saphoraKid.png'
import image2 from '../../../assets/vouge.png'
import image3 from '../../../assets/kid-skincare.png'
import image4 from '../../../assets/skincare-news.png'

const NewsPage = () => {
  const articles = [
    {
      id: 1,
      title: "Breaking News: Major Event Happening Now",
      date: "October 5, 2024",
      content: "Details about the major event happening right now in the world...",
      image: image1,
      link: "https://edition.cnn.com/2024/03/12/business/sephora-kid-tweens-skincare-obsession/index.html",
    },
    {
      id: 2,
      title: "I Simplified My Skin Care Routine, and I’m Obsessed With the Results",
      date: "October 4, 2024",
      content: "A new study published today has revealed surprising findings about...",
      image: image2,
      link: "https://www.vogue.com/article/simplified-skincare-routine",
    },
    {
      id: 3,
      title: "Growing skincare use by children is dangerous, say dermatologists",
      date: "October 3, 2024",
      content: "In 2024, technology has advanced in remarkable ways, including...",
      image: image3,
      link: "https://www.bbc.com/news/health-67993618",
    },
    {
      id: 4,
      title: "New skincare brand aims to shield city skin",
      date: "October 2, 2024",
      content: "To maintain a healthy lifestyle, consider these tips and tricks...",
      image: image4,
      link: "https://www.transformmagazine.net/articles/2024/new-skincare-brand-aims-to-shield-city-skin/",
    },
  ];

  return (
    <div className="grand-news">
      <Hero />
      <div className="news-page-container">
        <header className="news-header">
          <h1>Latest News</h1>
        </header>

        <div className="news-content">
          <main className="news-articles">
            {articles.map((article) => (
              <article key={article.id} className="news-article">
                <img src={article.image} alt={article.title} className="article-image" />
                <h2 className="article-title">{article.title}</h2>
                <p className="article-date">{article.date}</p>
                <p className="article-content">{article.content}</p>

                {/* Use anchor <a> for external link */}
                <a href={article.link} className="read-more" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
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
