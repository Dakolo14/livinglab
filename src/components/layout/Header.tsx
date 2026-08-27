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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track the most recently visited homepage version
  useEffect(() => {
    if (['/', '/v1', '/v2', '/v3'].includes(location.pathname)) {
      const homePath = location.pathname === '/' ? '/v1' : location.pathname;
      localStorage.setItem('activeHomeVersion', homePath);
    }
  }, [location.pathname]);

  const activeHome = localStorage.getItem('activeHomeVersion') || '/v1';

  const isV3 = location.pathname === '/v3';
  const isExperts = location.pathname === '/experts';
  const isLabRoutes = location.pathname === '/lab-routes';
  const isScience = location.pathname === '/science';
  const isProgramme = location.pathname === '/programme';
  
  const isDarkText = isScrolled || location.pathname === '/v1' || location.pathname === '/' || isV3 || isExperts || isLabRoutes || isScience || isProgramme || isMobileMenuOpen;
  const isSolidBg = isScrolled || isV3 || isExperts || isLabRoutes || isScience || isProgramme || isMobileMenuOpen;

  return (
    <header className={`site-header ${isSolidBg ? 'scrolled' : ''} ${isDarkText ? 'dark-text' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <Link to={activeHome}>
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
            <Link to="/lab-routes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Lab Routes</Link>
            <Link to="/science" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Science</Link>
            <Link to="/programme" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Programme</Link>
            <Link to="/experts" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experts</Link>
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
