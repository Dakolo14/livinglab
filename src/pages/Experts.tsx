import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import SEO from '../components/layout/SEO';
import './Experts.css';

const EXPERTS = {
  1: [
    { id: 1, name: 'Expert Name 1', title: 'Clinical Dermatologist' },
    { id: 2, name: 'Expert Name 2', title: 'Scientific Director' },
    { id: 3, name: 'Expert Name 3', title: 'Head of Research' },
    { id: 4, name: 'Expert Name 4', title: 'Medical Advisor' }
  ],
  2: [
    { id: 5, name: 'Expert Name 5', title: 'Chief Formulation Scientist' },
    { id: 6, name: 'Expert Name 6', title: 'Pediatric Dermatologist' },
    { id: 7, name: 'Expert Name 7', title: 'Lead Microbiologist' }
  ],
  3: [
    { id: 8, name: 'Expert Name 8', title: 'Photoprotection Specialist' },
    { id: 9, name: 'Expert Name 9', title: 'Aesthetic Dermatologist' },
    { id: 10, name: 'Expert Name 10', title: 'Global Brand President' }
  ]
};

const TABS = [
  { id: 1, title: 'DAY 1' },
  { id: 2, title: 'DAY 2' },
  { id: 3, title: 'DAY 3' }
];

const Experts: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Basic animation triggers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.expert-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeDay]);

  return (
    <>
      <SEO 
        title="Speakers & Experts" 
        description="Meet the world-class clinical experts and pioneers speaking at Living Lab Nigeria 2026." 
        canonicalUrl="/experts"
      />
      <Header />
      
      <main className="experts-page">
        <section className="experts-hero">
          <div className="experts-hero-content">
            <h1 className="experts-title">MEET THE<br />SPEAKERS</h1>
            <p className="experts-subtitle">
              Pioneers in dermatology. Get exclusive access to the minds shaping the future of clinical skin science, UV protection, and barrier repair.
            </p>
          </div>
        </section>

        <section className="experts-tabs-section">
          <div className="container">
            <div className="experts-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`expert-tab-btn ${activeDay === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveDay(tab.id as 1 | 2 | 3)}
                >
                  <span className="tab-title">{tab.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="experts-grid-section">
          <div className="experts-grid-container">
            {EXPERTS[activeDay].map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB', color: '#9CA3AF', fontWeight: 'bold', letterSpacing: '1px' }}>
                  [ EXPERT PHOTO ]
                </div>
                <div className="expert-info">
                  <h3 className="expert-name">{expert.name}</h3>
                  <p className="expert-title">{expert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PageCTA 
          title="JOIN THE EXPERTS"
          description="Register now to secure your spot in these exclusive clinical sessions."
        />
      </main>

      <Footer />
    </>
  );
};

export default Experts;
