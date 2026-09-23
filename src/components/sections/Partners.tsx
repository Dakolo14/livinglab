import React from 'react';
import './Partners.css';

const Partners: React.FC = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">IN PARTNERSHIP WITH</p>
        <div className="partners-grid">
          <a href="https://www.konga.com/content/Health" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/kongahealthlogo.png" alt="Konga Health" className="partner-logo-img" />
          </a>
          <a href="https://www.instagram.com/lostinlagos12/?hl=en" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/awarilogo.png" alt="Awari" className="partner-logo-img" />
          </a>
          <a href="https://www.instagram.com/awelagos/?hl=en" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/awarilogo (2).png" alt="AWE" className="partner-logo-img" />
          </a>
          <a href="https://www.bellanaija.com/" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/bellanaijalogo.png" alt="BellaNaija" className="partner-logo-img" />
          </a>
          <a href="https://culturecustodian.com/" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/culturecustodianlogo.png" alt="Culture Custodian" className="partner-logo-img" />
          </a>
          <a href="https://www.zikoko.com/" target="_blank" rel="noopener noreferrer">
            <img src="/partner-logo/zikokologo.png" alt="Zikoko" className="partner-logo-img" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partners;
