import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewsList = ({ news }) => {
  const navigate = useNavigate();

  const handleReadMore = (index) => {
    navigate(`/news/${index}`);
  };

  return (
    <div className="news-grid">
      {news.length === 0 ? (
        <p className="no-news">No news available at the moment.</p>
      ) : (
        news.map((item, idx) => (
          <div key={idx} className="news-card">
            <div className="news-card-header">
              <span className="news-card-category">{item.category}</span>
              <span className="news-card-date">{item.date}</span>
            </div>
            <h3 className="news-card-title">{item.title}</h3>
            <p className="news-card-description">{item.description}</p>
            <button 
              onClick={() => handleReadMore(idx)} 
              className="news-card-button"
            >
              Read More →
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsList;
