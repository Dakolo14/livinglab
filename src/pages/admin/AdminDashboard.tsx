import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/layout/SEO';
import './Admin.css';

// Mock Data
const MOCK_ATTENDEES = [
  { id: 'TKT-001', name: 'Dr. Jane Doe', email: 'jane@clinic.com', medicalId: 'MD-10294', status: 'attended' },
  { id: 'TKT-002', name: 'Dr. Samuel Ojo', email: 'samuel.o@hospital.ng', medicalId: 'MD-99212', status: 'registered' },
  { id: 'TKT-003', name: 'Dr. Fatima Hassan', email: 'fhassan@dermcenter.com', medicalId: 'MD-33019', status: 'registered' },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="admin-wrapper">
      <SEO title="Admin Dashboard" description="Event Management Portal" />
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className="admin-nav-brand">LIVING LAB ADMIN</Link>
        <div className="admin-nav-links">
          <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/scanner" className={location.pathname === '/admin/scanner' ? 'active' : ''}>QR Scanner</Link>
          <Link to="/">Exit to Site</Link>
        </div>
      </nav>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h2>Overview</h2>
        <button className="btn-secondary">Export to CSV</button>
      </div>
      
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3>Total Registrations</h3>
          <div className="stat-value">3</div>
        </div>
        <div className="stat-card">
          <h3>Checked In</h3>
          <div className="stat-value">1</div>
        </div>
        <div className="stat-card">
          <h3>Pending Arrival</h3>
          <div className="stat-value">2</div>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Medical ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ATTENDEES.map(attendee => (
              <tr key={attendee.id}>
                <td style={{fontFamily: 'monospace'}}>{attendee.id}</td>
                <td style={{fontWeight: 500}}>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.medicalId}</td>
                <td>
                  <span className={`status-badge ${attendee.status}`}>
                    {attendee.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {attendee.status === 'registered' && (
                    <button style={{fontSize: '0.8rem', padding: '6px 12px', cursor: 'pointer', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: '4px'}}>
                      Manual Check-In
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
