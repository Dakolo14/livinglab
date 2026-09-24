import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutLRP.css';

const productDetails = [
  {
    id: 'anthelios',
    issue: 'PHOTOPROTECTION',
    shortName: 'ANTHELIOS',
    name: 'ANTHELIOS UVMUNE 400',
    subtitle: 'INVISIBLE FLUID SPF50+',
    innovation: {
      title: 'SCIENTIFIC INNOVATION',
      subtitle: 'NEW UV FILTER: MEXORYL 400',
      bullets: [
        'EXCLUSIVE & PATENTED',
        '10+ YEARS OF RESEARCH',
        '25 PATENTS',
        '6 PUBLICATIONS'
      ]
    },
    indication: [
      'For people looking for effective daily UV protection',
      'For all sensitive skin types'
    ],
    action: [
      'Protects from deep cellular damage',
      'Ultra-high protection: UVB, UVA and ultra-long UVA, the most insidious kind',
      'Does not sting eyes'
    ],
    usage: [
      'Apply generously before exposure',
      'Reapply frequently to maintain the level of protection'
    ],
    color: '#E06B27',
    image: '/product-pack/Ant PP.png'
  },
  {
    id: 'melab3',
    issue: 'HYPERPIGMENTATION',
    shortName: 'MELA B3',
    name: 'MELA B3 SERUM',
    subtitle: 'INTENSIVE ANTI-DARK SPOTS SERUM',
    innovation: {
      title: 'ANTI-RELAPSE EFFICACY',
      subtitle: 'CLINICALLY PROVEN',
      bullets: [
        '90% PERSISTENT DARK SPOT CASES CORRECTED (SIZE, NUMBER & INTENSITY REDUCED)',
        '18 YEARS OF RESEARCH',
        'MULTI-PATENTED ACTIVE'
      ]
    },
    indication: [
      'Uneven skin tone and dark spots'
    ],
    action: [
      'Intercepts excess melanin before it marks the skin',
      '[ Melasyl™ ] NEW MULTI-PATENTED ACTIVE',
      'Anti-inflammatory [ 10% Niacinamide + K2G ]',
      'Exfoliates and activates cell renewal [ LHA + Retinyl Palmitate ]',
      'Antioxidant [ Carnosine ]'
    ],
    usage: [
      'Apply morning and evening to the face, neck and hands (if needed)',
      'In the daytime, use in combination with Anthelios Fluid SPF50+'
    ],
    color: '#5C2D91',
    image: '/product-pack/Mela PP.png'
  },
  {
    id: 'effaclar',
    issue: 'ACNE',
    shortName: 'EFFACLAR',
    name: 'EFFACLAR',
    subtitle: 'PURIFYING FOAMING GEL',
    indication: [
      'Oily and sensitive skin',
      'Acne-prone skin',
      'Skin with severe imperfections'
    ],
    action: [
      'Targets IA1 phylotypes of the bacteria C. acnes to correct imperfections [ Phylobioma ] NEW ACTIVE',
      'Gently cleanses [ Syndet ]',
      'Removes impurities and excess sebum [ Zinc pidolate ]',
      'Rebalances pH of acne-prone skin [ Physiological pH : 5 & Soap-free ]'
    ],
    usage: [
      'Lather in the hands with a small amount of water and apply to the face in gentle massaging motions',
      'Rinse thoroughly and pat dry'
    ],
    color: '#0085C7',
    image: '/product-pack/Effaclar PP.png'
  },
  {
    id: 'lipikar',
    issue: 'ATOPY',
    shortName: 'LIPIKAR',
    name: 'LIPIKAR BALM AP+Max',
    subtitle: 'TRIPLE-ACTION BALM 72H',
    indication: [
      'Xerosis, senile xerosis, itching, atopic eczema-prone skin'
    ],
    action: [
      'To mute itch signals on skin [ Neurobioma ] NEW ACTIVE',
      'Strengthens skin barrier [ Shea Butter + Glycerin ]',
      'Soothes skin & reduces irritation [ Neurobioma + Niacinamide ]',
      'Rebalances skin microbiome & inhibits biofilm formation [ Aqua Posae Filiformis + Microresyl ]'
    ],
    usage: [
      '1 application per day',
      'On skin cleansed with a gentle soap-free product like LIPIKAR SYNDET AP+ or LIPIKAR CLEANSING OIL AP+'
    ],
    color: '#0099CC',
    image: '/product-pack/Lipikar PP.png'
  },
  {
    id: 'cicaplast',
    issue: 'HEALING',
    shortName: 'CICAPLAST',
    name: 'CICAPLAST B5+ BALM',
    subtitle: 'ULTRA-REPAIRING SOOTHING BALM',
    indication: [
      'Weakened and irritated skin in babies, children and adults',
      'Sensitive skin following epidermal damage: eczema, diaper rash in babies, perioral irritation, dry patches, chapping, intense dryness, superficial burns, skin irritation, superficial post-laser damage, post-epilation irritation'
    ],
    action: [
      'Boosts tissue healing [ Tribioma ]',
      'Soothes [ 5% Panthenol ]',
      'Repairs [ Madecassoside ]',
      'Purifies [ Copper ] + [ Zinc ]',
      'Nourishes and protects [ Shea butter ] + [ Glycerin ]'
    ],
    usage: [
      'Apply twice a day to the irritated or weakened area after cleansing and drying',
      'Non-greasy texture that does not leave white marks and is suitable for massaging scars'
    ],
    color: '#0055A4',
    image: '/product-pack/Cicaplast PP.png'
  }
];

const AboutLRP: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(productDetails[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="about-lrp" id="about-lrp">
      <div className="container">
        
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-1px' }}>
            About La Roche-Posay
          </h2>
          <div className="about-boilerplate" style={{ 
            fontSize: '1rem', 
            color: '#4B5563', 
            marginTop: '24px', 
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '24px auto 0',
            textAlign: 'left'
          }}>
            <p style={{ marginBottom: '16px' }}>
              Created by a pharmacist in 1975, La Roche-Posay is present in over 50 countries and is recommended by over 100,000 dermatologists worldwide. It provides a unique range of daily skincare developed for every skin type, from newborns to cancer patients, from UV protection to repairing severely fragilized skin. La Roche-Posay’s formulas are developed with exclusive Selenium-rich thermal spring water, due to its antioxidant and soothing properties.
            </p>
            <p>
              Developed using a strict formulation charter with a minimal number of ingredients at optimal concentrations, La Roche-Posay products undergo stringent clinical testing for efficacy and safety, even on sensitive skin. La Roche-Posay understands that skin health has a profound impact on overall wellbeing and works alongside the medical community to advance dermatology and pioneer new approaches to care. Committed to the skin we live in and the planet we live on. Since 2023, all products are manufactured in factories using 100% renewable energy.
            </p>
          </div>
        </div>

        {/* Horizontal Accordion Layout */}
        <div className="opt3-accordion-container">
          <div className="opt3-accordion">
            {productDetails.map(p => {
              const isActive = isMobile || activeProduct.id === p.id;
              return (
                <div 
                  key={p.id} 
                  className={`opt3-slice ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveProduct(p)}
                  style={{ backgroundColor: isActive ? 'white' : p.color + '10', borderColor: p.color }}
                >
                  <div className="opt3-slice-header">
                    <h3 style={{ color: p.color, opacity: isActive ? 0 : 1 }}>{p.issue}</h3>
                    <span className="opt3-slice-prodname" style={{ color: p.color, opacity: isActive ? 0 : 1 }}>{p.shortName}</span>
                    <div 
                      className="opt3-click-hint" 
                      style={{ 
                        opacity: isActive ? 0 : 1, 
                        color: p.color
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        className="opt3-slice-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                         <div className="opt3-content-inner">
                           <div className="opt3-img-col" style={{backgroundColor: p.color}}>
                              <img src={p.image} alt={`${p.name} Pack Shot`} className="opt3-pack-img" />
                           </div>
                           <div className="opt3-text-col">
                              <h2 className="opt3-issue-title" style={{ color: p.color, fontWeight: 300, fontSize: '2.5rem', marginBottom: '8px', lineHeight: 1.1 }}>{p.issue}</h2>
                              <h3 className="opt3-product-name" style={{ color: p.color, fontWeight: 700, fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.name}</h3>
                              <p className="opt3-subtitle" style={{ marginTop: '4px' }}>{p.subtitle}</p>

                              <div className="opt3-text-scroll">
                                {p.innovation && (
                                  <div className="opt3-section">
                                    <h4 style={{ color: p.color }}>{p.innovation.title}</h4>
                                    <ul className="opt3-bullets">
                                      {p.innovation.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                                    </ul>
                                  </div>
                                )}
                                <div className="opt3-section">
                                  <h4 style={{ color: p.color }}>INDICATION</h4>
                                  <ul className="opt3-bullets">
                                    {p.indication.map((b: string, i: number) => <li key={i}>{b}</li>)}
                                  </ul>
                                </div>
                                <div className="opt3-section">
                                  <h4 style={{ color: p.color }}>ACTION</h4>
                                  <ul className="opt3-bullets">
                                    {p.action.map((b: string, i: number) => <li key={i}>{b}</li>)}
                                  </ul>
                                </div>
                              </div>
                           </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Minimalist Scientific Grid for Core Values */}
        <div className="scientific-grid-container">
          <div className="scientific-header">
            <h3>AT THE CORE OF OUR BRAND</h3>
            <p>LA ROCHE-POSAY</p>
          </div>
          
          <div className="scientific-grid">
            {/* Item 1 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21h18M5 21V8l8-4 8 4v13M9 21v-5a2 2 0 014 0v5M13 10h.01M16 12h.01" />
                </svg>
              </div>
              <h4>FACTORY</h4>
              <div className="sg-reveal">
                <p>CO2 neutral since 2018.</p>
                <p>100% renewable energy.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4>INGREDIENTS</h4>
              <div className="sg-reveal">
                <p>75% from nature or recycled materials.</p>
                <p>50% recycled or biobased packaging.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h4>THERMAL SPRING WATER</h4>
              <div className="sg-reveal">
                <p>A unique thermal spring water with therapeutic properties.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4>COMPLEMENTARY THERAPY</h4>
              <div className="sg-reveal">
                <p>For all common dermatology consultations.</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4>PROVEN EFFICACY</h4>
              <div className="sg-reveal">
                <p>Clinically proven tolerance and efficacy on all skin types.</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="sg-item">
              <div className="sg-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4>SCIENTIFIC RESEARCH</h4>
              <div className="sg-reveal">
                <p>At the cutting-edge of scientific research on skin.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutLRP;
