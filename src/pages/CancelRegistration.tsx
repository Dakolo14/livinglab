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
  const [regDocs, setRegDocs] = useState<any[]>([]);

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
          const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const activeDocs = docs.filter((d: any) => d.status === 'registered' || d.status === 'rsvped');
          if (activeDocs.length === 0) {
            setError('No active registrations found. They may have already been cancelled or checked in.');
          } else {
            setRegDocs(activeDocs);
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

  const handleCancel = async (docId: string) => {
    setCancelling(true);
    setError(null);

    try {
      // 1. Update Firestore
      const docRef = doc(db, 'registrations', docId);
      await updateDoc(docRef, {
        status: 'cancelled',
        cancelledAt: new Date()
      });

      // 2. Remove from UI
      const remainingDocs = regDocs.filter(d => d.id !== docId);
      setRegDocs(remainingDocs);
      
      if (remainingDocs.length === 0) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error cancelling registration:', err);
      setError('An error occurred while cancelling. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <style>{`
        .btn-cancel {
          background-color: #EF4444;
          color: #ffffff;
          border: 2px solid #EF4444;
          padding: 14px 28px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .btn-cancel:hover {
          background-color: #ffffff;
          color: #EF4444;
          border-color: #EF4444;
        }
        .btn-keep {
          background-color: #E2E8F0;
          color: #475569;
          border: 2px solid #E2E8F0;
          padding: 14px 28px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .btn-keep:hover {
          background-color: #CBD5E1;
          color: #334155;
          border-color: #CBD5E1;
        }
      `}</style>
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
                  Hi <strong>{regDocs[0]?.name?.split(' ')[0]}</strong>, you are currently registered for the following sessions.
                  Click "Cancel" next to any session you can no longer attend.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {regDocs.map(doc => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', textAlign: 'left' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>{doc.session}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Ticket: {doc.ticketId}</div>
                      </div>
                      <button 
                        onClick={() => handleCancel(doc.id)} 
                        className="btn-cancel" 
                        disabled={cancelling}
                        style={{ padding: '8px 16px', flex: 'none', marginLeft: '16px' }}
                      >
                        {cancelling ? '...' : 'Cancel'}
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => navigate('/')} 
                    className="btn-keep" 
                  >
                    Done
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
