import React from 'react';

const StudentSection = ({ studentNews, userRole }) => {
  return (
    <div className="students-section">
      <div className="students-header">
        <h3>Latest Student News</h3>
        <p className="section-description">News and updates relevant to students and education</p>
      </div>
      
      <div className="student-news-grid">
        {studentNews.length === 0 ? (
          <div className="no-news">
            <p>No student-specific news available at the moment.</p>
            <p>Check back later for updates on education, careers, and student life!</p>
          </div>
        ) : (
          studentNews.map((item, idx) => (
            <div key={idx} className="student-news-card">
              <div className="news-category-badge student-category">
                {item.category}
              </div>
              <h4>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h4>
              <div className="student-news-meta">
                <span className="news-source">{item.source}</span>
                <span className="news-date">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
              {item.description && (
                <p className="news-description">{item.description}</p>
              )}
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer" 
                className="student-news-link"
              >
                Read Full Article →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentSection;
