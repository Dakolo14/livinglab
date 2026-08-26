import React from 'react';
import './Partners.css';

const Partners: React.FC = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">IN PARTNERSHIP WITH</p>
        <div className="partners-grid">
          <div className="partner-logo">Konga</div>
          <div className="partner-logo">Media Partner 1</div>
          <div className="partner-logo">Media Partner 2</div>
          <div className="partner-logo">Retail Partner</div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
