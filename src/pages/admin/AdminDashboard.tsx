import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import './Admin.css';

// Mock Data
const MOCK_ATTENDEES = [
  { id: 'TKT-8291', name: 'Dr. Jane Doe', email: 'jane@clinic.com', medicalId: 'Dermacare Clinic', status: 'attended' },
  { id: 'TKT-1048', name: 'Dr. Samuel Ojo', email: 'samuel.o@hospital.ng', medicalId: 'Lagos General Hospital', status: 'registered' },
  { id: 'TKT-5519', name: 'Dr. Fatima Hassan', email: 'fhassan@dermcenter.com', medicalId: 'Hassan Dermatology Center', status: 'registered' },
];

export const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendees = MOCK_ATTENDEES.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.medicalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
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
              <th>Medical Practitioner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map(attendee => (
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
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{textAlign: 'center', color: '#64748b'}}>No attendees found matching "{searchTerm}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
