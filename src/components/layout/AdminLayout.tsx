import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Globe, LogOut, Search, UserCircle } from 'lucide-react';
import SEO from './SEO';
import '../../pages/admin/Admin.css';

interface AdminLayoutProps {
  children: React.ReactNode;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, searchTerm, setSearchTerm }) => {
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
              <LayoutDashboard className="nav-icon" size={20} /> Dashboard
            </Link>
            <Link 
              to="/admin/scanner" 
              className={`admin-nav-item ${location.pathname === '/admin/scanner' ? 'active' : ''}`}
            >
              <ScanLine className="nav-icon" size={20} /> QR Scanner
            </Link>
          </nav>
        </div>

        <div className="admin-menu-section" style={{ marginTop: 'auto' }}>
          <p className="admin-menu-label">OTHER</p>
          <nav className="admin-nav-menu">
            <a href="/" target="_blank" className="admin-nav-item">
              <Globe className="nav-icon" size={20} /> View Live Site
            </a>
            <button onClick={handleLogout} className="admin-nav-item logout-btn">
              <LogOut className="nav-icon" size={20} /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <header className="admin-topbar">
          <div className="admin-search-mock">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search attendees..." 
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              disabled={setSearchTerm === undefined}
            />
          </div>
          <div className="admin-profile">
            <UserCircle size={28} className="admin-avatar-icon" />
            <span className="admin-name">Profile</span>
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
