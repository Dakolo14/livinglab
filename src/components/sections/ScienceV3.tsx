import React from 'react';
import './ScienceV3.css';

const ScienceV3: React.FC = () => {
  return (
    <section className="science-v3-section">
      <div className="sv3-col sv3-main">
        <h4 className="sv3-eyebrow">CLINICAL EFFICACY</h4>
        <h2 className="sv3-title">THE SCIENCE<br/>BEHIND<br/>THE GLOW</h2>
        <p className="sv3-desc">
          Backed by decades of dermatological research, our formulations are rigorously tested to ensure unparalleled efficacy and safety across all skin types.
        </p>
        <button className="btn-primary mt-4">VIEW CLINICAL DATA</button>
      </div>
      
      <div className="sv3-col sv3-data">
        <div className="sv3-data-card">
          <div className="sv3-data-header">
            <span className="sv3-data-id">DATA.01</span>
            <h3>MICROBIOME</h3>
          </div>
          <div className="sv3-metric">
            <span className="sv3-num">10<span className="sv3-sym">B+</span></span>
            <span className="sv3-label">ACTIVE CULTURES</span>
          </div>
          <p>Restoring the skin's natural barrier through advanced prebiotic and probiotic integration.</p>
        </div>
      </div>
      
      <div className="sv3-col sv3-data">
        <div className="sv3-data-card">
          <div className="sv3-data-header">
            <span className="sv3-data-id">DATA.02</span>
            <h3>CELLULAR</h3>
          </div>
          <div className="sv3-metric">
            <span className="sv3-num">48<span className="sv3-sym">HR</span></span>
            <span className="sv3-label">HYDRATION LOCK</span>
          </div>
          <p>Ceramide-rich formulations that penetrate deeply to repair and protect the epidermis.</p>
        </div>
      </div>
    </section>
  );
};

export default ScienceV3;
