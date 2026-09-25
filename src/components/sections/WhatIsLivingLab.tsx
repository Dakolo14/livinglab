import React from 'react';
import './WhatIsLivingLab.css';

const WhatIsLivingLab: React.FC = () => {
  return (
    <section className="what-is-living-lab">
      <h3 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', color: '#111827', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
        WHAT IS LIVING LAB
      </h3>
      <div className="will-container">
        <div className="will-image-wrapper">
          <img src="/livinglabexplain.png" alt="What is Living Lab" className="will-image" />
          <div className="will-overlay">
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
      </div>
    </section>
  );
};

export default WhatIsLivingLab;
