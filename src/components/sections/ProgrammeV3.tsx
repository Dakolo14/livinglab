import React, { useState } from 'react';
import './ProgrammeV3.css';

const scheduleData = {
  1: [
    { id: 'd1-1', time: '09:00 - 10:30', title: 'ARRIVAL & ACCREDITATION', type: 'LOGISTICS' },
    { id: 'd1-2', time: '11:00 - 12:30', title: 'KEYNOTE: THE MELASYL BREAKTHROUGH', type: 'CLINICAL LECTURE' },
    { id: 'd1-3', time: '13:00 - 14:30', title: 'LAB IMMERSION: MICROBIOME', type: 'PRACTICAL' },
    { id: 'd1-4', time: '15:00 - 16:30', title: 'PANEL: PEDIATRIC DERMATOLOGY', type: 'DISCUSSION' },
    { id: 'd1-5', time: '18:00 - 21:00', title: 'VIP GALA & NETWORKING', type: 'SOCIAL' }
  ],
  2: [
    { id: 'd2-1', time: '09:30 - 11:00', title: 'UV FILTRATION WORKSHOP', type: 'PRACTICAL' },
    { id: 'd2-2', time: '11:30 - 13:00', title: 'CELLULAR REPAIR SYMPOSIUM', type: 'CLINICAL LECTURE' },
    { id: 'd2-3', time: '14:00 - 16:00', title: 'PRODUCT FORMULATION MASTERCLASS', type: 'WORKSHOP' },
    { id: 'd2-4', time: '16:30 - 18:00', title: 'INNOVATION ROUNDTABLE', type: 'DISCUSSION' }
  ],
  3: [
    { id: 'd3-1', time: '10:00 - 12:00', title: 'ADVANCED DIAGNOSTICS DEMO', type: 'PRACTICAL' },
    { id: 'd3-2', time: '13:00 - 15:00', title: 'CLINICAL CASE STUDIES', type: 'CLINICAL LECTURE' },
    { id: 'd3-3', time: '15:30 - 17:00', title: 'FUTURE OF AI IN SKINCARE', type: 'DISCUSSION' }
  ],
  4: [
    { id: 'd4-1', time: '09:00 - 11:00', title: 'GLOBAL EXPERT ROUNDTABLE', type: 'DISCUSSION' },
    { id: 'd4-2', time: '11:30 - 13:00', title: 'CLOSING CEREMONY & AWARDS', type: 'LOGISTICS' },
    { id: 'd4-3', time: '13:00 - 15:00', title: 'FAREWELL BRUNCH', type: 'SOCIAL' }
  ]
};

const ProgrammeV3: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3 | 4>(1);

  return (
    <section className="prog-v3-section">
      <div className="prog-v3-container">
        <div className="prog-v3-header">
          <h4 className="prog-v3-eyebrow">PROTOCOL SCHEDULE</h4>
          <h2 className="prog-v3-title">ITINERARY</h2>
          <div className="prog-v3-filters">
            <button 
              className={`prog-v3-filter ${activeDay === 1 ? 'active' : ''}`}
              onClick={() => setActiveDay(1)}
            >
              DAY 01
            </button>
            <button 
              className={`prog-v3-filter ${activeDay === 2 ? 'active' : ''}`}
              onClick={() => setActiveDay(2)}
            >
              DAY 02
            </button>
            <button 
              className={`prog-v3-filter ${activeDay === 3 ? 'active' : ''}`}
              onClick={() => setActiveDay(3)}
            >
              DAY 03
            </button>
            <button 
              className={`prog-v3-filter ${activeDay === 4 ? 'active' : ''}`}
              onClick={() => setActiveDay(4)}
            >
              DAY 04
            </button>
          </div>
        </div>

        <div className="prog-v3-table">
          <div className="prog-v3-row header-row">
            <div className="p-time">TIME (WAT)</div>
            <div className="p-title">EVENT DESIGNATION</div>
            <div className="p-type">CLASSIFICATION</div>
            <div className="p-action"></div>
          </div>
          
          <div className="prog-v3-tbody">
            {scheduleData[activeDay].map((item) => (
              <div key={item.id} className="prog-v3-row">
                <div className="p-time">{item.time}</div>
                <div className="p-title">{item.title}</div>
                <div className="p-type"><span className="type-badge">{item.type}</span></div>
                <div className="p-action"><button className="btn-outline-small">ADD TO CALENDAR</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeV3;
