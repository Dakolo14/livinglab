import React, { useEffect, useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-registration', handleOpen);
    return () => window.removeEventListener('open-registration', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="reg-modal-backdrop" onClick={() => setIsOpen(false)}>
      <div className="reg-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reg-modal-close" onClick={() => setIsOpen(false)}>✕</button>
        
        {!isSubmitted ? (
          <div className="reg-modal-form-view">
            <h4 className="reg-eyebrow">LIVING LAB NIGERIA 2026</h4>
            <h2>CLAIM YOUR SLOT</h2>
            <p>Please enter your professional details to verify eligibility for the event.</p>
            
            <form className="reg-modal-form" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" required placeholder="Dr. Jane Doe" />
              </div>
              <div className="input-group">
                <label>Professional Email</label>
                <input type="email" required placeholder="jane@clinic.com" />
              </div>
              <div className="input-group">
                <label>Medical ID / Practice Name</label>
                <input type="text" required placeholder="Practice Name" />
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

              <button type="submit" className="btn-primary w-100">SUBMIT REGISTRATION</button>
            </form>
          </div>
        ) : (
          <div className="reg-modal-success-view">
            <div className="success-icon">✓</div>
            <h2>REGISTRATION RECEIVED</h2>
            <div style={{background: '#F3F4F6', padding: '16px', borderRadius: '8px', margin: '24px 0', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 600}}>
              TICKET ID: TKT-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <p>Your details have been submitted. In a live environment, an email with your QR Code would be sent instantly.</p>
            <button className="btn-primary" onClick={() => setIsOpen(false)}>CLOSE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
