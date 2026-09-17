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
  session: string;
  status: string;
}

export const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmCheckInId, setConfirmCheckInId] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const handleUndoCheckIn = async (docId: string) => {
    const isSure = window.confirm("Are you sure you want to undo this check-in? Their ticket will become valid again.");
    if (!isSure) return;

    try {
      await updateDoc(doc(db, 'registrations', docId), {
        status: 'rsvped' // Revert to RSVPed so they still have a valid ticket
      });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to undo check-in.");
    }
  };

  const handleInvite = async (docId: string) => {
    const isSure = window.confirm("Send an invitation to this applicant?");
    if (!isSure) return;
    try {
      await updateDoc(doc(db, 'registrations', docId), { status: 'invited' });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to invite applicant.");
    }
  };

  const handleReject = async (docId: string) => {
    const isSure = window.confirm("Reject this application?");
    if (!isSure) return;
    try {
      await updateDoc(doc(db, 'registrations', docId), { status: 'rejected' });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to reject applicant.");
    }
  };

  const finishTour = () => {
    localStorage.setItem('livinglab_admin_tour_seen', 'true');
    setShowTour(false);
  };

  const handleExportCSV = () => {
    if (attendees.length === 0) return;
    
    const headers = ['Ticket ID', 'Name', 'Email', 'Session', 'Status'];
    const csvRows = [headers.join(',')];
    
    attendees.forEach(a => {
      const values = [
        `"${a.ticketId}"`,
        `"${a.name}"`,
        `"${a.email}"`,
        `"${a.session}"`,
        `"${a.status}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'livinglab_registrations.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredAttendees = attendees.filter(attendee => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;

    if (filterBy === 'name') return attendee.name && attendee.name.toLowerCase().includes(term);
    if (filterBy === 'email') return attendee.email && attendee.email.toLowerCase().includes(term);
    if (filterBy === 'ticketId') return attendee.ticketId && attendee.ticketId.toLowerCase().includes(term);
    if (filterBy === 'session') return attendee.session && attendee.session.toLowerCase().includes(term);
    
    // Default 'all'
    return (
      (attendee.name && attendee.name.toLowerCase().includes(term)) ||
      (attendee.email && attendee.email.toLowerCase().includes(term)) ||
      (attendee.ticketId && attendee.ticketId.toLowerCase().includes(term)) ||
      (attendee.session && attendee.session.toLowerCase().includes(term))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAttendees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAttendees = filteredAttendees.slice(startIndex, startIndex + rowsPerPage);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy]);

  const totalRegistrations = attendees.length;
  const checkedIn = attendees.filter(a => a.status === 'attended').length;
  const pending = totalRegistrations - checkedIn;

  return (
    <AdminLayout 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      onHelpClick={() => setShowTour(true)}
    >
      <div className="admin-header-row">
        <div>
          <h2>Welcome back, Admin</h2>
          <p className="admin-subtitle">Here is the latest data for Living Lab Nigeria 2026.</p>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
          <button className="btn-secondary" style={{padding: '10px 20px', backgroundColor: '#F8FAFC', color: '#0F172A', border: '1px solid #CBD5E1'}} onClick={() => alert("Excel export requires a premium plugin or library like xlsx. Use CSV for now!")}>Export Excel</button>
          <button className="btn-primary" style={{padding: '10px 20px'}} onClick={handleExportCSV}>Export CSV</button>
        </div>
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
              <th>Session</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>Loading live data...</td>
              </tr>
            ) : paginatedAttendees.length > 0 ? (
              paginatedAttendees.map(attendee => (
                <tr key={attendee.docId}>
                  <td style={{fontFamily: 'monospace', color: '#64748b'}}>{attendee.ticketId || '—'}</td>
                  <td style={{fontWeight: 400, color: '#0f172a'}}>{attendee.name}</td>
                  <td style={{color: '#475569'}}>{attendee.email}</td>
                  <td style={{color: '#475569'}}>{attendee.session}</td>
                  <td>
                    <span className={`status-badge ${attendee.status}`}>
                      {attendee.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {attendee.status === 'applied' ? (
                      <div style={{display: 'flex', gap: '8px'}}>
                        <button className="btn-table-action" style={{backgroundColor: '#8B5CF6'}} onClick={() => handleInvite(attendee.docId)}>Invite</button>
                        <button className="btn-table-action" style={{backgroundColor: '#EF4444'}} onClick={() => handleReject(attendee.docId)}>Reject</button>
                      </div>
                    ) : (attendee.status === 'registered' || attendee.status === 'rsvped') ? (
                      <button className="btn-table-action" onClick={() => setConfirmCheckInId(attendee.docId)}>Check-In</button>
                    ) : attendee.status === 'attended' ? (
                      <button 
                        className="btn-table-action" 
                        style={{backgroundColor: '#94A3B8'}} 
                        onClick={() => handleUndoCheckIn(attendee.docId)}
                      >
                        Undo
                      </button>
                    ) : (
                      <span style={{color: '#64748b', fontSize: '0.85rem'}}>—</span>
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
        
        {/* Pagination & Scanner Controls */}
        <div className="admin-table-footer">
          <button 
            className="btn-secondary scan-btn"
            onClick={() => window.location.href = '/admin/scanner'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
            </svg>
            Launch Scanner
          </button>
          
          <div className="admin-table-pagination">
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="pagination-buttons">
              <button 
                className="btn-secondary" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <button 
                className="btn-secondary" 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmCheckInId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Confirm Check-In</h3>
            <p>Are you sure you want to manually check-in this attendee? This action will mark their ticket as ATTENDED.</p>
            <div className="admin-modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmCheckInId(null)}>Cancel</button>
              <button className="btn-primary" onClick={confirmCheckIn}>Confirm</button>
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
