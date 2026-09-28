import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import AdminLayout from '../../components/layout/AdminLayout';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './Admin.css';

interface TicketData {
  name: string;
  email: string;
  ticketId: string;
  session?: string;
  status: string;
}

interface PendingUser {
  id: string;
  data: TicketData;
}

export const AdminScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<TicketData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [pendingUser, setPendingUser] = useState<PendingUser[] | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [manualInput, setManualInput] = useState('');
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
        let cleanEmail = decodedText;
        try {
          cleanEmail = decodeURIComponent(cleanEmail);
        } catch(e) {}
        
        cleanEmail = cleanEmail.replace(/^mailto:/i, '').toLowerCase().trim();

        const q = query(
          collection(db, 'registrations'),
          where('email', '==', cleanEmail)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          let rsvpDocs: PendingUser[] = [];
          let alreadyCheckedInCount = 0;
          let attendeeName = '';
          
          for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data() as TicketData;
            attendeeName = data.name || attendeeName;
            
            if (data.status === 'registered' || data.status === 'rsvped') {
              rsvpDocs.push({ id: docSnap.id, data });
            } else if (data.status === 'attended') {
              alreadyCheckedInCount++;
            }
          }
          
          if (rsvpDocs.length > 0) {
            setPendingUser(rsvpDocs);
          } else if (alreadyCheckedInCount > 0) {
            setErrorMsg(`All tickets for ${decodedText} have already been checked in!`);
          } else {
            setErrorMsg(`No valid registration found for ${decodedText}.`);
          }
        } else {
          setErrorMsg(`Invalid QR Code. No registration found for "${cleanEmail}".`);
        }
      } catch (err: any) {
        console.error("Error fetching/updating document: ", err);
        setErrorMsg(`Database Error: ${err.message || 'Unknown network error'}`);
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
    setPendingUser(null);
    setManualInput('');
    setIsScanning(true);
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop().catch(() => {});
    }
    setIsScanning(false);
    setErrorMsg(null);
    
    try {
      const q = query(
        collection(db, 'registrations'),
        where('ticketId', '==', manualInput.trim().toUpperCase())
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        let rsvpDocs: PendingUser[] = [];
        let alreadyCheckedInCount = 0;
        
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data() as TicketData;
          if (data.status === 'registered' || data.status === 'rsvped') {
            rsvpDocs.push({ id: docSnap.id, data });
          } else if (data.status === 'attended') {
            alreadyCheckedInCount++;
          }
        }
        
        if (rsvpDocs.length > 0) {
          setPendingUser(rsvpDocs);
        } else if (alreadyCheckedInCount > 0) {
          setErrorMsg(`Ticket ${manualInput} has already been checked in!`);
        } else {
          setErrorMsg(`No valid registration found for Ticket ${manualInput}.`);
        }
      } else {
        setErrorMsg(`Invalid Ticket ID. No registration found for "${manualInput}".`);
      }
    } catch (err: any) {
      console.error("Error fetching/updating document: ", err);
      setErrorMsg(`Database Error: ${err.message || 'Unknown network error'}`);
    }
  };

  const handleConfirmCheckIn = async (users: PendingUser[]) => {
    setIsConfirming(true);
    let ticketIds: string[] = [];
    const firstUser = users[0].data;

    try {
      for (const user of users) {
        await updateDoc(doc(db, 'registrations', user.id), { status: 'attended' });
        ticketIds.push(user.data.ticketId);
      }

      // Send CheckInSuccess Email
      try {
        await fetch('/api/send-checkin', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_SECRET_KEY || 'livinglab-secret-2026'}`
          },
          body: JSON.stringify({ name: firstUser.name, email: firstUser.email })
        });
      } catch (e) {
        console.error("Failed to send checkin email", e);
      }

      setPendingUser(null);
      setScanResult({ 
        name: firstUser.name, 
        email: firstUser.email,
        ticketId: ticketIds.join(', '), 
        status: 'attended' 
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to check in. Please try again.");
      setPendingUser(null);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h2>QR Ticket Scanner</h2>
      </div>
      
      <div className="scanner-container">
        {!scanResult && !errorMsg && !pendingUser ? (
          <>
            <p style={{marginBottom: '16px', color: '#4B5563'}}>Point camera at attendee's digital ticket.</p>
            <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}></div>
            {isScanning && <p style={{marginTop: '16px', color: '#00AEEF', fontWeight: 500}}>Scanning...</p>}

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
              <p style={{marginBottom: '12px', color: '#4B5563', fontSize: '0.95rem', fontWeight: 500}}>Scanner not working? Enter Ticket ID manually:</p>
              <form onSubmit={handleManualSearch} style={{display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto'}}>
                <input 
                  type="text" 
                  placeholder="e.g. TKT-1234"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  style={{flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', textTransform: 'uppercase'}}
                  required
                />
                <button type="submit" className="btn-primary" style={{padding: '12px 24px'}}>Search</button>
              </form>
            </div>
          </>
        ) : pendingUser ? (
          <div className="scan-result pending">
            <h3 style={{fontSize: '1.25rem', marginBottom: '16px', color: '#111827', fontWeight: 600}}>Confirm Check-In</h3>
            <div style={{textAlign: 'left', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '12px', marginBottom: '24px'}}>
              <p style={{marginBottom: '12px'}}><strong style={{color: '#64748B', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px'}}>Name</strong> <span style={{fontSize: '1.1rem', color: '#0F172A', fontWeight: 500}}>{pendingUser[0].data.name}</span></p>
              <p style={{marginBottom: '12px'}}><strong style={{color: '#64748B', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px'}}>Email</strong> <span style={{fontSize: '1.1rem', color: '#0F172A', fontWeight: 500}}>{pendingUser[0].data.email}</span></p>
              <p style={{marginBottom: '12px'}}><strong style={{color: '#64748B', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px'}}>Session</strong> <span style={{fontSize: '1.1rem', color: '#0F172A', fontWeight: 500}}>{pendingUser[0].data.session || 'TBD'}</span></p>
              <p style={{marginBottom: '0'}}><strong style={{color: '#64748B', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px'}}>Ticket ID(s)</strong> <span style={{fontSize: '1.1rem', color: '#0F172A', fontWeight: 500, fontFamily: 'monospace'}}>{pendingUser.map(p => p.data.ticketId).join(', ')}</span></p>
            </div>
            <button className="btn-primary" style={{width: '100%', marginBottom: '12px', padding: '14px', fontSize: '1rem'}} onClick={() => handleConfirmCheckIn(pendingUser)} disabled={isConfirming}>
              {isConfirming ? 'CHECKING IN...' : 'CONFIRM CHECK-IN'}
            </button>
            <button className="btn-secondary" style={{width: '100%', border: '1px solid #CBD5E1', padding: '14px', background: 'white', color: '#0F172A', fontSize: '1rem'}} onClick={resetScanner} disabled={isConfirming}>
              CANCEL
            </button>
          </div>
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
