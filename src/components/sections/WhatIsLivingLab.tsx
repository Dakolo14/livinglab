import React from 'react';
import './WhatIsLivingLab.css';

const WhatIsLivingLab: React.FC = () => {
  return (
    <section className="what-is-living-lab">
      <div className="will-container">
        <div className="will-image-wrapper">
          <img src="/living_lab_placeholder.jpg" alt="Living Lab Landmark" className="will-image" />
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
      </div>
    </section>
  );
};

export default WhatIsLivingLab;
