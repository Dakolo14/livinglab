import React from 'react';
import './Marquee.css';

const Marquee: React.FC = () => {
  return (
    <div className="marquee-banner">
      <div className="marquee-banner-text">
        <span>SKIN YOU CAN FEEL.</span>
        <span>SCIENCE YOU CAN SEE.</span>
        <span>AN EXPERIENCE YOU WON'T FORGET.</span>
        <span>SKIN YOU CAN FEEL.</span>
        <span>SCIENCE YOU CAN SEE.</span>
        <span>AN EXPERIENCE YOU WON'T FORGET.</span>
      </div>
    </div>
  );
};

export default Marquee;
