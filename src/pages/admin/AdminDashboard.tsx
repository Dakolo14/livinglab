import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './Admin.css';
import { BroadcastTab } from './BroadcastTab';

interface Attendee {
  docId: string;
  ticketId: string;
  name: string;
  email: string;
  phone?: string;
  session: string;
  status: string;
  marketingConsent?: boolean;
}

interface GroupedAttendee {
  email: string;
  name: string;
  phone?: string;
  ticketIds: string[];
  sessions: Attendee[];
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendees' | 'broadcasts'>('attendees');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmCheckInId, setConfirmCheckInId] = useState<string | null>(null);
  const [manageModalUser, setManageModalUser] = useState<GroupedAttendee | null>(null);
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
        status: 'registered' // Revert to registered so they still have a valid ticket
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

  const handleReset = async (docId: string) => {
    const isSure = window.confirm("Reset this application back to 'applied'?");
    if (!isSure) return;
    try {
      await updateDoc(doc(db, 'registrations', docId), { status: 'applied', ticketId: '' });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to reset application.");
    }
  };

  const finishTour = () => {
    localStorage.setItem('livinglab_admin_tour_seen', 'true');
    setShowTour(false);
  };

  const handleExportCSV = () => {
    if (attendees.length === 0) return;
    
    const headers = ['Ticket ID', 'Name', 'Email', 'Phone', 'Session', 'Status', 'Marketing Consent'];
    const csvRows = [headers.join(',')];
    
    attendees.forEach(a => {
      const values = [
        `"${a.ticketId}"`,
        `"${a.name}"`,
        `"${a.email}"`,
        `"${a.phone || ''}"`,
        `"${a.session}"`,
        `"${a.status}"`,
        `"${a.marketingConsent ? 'Yes' : 'No'}"`
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


  const groupedAttendees = React.useMemo(() => {
    const map = new Map<string, GroupedAttendee>();
    attendees.forEach(a => {
      const key = a.email.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { email: a.email, name: a.name, phone: a.phone || '', ticketIds: [], sessions: [] });
      }
      const group = map.get(key)!;
      group.sessions.push(a);
      if (a.ticketId && !group.ticketIds.includes(a.ticketId)) {
        group.ticketIds.push(a.ticketId);
      }
    });
    return Array.from(map.values());
  }, [attendees]);

  // Update manageModalUser if data changes underneath
  useEffect(() => {
    if (manageModalUser) {
      const updated = groupedAttendees.find(g => g.email === manageModalUser.email);
      if (updated) setManageModalUser(updated);
    }
  }, [groupedAttendees]);

  const filteredAttendees = groupedAttendees.filter(attendee => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;

    if (filterBy === 'name') return attendee.name && attendee.name.toLowerCase().includes(term);
    if (filterBy === 'email') return attendee.email && attendee.email.toLowerCase().includes(term);
    if (filterBy === 'ticketId') return attendee.ticketIds.some(id => id.toLowerCase().includes(term));
    if (filterBy === 'session') return attendee.sessions.some(s => s.session.toLowerCase().includes(term));
    
    // Default 'all'
    return (
      (attendee.name && attendee.name.toLowerCase().includes(term)) ||
      (attendee.email && attendee.email.toLowerCase().includes(term)) ||
      (attendee.ticketIds.some(id => id.toLowerCase().includes(term))) ||
      (attendee.sessions.some(s => s.session.toLowerCase().includes(term)))
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
      
      <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: '24px', display: 'flex', gap: '32px' }}>
        <button 
          onClick={() => setActiveTab('attendees')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
            borderBottom: activeTab === 'attendees' ? '3px solid #00AEEF' : '3px solid transparent',
            color: activeTab === 'attendees' ? '#000' : '#64748B'
          }}
        >
          Attendees Overview
        </button>
        <button 
          onClick={() => setActiveTab('broadcasts')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
            borderBottom: activeTab === 'broadcasts' ? '3px solid #00AEEF' : '3px solid transparent',
            color: activeTab === 'broadcasts' ? '#000' : '#64748B'
          }}
        >
          Communications
        </button>
      </div>

      {activeTab === 'broadcasts' && <BroadcastTab />}
      
      {activeTab === 'attendees' && (
        <>
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
              paginatedAttendees.map(group => (
                <tr key={group.email}>
                  <td style={{fontFamily: 'monospace', color: '#64748b'}}>{group.ticketIds.length > 0 ? group.ticketIds.join(', ') : '—'}</td>
                  <td style={{fontWeight: 400, color: '#0f172a'}}>{group.name}</td>
                  <td style={{color: '#475569'}}>{group.email}</td>
                  <td style={{color: '#475569'}}>{group.sessions.length} Session(s)</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {group.sessions.slice(0, 2).map((s, idx) => (
                        <span key={idx} className={`status-badge ${s.status}`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                          {s.status.toUpperCase()}
                        </span>
                      ))}
                      {group.sessions.length > 2 && <span style={{fontSize: '0.7rem', color: '#64748b'}}>+{group.sessions.length - 2} more</span>}
                    </div>
                  </td>
                  <td>
                    <button className="btn-table-action" onClick={() => setManageModalUser(group)}>
                      Manage
                    </button>
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
      </>
      )}

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

      {manageModalUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '600px', width: '90%' }}>
            <h3>Manage Applicant</h3>
            <p style={{ marginBottom: '8px' }}><strong>{manageModalUser.name}</strong> ({manageModalUser.email})</p>
            {manageModalUser.phone && <p style={{ marginBottom: '4px', color: '#64748B', fontSize: '0.9rem' }}>Phone: {manageModalUser.phone}</p>}
            <p style={{ marginBottom: '24px', color: manageModalUser.sessions.some(s => s.marketingConsent) ? '#10B981' : '#64748B', fontSize: '0.9rem' }}>
              Marketing Consent: {manageModalUser.sessions.some(s => s.marketingConsent) ? '✅ Yes' : '❌ No'}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              {manageModalUser.sessions.map(session => (
                <div key={session.docId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#1E293B' }}>{session.session}</strong>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className={`status-badge ${session.status}`} style={{ fontSize: '0.7rem' }}>{session.status.toUpperCase()}</span>
                      {session.ticketId && <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#64748b', fontFamily: 'monospace' }}>{session.ticketId}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' }}>
                    {session.status === 'applied' && (
                      <>
                        <button className="btn-table-action" style={{backgroundColor: '#8B5CF6'}} onClick={() => handleInvite(session.docId)}>Invite</button>
                        <button className="btn-table-action" style={{backgroundColor: '#EF4444'}} onClick={() => handleReject(session.docId)}>Reject</button>
                      </>
                    )}
                    {(session.status === 'invited' || session.status === 'rejected') && (
                      <button className="btn-table-action" style={{backgroundColor: '#64748B'}} onClick={() => handleReset(session.docId)}>Undo</button>
                    )}
                    {(session.status === 'registered' || session.status === 'rsvped') && (
                      <button className="btn-table-action" onClick={() => {
                        setConfirmCheckInId(session.docId);
                      }}>Check-In</button>
                    )}
                    {session.status === 'attended' && (
                      <button className="btn-table-action" style={{backgroundColor: '#94A3B8'}} onClick={() => handleUndoCheckIn(session.docId)}>Undo</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="admin-modal-actions" style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button className="btn-secondary" onClick={() => setManageModalUser(null)}>Close</button>
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
