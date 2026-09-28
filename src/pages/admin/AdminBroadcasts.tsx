import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const AdminBroadcasts: React.FC = () => {
  const [audience, setAudience] = useState<string>('all');
  const [customEmails, setCustomEmails] = useState<string>('');
  const [template, setTemplate] = useState<string>('3-weeks');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSendClick = () => {
    if (audience === 'custom' && !customEmails.trim()) {
      alert("Please enter at least one email address");
      return;
    }
    if (template === 'custom') {
      if (!customSubject.trim() || !customMessage.trim()) {
        alert("Please enter a subject and message for the custom broadcast");
        return;
      }
    }
    setShowConfirm(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirm(false);
    setIsSending(true);
    setResult(null);

    try {
      const users: any[] = [];
      
      if (audience === 'custom') {
        const emails = customEmails.split(',').map(e => e.trim().toLowerCase()).filter(e => e);
        emails.forEach(email => {
          users.push({ email, name: 'Guest', session: 'Custom' });
        });
      } else {
        const regsRef = collection(db, 'registrations');
        let q;
        if (audience === 'all') {
          q = query(regsRef);
        } else {
          q = query(regsRef, where('session', '==', audience));
        }

        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.email) users.push(data);
        });
      }

      if (users.length === 0) {
        setResult({ error: 'No users found for this audience' });
        setIsSending(false);
        return;
      }

      const response = await fetch('/api/send-broadcast', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_SECRET_KEY || 'livinglab-secret-2026'}`
        },
        body: JSON.stringify({ 
          template, 
          users, 
          customSubject: template === 'custom' ? customSubject : undefined,
          customMessage: template === 'custom' ? customMessage : undefined
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to send broadcast' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <div>
          <h2>Communications & Broadcasts</h2>
          <p>Send emails and reminders to event attendees</p>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '32px', border: '1px solid #E2E8F0', maxWidth: '800px' }}>
        
        <div style={{ display: 'grid', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1E293B' }}>Target Audience</label>
            <select 
              value={audience} 
              onChange={(e) => setAudience(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
            >
              <option value="all">All Registered Attendees</option>
              <option value="Thursday Morning">Thursday Morning Session Only</option>
              <option value="Thursday Afternoon">Thursday Afternoon Session Only</option>
              <option value="Thursday Late">Thursday Late Session Only</option>
              <option value="Friday Morning">Friday Morning Session Only</option>
              <option value="Friday Afternoon">Friday Afternoon Session Only</option>
              <option value="Friday Late">Friday Late Session Only</option>
              <option value="custom">Specific Emails (Custom)</option>
            </select>
          </div>

          {audience === 'custom' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1E293B' }}>Emails to Notify</label>
              <textarea 
                value={customEmails}
                onChange={(e) => setCustomEmails(e.target.value)}
                placeholder="email1@domain.com, email2@domain.com..."
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical' }}
              />
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>Separate multiple emails with commas</p>
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1E293B' }}>Message Template</label>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
            >
              <option value="3-weeks">3 Weeks Before Event (Reminder)</option>
              <option value="2-weeks">2 Weeks Before Event (Reminder)</option>
              <option value="1-week">1 Week Before Event (Reminder)</option>
              <option value="48-hours">48 Hours Before Event (Reminder)</option>
              <option value="24-hours">24 Hours Before Event (Reminder)</option>
              <option value="thank-you">Thank You (Post-Event)</option>
              <option value="custom">Custom Message</option>
            </select>
          </div>

          {template === 'custom' && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1E293B' }}>Subject Line</label>
                <input 
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Important Update for Living Lab Nigeria"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1E293B' }}>Custom Message (HTML allowed)</label>
                <textarea 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Dear Attendee,\n\nWe wanted to let you know..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', minHeight: '150px', resize: 'vertical' }}
                />
              </div>
            </>
          )}

          <button 
            onClick={handleSendClick} 
            disabled={isSending}
            style={{ 
              backgroundColor: isSending ? '#94A3B8' : '#00AEEF', 
              color: 'white', 
              padding: '16px', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: 'bold',
              cursor: isSending ? 'not-allowed' : 'pointer',
              marginTop: '16px',
              fontSize: '1rem',
              letterSpacing: '0.5px'
            }}
          >
            {isSending ? 'SENDING BROADCAST...' : 'REVIEW & SEND BROADCAST'}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', backgroundColor: result.error ? '#FEF2F2' : '#F0FDF4', border: `1px solid ${result.error ? '#FECACA' : '#BBF7D0'}`, color: result.error ? '#B91C1C' : '#15803D' }}>
            {result.error ? (
              <p style={{ margin: 0 }}><strong>Error:</strong> {result.error}</p>
            ) : (
              <div>
                <p style={{ margin: '0 0 8px 0' }}><strong>Success!</strong> Broadcast completed.</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Successfully sent to {result.successfulSends || 0} users.</p>
                {result.failedSends > 0 && <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem' }}>Failed sends: {result.failedSends}</p>}
              </div>
            )}
          </div>
        )}

        {showConfirm && (
          <div className="admin-modal-overlay" style={{ zIndex: 1200 }}>
            <div className="admin-modal">
              <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '16px' }}>Confirm Broadcast</h3>
              <p style={{ color: '#475569', marginBottom: '24px', lineHeight: 1.5 }}>
                You are about to send the <strong>{template}</strong> template to 
                <strong> {audience === 'custom' ? customEmails.split(',').length + ' specific email(s)' : audience === 'all' ? 'ALL registered attendees' : audience}</strong>.
                <br/><br/>
                This action cannot be undone. Do you want to proceed?
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => setShowConfirm(false)}
                  style={{ flex: 1, padding: '12px', border: '1px solid #CBD5E1', background: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmSend}
                  style={{ flex: 1, padding: '12px', border: 'none', background: '#00AEEF', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Yes, Send Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBroadcasts;
