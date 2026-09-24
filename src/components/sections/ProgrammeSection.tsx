import React from 'react';
import { motion } from 'framer-motion';
import './ProgrammeSection.css';

const journeyItems = [
  "Blue House",
  "Plenary discussions",
  "Product Innovation Corners",
  "Scar of Life cinema",
  "Consultation Corners",
  "PopUp store"
];

interface ProgrammeSectionProps {
  hideHeader?: boolean;
  hideCTA?: boolean;
}

const ProgrammeSection: React.FC<ProgrammeSectionProps> = ({ hideHeader = false, hideCTA = false }) => {
  return (
    <section className="programme-section" id="programme" style={hideHeader ? { paddingTop: '40px' } : {}}>
      <div className="container">
        {!hideHeader && (
          <div className="programme-header">
            <h2>AGENDA/PROGRAM</h2>
            <p>The Consumer Journey</p>
          </div>
        )}

        <div className="programme-content">
          <div className="consumer-journey-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '40px 0' }}>
            {journeyItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="journey-item" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ 
                  background: 'white', 
                  padding: '32px 24px', 
                  borderLeft: '4px solid #00AEEF', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  borderRadius: '0 8px 8px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#00AEEF15', 
                  color: '#00AEEF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 'bold',
                  marginRight: '16px',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1a1a1a', fontWeight: '600' }}>{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {!hideCTA && (
          <div className="programme-footer">
            <button className="btn-primary" onClick={() => window.dispatchEvent(new Event('open-registration'))}>REGISTER NOW</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgrammeSection;
