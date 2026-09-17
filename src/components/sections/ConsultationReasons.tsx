import React from 'react';
import './ConsultationReasons.css';

const reasons = [
  { id: 'acne', title: 'Acne', description: 'Discover targeted solutions for blemish-prone skin and clogged pores.' },
  { id: 'eczema', title: 'Eczema', description: 'Soothe and protect severely dry, eczema-prone skin.' },
  { id: 'photoprotection', title: 'Photoprotection', description: 'Advanced UV protection for all skin types and concerns.' },
  { id: 'healing', title: 'Healing', description: 'Accelerate epidermal repair and soothe irritated skin.' },
  { id: 'reactive', title: 'Reactive skin...', description: 'Intense soothing care for allergy-prone or highly reactive skin.' },
  { id: 'hyperpigmentation', title: 'Hyperpigmentation', description: 'Correct uneven skin tone and stubborn dark spots.' },
];

const ConsultationReasons: React.FC = () => {
  return (
    <section className="consultation-reasons" id="consultation-reasons">
      <div className="container">
        <h2 className="section-title">MAIN CONSULTATION REASONS</h2>
        <p className="section-subtitle">Explore our targeted dermatological solutions.</p>
        <div className="cr-grid">
          {reasons.map((r) => (
            <div key={r.id} className="cr-card">
              <h3>{r.title}</h3>
              <div className="cr-divider"></div>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationReasons;
