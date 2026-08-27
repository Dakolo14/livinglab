import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './ProgrammePage.css';

const SCHEDULE = [
  {
    time: '09:00 AM',
    title: 'Registration & Welcome Breakfast',
    speaker: 'Main Lobby'
  },
  {
    time: '10:00 AM',
    title: 'Keynote: The Future of Clinical Dermatology',
    speaker: 'Dr. Chantal Rouvray'
  },
  {
    time: '11:30 AM',
    title: 'Lab Route I: The Sun Science',
    speaker: 'Dr. Alistair Vance'
  },
  {
    time: '01:00 PM',
    title: 'Networking Luncheon',
    speaker: 'Garden Atrium'
  },
  {
    time: '02:00 PM',
    title: 'Lab Route II: Barrier Repair & Microbiome',
    speaker: 'Dr. Amina Okoro'
  },
  {
    time: '03:30 PM',
    title: 'The Melasyl Revolution Panel',
    speaker: 'Prof. Julian Beraud'
  },
  {
    time: '05:00 PM',
    title: 'Closing Reception & Rewards Distribution',
    speaker: 'Living Lab Main Hall'
  }
];

const ProgrammePage: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="programme-page">
        <section className="programme-hero">
          <div className="programme-hero-content">
            <h4 className="programme-eyebrow">AGENDA</h4>
            <h1 className="programme-title">EVENT<br />PROGRAMME</h1>
            <p className="programme-subtitle">
              An immersive full-day schedule designed exclusively for dermatologists, medical professionals, and skincare experts. 
            </p>
          </div>
        </section>

        <section className="schedule-section">
          <div className="schedule-container">
            {SCHEDULE.map((item, index) => (
              <div key={index} className="schedule-row">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-details">
                  <h3>{item.title}</h3>
                  <p>{item.speaker}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="page-cta">
          <h2>SECURE YOUR ITINERARY</h2>
          <p>Spaces for the Living Lab Lagos 2026 are highly limited. Register now to confirm your attendance.</p>
          <button className="btn-primary" onClick={() => window.dispatchEvent(new Event('open-registration'))}>Claim Your Slot</button>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProgrammePage;
