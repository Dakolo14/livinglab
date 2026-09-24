import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './About.css';

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

const LabRoutes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>What To Expect | Living Lab Nigeria 2026</title>
      </Helmet>

      <Header />
      
      <main className="about-page">

      <div className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>WHAT TO EXPECT</h1>
            <p>Explore our targeted solutions and what awaits you in the lab.</p>
          </div>
        </div>
      </div>

      <div className="container about-products-list alternating-layout">
          {productDetails.map((p, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div key={p.id} className={`about-product-row ${isReversed ? 'reversed' : ''}`} style={{borderColor: p.color}}>
                <div className="about-product-img-col" style={{ backgroundColor: p.color + '15' }}>
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="about-product-text-col">
                  <h2 className="about-issue-title" style={{ color: p.color }}>{p.issue}</h2>
                  <h3 className="about-product-name" style={{ color: p.color }}>{p.name}</h3>
                  <p className="about-product-subtitle">{p.subtitle}</p>

                  {p.innovation && (
                    <div className="about-section">
                      <h4 style={{ color: p.color, borderBottomColor: p.color + '40' }}>{p.innovation.title}</h4>
                      {p.innovation.subtitle && <h5 className="about-inn-subtitle">{p.innovation.subtitle}</h5>}
                      <ul className="about-bullets">
                        {p.innovation.bullets.map((b, i) => <li key={i} style={{'--bullet-color': p.color} as any}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                  
                  <div className="about-section">
                    <h4 style={{ color: p.color, borderBottomColor: p.color + '40' }}>INDICATION</h4>
                    <ul className="about-bullets">
                      {p.indication.map((b, i) => <li key={i} style={{'--bullet-color': p.color} as any}>{b}</li>)}
                    </ul>
                  </div>
                  
                  <div className="about-section">
                    <h4 style={{ color: p.color, borderBottomColor: p.color + '40' }}>ACTION</h4>
                    <ul className="about-bullets">
                      {p.action.map((b, i) => <li key={i} style={{'--bullet-color': p.color} as any}>{b}</li>)}
                    </ul>
                  </div>
                  
                  <div className="about-section">
                    <h4 style={{ color: p.color, borderBottomColor: p.color + '40' }}>USAGE</h4>
                    <ul className="about-bullets">
                      {p.usage.map((b, i) => <li key={i} style={{'--bullet-color': p.color} as any}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </main>

      <Footer />
    </div>
  );
};

export default LabRoutes;
