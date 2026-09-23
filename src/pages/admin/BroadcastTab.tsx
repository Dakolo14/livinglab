import React, { useState } from 'react';

export const BroadcastTab: React.FC = () => {
  const [audience, setAudience] = useState<string>('all');
  const [template, setTemplate] = useState<string>('3-weeks');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async () => {
    const confirmSend = window.confirm(`Are you sure you want to send the '${template}' reminder to '${audience}'?`);
    if (!confirmSend) return;

    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/send-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audience, template })
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
          onClick={handleSend} 
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
    </div>
  );
};
