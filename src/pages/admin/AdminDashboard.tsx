import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './Admin.css';

interface Attendee {
  docId: string;
  ticketId: string;
  name: string;
  email: string;
  medicalId: string;
  status: string;
}

export const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmCheckInId, setConfirmCheckInId] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  useEffect(() => {
    // Check if tour was already seen
    const tourSeen = localStorage.getItem('livinglab_admin_tour_seen');
    if (!tourSeen) {
      setShowTour(true);
    }

    const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      })) as Attendee[];
      setAttendees(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching registrations: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const confirmCheckIn = async () => {
    if (!confirmCheckInId) return;
    try {
      await updateDoc(doc(db, 'registrations', confirmCheckInId), {
        status: 'attended'
      });
      setConfirmCheckInId(null);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to check-in attendee.");
      setConfirmCheckInId(null);
    }
  };

  const finishTour = () => {
    localStorage.setItem('livinglab_admin_tour_seen', 'true');
    setShowTour(false);
  };

  const filteredAttendees = attendees.filter(attendee => 
    (attendee.name && attendee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (attendee.email && attendee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (attendee.ticketId && attendee.ticketId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (attendee.medicalId && attendee.medicalId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalRegistrations = attendees.length;
  const checkedIn = attendees.filter(a => a.status === 'attended').length;
  const pending = totalRegistrations - checkedIn;

  return (
    <AdminLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className="admin-header-row">
        <div>
          <h2>Welcome back, Admin</h2>
          <p className="admin-subtitle">Here is the latest data for Living Lab Nigeria 2026.</p>
        </div>
        <button className="btn-primary" style={{padding: '10px 20px'}} onClick={() => setShowTour(true)}>Help & Tour</button>
      </div>
      
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3>Total Registrations</h3>
          <div className="stat-value">{loading ? '...' : totalRegistrations}</div>
        </div>
        <div className="stat-card">
          <h3>Checked In</h3>
          <div className="stat-value">{loading ? '...' : checkedIn}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Arrival</h3>
          <div className="stat-value">{loading ? '...' : pending}</div>
        </div>
      </div>

      <div className="table-header">
        <h3>Recent Registrations</h3>
      </div>
      <div className="table-container">
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
            {loading ? (
              <tr>
                <td colSpan={6} style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>Loading live data...</td>
              </tr>
            ) : filteredAttendees.length > 0 ? (
              filteredAttendees.map(attendee => (
                <tr key={attendee.docId}>
                  <td style={{fontFamily: 'monospace', color: '#64748b'}}>{attendee.ticketId}</td>
                  <td style={{fontWeight: 400, color: '#0f172a'}}>{attendee.name}</td>
                  <td style={{color: '#475569'}}>{attendee.email}</td>
                  <td style={{color: '#475569'}}>{attendee.medicalId}</td>
                  <td>
                    <span className={`status-badge ${attendee.status}`}>
                      {attendee.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {attendee.status === 'registered' && (
                      <button className="btn-table-action" onClick={() => setConfirmCheckInId(attendee.docId)}>Check-In</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{textAlign: 'center', color: '#64748b', padding: '20px'}}>
                  {attendees.length === 0 ? 'No registrations yet.' : `No attendees found matching "${searchTerm}"`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmCheckInId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Confirm Check-In</h3>
            <p>Are you sure you want to manually check-in this attendee? This action will mark their ticket as ATTENDED.</p>
            <div className="admin-modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmCheckInId(null)}>Cancel</button>
              <button className="btn-primary" onClick={confirmCheckIn}>Confirm Check-In</button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Tour Modal */}
      {showTour && (
        <div className="admin-modal-overlay">
          <div className="admin-modal tour-modal">
            {tourStep === 1 && (
              <>
                <div className="tour-icon">📊</div>
                <h3>Welcome to the Dashboard</h3>
                <p>This is your live command center. Every time an attendee registers on the main website, they will instantly appear in the table below and the stats will update automatically.</p>
              </>
            )}
            {tourStep === 2 && (
              <>
                <div className="tour-icon">✓</div>
                <h3>Manual Check-In</h3>
                <p>If an attendee forgets their QR Code, you can manually check them in by searching for their name in the top bar and clicking the "Check-In" button next to their name.</p>
              </>
            )}
            {tourStep === 3 && (
              <>
                <div className="tour-icon">📱</div>
                <h3>QR Ticket Scanner</h3>
                <p>For the fastest check-in experience, click the <strong>Scanner</strong> icon in the left sidebar. You can use your phone, tablet, or laptop camera to instantly scan and verify attendee tickets!</p>
              </>
            )}
            
            <div className="tour-dots">
              <span className={`dot ${tourStep === 1 ? 'active' : ''}`}></span>
              <span className={`dot ${tourStep === 2 ? 'active' : ''}`}></span>
              <span className={`dot ${tourStep === 3 ? 'active' : ''}`}></span>
            </div>

            <div className="admin-modal-actions">
              {tourStep > 1 ? (
                <button className="btn-secondary" onClick={() => setTourStep(tourStep - 1)}>Back</button>
              ) : (
                <button className="btn-secondary" onClick={finishTour}>Skip</button>
              )}
              
              {tourStep < 3 ? (
                <button className="btn-primary" onClick={() => setTourStep(tourStep + 1)}>Next</button>
              ) : (
                <button className="btn-primary" onClick={finishTour}>Get Started</button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
