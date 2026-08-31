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
              <button type="submit" className="btn-primary w-100">SUBMIT REGISTRATION</button>
            </form>
          </div>
        ) : (
          <div className="reg-modal-success-view">
            <div className="success-icon">✓</div>
            <h2>REGISTRATION RECEIVED</h2>
            <p>Your details have been submitted for verification. You will receive a confirmation email with your expert pass shortly.</p>
            <button className="btn-primary" onClick={() => setIsOpen(false)}>CLOSE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
