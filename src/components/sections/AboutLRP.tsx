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
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-1px', textTransform: 'uppercase' }}>
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
