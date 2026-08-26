import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Countdown from '../components/sections/Countdown';
import Partners from '../components/sections/Partners';
import Experiences from '../components/sections/Experiences';
import LabJourney from '../components/sections/LabJourney';
import ScienceSection from '../components/sections/ScienceSection';
import ProgrammeSection from '../components/sections/ProgrammeSection';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';

const HomeV2: React.FC = () => {
  const [activeReelId, setActiveReelId] = useState(3);
  const [isVideoMoved, setIsVideoMoved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVideoMoved(true);
      } else {
        setIsVideoMoved(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero activeReelId={activeReelId} isVideoMoved={isVideoMoved} />
        <Countdown />
        <Partners />
        <Experiences activeReelId={activeReelId} setActiveReelId={setActiveReelId} isVideoMoved={isVideoMoved} />
        <LabJourney />
        <ScienceSection />
        <ProgrammeSection />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
};

export default HomeV2;
