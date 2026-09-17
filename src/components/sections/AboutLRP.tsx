import React from 'react';
import './AboutLRP.css';

const franchisesData = [
  {
    id: 'anthelios',
    name: 'ANTHELIOS',
    subtitle: 'SUN PROTECTION',
    for: 'For all skin types. Daily use.',
    target: 'Adults, children',
    color: '#E06B27'
  },
  {
    id: 'melab3',
    name: 'MELA B3',
    subtitle: 'HYPERPIGMENTATION',
    for: 'Uneven skin tone and dark spots. Discover the efficacy of Melasyl™.',
    target: 'Adults',
    color: '#5C2D91'
  },
  {
    id: 'effaclar',
    name: 'EFFACLAR',
    subtitle: 'ACNE-PRONE SKIN',
    for: 'EFFACLAR is formulated for patients suffering from acne or oily skin with imperfections. As a monotherapy for mild or moderate acne or an adjunctive treatment (in combination with drugs) for moderate to severe acne.',
    target: 'Teenagers - Adults',
    color: '#0284C7'
  },
  {
    id: 'lipikar',
    name: 'LIPIKAR',
    subtitle: 'DRY TO VERY DRY, IRRITATED OR ATOPIC ECZEMA-PRONE SKIN',
    for: 'LIPIKAR is formulated for patients suffering from eczema, skin irritation and excessive dryness. It restores and strengthens the skin\'s protective barrier thanks to key ingredients.',
    target: 'Newborns - Children - Adults',
    color: '#0369A1'
  },
  {
    id: 'cicaplast',
    name: 'CICAPLAST',
    subtitle: 'IRRITATED SKIN',
    for: 'CICAPLAST treats skin irritation, patches, cracks, rough areas, rashes in children, irritation, and superficial burns.',
    target: 'Babies - Children - Adults',
    color: '#0891B2'
  }
];

const AboutLRP: React.FC = () => {
  return (
    <section className="about-lrp" id="about-lrp">
      <div className="container">
        <h2 className="section-title">ABOUT LA ROCHE-POSAY</h2>
        <div className="lrp-grid">
          {franchisesData.map((f) => (
            <div key={f.id} className="lrp-card">
              <h3 className="lrp-name">{f.name}</h3>
              <p className="lrp-subtitle" style={{ color: '#00AEEF' }}>{f.subtitle}</p>
              <div className="lrp-details">
                <h4>WHO IS IT FOR?</h4>
                <p>{f.for}</p>
                <p className="lrp-target">{f.target}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLRP;
