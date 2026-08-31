import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProgrammeSection.css';

const scheduleData: Record<number, Array<{time: string, experience: string, audience: string, location: string}>> = {
  1: [
    { time: '09:00 AM - 12:00 PM', experience: 'Dermatological Advancements Keynote', audience: 'HCPs & Dermatologists', location: 'The Science Theatre' },
    { time: '01:00 PM - 03:00 PM', experience: 'Retail & Partner Strategy', audience: 'Konga & Retailers', location: 'Partner Lounge' },
    { time: '04:00 PM - 06:00 PM', experience: 'Creator Content Session', audience: 'Media & Influencers', location: 'Content Studio' },
    { time: '07:30 PM - LATE', experience: 'Living Lab Opening Gala', audience: 'All VIP & B2B Guests', location: 'Main Atrium' }
  ],
  2: [
    { time: '10:00 AM - 12:00 PM', experience: 'Morning Lab Access', audience: 'Skincare Enthusiasts (Slot 1)', location: 'Full Lab Circuit' },
    { time: '01:00 PM - 03:00 PM', experience: 'Sun Science Masterclass', audience: 'All Attendees', location: 'UV Camera Zone' },
    { time: '03:30 PM - 06:30 PM', experience: 'Afternoon Lab Access', audience: 'Skincare Enthusiasts (Slot 2)', location: 'Full Lab Circuit' }
  ],
  3: [
    { time: '10:00 AM - 12:00 PM', experience: 'Morning Lab Access', audience: 'Skincare Enthusiasts (Slot 1)', location: 'Full Lab Circuit' },
    { time: '12:30 PM - 02:30 PM', experience: 'Acne Myth-Busting Panel', audience: 'All Attendees', location: 'The Acne Lab' },
    { time: '03:30 PM - 06:30 PM', experience: 'Afternoon Lab Access', audience: 'Skincare Enthusiasts (Slot 2)', location: 'Full Lab Circuit' }
  ],
  4: [
    { time: '10:00 AM - 12:00 PM', experience: 'Morning Lab Access', audience: 'Skincare Enthusiasts (Slot 1)', location: 'Full Lab Circuit' },
    { time: '01:00 PM - 02:00 PM', experience: 'The Future of Pigmentation', audience: 'All Attendees', location: 'Melasyl Hub' },
    { time: '03:00 PM - 05:00 PM', experience: 'Closing Lab Access', audience: 'Skincare Enthusiasts (Slot 2)', location: 'Full Lab Circuit' }
  ]
};

const tabs = [
  { id: 1, title: 'DAY 01', subtitle: 'B2B & VIP', date: 'NOV 3' },
  { id: 2, title: 'DAY 02', subtitle: 'B2C OPEN', date: 'NOV 4' },
  { id: 3, title: 'DAY 03', subtitle: 'B2C OPEN', date: 'NOV 5' },
  { id: 4, title: 'DAY 04', subtitle: 'B2C CLOSING', date: 'NOV 6' },
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
            <p>Four Days. Five Worlds. One Living Lab.</p>
          </div>
        )}

        <div className="programme-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`prog-tab-btn ${activeDay === tab.id ? 'active' : ''}`}
              onClick={() => setActiveDay(tab.id)}
            >
              <span className="tab-date">{tab.date}</span>
              <span className="tab-title">{tab.title}</span>
              <span className="tab-subtitle">{tab.subtitle}</span>
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
