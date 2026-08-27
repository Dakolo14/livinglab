import React, { useState } from 'react';
import './ExperiencesV3.css';

const labs = [
  { id: '01', title: 'THE SUN SCIENCE', desc: 'Pioneering UV filtration and environmental protection protocols.' },
  { id: '02', title: 'BARRIER REPAIR LAB', desc: 'Cellular recovery, healing, and ceramide integration at scale.' },
  { id: '03', title: 'MICROBIOME RESEARCH', desc: 'Balancing the skin flora for optimal dermatological health.' },
  { id: '04', title: 'MELASYL REVOLUTION', desc: 'The new clinical standard in hyperpigmentation treatment.' },
  { id: '05', title: 'FUTURE DERMATOLOGY', desc: 'AI-driven diagnostics and pediatric skin safety protocols.' }
];

const ExperiencesV3: React.FC = () => {
  const [activeLab, setActiveLab] = useState(0);

  return (
    <section className="experiences-v3-section">
      <div className="v3-exp-left">
        <div className="v3-exp-sticky">
          <div className="v3-exp-visual">
            <div className="v3-visual-inner">
              <span className="v3-visual-label">MODULE {labs[activeLab].id}</span>
              <div className="v3-visual-placeholder">
                [ VISUAL RENDER FOR {labs[activeLab].title} ]
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="v3-exp-right">
        <div className="v3-exp-header">
          <h4 className="v3-exp-eyebrow">EXCLUSIVE ACCESS</h4>
          <h2>THE LAB EXPERIENCES</h2>
          <p>Gain verified entry into 5 immersive clinical modules designed exclusively for participating dermatologists and practitioners.</p>
        </div>
        
        <div className="v3-exp-list">
          {labs.map((lab, index) => (
            <div 
              key={lab.id} 
              className={`v3-exp-row ${index === activeLab ? 'active' : ''}`}
              onMouseEnter={() => setActiveLab(index)}
            >
              <div className="v3-exp-num">{lab.id}</div>
              <div className="v3-exp-content">
                <h3>{lab.title}</h3>
                <div className="v3-exp-desc-wrapper">
                   <p>{lab.desc}</p>
                   <div className="v3-mobile-visual">
                     <div className="v3-visual-inner">
                       <span className="v3-visual-label">MODULE {lab.id}</span>
                       <div className="v3-visual-placeholder">
                         [ VISUAL RENDER FOR {lab.title} ]
                       </div>
                     </div>
                   </div>
                </div>
              </div>
              <div className="v3-exp-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesV3;
