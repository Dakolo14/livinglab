import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScienceSection.css';

const scienceData = [
  {
    id: 'melasyl',
    title: 'MELASYL™',
    subtitle: 'The New Standard in Pigmentation',
    description: 'A multi-patented active ingredient born from 18 years of research. Melasyl intercepts excess melanin before it leaves a mark on the skin.',
    diagram: 'molecular-ring'
  },
  {
    id: 'mexoryl',
    title: 'MEXORYL 400',
    subtitle: 'Advanced UV Protection',
    description: 'Our most efficient UV filter against the most insidious UV rays: Ultra-long UVA. Protecting cellular damage at the deepest level.',
    diagram: 'uv-shield'
  },
  {
    id: 'thermal',
    title: 'THERMAL SPRING WATER',
    subtitle: 'Soothing Antioxidant Power',
    description: 'Naturally rich in Selenium, a powerful antioxidant. Clinically proven to soothe, soften, and reduce skin irritation.',
    diagram: 'water-wave'
  }
];

const ScienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(scienceData[0].id);
  const activeContent = scienceData.find(item => item.id === activeTab);

  return (
    <section className="science-section" id="science">
      <div className="container">
        <div className="science-header">
          <h2>WHAT'S INSIDE THE SCIENCE?</h2>
          <p>Dermatological expertise visualized.</p>
        </div>

        <div className="science-interactive-grid">
          <div className="science-tabs">
            {scienceData.map(item => (
              <button 
                key={item.id}
                className={`science-tab-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="science-display">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div 
                  key={activeContent.id}
                  className="science-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`science-diagram ${activeContent.diagram}`}>
                    <div className="diagram-core"></div>
                    <div className="diagram-orbit"></div>
                  </div>
                  <div className="science-text">
                    <h3>{activeContent.title}</h3>
                    <h4>{activeContent.subtitle}</h4>
                    <p>{activeContent.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;
