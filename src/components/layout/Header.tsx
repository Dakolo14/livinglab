import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const isExperts = location.pathname === '/experts';
  const isLabRoutes = location.pathname === '/lab-routes';
  const isDarkText = isScrolled || location.pathname === '/v1' || location.pathname === '/' || isV3 || isExperts || isLabRoutes || isMobileMenuOpen;
  const isSolidBg = isScrolled || isV3 || isExperts || isLabRoutes || isMobileMenuOpen;
  const isHomepage = location.pathname === '/' || location.pathname === '/v1' || location.pathname === '/v2' || location.pathname === '/v3';

  const getAnchor = (hash: string) => {
    return isHomepage ? hash : `/v1${hash}`;
  };

  return (
    <header className={`site-header ${isSolidBg ? 'scrolled' : ''} ${isDarkText ? 'dark-text' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/v1">
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
            <div 
              className="nav-dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen(false)}
            >
              <span 
                className="nav-link" 
                onClick={() => window.innerWidth <= 768 && setIsDropdownOpen(!isDropdownOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                Home 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/v1" className="dropdown-item" onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>Home V1</Link>
                  <Link to="/v2" className="dropdown-item" onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>Home V2</Link>
                  <Link to="/v3" className="dropdown-item" onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>Home V3</Link>
                </div>
              )}
            </div>
            <Link to="/experts" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experts</Link>
            <Link to="/lab-routes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Lab Routes</Link>
            <a href={getAnchor('#science')} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Science</a>
            <a href={getAnchor('#programme')} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Programme</a>
          </nav>

          <div className="header-cta">
            <button 
              className="btn-primary" 
              onClick={() => {
                window.dispatchEvent(new Event('open-registration'));
                setIsMobileMenuOpen(false);
              }}
            >
              Claim Slot
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
