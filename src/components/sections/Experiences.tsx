import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experiences.css';

interface ExperiencesProps {
  activeReelId: number;
  setActiveReelId: (id: number) => void;
  isVideoMoved: boolean;
}

const reels = [
  { id: 1, title: 'Sun Science', videoSrc: '/reducedplaceholder/anthelios.mov' },
  { id: 2, title: 'Acne Lab', videoSrc: '/reducedplaceholder/effaclar.mov' },
  { id: 3, title: 'Baby Skin Lab', videoSrc: '/reducedplaceholder/lipikar.mov' },
  { id: 4, title: 'Scars of Life', videoSrc: '/reducedplaceholder/cicaplast.mp4' },
  { id: 5, title: 'Pigmentation Lab', videoSrc: '/reducedplaceholder/melab3.mp4' }
];

const Experiences: React.FC<ExperiencesProps> = ({ activeReelId, setActiveReelId, isVideoMoved }) => {
  const [expandedReel, setExpandedReel] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReelClick = (id: number) => {
    if (activeReelId === id) {
      setExpandedReel(id);
    } else {
      setActiveReelId(id);
    }
  };

  return (
    <section className="experiences" id="about">
      <div className="container">
        <h2 className="section-subtitle">
          Four days inside a working dermatological laboratory built in Nigeria.<br/>
          Five worlds. Experts, thermal spring water, real dermatologists and<br/>
          your own skin story to take home.
        </h2>
        <h3 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, margin: '60px 0 60px', color: '#111827' }}>
          EXPLORE SKIN PATHOLOGIES
        </h3>
      </div>
        
      <div className="experience-cards">
        {reels.map((reel) => {
          let indexDiff = reel.id - activeReelId;
          
          if (indexDiff > 2) indexDiff -= 5;
          else if (indexDiff < -2) indexDiff += 5;
          
          let position = indexDiff;
          let x = position === 0 ? 0 
                : position === -1 ? (isMobile ? -105 : -110) 
                : position === 1 ? (isMobile ? 105 : 110) 
                : position === -2 ? (isMobile ? -210 : -200) 
                : (isMobile ? 210 : 200);
          
          let scale = position === 0 ? 1 
                    : position === 1 || position === -1 ? (isMobile ? 0.9 : 0.8) 
                    : (isMobile ? 0.8 : 0.6);
          let zIndex = position === 0 ? 5 : position === 1 || position === -1 ? 4 : 3;
          let isActive = position === 0;

          return (
            <motion.div 
              key={reel.id}
              className={`exp-card ${isActive ? 'active' : 'inactive'}`}
              style={{ touchAction: 'pan-y' }}
              animate={{ 
                x: `${x}%`, 
                scale: scale, 
                zIndex: zIndex,
                opacity: isActive ? 1 : 0.7 
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
              onClick={() => handleReelClick(reel.id)}
              whileHover={!isActive ? { opacity: 0.9 } : {}}
              drag={isMobile && isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, { offset }) => {
                const swipe = offset.x;
                if (swipe < -40) {
                  setActiveReelId(activeReelId === 5 ? 1 : activeReelId + 1);
                } else if (swipe > 40) {
                  setActiveReelId(activeReelId === 1 ? 5 : activeReelId - 1);
                }
              }}
            >
              <div className="video-frame">
                {isActive && isVideoMoved ? (
                  <motion.div
                    style={{ width: '100%', height: '100%', backgroundColor: '#4B5563', position: 'relative' }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
                  >
                    <video 
                      src={reel.videoSrc} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                    />
                    <div className="reel-overlay">
                      <span className="play-icon">▶</span>
                      <div className="reel-text">
                        <h4>{reel.title}</h4>
                        <p>Click to expand</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <video 
                      src={reel.videoSrc} 
                      autoPlay
                      loop
                      muted 
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                    />
                    <div className="reel-overlay">
                      <span className="play-icon">▶</span>
                      <div className="reel-text">
                        <h4>{reel.title}</h4>
                        <p>{isActive ? 'Click to expand' : 'Click to activate'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="banner">
        <div className="banner-text">
          {/* Duplicated for seamless marquee */}
          <span>SKIN YOU CAN FEEL.</span>
          <span>SCIENCE YOU CAN SEE.</span>
          <span>AN EXPERIENCE YOU WON'T FORGET.</span>
          <span>SKIN YOU CAN FEEL.</span>
          <span>SCIENCE YOU CAN SEE.</span>
          <span>AN EXPERIENCE YOU WON'T FORGET.</span>
        </div>
      </div>

      {/* Full Screen Modal for Expanded Reel */}
      <AnimatePresence>
        {expandedReel !== null && (
          <motion.div 
            className="reel-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedReel(null)}
          >
            <motion.div 
              className="reel-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setExpandedReel(null)}>✕</button>
              <div className="video-frame" style={{ position: 'relative' }}>
                <video 
                  src={reels.find(r => r.id === expandedReel)?.videoSrc} 
                  autoPlay 
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'black' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experiences;
