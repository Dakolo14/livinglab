import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Countdown from '../components/sections/Countdown';
import Partners from '../components/sections/Partners';
import Experiences from '../components/sections/Experiences';
import LabJourney from '../components/sections/LabJourney';
import ProgrammeSection from '../components/sections/ProgrammeSection';
import SpeakersPreview from '../components/sections/SpeakersPreview';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';

const Home: React.FC = () => {
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
        <Experiences activeReelId={activeReelId} setActiveReelId={setActiveReelId} isVideoMoved={isVideoMoved} />
        <LabJourney />
        <SpeakersPreview />
        <ProgrammeSection />
        <FAQ />
        <Partners />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
};

export default Home;
