import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CancelRegistration: React.FC = () => {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [regDoc, setRegDoc] = useState<any>(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!ticketId || !email) {
        setError('Invalid cancellation link. Missing ticket ID or email.');
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'registrations'),
          where('ticketId', '==', ticketId),
          where('email', '==', email.toLowerCase().trim())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('No registration found with the provided details.');
        } else {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          if (data.status === 'cancelled') {
            setError('This registration has already been cancelled.');
          } else {
            setRegDoc({ id: docSnap.id, ...data });
          }
        }
      } catch (err) {
        console.error('Error fetching registration:', err);
        setError('An error occurred while verifying your registration. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [ticketId, email]);

  const handleCancel = async () => {
    if (!regDoc) return;
    
    setCancelling(true);
    setError(null);

    try {
      // 1. Update Firestore
      const docRef = doc(db, 'registrations', regDoc.id);
      await updateDoc(docRef, {
        status: 'cancelled',
        cancelledAt: new Date()
      });

      // 2. Trigger cancellation email
      await fetch('/api/send-cancellation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_SECRET_KEY || 'livinglab-secret-2026'}`
        },
        body: JSON.stringify({
          ticketId: regDoc.ticketId,
          email: regDoc.email,
          name: regDoc.name,
          phone: regDoc.phone || ''
        })
      });

      setSuccess(true);
    } catch (err) {
      console.error('Error cancelling registration:', err);
      setError('An error occurred while cancelling. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            
            <h1 style={{ color: '#0F172A', fontSize: '28px', marginBottom: '24px' }}>Cancel Registration</h1>

            {loading ? (
              <p style={{ color: '#64748B' }}>Verifying your details...</p>
            ) : success ? (
              <div>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#DEF7EC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#046C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '20px', color: '#046C4E', marginBottom: '16px' }}>Successfully Cancelled</h2>
                <p style={{ color: '#4B5563', marginBottom: '32px' }}>Your registration has been cancelled and your spot has been freed up. A confirmation email has been sent to you.</p>
                <button onClick={() => navigate('/')} className="btn-primary">
                  Return to Home
                </button>
              </div>
            ) : error ? (
              <div>
                <div style={{ padding: '16px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '8px', marginBottom: '24px' }}>
                  {error}
                </div>
                <button onClick={() => navigate('/')} className="btn-primary" style={{ backgroundColor: '#64748B', borderColor: '#64748B' }}>
                  Return to Home
                </button>
              </div>
            ) : (
              <div>
                <p style={{ color: '#4B5563', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
                  Hi <strong>{regDoc?.name.split(' ')[0]}</strong>, you are about to cancel your registration for Living Lab Nigeria. 
                  This action cannot be undone, and your ticket (<strong>{regDoc?.ticketId}</strong>) will no longer be valid for entry.
                </p>
                <p style={{ color: '#4B5563', marginBottom: '32px', fontSize: '15px' }}>
                  Are you sure you want to proceed?
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => navigate('/')} 
                    className="btn-primary" 
                    style={{ backgroundColor: '#E2E8F0', color: '#475569', borderColor: '#E2E8F0', flex: 1 }}
                    disabled={cancelling}
                  >
                    Keep My Ticket
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="btn-primary" 
                    style={{ backgroundColor: '#EF4444', borderColor: '#EF4444', flex: 1 }}
                    disabled={cancelling}
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Registration'}
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CancelRegistration;
