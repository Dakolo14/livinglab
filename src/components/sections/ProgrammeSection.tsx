import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProgrammeSection.css';

const scheduleData: Record<number, Array<{time: string, experience: string, audience: string, location: string}>> = {
  1: [
    { time: '09:00 AM - 11:00 AM', experience: 'Plenary Session & Innovation Corners', audience: 'B2B, Media & Experts', location: 'Oasis by The Five Palm' },
    { time: '12:00 PM - 02:00 PM', experience: 'Blue House & Consultation Corners', audience: 'B2B, Media & Experts', location: 'Oasis by The Five Palm' },
    { time: '03:00 PM - 05:00 PM', experience: 'Scar of Life Cinema & PopUp Store', audience: 'B2B, Media & Experts', location: 'Oasis by The Five Palm' }
  ],
  2: [
    { time: '09:00 AM - 11:00 AM', experience: 'Plenary Session & PopUp Store', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '12:00 PM - 02:00 PM', experience: 'Innovation Corners & Blue House', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '03:00 PM - 05:00 PM', experience: 'Scar of Life Cinema & Consultation', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '06:00 PM - 08:00 PM', experience: 'All Zones Open (Evening Access)', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' }
  ],
  3: [
    { time: '09:00 AM - 11:00 AM', experience: 'Blue House & Scar of Life Cinema', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '12:00 PM - 02:00 PM', experience: 'Innovation Corners & PopUp Store', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '03:00 PM - 05:00 PM', experience: 'Consultation Corners & Plenary', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' },
    { time: '06:00 PM - 08:00 PM', experience: 'Final Showcase & All Zones Open', audience: 'Public & Influencers', location: 'Oasis by The Five Palm' }
  ]
};

const tabs = [
  { id: 1, title: 'DAY 01' },
  { id: 2, title: 'DAY 02' },
  { id: 3, title: 'DAY 03' },
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
          <div className="programme-header">
            <h2>THE PROGRAMME</h2>
            <p>Three Days. Five Worlds. One Living Lab.</p>
          </div>
        )}

        <div className="programme-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`prog-tab-btn ${activeDay === tab.id ? 'active' : ''}`}
              onClick={() => setActiveDay(tab.id)}
            >
              <span className="tab-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{tab.title}</span>
            </button>
          ))}
        </div>

        <div className="programme-content">
          <div className="schedule-list-header hidden-mobile">
            <div className="col-time">TIME</div>
            <div className="col-exp">EXPERIENCE</div>
            <div className="col-who">WHO IT'S FOR</div>
            <div className="col-loc">LOCATION</div>
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
                <div className="schedule-row" key={index}>
                  <div className="col-time">{item.time}</div>
                  <div className="col-exp">
                    <strong>{item.experience}</strong>
                  </div>
                  <div className="col-who">
                    <span className="pill-audience">{item.audience}</span>
                  </div>
                  <div className="col-loc">{item.location}</div>
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
