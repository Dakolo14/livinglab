import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import AdminLayout from '../../components/layout/AdminLayout';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
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
        // The decodedText is now the email address
        const q = query(
          collection(db, 'registrations'),
          where('email', '==', decodedText.toLowerCase().trim())
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          let checkedInCount = 0;
          let alreadyCheckedInCount = 0;
          let attendeeName = '';
          let ticketIds: string[] = [];
          
          for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data() as TicketData;
            attendeeName = data.name || attendeeName;
            
            if (data.status === 'rsvped') {
              await updateDoc(doc(db, 'registrations', docSnap.id), { status: 'attended' });
              checkedInCount++;
              ticketIds.push(data.ticketId);

              // Send CheckInSuccess Email
              try {
                await fetch('/api/send-checkin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: data.name, email: data.email })
                });
              } catch (e) {
                console.error("Failed to send checkin email", e);
              }
            } else if (data.status === 'attended') {
              alreadyCheckedInCount++;
              ticketIds.push(data.ticketId);
            }
          }
          
          if (checkedInCount > 0) {
            setScanResult({ 
              name: attendeeName, 
              ticketId: ticketIds.join(', '), 
              status: 'attended' 
            });
          } else if (alreadyCheckedInCount > 0) {
            setErrorMsg(`All tickets for ${decodedText} have already been checked in!`);
          } else {
            setErrorMsg(`No valid RSVP found for ${decodedText}.`);
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
          <div className="scan-result error">
            <h3 style={{fontSize: '1.1rem', marginBottom: '8px', fontWeight: 600}}>⚠ Scan Error</h3>
            <p style={{fontSize: '0.95rem'}}>{errorMsg}</p>
            <button className="btn-primary" style={{marginTop: '24px', width: '100%'}} onClick={resetScanner}>
              TRY AGAIN
            </button>
          </div>
        ) : (
          <div className="scan-result success">
            <div style={{color: '#059669', fontSize: '2rem', marginBottom: '8px'}}>✓</div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '4px', color: '#111827', fontWeight: 600}}>Verified</h3>
            <p style={{fontSize: '0.95rem', color: '#4B5563', margin: '0'}}>{scanResult?.name} • {scanResult?.ticketId}</p>
            <p style={{marginTop: '12px', fontSize: '0.85rem', color: '#059669', fontWeight: 500}}>Checked in successfully.</p>
            <button className="btn-primary" style={{marginTop: '24px', width: '100%'}} onClick={resetScanner}>
              SCAN NEXT
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
