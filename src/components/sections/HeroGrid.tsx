import React from 'react';
import './HeroGrid.css';

const HeroGrid: React.FC = () => {
  return (
    <section className="hero-grid-section">
      <div className="hero-grid-container">
        
        {/* Top Left: Massive Headline */}
        <div className="grid-item grid-headline">
          <h1>LIVING<br/>LAB<br/><span className="text-lagos">LAGOS</span><br/>2026</h1>
        </div>

        {/* Top Right: Video Snippet */}
        <div className="grid-item grid-video">
          <video 
            src="/video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>

        {/* Bottom Left: Info */}
        <div className="grid-item grid-info">
          <h3>THE SCIENCE OF SKIN</h3>
          <p>Join our team of professionals showing you how our products work in real time. A definitive dermatological experience.</p>
        </div>

        {/* Bottom Right: CTAs */}
        <div className="grid-item grid-cta">
          <div className="cta-wrapper">
            <button 
              className="btn-primary"
              onClick={() => window.dispatchEvent(new Event('open-registration'))}
            >
              CLAIM YOUR SLOT
            </button>
            <a href="#explore" className="link-explore">EXPLORE THE LAB →</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroGrid;
