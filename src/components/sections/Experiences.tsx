import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experiences.css';

interface ExperiencesProps {
  activeReelId: number;
  setActiveReelId: (id: number) => void;
  isVideoMoved: boolean;
}

const reels = [
  { id: 1, title: 'Sun Science' },
  { id: 2, title: 'Acne Lab' },
  { id: 3, title: 'Baby Skin Lab' },
  { id: 4, title: 'Scars of Life' },
  { id: 5, title: 'Pigmentation Lab' }
];

const reelColors: Record<number, string> = {
  1: '#F87171',
  2: '#60A5FA',
  3: '#4B5563',
  4: '#34D399',
  5: '#A78BFA',
};

const Experiences: React.FC<ExperiencesProps> = ({ activeReelId, setActiveReelId, isVideoMoved }) => {
  const [expandedReel, setExpandedReel] = useState<number | null>(null);

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
          Four days inside a working dermatological laboratory built in Lagos.<br/>
          Five worlds. Experts, thermal spring water, real dermatologists and<br/>
          your own skin story to take home.
        </h2>
      </div>
        
      <div className="experience-cards">
        {reels.map((reel) => {
          let indexDiff = reel.id - activeReelId;
          
          if (indexDiff > 2) indexDiff -= 5;
          else if (indexDiff < -2) indexDiff += 5;
          
          let position = indexDiff;
          let x = position === 0 ? 0 : position === -1 ? -110 : position === 1 ? 110 : position === -2 ? -200 : 200;
          let scale = position === 0 ? 1 : position === 1 || position === -1 ? 0.8 : 0.6;
          let zIndex = position === 0 ? 5 : position === 1 || position === -1 ? 4 : 3;
          let isActive = position === 0;

          return (
            <motion.div 
              key={reel.id}
              className={`exp-card ${isActive ? 'active' : 'inactive'}`}
              animate={{ 
                x: `${x}%`, 
                scale: scale, 
                zIndex: zIndex,
                opacity: isActive ? 1 : 0.7 
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
              onClick={() => handleReelClick(reel.id)}
              whileHover={!isActive ? { opacity: 0.9 } : {}}
            >
              <div className="video-frame">
                {isActive && isVideoMoved ? (
                  <motion.div
                    layoutId="hero-video"
                    style={{ width: '100%', height: '100%', backgroundColor: '#4B5563', position: 'relative' }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
                  >
                    {reel.id === 3 ? (
                      <video 
                        src="https://res.cloudinary.com/wjmfwcrd/video/upload/v1787830613/video.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: reelColors[reel.id] || '#4B5563' }} />
                    )}
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
                    {reel.id === 3 ? (
                       <video 
                         src="https://res.cloudinary.com/wjmfwcrd/video/upload/v1787830613/video.mp4" 
                         muted 
                         playsInline
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                       />
                    ) : (
                       <div style={{ width: '100%', height: '100%', backgroundColor: reelColors[reel.id] || '#4B5563' }} />
                    )}
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
              layoutId="hero-video" // Match the layoutId of the active video
              className="reel-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setExpandedReel(null)}>✕</button>
              <div className="video-frame" style={{ position: 'relative' }}>
                {expandedReel === 3 ? (
                  <video 
                    src="https://res.cloudinary.com/wjmfwcrd/video/upload/v1787830613/video.mp4" 
                    autoPlay 
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'black' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: reelColors[expandedReel] || '#4B5563' }} />
                )}
                
                {expandedReel !== 3 && (
                  <div className="placeholder-box" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Full Screen Placeholder {expandedReel}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experiences;
