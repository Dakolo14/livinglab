import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProgrammeSection from '../components/sections/ProgrammeSection';
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

        <section className="page-cta" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173eca9e5f9?auto=format&fit=crop&w=2000&q=80")' }}>
          <div className="cta-overlay"></div>
          <div className="cta-content">
            <h2>SECURE YOUR ITINERARY</h2>
            <p>Spaces for the Living Lab Lagos 2026 are highly limited. Register now to confirm your attendance.</p>
            <button className="btn-primary" onClick={() => window.dispatchEvent(new Event('open-registration'))}>Claim Your Slot</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProgrammePage;
