import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProgrammeSection from '../components/sections/ProgrammeSection';
import PageCTA from '../components/sections/PageCTA';
import './ProgrammePage.css';

const ProgrammePage: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="programme-page">
        <section className="programme-hero">
          <div className="programme-hero-content">
            <h4 className="programme-eyebrow">AGENDA</h4>
            <h1 className="programme-title">EVENT<br />PROGRAMME</h1>
            <p className="programme-subtitle">
              An immersive full-day schedule designed exclusively for dermatologists, medical professionals, and skincare experts. 
            </p>
          </div>
        </section>

        <ProgrammeSection hideHeader={true} hideCTA={true} />

        <PageCTA 
          title="SECURE YOUR ITINERARY"
          description="Spaces for the Living Lab Nigeria 2026 are highly limited. Register now to confirm your attendance."
        />
      </main>

      <Footer />
    </>
  );
};

export default ProgrammePage;
