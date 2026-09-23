import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import SEO from '../components/layout/SEO';
import './LabRoutes.css';

const LAB_MODULES = [
  { id: '01', title: 'DISCOVER', desc: 'Enter the world of La Roche-Posay.', fullDesc: 'Understand the science behind the brand. Dive deep into the dermatological innovations that have made us the #1 brand recommended by dermatologists worldwide.' },
  { id: '02', title: 'TEST', desc: 'Interactive stations to test your skin’s resilience.', fullDesc: 'Get hands-on with our advanced skin diagnostic tools. Understand your skin type, its unique needs, and how environmental factors impact your skin barrier daily.' },
  { id: '03', title: 'EXPERIENCE', desc: 'Immerse yourself in our sensory thermal spring water room.', fullDesc: 'A unique sensory journey highlighting the healing and soothing properties of La Roche-Posay Thermal Spring Water, the core of all our formulations.' },
  { id: '04', title: 'LEARN', desc: 'Uncover breakthrough ingredients like Melasyl and Mexoryl.', fullDesc: 'Explore the cutting-edge research behind our patented ingredients. Learn how we are revolutionizing sun protection and hyperpigmentation treatments.' },
  { id: '05', title: 'CONSULT', desc: '1-on-1 time with top dermatologists.', fullDesc: 'Discuss your specific skin concerns directly with leading dermatologists. Receive personalized advice and a tailored skincare routine.' }
];

const LabRoutes: React.FC = () => {
  return (
    <>
      <SEO 
        title="What To Expect" 
        description="Dive deep into the five specialized modules of the Living Lab Nigeria." 
        canonicalUrl="/lab-routes"
      />
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
