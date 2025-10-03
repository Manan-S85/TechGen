import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">TECHGEN</span>
            </div>
            <p className="footer-tagline">
              Empowering users with comprehensive technology news aggregation.
            </p>
            <div className="social-links">
              <a href="https://github.com/Manan-S85" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/manansinh-sandhaliya-0b6569251" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links and Quote */}
          <div className="footer-links">
            {/* Company Section */}
            <div className="footer-section">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="https://manan-portfolio-alpha.vercel.app/">About the Dev</a></li>
              </ul>
            </div>

            {/* Inspirational Quote Section */}
            <div className="footer-quote-section">
              <div className="quote-container">
                <blockquote className="footer-quote">
                  "Success is where preparation and opportunity meet."
                </blockquote>
                <cite className="quote-author">- Bobby Unser</cite>
              </div>
              <div className="quote-message">
                <p>Hard work beats talent when talent doesn't work hard. Skills and dedication are the foundation of every great achievement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-credits">
              <span>Powered by</span>
              <button type="button" className="credit-link">TechGen Team</button>
              <span>•</span>
              <span>Designed by</span>
              <button type="button" className="credit-link">TechGen Studio</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;