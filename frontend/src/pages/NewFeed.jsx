import { useEffect, useState } from "react";
import SignupPrompt from "../components/SignupPrompt";
import Icon from "../components/Icon";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');

    const fetchNews = async () => {
      try {
        const headers = {};
        if (userData) {
          const userObj = JSON.parse(userData);
          if (userObj.token) {
            headers['Authorization'] = `Bearer ${userObj.token}`;
          }
        }

        const response = await fetch("http://localhost:5000/api/news", { headers });
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
            <div key={idx} className={`news-item ${item.isLocked ? 'locked' : ''}`}>
              {item.isLocked ? (
                <div className="locked-content">
                  <div className="lock-icon">
                    <Icon name="lock" size={32} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="signup-prompt">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setShowSignupPrompt(true)}
                    >
                      Unlock Full Access
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </h3>
                  <div className="news-meta">
                    <span className="news-source">{item.source}</span>
                    <span className="news-category">{item.category}</span>
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
                </>
              )}
            </div>
          ))
        )}
      </div>
      
      <SignupPrompt 
        isOpen={showSignupPrompt} 
        onClose={() => setShowSignupPrompt(false)} 
      />
    </div>
  );
}
