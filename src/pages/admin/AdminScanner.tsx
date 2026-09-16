import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import AdminLayout from '../../components/layout/AdminLayout';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './Admin.css';

interface TicketData {
  name: string;
  ticketId: string;
  status: string;
}

export const AdminScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<TicketData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!isScanning) return;

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    const handleScan = async (decodedText: string) => {
      if (html5QrCode.isScanning) {
        await html5QrCode.stop();
      }
      setIsScanning(false);
      setErrorMsg(null);
      
      try {
        const docRef = doc(db, 'registrations', decodedText);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as TicketData;
          
          if (data.status === 'attended') {
            setErrorMsg(`Ticket ${data.ticketId} has already been checked in!`);
          } else {
            await updateDoc(docRef, { status: 'attended' });
            setScanResult(data);
          }
        } else {
          setErrorMsg("Invalid QR Code. No such registration found.");
        }
      } catch (err) {
        console.error("Error fetching/updating document: ", err);
        setErrorMsg("Network error verifying ticket. Please try again.");
      }
    };

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      handleScan,
      () => {} // ignore scan errors (they happen every frame a QR code isn't found)
    ).catch(err => {
      console.error("Error starting scanner", err);
      setErrorMsg("Could not start camera. Please ensure camera permissions are granted.");
      setIsScanning(false);
    });

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const resetScanner = () => {
    setScanResult(null);
    setErrorMsg(null);
    setIsScanning(true);
  };

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h2>QR Ticket Scanner</h2>
      </div>
      
      <div className="scanner-container">
        {!scanResult && !errorMsg ? (
          <>
            <p style={{marginBottom: '16px', color: '#4B5563'}}>Point camera at attendee's digital ticket.</p>
            <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}></div>
            {isScanning && <p style={{marginTop: '16px', color: '#00AEEF', fontWeight: 500}}>Scanning...</p>}
          </>
        ) : errorMsg ? (
          <div className="scan-result" style={{backgroundColor: '#FEF2F2', borderColor: '#FECACA', color: '#B91C1C'}}>
            <h3 style={{fontSize: '1.25rem', marginBottom: '8px'}}>⚠ Scan Error</h3>
            <p>{errorMsg}</p>
            <button className="btn-primary" style={{marginTop: '24px'}} onClick={resetScanner}>
              TRY AGAIN
            </button>
          </div>
        ) : (
          <div className="scan-result">
            <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>✓ Attendee Verified</h3>
            <p><strong>Name:</strong> {scanResult?.name}</p>
            <p><strong>Ticket ID:</strong> {scanResult?.ticketId}</p>
            <p style={{marginTop: '8px', color: '#059669', fontWeight: 600}}>Status updated to ATTENDED.</p>
            <button className="btn-primary" style={{marginTop: '24px'}} onClick={resetScanner}>
              SCAN NEXT ATTENDEE
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
