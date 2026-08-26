import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isV3 = location.pathname === '/v3';
  const isDarkText = isScrolled || location.pathname === '/v1' || location.pathname === '/' || isV3;
  const isSolidBg = isScrolled || isV3;

  return (
    <header className={`site-header ${isSolidBg ? 'scrolled' : ''} ${isDarkText ? 'dark-text' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <img src="/BLUE LOGO.png" alt="La Roche-Posay" />
        </div>
        
        <nav className="header-nav">
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="nav-link">Home ▾</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/v1" className="dropdown-item">Home V1 (Minimalist)</Link>
                <Link to="/v2" className="dropdown-item">Home V2 (Cinematic)</Link>
                <Link to="/v3" className="dropdown-item">Home V3 (Registration)</Link>
              </div>
            )}
          </div>
          <a href="#lab-journey" className="nav-link">Lab Routes</a>
          <a href="#science" className="nav-link">Science</a>
          <a href="#programme" className="nav-link">Programme</a>
        </nav>

        <div className="header-cta">
          <button 
            className="btn-primary" 
            onClick={() => window.dispatchEvent(new Event('open-registration'))}
          >
            Claim Slot
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
