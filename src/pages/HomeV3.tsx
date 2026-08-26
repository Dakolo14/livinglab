import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroV3Split from '../components/sections/HeroV3Split';
import Countdown from '../components/sections/Countdown';
import Partners from '../components/sections/Partners';
import BackToTop from '../components/layout/BackToTop';

import ExperiencesV3 from '../components/sections/ExperiencesV3';

import ScienceV3 from '../components/sections/ScienceV3';

import ProgrammeV3 from '../components/sections/ProgrammeV3';
import Marquee from '../components/sections/Marquee';

const HomeV3: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#ffffff' }}>
        
        <HeroV3Split />
        <Marquee />

        <ExperiencesV3 />

        <ScienceV3 />

        <ProgrammeV3 />

        <Countdown />

        <Partners />

      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default HomeV3;
