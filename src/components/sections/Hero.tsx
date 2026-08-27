import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

interface HeroProps {
  activeReelId: number;
  isVideoMoved: boolean;
}

const reelColors: Record<number, string> = {
  1: '#F87171',
  2: '#60A5FA',
  3: '#4B5563',
  4: '#34D399',
  5: '#A78BFA',
};

const Hero: React.FC<HeroProps> = ({ activeReelId, isVideoMoved }) => {
  const bgColor = reelColors[activeReelId] || '#4B5563';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && activeReelId === 3 && !isVideoMoved) {
      videoRef.current.play().catch((err) => console.log('Autoplay blocked:', err));
    }
  }, [activeReelId, isVideoMoved]);

  return (
    <section className="hero" id="home">
      {!isVideoMoved && (
        <motion.div 
          layoutId="hero-video" // Restored shared layout ID
          className="hero-video-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
          style={{ backgroundColor: bgColor }}
        >
          {activeReelId === 3 ? (
            <video 
              ref={videoRef}
              src="https://res.cloudinary.com/wjmfwcrd/video/upload/v1787830613/video.mp4" 
              poster="https://res.cloudinary.com/wjmfwcrd/image/upload/v1787843488/thumbnail.png"
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="placeholder-box" style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
               Hero Background Linked to Reel {activeReelId}
            </div>
          )}
        </motion.div>
      )}
      
      {/* Original Hero Content Restored */}
      {!isVideoMoved && (
        <div className="container hero-content">
          <h1>Living Lab Lagos 2026</h1>
          <p>Join our team of professionals showing you how our products work in real time.</p>
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => window.dispatchEvent(new Event('open-registration'))}
            >
              Register Now
            </button>
            <button className="btn-secondary">Discover more</button>
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
