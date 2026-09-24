import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProgrammeSection.css';

const scheduleData: Record<number, Array<{time: string, experience: string}>> = {
  1: [
    { time: 'Morning', experience: 'Plenary 1/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Early afternoon', experience: 'Plenary 2/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Late afternoon', experience: 'Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' }
  ],
  2: [
    { time: 'Morning', experience: 'Plenary 1/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Early afternoon', experience: 'Plenary 2/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Late afternoon', experience: 'Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Evening', experience: 'Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' }
  ],
  3: [
    { time: 'Morning', experience: 'Plenary 1/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Early afternoon', experience: 'Plenary 2/2, Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Late afternoon', experience: 'Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' },
    { time: 'Evening', experience: 'Blue House, Scar of Life cinema, Innovation Corners, PopUp store, Consultation Corners' }
  ]
};

const tabs = [
  { id: 1, title: 'DAY 1' },
  { id: 2, title: 'DAY 2' },
  { id: 3, title: 'DAY 3' },
];

interface ProgrammeSectionProps {
  hideHeader?: boolean;
  hideCTA?: boolean;
}

const ProgrammeSection: React.FC<ProgrammeSectionProps> = ({ hideHeader = false, hideCTA = false }) => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section className="programme-section" id="programme" style={hideHeader ? { paddingTop: '40px' } : {}}>
      <div className="container">
        {!hideHeader && (
          <div className="programme-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.5px', textTransform: 'uppercase', margin: 0 }}>AGENDA</h2>
          </div>
        )}

        <div className="programme-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`prog-tab-btn ${activeDay === tab.id ? 'active' : ''}`}
              onClick={() => setActiveDay(tab.id)}
            >
              <span className="tab-title">{tab.title}</span>
            </button>
          ))}
        </div>

        <div className="programme-content">
          <div className="schedule-list-header hidden-mobile" style={{ gridTemplateColumns: '1fr 3fr' }}>
            <div className="col-time">TIME</div>
            <div className="col-exp">EXPERIENCE</div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              className="schedule-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {scheduleData[activeDay].map((item, index) => (
                <div className="schedule-row" key={index} style={{ gridTemplateColumns: '1fr 3fr' }}>
                  <div className="col-time">{item.time}</div>
                  <div className="col-exp">
                    <strong>{item.experience}</strong>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {!hideCTA && (
          <div className="programme-footer">
            <button className="btn-primary" onClick={() => window.dispatchEvent(new Event('open-registration'))}>REGISTER NOW</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgrammeSection;
