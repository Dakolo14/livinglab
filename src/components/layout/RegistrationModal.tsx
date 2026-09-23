import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle } from 'lucide-react';
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
    phone: '+234 ',
    dayTime: '',
    marketingConsent: false,
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
        if (!snap.empty) {
          const sessions = snap.docs.map(doc => doc.data().session);
          setExistingSessions(sessions);
          // Auto-fill name if available
          const existingName = snap.docs[0].data().name;
          if (existingName && !formData.name) {
            setFormData(prev => ({ ...prev, name: existingName }));
          }
        } else {
          setExistingSessions([]);
        }
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
    setTimeout(() => {
      setIsSuccess(false);
      setRegistrationError('');
      setFormData({ name: '', email: '', phone: '', dayTime: '', marketingConsent: false });
      setExistingSessions([]);
    }, 300);
  };

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dayTime) {
      setRegistrationError('Please select a session.');
      return;
    }
    
    if (existingSessions.length > 0) {
      setRegistrationError('This email has already been registered for a session. You can only register once.');
      return;
    }
    
    setIsSubmitting(true);
    setRegistrationError('');
    
    try {
      const generatedTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      await addDoc(collection(db, 'registrations'), {
        name: formData.name,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        session: formData.dayTime,
        ticketId: generatedTicketId,
        status: 'registered',
        marketingConsent: formData.marketingConsent,
        timestamp: serverTimestamp(),
      });
      
      setExistingSessions([...existingSessions, formData.dayTime]);
      setTicketId(generatedTicketId);
      setDocId(formData.email.toLowerCase().trim());
      setIsSuccess(true);
      
      // Trigger the backend API to send the SMS (and email later)
      fetch('/api/send-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          ticketId: generatedTicketId,
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          session: formData.dayTime
        })
      }).catch(err => console.error('Failed to trigger notifications:', err));
      
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your registration. Please try again.");
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
            <h2>REGISTRATION SUCCESSFUL</h2>
            
            <div style={{background: '#F3F4F6', padding: '16px', borderRadius: '8px', margin: '24px 0', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 600}}>
              TICKET ID: {ticketId}
            </div>
            
            <div style={{background: '#00AEEF', color: 'white', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center'}}>
              🎉 15% discount on all purchases at the stand in the event!<br/>
              <span style={{fontSize: '0.9rem', fontWeight: 'normal'}}>Get your 15% discount code:</span> <span style={{background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px', marginLeft: '4px'}}>LRP15</span>
            </div>

            <p>Thank you for registering. Here is your digital ticket. Present this QR Code at the event entrance.</p>
            <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
              <QRCodeSVG value={docId} size={200} level="H" includeMargin={true} />
            </div>
            <p style={{fontSize: '0.8rem', color: '#64748b', margin: '16px 0 0 0'}}>Scan at entrance</p>
            
            <button className="btn-primary" onClick={handleClose} style={{marginTop: '24px', width: '100%'}}>CLOSE</button>
          </div>
        ) : (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>LIMITED SLOTS FOR THE EXPERIENCE</h2>
            <p>Please select your preferred session to apply for an invitation to the event.</p>
            
            <form className="reg-modal-form" onSubmit={handleRegister}>
              <div className="input-group">
                <label>Professional Email <span style={{color: '#EF4444'}}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@clinic.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={formData.email.includes('@') ? { paddingRight: '40px' } : undefined}
                  />
                  {formData.email && formData.email.includes('@') && (
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                      <CheckCircle color="#10B981" size={20} />
                    </div>
                  )}
                </div>
                {formData.email && formData.email.includes('@') && existingSessions.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: '#EF4444', marginTop: '6px' }}>
                    This email is already registered. You can only register for one session.
                  </div>
                )}
              </div>
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
                <label>Phone Number <span style={{color: '#EF4444'}}>*</span></label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+234 800 000 0000" 
                  value={formData.phone}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!val.startsWith('+234 ')) {
                      val = '+234 ' + val.replace('+234', '').trim();
                    }
                    setFormData({ ...formData, phone: val })
                  }}
                />
              </div>
              <div className="input-group">
                <label>Preferred Sessions <span style={{color: '#EF4444'}}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ padding: '16px', background: '#F9FAFB', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span style={{ color: !formData.dayTime ? '#9CA3AF' : '#111827' }}>
                      {!formData.dayTime 
                        ? 'Select a preferred session...' 
                        : formData.dayTime}
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
                        const isDisabled = existingSessions.length > 0;
                        return (
                          <label key={session.value} className="checkbox-label" style={{ margin: 0, opacity: isDisabled ? 0.5 : 1 }}>
                            <input 
                              type="radio" 
                              name="dayTime"
                              disabled={isDisabled}
                              checked={formData.dayTime === session.value}
                              onChange={() => {
                                setFormData({ ...formData, dayTime: session.value });
                                setIsDropdownOpen(false); // auto-close on selection
                              }}
                            />
                            <span>{session.label} {isDisabled && '(Already registered)'}</span>
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
                  <input 
                    type="checkbox" 
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  />
                  <span>I consent to receive event updates, post-event materials, and marketing communications from La Roche-Posay.</span>
                </label>
              </div>

              {registrationError && (
                <div style={{color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #FECACA', marginBottom: '16px'}}>
                  {registrationError}
                </div>
              )}

              <button type="submit" className="btn-primary w-100" disabled={isSubmitting || existingSessions.length > 0}>
                {isSubmitting ? 'SUBMITTING...' : 'REGISTER & GET TICKET'}
              </button>
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
