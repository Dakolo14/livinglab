import React from 'react';
import './ScienceGrid.css';

const ScienceGrid: React.FC = () => {
  return (
    <section className="science-grid-section">
      <div className="science-grid-container">
        
        <div className="science-col text-col">
          <div className="science-text-inner">
            <h4 className="science-eyebrow">OUR PHILOSOPHY</h4>
            <h2 className="science-headline">THE SCIENCE<br/>BEHIND<br/>THE GLOW</h2>
            <p className="science-body">
              Dermatology isn't just about surface-level beauty. It's about deep, cellular health. 
              For decades, La Roche-Posay has partnered with dermatologists worldwide to pioneer skincare 
              solutions that are clinically proven, rigorously tested, and radically effective.
            </p>
            
            <div className="science-stats-grid">
              <div className="stat-item">
                <span className="stat-number">#1</span>
                <span className="stat-desc">Dermatologist<br/>Recommended</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">90k+</span>
                <span className="stat-desc">Partner<br/>Dermatologists</span>
              </div>
            </div>
            
            <button className="btn-primary" style={{ marginTop: '40px' }}>DISCOVER OUR RESEARCH</button>
          </div>
        </div>

        <div className="science-col media-col">
          <div className="placeholder-box science-visual">
            SCIENTIFIC VISUAL / MOLECULAR RENDER
          </div>
        </div>

      </div>
    </section>
  );
};

export default ScienceGrid;
