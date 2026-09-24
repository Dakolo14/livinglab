import React from 'react';
import './AboutLRP.css';
const AboutLRP: React.FC = () => {
  return (
    <section className="about-lrp" id="about-lrp">
      <div className="container">
        
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.5px', textTransform: 'uppercase', margin: 0 }}>
            ABOUT LA ROCHE-POSAY
          </h2>
          <div className="about-boilerplate" style={{ 
            fontSize: '1.25rem', 
            color: '#4B5563', 
            marginTop: '24px', 
            lineHeight: '1.7',
            maxWidth: '900px',
            margin: '24px auto 0',
            textAlign: 'center'
          }}>
            <p style={{ marginBottom: '16px' }}>
              Created by a pharmacist in 1975, La Roche-Posay is present in over 50 countries and is recommended by over 100,000 dermatologists worldwide. It provides a unique range of daily skincare developed for every skin type, from newborns to cancer patients, from UV protection to repairing severely fragilized skin. La Roche-Posay’s formulas are developed with exclusive Selenium-rich thermal spring water, due to its antioxidant and soothing properties.
            </p>
            <p>
              Developed using a strict formulation charter with a minimal number of ingredients at optimal concentrations, La Roche-Posay products undergo stringent clinical testing for efficacy and safety, even on sensitive skin. La Roche-Posay understands that skin health has a profound impact on overall wellbeing and works alongside the medical community to advance dermatology and pioneer new approaches to care. Committed to the skin we live in and the planet we live on. Since 2023, all products are manufactured in factories using 100% renewable energy.
            </p>
          </div>
        </div>



      </div>
    </section>
  );
};

export default AboutLRP;
