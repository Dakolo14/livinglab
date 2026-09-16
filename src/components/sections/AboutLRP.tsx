import React from 'react';
import './AboutLRP.css';

const AboutLRP: React.FC = () => {
  return (
    <section className="about-lrp" id="about-lrp">
      <div className="container">
        <h2 className="section-title">ABOUT LA ROCHE-POSAY</h2>
        
        <div className="franchises-grid">
          {/* Anthelios Card */}
          <div className="franchise-card anthelios">
            <div className="franchise-content">
              <h3>ANTHELIOS</h3>
              <p className="franchise-subtitle">SUN PROTECTION</p>
              
              <div className="franchise-details">
                <h4>WHO IS IT FOR?</h4>
                <p>For all skin types.</p>
                <p>Daily use.</p>
                <p className="franchise-target">Adults, children</p>
              </div>
            </div>
          </div>

          {/* Mela B3 Card */}
          <div className="franchise-card melab3">
            <div className="franchise-content">
              <h3>MELA B3</h3>
              <p className="franchise-subtitle">HYPERPIGMENTATION</p>
              
              <div className="franchise-details">
                <h4>WHO IS IT FOR?</h4>
                <p>Uneven skin tone and dark spots.</p>
                <p>Discover the efficacy of Melasyl™.</p>
                <p className="franchise-target">Adults</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLRP;
