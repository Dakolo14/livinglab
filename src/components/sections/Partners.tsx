import React from 'react';
import './Partners.css';

const Partners: React.FC = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">IN PARTNERSHIP WITH</p>
        <div className="partners-grid">
          <img src="/partner1.png" alt="Konga Health" className="partner-logo-img" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
