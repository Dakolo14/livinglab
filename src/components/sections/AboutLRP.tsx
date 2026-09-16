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
          {/* Effaclar Card */}
          <div className="franchise-card effaclar">
            <div className="franchise-content">
              <h3>EFFACLAR</h3>
              <p className="franchise-subtitle">ACNE-PRONE SKIN</p>
              
              <div className="franchise-details">
                <h4>WHO IS IT FOR?</h4>
                <p>EFFACLAR is formulated for patients suffering from acne or oily skin with imperfections. As a monotherapy for mild or moderate acne or an adjunctive treatment (in combination with drugs) for moderate to severe acne.</p>
                <p className="franchise-target">Teenagers - Adults</p>
              </div>
            </div>
          </div>

          {/* Lipikar Card */}
          <div className="franchise-card lipikar">
            <div className="franchise-content">
              <h3>LIPIKAR</h3>
              <p className="franchise-subtitle">DRY TO VERY DRY, IRRITATED OR ATOPIC ECZEMA-PRONE SKIN</p>
              
              <div className="franchise-details">
                <h4>WHO IS IT FOR?</h4>
                <p>LIPIKAR is formulated for patients suffering from eczema, skin irritation and excessive dryness. It restores and strengthens the skin's protective barrier thanks to key ingredients.</p>
                <p className="franchise-target">Newborns - Children - Adults</p>
              </div>
            </div>
          </div>

          {/* Cicaplast Card */}
          <div className="franchise-card cicaplast">
            <div className="franchise-content">
              <h3>CICAPLAST</h3>
              <p className="franchise-subtitle">IRRITATED SKIN</p>
              
              <div className="franchise-details">
                <h4>WHO IS IT FOR?</h4>
                <p>CICAPLAST treats skin irritation, patches, cracks, rough areas, rashes in children, irritation, and superficial burns.</p>
                <p className="franchise-target">Babies - Children - Adults</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLRP;
