import React from 'react';
import './HeroV3Split.css';

const HeroV3Split: React.FC = () => {
  return (
    <section className="hero-split-section">
      <div className="split-left">
        <div className="split-media-bg">
          <video 
            src="https://res.cloudinary.com/wjmfwcrd/video/upload/v1787830613/video.mp4" 
            poster="https://res.cloudinary.com/wjmfwcrd/image/upload/v1787843488/thumbnail.png"
            autoPlay loop muted playsInline className="split-video" 
          />
        </div>
        <div className="split-content-left">
          <h1 className="split-title">LIVING<br/>LAB<br/><span style={{ fontStyle: 'italic', color: '#00AEEF' }}>LAGOS</span> 2026</h1>
        </div>
      </div>
      <div className="split-right">
        <div className="registration-card">
          <span className="reg-eyebrow">LIMITED INVITATION</span>
          <h2 className="reg-title">CLAIM YOUR EXPERT SLOT</h2>
          <p className="reg-desc">Join the forefront of dermatological science in Lagos.</p>
          
          <div className="reg-countdown">
            <div className="countdown-block"><span className="cd-num">14</span><span className="cd-label">DAYS</span></div>
            <div className="countdown-divider">:</div>
            <div className="countdown-block"><span className="cd-num">08</span><span className="cd-label">HRS</span></div>
            <div className="countdown-divider">:</div>
            <div className="countdown-block"><span className="cd-num">45</span><span className="cd-label">MIN</span></div>
          </div>
          
          <form className="reg-form">
            <input type="email" placeholder="Enter your professional email" className="reg-input" />
            <button 
              type="button" 
              className="btn-primary w-100"
              onClick={() => window.dispatchEvent(new Event('open-registration'))}
            >
              REGISTER NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default HeroV3Split;
