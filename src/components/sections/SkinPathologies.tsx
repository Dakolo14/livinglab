import React, { useState } from 'react';
import './SkinPathologies.css';

const pathologies = [
  { id: 'sun', title: 'Sun Science', description: 'Explore the advanced photoprotection science behind our formulas and how they defend against UV damage.' },
  { id: 'acne', title: 'Acne Lab', description: 'Dive deep into the microbiome and discover how we target blemishes and clogged pores.' },
  { id: 'baby', title: 'Baby Skin Lab', description: 'Learn about the delicate nature of infant skin and our rigorous testing for ultimate safety.' },
];

const SkinPathologies: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="skin-pathologies" id="skin-pathologies">
      <div className="container">
        <div className="pathologies-intro">
          <p>
            Four days inside a working dermatological laboratory built in Nigeria.
          </p>
          <p>
            Five worlds. Experts, thermal spring water, real dermatologists and
            your own skin story to take home.
          </p>
        </div>

        <div className="pathologies-interactive">
          <h3 className="section-subtitle">EXPLORE SKIN PATHOLOGIES</h3>
          
          <div className="accordion">
            {pathologies.map((item) => (
              <div 
                key={item.id} 
                className={`accordion-item ${activeId === item.id ? 'active' : ''}`}
              >
                <button 
                  className="accordion-header"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="accordion-title">
                    <span className="play-icon">▶</span>
                    <span>{item.title}</span>
                  </div>
                  <span className="accordion-hint">
                    {item.id === 'baby' ? 'Click to expand' : 'Click to activate'}
                  </span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinPathologies;
