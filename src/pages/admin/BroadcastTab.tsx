import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const BroadcastTab: React.FC = () => {
  const [audience, setAudience] = useState<string>('all');
  const [template, setTemplate] = useState<string>('3-weeks');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSendClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirm(false);
    setIsSending(true);
    setResult(null);

    try {
      const regsRef = collection(db, 'registrations');
      let q;
      if (audience === 'all') {
        q = query(regsRef);
      } else {
        q = query(regsRef, where('dayTime', '==', audience));
      }

      const snapshot = await getDocs(q);
      const users: any[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.email) users.push(data);
      });

      if (users.length === 0) {
        setResult({ error: 'No users found for this audience' });
        setIsSending(false);
        return;
      }

      const response = await fetch('/api/send-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, users })
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
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0', marginTop: '24px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Email Broadcast System</h3>
      
      <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Audience</label>
          <select 
            value={audience} 
            onChange={(e) => setAudience(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
          >
            <option value="all">All Registered Guests</option>
            <option value="Thursday Morning">Thursday Morning Session Only</option>
            <option value="Thursday Afternoon">Thursday Afternoon Session Only</option>
            <option value="Thursday Late">Thursday Late Session Only</option>
            <option value="Friday Morning">Friday Morning Session Only</option>
            <option value="Friday Afternoon">Friday Afternoon Session Only</option>
            <option value="Friday Late">Friday Late Session Only</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Reminder Template</label>
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
          >
            <option value="3-weeks">3 Weeks Before Event</option>
            <option value="2-weeks">2 Weeks Before Event</option>
            <option value="1-week">1 Week Before Event</option>
            <option value="48-hours">48 Hours Before Event</option>
            <option value="24-hours">24 Hours Before Event</option>
          </select>
        </div>

        <button 
          onClick={handleSendClick} 
          disabled={isSending}
          style={{ 
            backgroundColor: '#00AEEF', color: '#fff', padding: '14px', 
            borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: isSending ? 'not-allowed' : 'pointer',
            opacity: isSending ? 0.7 : 1
          }}
        >
          {isSending ? 'Sending Broadcast (This may take a minute)...' : 'SEND BROADCAST'}
        </button>

        {result && (
          <div style={{ 
            marginTop: '16px', padding: '16px', borderRadius: '8px', 
            backgroundColor: result.success ? '#F0FDF4' : '#FEF2F2',
            color: result.success ? '#166534' : '#991B1B',
            border: `1px solid ${result.success ? '#BBF7D0' : '#FECACA'}`
          }}>
            {result.success ? (
              <p style={{ margin: 0 }}><strong>Success!</strong> Sent {result.sentCount} emails successfully.</p>
            ) : (
              <p style={{ margin: 0 }}><strong>Error:</strong> {result.error || 'Something went wrong.'}</p>
            )}
          </div>
        )}
      </div>

      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '32px',
            maxWidth: '450px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#1E293B', fontSize: '24px' }}>Confirm Broadcast</h2>
            <p style={{ margin: '0 0 32px 0', color: '#475569', fontSize: '16px', lineHeight: '1.5' }}>
              Are you sure you want to send the <strong>{template}</strong> reminder to <strong>{audience}</strong>? This action cannot be undone and emails will be dispatched immediately.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '12px 24px', borderRadius: '8px', border: '1px solid #CBD5E1',
                  backgroundColor: '#fff', color: '#475569', fontWeight: 'bold', cursor: 'pointer',
                  flex: 1
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmSend}
                style={{
                  padding: '12px 24px', borderRadius: '8px', border: 'none',
                  backgroundColor: '#00AEEF', color: '#fff', fontWeight: 'bold', cursor: 'pointer',
                  flex: 1
                }}
              >
                Yes, Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
