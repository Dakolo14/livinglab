import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it animates in smoothly after page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-banner ${isVisible ? 'show' : ''}`}>
      <div className="cookie-banner-content">
        <div className="cookie-text">
          <h3>We Value Your Privacy</h3>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn-secondary" onClick={handleRejectNonEssential}>
            Reject Non-Essential
          </button>
          <button className="btn-primary" onClick={handleAcceptAll}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
