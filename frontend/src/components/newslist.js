import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPrompt from './SignupPrompt';
import Icon from './Icon';

const NewsList = ({ news }) => {
  const navigate = useNavigate();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const handleReadMore = (index) => {
    navigate(`/news/${index}`);
  };

  return (
    <div className="news-grid">
      {news.length === 0 ? (
        <p className="no-news">No news available at the moment.</p>
      ) : (
        news.map((item, idx) => (
          <div key={idx} className={`news-card ${item.isLocked ? 'locked' : ''}`}>
            {item.isLocked ? (
              <div className="locked-content">
                <div className="lock-icon">
                  <Icon name="lock" size={32} />
                </div>
                <div className="news-card-header">
                  <span className="news-card-category">Locked</span>
                  <span className="news-card-date">{item.date}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-description">{item.description}</p>
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
              </>
            )}
          </div>
        ))
      )}
      
      <SignupPrompt 
        isOpen={showSignupPrompt} 
        onClose={() => setShowSignupPrompt(false)} 
      />
    </div>
  );
};

export default NewsList;
