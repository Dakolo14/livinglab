import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import './LabRoutes.css';

const LAB_MODULES = [
  { id: '01', title: 'THE SUN SCIENCE', desc: 'Pioneering UV filtration and environmental protection protocols.', fullDesc: 'Discover the cellular impact of UV rays and explore our breakthrough Netlock® technology that secures filters in an invisible, ultra-resistant film.' },
  { id: '02', title: 'BARRIER REPAIR LAB', desc: 'Cellular recovery, healing, and ceramide integration at scale.', fullDesc: 'Step into the microbiome of healing. We analyze how restoring the skin barrier with Vitamin B5 and Madecassoside dramatically accelerates epidermal recovery.' },
  { id: '03', title: 'MICROBIOME RESEARCH', desc: 'Balancing the skin flora for optimal dermatological health.', fullDesc: 'The skin is an ecosystem. Learn how Aqua Posae Filiformis helps rebalance the microbiome to combat severe dryness and prevent flare-ups.' },
  { id: '04', title: 'MELASYL REVOLUTION', desc: 'The new clinical standard in hyperpigmentation treatment.', fullDesc: 'A multi-patented molecule born from 18 years of research. See how Melasyl intercepts excess melanin before it leaves a mark on the skin.' },
  { id: '05', title: 'FUTURE DERMATOLOGY', desc: 'AI-driven diagnostics and pediatric skin safety protocols.', fullDesc: 'Explore our AI-powered skin analysis algorithms and the strict pediatric formulation charters that define the future of safe skincare.' }
];

const LabRoutes: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="lab-routes-page">
        <section className="lab-hero">
          <div className="lab-hero-content">
            <h1 className="lab-title">WHAT TO EXPECT<br />IN THE LAB</h1>
            <p className="lab-subtitle">
              Dive deep into the five specialized modules of the Living Lab. Each route is a hands-on exploration of the science that powers La Roche-Posay.
            </p>
          </div>
        </section>

        <section className="modules-section">
          <div className="modules-container">
            {LAB_MODULES.map((module) => (
              <div key={module.id} className="module-row">
                <div className="module-visual">
                  <div className="module-number">{module.id}</div>
                  <div className="module-placeholder">
                    [ VISUAL FOR {module.title} ]
                  </div>
                </div>
                <div className="module-content">
                  <h2>{module.title}</h2>
                  <h4 className="module-short-desc">{module.desc}</h4>
                  <p className="module-full-desc">{module.fullDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PageCTA 
          title="EXPERIENCE THE SCIENCE"
          description="Don't just read about it. Register now to experience these modules live at the Living Lab Nigeria 2026."
        />
      </main>

      <Footer />
    </>
  );
};

export default LabRoutes;
