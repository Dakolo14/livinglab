import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './RegistrationModal.css';

interface RegistrationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRetrievalMode, setIsRetrievalMode] = useState(false);
  const [retrievalError, setRetrievalError] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [docId, setDocId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    medicalId: '',
  });

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-registration', handleOpen);
    return () => window.removeEventListener('open-registration', handleOpen);
  }, []);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  
  const handleClose = () => {
    setInternalIsOpen(false);
    if (propOnClose) propOnClose();
    // Reset state after a short delay so the closing animation is clean
    setTimeout(() => {
      setIsSuccess(false);
      setIsRetrievalMode(false);
      setRetrievalError('');
      setFormData({ name: '', email: '', medicalId: '' });
    }, 300);
  };

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const generatedTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...formData,
        email: formData.email.toLowerCase().trim(),
        ticketId: generatedTicketId,
        status: 'registered',
        timestamp: serverTimestamp(),
      });

      setTicketId(generatedTicketId);
      setDocId(docRef.id);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrieveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRetrievalError('');
    try {
      const q = query(
        collection(db, 'registrations'), 
        where('email', '==', formData.email.toLowerCase().trim())
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Assume first match is their latest ticket
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        
        setTicketId(data.ticketId);
        setDocId(docSnap.id);
        setIsSuccess(true);
      } else {
        setRetrievalError('No registration found with this email. Please check the spelling or register for a new ticket.');
      }
    } catch (error) {
      console.error("Error retrieving ticket: ", error);
      setRetrievalError('Network error while retrieving ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reg-modal-backdrop" onClick={handleClose}>
      <div className="reg-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reg-modal-close" onClick={handleClose}>✕</button>
        
        {isSuccess ? (
          <div className="reg-modal-success-view">
            <div className="success-icon">✓</div>
            <h2>{isRetrievalMode ? 'TICKET FOUND' : 'REGISTRATION RECEIVED'}</h2>
            <div style={{background: '#F3F4F6', padding: '16px', borderRadius: '8px', margin: '24px 0', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 600}}>
              TICKET ID: {ticketId}
            </div>
            {isRetrievalMode ? (
              <p>Here is your digital ticket. Present this QR Code at the event entrance.</p>
            ) : (
              <p>Your details have been submitted. In a live environment, an email with your QR Code would be sent instantly.</p>
            )}
            <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
              <QRCodeSVG value={docId} size={200} level="H" includeMargin={true} />
            </div>
            <p style={{fontSize: '0.8rem', color: '#64748b', margin: '16px 0 0 0'}}>Scan at entrance</p>
            <button className="btn-primary" onClick={handleClose} style={{marginTop: '24px'}}>CLOSE</button>
          </div>
        ) : isRetrievalMode ? (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>FIND YOUR TICKET</h2>
            <p>Enter the email address you used to register to retrieve your QR code.</p>
            
            <form className="reg-modal-form" onSubmit={handleRetrieveTicket}>
              <div className="input-group">
                <label>Professional Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="jane@clinic.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              {retrievalError && (
                <div style={{color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #FECACA'}}>
                  {retrievalError}
                </div>
              )}

              <button type="submit" className="btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'SEARCHING...' : 'FIND MY TICKET'}
              </button>

              <div style={{textAlign: 'center', marginTop: '8px'}}>
                <button type="button" onClick={() => { setIsRetrievalMode(false); setRetrievalError(''); }} style={{background: 'none', border: 'none', color: '#00AEEF', cursor: 'pointer', textDecoration: 'underline', padding: 0}}>
                  Back to Registration
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>CLAIM YOUR SLOT</h2>
            <p>Please enter your professional details to verify eligibility for the event.</p>
            
            <form className="reg-modal-form" onSubmit={handleRegister}>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Dr. Jane Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Professional Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="jane@clinic.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Medical ID / Practice Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Practice Name" 
                  value={formData.medicalId}
                  onChange={(e) => setFormData({ ...formData, medicalId: e.target.value })}
                />
              </div>
              
              <div className="compliance-group">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. *</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>I consent to receive event updates, post-event materials, and marketing communications from La Roche-Posay.</span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'}
              </button>

              <div style={{textAlign: 'center', marginTop: '8px'}}>
                <span style={{fontSize: '0.9rem', color: '#4B5563'}}>Already registered? </span>
                <button type="button" onClick={() => setIsRetrievalMode(true)} style={{background: 'none', border: 'none', color: '#00AEEF', cursor: 'pointer', textDecoration: 'underline', padding: 0}}>
                  Find your ticket
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
