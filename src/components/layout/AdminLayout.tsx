import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import '../../pages/admin/Admin.css';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <div className="admin-layout-wrapper">
      <SEO title="Admin Portal" description="LRP Living Lab Admin" />
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/BLUE LOGO.png" alt="LRP Logo" className="admin-sidebar-logo" />
          <span className="admin-sidebar-title">ADMIN</span>
        </div>
        
        <div className="admin-menu-section">
          <p className="admin-menu-label">MAIN MENU</p>
          <nav className="admin-nav-menu">
            <Link 
              to="/admin/dashboard" 
              className={`admin-nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span> Dashboard
            </Link>
            <Link 
              to="/admin/scanner" 
              className={`admin-nav-item ${location.pathname === '/admin/scanner' ? 'active' : ''}`}
            >
              <span className="nav-icon">📷</span> QR Scanner
            </Link>
          </nav>
        </div>

        <div className="admin-menu-section" style={{ marginTop: 'auto' }}>
          <p className="admin-menu-label">OTHER</p>
          <nav className="admin-nav-menu">
            <a href="/" target="_blank" className="admin-nav-item">
              <span className="nav-icon">🌐</span> View Live Site
            </a>
            <button onClick={handleLogout} className="admin-nav-item logout-btn">
              <span className="nav-icon">🚪</span> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <header className="admin-topbar">
          <div className="admin-search-mock">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search attendees..." disabled />
          </div>
          <div className="admin-profile">
            <span className="admin-avatar">A</span>
            <span className="admin-name">LRP Admin</span>
          </div>
        </header>
        
        <div className="admin-page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
