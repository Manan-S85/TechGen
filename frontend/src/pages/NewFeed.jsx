import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news");
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading latest tech news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Latest Tech News</h1>
        <p>Stay updated with the latest technology news from multiple sources</p>
      </div>
      
      <div className="news-feed">
        {news.length === 0 ? (
          <p>No news available at the moment.</p>
        ) : (
          news.map((item, idx) => (
            <div key={idx} className="news-item">
              <h3>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
              <div className="news-meta">
                <span className="news-source">{item.source}</span>
                <span className="news-date">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
              {item.description && (
                <p className="news-description">{item.description}</p>
              )}
              <a href={item.url} target="_blank" rel="noreferrer" className="news-link">
                Read More →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
