import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import './Admin.css';

// Mock Data
const MOCK_ATTENDEES = [
  { id: 'TKT-001', name: 'Dr. Jane Doe', email: 'jane@clinic.com', medicalId: 'MD-10294', status: 'attended' },
  { id: 'TKT-002', name: 'Dr. Samuel Ojo', email: 'samuel.o@hospital.ng', medicalId: 'MD-99212', status: 'registered' },
  { id: 'TKT-003', name: 'Dr. Fatima Hassan', email: 'fhassan@dermcenter.com', medicalId: 'MD-33019', status: 'registered' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="admin-header-row">
        <div>
          <h2>Welcome back, Admin</h2>
          <p className="admin-subtitle">Here is the latest data for Living Lab Nigeria 2026.</p>
        </div>
        <button className="btn-primary" style={{padding: '10px 20px'}}>Export CSV</button>
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
        <div className="table-header">
          <h3>Recent Registrations</h3>
        </div>
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
                <td style={{fontFamily: 'monospace', color: '#64748b'}}>{attendee.id}</td>
                <td style={{fontWeight: 600, color: '#0f172a'}}>{attendee.name}</td>
                <td style={{color: '#475569'}}>{attendee.email}</td>
                <td style={{color: '#475569'}}>{attendee.medicalId}</td>
                <td>
                  <span className={`status-badge ${attendee.status}`}>
                    {attendee.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {attendee.status === 'registered' && (
                    <button className="btn-table-action">Check-In</button>
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
