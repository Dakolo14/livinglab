import React, { useState } from 'react';
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="consultation-reasons" id="consultation-reasons">
      <div className="container">
        <h2 className="section-title">MAIN CONSULTATION REASONS</h2>
        <p className="section-subtitle">Click on a reason to explore our targeted dermatological solutions.</p>
        <div className="reasons-grid">
          {reasons.map((reason) => (
            <div 
              key={reason.id} 
              className={`reason-card ${activeId === reason.id ? 'active' : ''}`}
              onClick={() => toggleCard(reason.id)}
            >
              <div className="reason-card-inner">
                <div className="reason-card-front">
                  <h3>{reason.title}</h3>
                  <span className="reveal-hint">+ Click to reveal</span>
                </div>
                <div className="reason-card-back">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationReasons;
