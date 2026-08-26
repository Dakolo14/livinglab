import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './LabJourney.css';

const journeySteps = [
  { id: '01', title: 'DISCOVER', description: 'Enter the world of La Roche-Posay. Understand the science behind the brand.' },
  { id: '02', title: 'TEST', description: 'Interactive stations to test your skin’s resilience and needs.' },
  { id: '03', title: 'EXPERIENCE', description: 'Immerse yourself in our sensory thermal spring water room.' },
  { id: '04', title: 'LEARN', description: 'Uncover breakthrough ingredients like Melasyl and Mexoryl.' },
  { id: '05', title: 'CONSULT', description: '1-on-1 time with top dermatologists to discuss your skin concerns.' },
  { id: '06', title: 'LEAVE WITH YOUR SKIN STORY', description: 'Collect your personalized regimen and digital passport rewards.' },
];

const LabJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="lab-journey" id="lab-journey" ref={containerRef}>
      <div className="container">
        <div className="journey-header">
          <h2>THE DIGITAL LAB JOURNEY</h2>
          <p>Step inside. Six stages of dermatological discovery.</p>
        </div>
        
        <div className="journey-timeline">
          {journeySteps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="journey-step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="step-visual-placeholder">
                  <div className="visual-scan-line"></div>
                  <span className="placeholder-text">Experience {step.id} Visual Hook</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabJourney;
