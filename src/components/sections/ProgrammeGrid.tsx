import React, { useState } from 'react';
import './ProgrammeGrid.css';

const schedules = {
  1: [
    { time: 'Morning', event: 'DOORS OPEN & ACCREDITATION', type: 'Welcome', loc: 'Main Hall' },
    { time: 'Morning', event: 'THE FUTURE OF UV FILTERS', type: 'Masterclass', loc: 'Lab A' },
    { time: 'Morning', event: 'MICROBIOME DISCOVERIES', type: 'Keynote', loc: 'Auditorium' },
    { time: 'Early afternoon', event: 'LUNCH & NETWORKING', type: 'Break', loc: 'Terrace' },
    { time: 'Early afternoon', event: 'ACNE & PIGMENTATION CLINIC', type: 'Workshop', loc: 'Lab B' },
    { time: 'Late afternoon', event: 'MEET THE EXPERTS PANEL', type: 'Panel', loc: 'Auditorium' },
  ],
  2: [
    { time: 'Morning', event: 'MORNING COFFEE & LAB TOURS', type: 'Welcome', loc: 'Main Hall' },
    { time: 'Morning', event: 'BARRIER REPAIR INNOVATIONS', type: 'Masterclass', loc: 'Lab C' },
    { time: 'Morning', event: 'PEDIATRIC DERMATOLOGY', type: 'Keynote', loc: 'Auditorium' },
    { time: 'Early afternoon', event: 'LUNCH & NETWORKING', type: 'Break', loc: 'Terrace' },
    { time: 'Late afternoon', event: 'SCAR HEALING TECHNIQUES', type: 'Workshop', loc: 'Lab A' },
  ],
  3: [
    { time: 'Morning', event: 'MELASYL REVOLUTION DEEP DIVE', type: 'Masterclass', loc: 'Lab B' },
    { time: 'Morning', event: 'ONCOLOGY & SKINCARE', type: 'Keynote', loc: 'Auditorium' },
    { time: 'Early afternoon', event: 'LUNCH & NETWORKING', type: 'Break', loc: 'Terrace' },
    { time: 'Late afternoon', event: 'SUN PROTECTION SYMPOSIUM', type: 'Panel', loc: 'Main Hall' },
  ],
  4: [
    { time: 'Morning', event: 'THE FUTURE OF DERMATOLOGY', type: 'Keynote', loc: 'Auditorium' },
    { time: 'Early afternoon', event: 'CLOSING CEREMONY & AWARDS', type: 'Welcome', loc: 'Main Hall' },
    { time: 'Late afternoon', event: 'FAREWELL BRUNCH', type: 'Break', loc: 'Terrace' },
  ]
};

const ProgrammeGrid: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3 | 4>(1);
  const [isFading, setIsFading] = useState(false);

  const handleDayChange = (day: 1 | 2 | 3 | 4) => {
    if (day === activeDay) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveDay(day);
      setIsFading(false);
    }, 300); // 300ms fade duration
  };

  const activeSchedule = schedules[activeDay];

  return (
    <section className="programme-grid-section">
      <div className="prog-grid-header-area">
        <div className="prog-header-left">
          <h2>THE ITINERARY</h2>
          <p>Four days of deep dermatological immersion.</p>
        </div>
        <div className="prog-filters">
          {(['DAY 1', 'DAY 2', 'DAY 3', 'DAY 4'] as const).map((label, idx) => {
            const dayNum = (idx + 1) as 1 | 2 | 3 | 4;
            return (
              <button 
                key={dayNum}
                className={`filter-btn ${activeDay === dayNum ? 'active' : ''}`}
                onClick={() => handleDayChange(dayNum)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="prog-grid-table">
        {/* Table Header */}
        <div className="prog-grid-row th-row">
          <div className="prog-cell time-cell">TIME</div>
          <div className="prog-cell event-cell">EXPERIENCE</div>
          <div className="prog-cell type-cell">CATEGORY</div>
          <div className="prog-cell loc-cell">LOCATION</div>
        </div>

        {/* Table Body with Animation */}
        <div className={`prog-grid-body ${isFading ? 'fading' : ''}`}>
          {activeSchedule.map((item, idx) => (
            <div key={idx} className="prog-grid-row">
              <div className="prog-cell time-cell">
                <span className="time-text">{item.time}</span>
              </div>
              <div className="prog-cell event-cell">
                <span className="event-text">{item.event}</span>
              </div>
              <div className="prog-cell type-cell">
                <span className={`type-badge ${item.type.toLowerCase()}`}>{item.type}</span>
              </div>
              <div className="prog-cell loc-cell">
                <span className="loc-text">{item.loc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="prog-grid-footer">
        <button className="btn-primary">DOWNLOAD FULL AGENDA</button>
      </div>
    </section>
  );
};

export default ProgrammeGrid;
