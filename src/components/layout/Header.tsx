import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExperts = location.pathname === '/experts';
  const isLabRoutes = location.pathname === '/lab-routes';
  const isScience = location.pathname === '/science';
  const isProgramme = location.pathname === '/programme';
  
  const isDarkText = isScrolled || location.pathname === '/v1' || location.pathname === '/test' || isExperts || isLabRoutes || isScience || isProgramme || isMobileMenuOpen;
  const isSolidBg = isScrolled || isExperts || isLabRoutes || isScience || isProgramme || isMobileMenuOpen;

  return (
    <header className={`site-header ${isSolidBg ? 'solid-bg' : ''} ${isScrolled ? 'shrunk' : ''} ${isDarkText ? 'dark-text' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="/BLUE LOGO.png" alt="La Roche-Posay" />
          </Link>
        </div>
        
        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`header-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="header-nav">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/lab-routes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>What To Expect</Link>
            <Link to="/programme" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Programme</Link>
            <Link to="/experts" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Speakers</Link>
          </nav>

          <div className="header-cta">
            <button 
              className="btn-primary" 
              onClick={() => {
                window.dispatchEvent(new Event('open-registration'));
                setIsMobileMenuOpen(false);
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
