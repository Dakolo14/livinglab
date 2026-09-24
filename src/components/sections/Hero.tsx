import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

interface HeroProps {
  isVideoMoved: boolean;
}

const Hero: React.FC<HeroProps> = ({ isVideoMoved }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && !isVideoMoved) {
      videoRef.current.play().catch((err) => console.log('Autoplay blocked:', err));
    }
  }, [isVideoMoved]);

  return (
    <section className="hero" id="home">
      {!isVideoMoved && (
        <motion.div 
          className="hero-video-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
          style={{ backgroundColor: '#4B5563' }}
        >
          <video 
            ref={videoRef}
            src="https://res.cloudinary.com/wjmfwcrd/video/upload/q_auto,f_auto/v1790271234/hero.mp4" 
            poster="https://res.cloudinary.com/wjmfwcrd/image/upload/v1787843488/thumbnail.png"
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      )}
      
      {/* Original Hero Content Restored */}
      {!isVideoMoved && (
        <div className="container hero-content">
          <h1>Living Lab <span style={{ fontStyle: 'italic' }}>Nigeria</span> 2026</h1>
          <h3 style={{ fontSize: '1rem', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', color: '#E5E7EB' }}>
            Lagos, Nigeria | 3rd November - 5th November
          </h3>
          <p>Join our team of professionals showing you how our products work in real time.</p>
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => window.dispatchEvent(new Event('open-registration'))}
            >
              Register Now
            </button>
          </div>
        </div>
      )}
      
      {!isVideoMoved && (
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
