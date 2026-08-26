import React from 'react';
import './ExperiencesGrid.css';

const experiencesData = [
  { id: 1, title: 'THE SUN SCIENCE', desc: 'Discover how Anthelios and UV filtering protect the deepest cellular levels.', imgClass: 'bg-sun' },
  { id: 2, title: 'THE ACNE LAB', desc: 'Effaclar deep-dive. Myth-busting active ingredients and microbiota science.', imgClass: 'bg-acne' },
  { id: 3, title: 'THE BABY SKIN LAB', desc: 'Lipikar’s microbiome science. Gentle enough for the most fragile skin.', imgClass: 'bg-baby' },
  { id: 4, title: 'SCARS OF LIFE', desc: 'Cicaplast barrier repair. Leave your mark on the interactive locker wall.', imgClass: 'bg-scars' },
  { id: 5, title: 'THE PIGMENTATION LAB', desc: 'The Melasyl revolution. Intercepting excess melanin before it marks the skin.', imgClass: 'bg-pigment' },
];

const ExperiencesGrid: React.FC = () => {
  return (
    <section className="experiences-grid-section">
      <div className="experiences-grid-header">
        <h2>EXPLORE THE LAB</h2>
        <p>Select a route to dive deeper into our dermatological innovations.</p>
      </div>

      <div className="experiences-grid-container">
        {experiencesData.map((exp) => (
          <div key={exp.id} className={`exp-grid-item ${exp.id === 1 ? 'large-item' : ''}`}>
            <div className={`exp-grid-bg ${exp.imgClass}`}></div>
            <div className="exp-grid-overlay"></div>
            <div className="exp-grid-content">
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
              <button className="btn-outline-white">DISCOVER MORE</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperiencesGrid;
