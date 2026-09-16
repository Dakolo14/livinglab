import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AdminLayout from '../../components/layout/AdminLayout';
import './Admin.css';

export const AdminScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        // In a real app, this would trigger a Firebase write to update status
        scanner.pause(true);
      },
      (error) => {
        // Handle read errors silently
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h2>QR Ticket Scanner</h2>
      </div>
      
      <div className="scanner-container">
        {!scanResult ? (
          <>
            <p style={{marginBottom: '16px', color: '#4B5563'}}>Point camera at attendee's digital ticket.</p>
            <div id="reader"></div>
          </>
        ) : (
          <div className="scan-result">
            <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>✓ Attendee Verified</h3>
            <p><strong>Ticket ID:</strong> {scanResult}</p>
            <p style={{marginTop: '8px', color: '#059669'}}>Status updated to ATTENDED.</p>
            <button 
              className="btn-primary" 
              style={{marginTop: '24px'}}
              onClick={() => setScanResult(null)}
            >
              SCAN NEXT ATTENDEE
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
