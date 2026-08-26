import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroGrid from '../components/sections/HeroGrid';
import ExperiencesGrid from '../components/sections/ExperiencesGrid';
import ScienceGrid from '../components/sections/ScienceGrid';
import ProgrammeGrid from '../components/sections/ProgrammeGrid';
import Countdown from '../components/sections/Countdown';
import Partners from '../components/sections/Partners';
import BackToTop from '../components/layout/BackToTop';
import Marquee from '../components/sections/Marquee';

const HomeV1: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#ffffff' }}>
        
        <HeroGrid />
        <Marquee />

        <ExperiencesGrid />
        
        <ScienceGrid />

        <ProgrammeGrid />

        <Countdown />

        <Partners />

      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default HomeV1;
