import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { collection, addDoc, serverTimestamp, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
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
  const [registrationError, setRegistrationError] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [docId, setDocId] = useState(''); // We'll use email as docId for the QR code now
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<'terms' | 'privacy' | null>(null);
  const [existingSessions, setExistingSessions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dayTime: [] as string[],
  });

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-registration', handleOpen);
    return () => window.removeEventListener('open-registration', handleOpen);
  }, []);

  useEffect(() => {
    const fetchExisting = async () => {
      if (!formData.email || !formData.email.includes('@')) {
        setExistingSessions([]);
        return;
      }
      try {
        const q = query(
          collection(db, 'registrations'), 
          where('email', '==', formData.email.toLowerCase().trim())
        );
        const snap = await getDocs(q);
        const sessions = snap.docs.map(doc => doc.data().session);
        setExistingSessions(sessions);
      } catch (err) {
        console.error(err);
      }
    };
    const timeoutId = setTimeout(fetchExisting, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  
  const handleClose = () => {
    setInternalIsOpen(false);
    if (propOnClose) propOnClose();
    // Reset state after a short delay so the closing animation is clean
    setTimeout(() => {
      setIsSuccess(false);
      setIsRetrievalMode(false);
      setRetrievalError('');
      setRegistrationError('');
      setFormData({ name: '', email: '', dayTime: [] });
      setExistingSessions([]);
    }, 300);
  };

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.dayTime.length === 0) {
      setRegistrationError('Please select at least one session.');
      return;
    }
    
    setIsSubmitting(true);
    setRegistrationError('');
    
    try {
      // Create a document for each selected session
      const promises = formData.dayTime.map(session => {
        if (existingSessions.includes(session)) return Promise.resolve();
        
        return addDoc(collection(db, 'registrations'), {
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          session: session,
          ticketId: '',
          status: 'applied',
          timestamp: serverTimestamp(),
        });
      });
      
      await Promise.all(promises);

      // Force refresh existing sessions
      setExistingSessions([...existingSessions, ...formData.dayTime]);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your application. Please try again.");
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
        let generatedTicketIds: string[] = [];
        
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
          if (data.status === 'invited') {
            const generatedTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
            await updateDoc(doc(db, 'registrations', docSnap.id), {
              status: 'rsvped',
              ticketId: generatedTicketId
            });
            generatedTicketIds.push(generatedTicketId);
          } else if (data.status === 'rsvped' || data.status === 'attended' || data.status === 'registered') {
            generatedTicketIds.push(data.ticketId);
          }
        }
        
        if (generatedTicketIds.length > 0) {
          setTicketId(generatedTicketIds.join(', '));
          // Use the email as the QR code value since they might have multiple sessions
          setDocId(formData.email.toLowerCase().trim());
          setIsSuccess(true);
        } else {
           const statuses = querySnapshot.docs.map(d => d.data().status);
           if (statuses.every(s => s === 'rejected')) {
             setRetrievalError('Unfortunately, your application(s) could not be approved.');
           } else {
             setRetrievalError('Your application is still under review.');
           }
        }
      } else {
        setRetrievalError('No application found with this email. Please check the spelling or apply for a slot.');
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
            <h2>{isRetrievalMode ? 'TICKET CONFIRMED' : 'APPLICATION RECEIVED'}</h2>
            
            {isRetrievalMode ? (
              <>
                <div style={{background: '#F3F4F6', padding: '16px', borderRadius: '8px', margin: '24px 0', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 600}}>
                  TICKET ID: {ticketId}
                </div>
                <p>Thank you for RSVPing. Here is your digital ticket. Present this QR Code at the event entrance.</p>
                <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
                  <QRCodeSVG value={docId} size={200} level="H" includeMargin={true} />
                </div>
                <p style={{fontSize: '0.8rem', color: '#64748b', margin: '16px 0 0 0'}}>Scan at entrance</p>
              </>
            ) : (
              <>
                <p style={{marginTop: '24px', fontSize: '1.05rem', color: '#4B5563'}}>Thank you for applying to Living Lab Nigeria 2026. Your details have been submitted successfully.</p>
                <p style={{color: '#6B7280'}}>Our team is reviewing your application. If approved, you will receive an official invitation email to RSVP and claim your QR ticket.</p>
              </>
            )}
            
            <button className="btn-primary" onClick={handleClose} style={{marginTop: '24px', width: '100%'}}>CLOSE</button>
          </div>
        ) : isRetrievalMode ? (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>RSVP / CLAIM TICKET</h2>
            <p>Did you receive an email invitation? Enter your email address to RSVP and get your QR code.</p>
            
            <form className="reg-modal-form" onSubmit={handleRetrieveTicket}>
              <div className="input-group">
                <label>Professional Email <span style={{color: '#EF4444'}}>*</span></label>
                <input 
                  type="email" 
                  required 
                  placeholder="jane@clinic.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              {retrievalError && (
                <div style={{color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #FECACA', marginBottom: '16px'}}>
                  {retrievalError}
                </div>
              )}

              <button type="submit" className="btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'SEARCHING...' : 'CONFIRM RSVP'}
              </button>

              <div style={{textAlign: 'center', marginTop: '16px'}}>
                <button type="button" onClick={() => { setIsRetrievalMode(false); setRetrievalError(''); setRegistrationError(''); }} style={{background: 'none', border: 'none', color: '#00AEEF', cursor: 'pointer', textDecoration: 'underline', padding: 0}}>
                  Back to Application
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>LIMITED SLOTS FOR THE EXPERIENCE</h2>
            <p>Please select your preferred session to apply for an invitation to the event.</p>
            
            <form className="reg-modal-form" onSubmit={handleRegister}>
              <div className="input-group">
                <label>Full Name <span style={{color: '#EF4444'}}>*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="Dr. Jane Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Professional Email <span style={{color: '#EF4444'}}>*</span></label>
                <input 
                  type="email" 
                  required 
                  placeholder="jane@clinic.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Preferred Sessions <span style={{color: '#EF4444'}}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ padding: '16px', background: '#F9FAFB', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span style={{ color: formData.dayTime.length === 0 ? '#9CA3AF' : '#111827' }}>
                      {formData.dayTime.length === 0 
                        ? 'Select preferred sessions...' 
                        : `${formData.dayTime.length} session(s) selected`}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#6B7280', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                  </div>
                  
                  {isDropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, marginTop: '4px', padding: '12px', background: '#ffffff', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { value: "Thursday Morning", label: "Thursday 5 November (morning session 9am - 11:30am)" },
                        { value: "Thursday Afternoon", label: "Thursday 5 November (afternoon session 12:30 pm - 3:30 pm)" },
                        { value: "Thursday Late", label: "Thursday 5 November (late afternoon session 4pm - 7pm)" },
                        { value: "Friday Morning", label: "Friday 6 November (morning session 9am - 11:30am)" },
                        { value: "Friday Afternoon", label: "Friday 6 November (afternoon session 12:30 pm - 3:30 pm)" },
                        { value: "Friday Late", label: "Friday 6 November (late afternoon session 4pm - 7pm)" }
                      ].map((session) => {
                        const isDisabled = existingSessions.includes(session.value);
                        return (
                          <label key={session.value} className="checkbox-label" style={{ margin: 0, opacity: isDisabled ? 0.5 : 1 }}>
                            <input 
                              type="checkbox" 
                              disabled={isDisabled}
                              checked={formData.dayTime.includes(session.value) || isDisabled}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, dayTime: [...formData.dayTime, session.value] });
                                } else {
                                  setFormData({ ...formData, dayTime: formData.dayTime.filter(v => v !== session.value) });
                                }
                              }}
                            />
                            <span>{session.label} {isDisabled && '(Already applied)'}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="compliance-group">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{' '}
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setPolicyModal('terms'); }}
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setPolicyModal('privacy'); }}
                    >
                      Privacy Policy
                    </a>. <span style={{color: '#EF4444'}}>*</span>
                  </span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>I consent to receive event updates, post-event materials, and marketing communications from La Roche-Posay.</span>
                </label>
              </div>

              {registrationError && (
                <div style={{color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #FECACA', marginBottom: '16px'}}>
                  {registrationError}
                </div>
              )}

              <button type="submit" className="btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
              </button>

              <div style={{textAlign: 'center', marginTop: '16px'}}>
                <span style={{fontSize: '0.9rem', color: '#4B5563'}}>Already received an invite? </span>
                <button type="button" onClick={() => { setIsRetrievalMode(true); setRegistrationError(''); }} style={{background: 'none', border: 'none', color: '#00AEEF', cursor: 'pointer', textDecoration: 'underline', padding: 0}}>
                  RSVP Here
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {policyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                {policyModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <button onClick={() => setPolicyModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6B7280' }}>&times;</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '12px', fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6 }}>
              {policyModal === 'terms' ? (
                <>
                  <p>Welcome to Living Lab Nigeria.</p>
                  <p>By registering for this event, you agree to comply with and be bound by the following terms and conditions of use. The term 'Living Lab Nigeria' or 'us' or 'we' refers to the owner of the event. The term 'you' refers to the user or viewer of our website and event attendee.</p>
                  <p><strong>1. Event Access</strong><br/>Access to the event is strictly limited to approved professionals. We reserve the right to revoke any ticket at our discretion.</p>
                  <p><strong>2. Liability</strong><br/>We are not liable for any personal injury, loss, or damage to property that occurs during the event.</p>
                  <p><strong>3. Media Release</strong><br/>By attending, you consent to being photographed or filmed for promotional purposes by La Roche-Posay and our partners.</p>
                </>
              ) : (
                <>
                  <p>Your privacy is important to us.</p>
                  <p><strong>1. Information Collection</strong><br/>We collect personal and professional information such as your name, email, and medical credentials to verify your eligibility for the Living Lab Nigeria event.</p>
                  <p><strong>2. Information Use</strong><br/>Your information will be used solely for event registration, check-in, and post-event follow-ups by La Roche-Posay and our partners.</p>
                  <p><strong>3. Data Security</strong><br/>We implement security measures to maintain the safety of your personal information when you submit your application.</p>
                  <p><strong>4. Third-Party Disclosure</strong><br/>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted partners who assist us in operating our website or event.</p>
                </>
              )}
            </div>
            <button 
              className="btn-primary" 
              onClick={() => setPolicyModal(null)}
              style={{ marginTop: '24px', width: '100%', padding: '12px' }}
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
