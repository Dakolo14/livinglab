import React, { useRef } from 'react';

import './LabJourney.css';

const journeySteps = [
  { id: '01', title: 'DISCOVER', description: 'Enter the world of La Roche-Posay. Understand the science behind the brand.' },
  { id: '02', title: 'TEST', description: 'Interactive stations to test your skin’s resilience and needs.' },
  { id: '03', title: 'EXPERIENCE', description: 'Immerse yourself in our sensory thermal spring water room.' },
  { id: '04', title: 'LEARN', description: 'Uncover breakthrough ingredients like Melasyl and Mexoryl.' },
  { id: '05', title: 'CONSULT', description: '1-on-1 time with top dermatologists to discuss your skin concerns.' },
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
              <div className="step-visual-placeholder">
                <div className="visual-scan-line"></div>
                <span className="placeholder-text">Experience {step.id} Visual Hook</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabJourney;
