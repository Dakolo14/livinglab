import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProgrammeSection from '../components/sections/ProgrammeSection';

const ProgrammePage: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="programme-page" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <ProgrammeSection />
      </main>

      <Footer />
    </>
  );
};

export default ProgrammePage;
