import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const newsItem = news && news[parseInt(id)];

  if (!newsItem) {
    return (
      <div className="container">
        <div className="news-detail-container">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
          <div className="news-not-found">
            <h2>News article not found</h2>
            <p>The article you're looking for might have been moved or deleted.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="news-detail-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        
        <article className="news-detail">
          <div className="news-detail-meta">
            <span className="news-detail-category">{newsItem.category}</span>
            <span className="news-detail-date">{newsItem.date}</span>
          </div>
          
          <h1 className="news-detail-title">{newsItem.title}</h1>
          
          <div className="news-detail-content">
            <p className="news-detail-description">{newsItem.description}</p>
            
            {/* Enhanced content for better presentation */}
            <div className="news-detail-body">
              <p>
                This is an exciting development in the {newsItem.category.toLowerCase()} space. 
                The implications of this news could significantly impact how we approach 
                technology and innovation in the coming months.
              </p>
              
              <p>
                Industry experts are closely monitoring these developments, as they represent 
                a shift towards more advanced and user-friendly solutions. The technology 
                sector continues to evolve at a rapid pace, bringing new opportunities 
                and challenges.
              </p>
              
              <p>
                For more detailed information and updates on this topic, continue following 
                our news feed for the latest developments in {newsItem.category.toLowerCase()} 
                and related fields.
              </p>
            </div>
            
            {newsItem.link && newsItem.link !== '#' && (
              <div className="external-link-section">
                <h3>External Source</h3>
                <a 
                  href={newsItem.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="external-link"
                >
                  Read original article ↗
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;