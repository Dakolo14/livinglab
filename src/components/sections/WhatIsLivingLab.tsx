import React from 'react';
import './WhatIsLivingLab.css';

const WhatIsLivingLab: React.FC = () => {
  return (
    <section className="what-is-living-lab">
      <div className="will-container">
        <div className="will-image-wrapper">
          {/* Placeholder for HD visual from Stephen */}
          <div className="will-overlay">
            <h2 className="will-heading">WHAT IS LIVING LAB</h2>
            <div className="will-text-content">
              <h3>What is the La Roche-Posay Living Lab?</h3>
              <p>
                The Living Lab is where dermatological science steps out of the lab and into real life. Walk through immersive experience centres built around the skin concerns that matter most — Acne, Hyperpigmentation, Dry Skin, and Suncare — and discover the science, stories, and solutions behind each one. From real testimonials to expert-backed insights, every corner is designed to help you understand your skin better, and treat it right.
              </p>
              <p className="will-tagline">
                Step in. Discover your skin. Live the science
              </p>
            </div>
          </div>
        </div>
        
        <h2 style={{ marginTop: '40px', fontSize: '1.4rem', lineHeight: '1.6', textAlign: 'center', color: '#4B5563', fontWeight: 500 }}>
          Four days inside a working dermatological laboratory built in Nigeria.<br/>
          Five worlds. Experts, thermal spring water, real dermatologists and<br/>
          your own skin story to take home.
        </h2>
      </div>
    </section>
  );
};

export default WhatIsLivingLab;
