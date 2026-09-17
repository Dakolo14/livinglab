import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Globe, LogOut, Search, Menu, X, HelpCircle } from 'lucide-react';
import SEO from './SEO';
import '../../pages/admin/Admin.css';

interface AdminLayoutProps {
  children: React.ReactNode;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filterBy?: string;
  setFilterBy?: (filter: string) => void;
  onHelpClick?: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, searchTerm, setSearchTerm, filterBy, setFilterBy, onHelpClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="admin-layout-wrapper">
      <SEO title="Admin Portal" description="LRP Living Lab Admin" />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="admin-mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-brand">
          <img src="/BLUE LOGO.png" alt="LRP Logo" className="admin-sidebar-logo" />
          <span className="admin-sidebar-title">admin</span>
          <button className="admin-mobile-close" onClick={closeMobileMenu}>
            <X size={24} />
          </button>
        </div>
        
        <div className="admin-menu-section">
          <p className="admin-menu-label">MAIN MENU</p>
          <nav className="admin-nav-menu">
            <Link 
              to="/admin/dashboard" 
              className={`admin-nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <LayoutDashboard className="nav-icon" size={20} /> Dashboard
            </Link>
            <Link 
              to="/admin/scanner" 
              className={`admin-nav-item ${location.pathname === '/admin/scanner' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <ScanLine className="nav-icon" size={20} /> QR Scanner
            </Link>
          </nav>
        </div>

        <div className="admin-menu-section" style={{ marginTop: 'auto' }}>
          <p className="admin-menu-label">OTHER</p>
          <nav className="admin-nav-menu">
            <a href="/" target="_blank" className="admin-nav-item" onClick={closeMobileMenu}>
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
          <button className="admin-mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} color="#0F172A" />
          </button>
          <div className="admin-topbar-actions" style={{display: 'flex', alignItems: 'center', gap: '16px', flex: 1}}>
            <div className="admin-search-mock" style={{display: 'flex', flex: 1, maxWidth: '600px'}}>
              {setFilterBy && (
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  style={{
                    border: 'none', 
                    background: 'transparent', 
                    color: '#475569', 
                    fontWeight: 500, 
                    marginRight: '12px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  className="mobile-filter-select"
                >
                  <option value="all">All Fields</option>
                  <option value="name">Name</option>
                  <option value="medicalId">Medical Practitioner</option>
                  <option value="ticketId">Ticket ID</option>
                  <option value="email">Email</option>
                </select>
              )}
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search attendees..." 
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                disabled={setSearchTerm === undefined}
                style={{flex: 1}}
              />
            </div>
          </div>
          
          <div className="admin-topbar-right">
            {onHelpClick && (
              <button 
                onClick={onHelpClick}
                style={{
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px'
                }}
                title="Help & Tour"
              >
                <HelpCircle size={24} />
              </button>
            )}
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
