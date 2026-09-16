import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Countdown from '../components/sections/Countdown';
import SkinPathologies from '../components/sections/SkinPathologies';
import AboutLRP from '../components/sections/AboutLRP';
import ConsultationReasons from '../components/sections/ConsultationReasons';
import Partners from '../components/sections/Partners';
import Experiences from '../components/sections/Experiences';
import LabJourney from '../components/sections/LabJourney';
import ProgrammeSection from '../components/sections/ProgrammeSection';
import SpeakersPreview from '../components/sections/SpeakersPreview';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';
import SEO from '../components/layout/SEO';

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
      <SEO 
        title="Living Lab Nigeria 2026" 
        description="Experience the future of dermatology at Living Lab Nigeria 2026. Join top experts for a fully immersive journey into clinical skincare science."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Living Lab Nigeria 2026",
          "startDate": "2026-11-03T09:00",
          "endDate": "2026-11-05T18:00",
          "location": {
            "@type": "Place",
            "name": "Lagos, Nigeria"
          }
        }}
      />
      <Header />
      <main>
        <Hero activeReelId={activeReelId} isVideoMoved={isVideoMoved} />
        <Countdown />
        <SkinPathologies />
        <AboutLRP />
        <ConsultationReasons />
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
