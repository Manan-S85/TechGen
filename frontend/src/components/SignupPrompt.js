import React from 'react';
import Icon from './Icon';

const SignupPrompt = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSignupClick = () => {
    window.location.href = '/signup';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="signup-prompt-overlay" onClick={onClose}>
      <div className="signup-prompt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="signup-prompt-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="signup-prompt-content">
          <div className="signup-prompt-icon">
            <div className="rocket-icon">
              <Icon name="rocket" size={48} />
            </div>
          </div>
          
          <h2 className="signup-prompt-title">
            Unlock Full Access
          </h2>
          
          <p className="signup-prompt-description">
            Get unlimited access to all technology news, exclusive content, and personalized feeds. 
            Join thousands of tech enthusiasts already part of our community.
          </p>
          
          <div className="signup-prompt-features">
            <div className="feature-item">
              <span className="feature-icon">
                <Icon name="newspaper" size={20} />
              </span>
              <span>Unlimited news access</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <Icon name="target" size={20} />
              </span>
              <span>Personalized content</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <Icon name="zap" size={20} />
              </span>
              <span>Real-time updates</span>
            </div>
          </div>
          
          <div className="signup-prompt-actions">
            <button className="signup-btn primary" onClick={handleSignupClick}>
              Sign Up Now
            </button>
            <button className="signup-btn secondary" onClick={handleLoginClick}>
              Already have an account? Login
            </button>
          </div>
          
          <p className="signup-prompt-footer">
            Free forever • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPrompt;