import React, { useRef } from 'react';

import './LabJourney.css';

const journeySteps = [
  { id: '01', title: 'DISCOVER', description: 'Enter the world of La Roche-Posay. Understand the science behind the brand.', image: '/what-to-expect/Discover.jpg' },
  { id: '02', title: 'TEST', description: 'Interactive stations to test your skin’s resilience and needs.', image: '/what-to-expect/Test.jpg' },
  { id: '03', title: 'EXPERIENCE', description: 'Immerse yourself in our sensory thermal spring water room.', image: '/what-to-expect/Experience.jpg' },
  { id: '04', title: 'LEARN', description: 'Uncover breakthrough ingredients like Melasyl and Mexoryl.', image: '/what-to-expect/Learn.jpg' },
  { id: '05', title: 'CONSULT', description: '1-on-1 time with top dermatologists to discuss your skin concerns.', image: '/what-to-expect/Consult.jpg' },
];

const LabJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="lab-journey" id="lab-journey" ref={containerRef}>
      <div className="container">
        <div className="journey-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.5px', textTransform: 'uppercase', margin: 0 }}>WHAT TO EXPECT IN THE LAB</h2>
        </div>
        
        <div className="journey-timeline">
          {journeySteps.map((step) => (
            <div 
              key={step.id} 
              className="journey-step"
            >
              <div className="step-number">{step.id}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-visual-placeholder" style={{ padding: 0 }}>
                <div className="visual-scan-line"></div>
                <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabJourney;
