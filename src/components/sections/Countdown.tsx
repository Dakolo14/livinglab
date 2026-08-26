import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: Nov 3, 2026
    const targetDate = new Date('2026-11-03T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section">
      <div className="container countdown-container">
        <h3 className="countdown-title">LIVING LAB OPENS IN:</h3>
        <div className="countdown-timer">
          <div className="time-block">
            <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">DAYS</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">HOURS</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">MINUTES</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">SECONDS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
