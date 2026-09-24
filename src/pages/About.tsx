import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './About.css';
import '../components/sections/AboutLRP.css';



const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="page-wrapper">
      <Helmet>
        <title>About LRP | Living Lab Nigeria 2026</title>
      </Helmet>

      <Header />
      
      <main className="about-page">



      <div className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
        <div className="about-boilerplate" style={{ 
          fontSize: '1.25rem', 
          color: '#4B5563', 
          lineHeight: '1.7',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '24px' }}>
            Created by a pharmacist in 1975, La Roche-Posay is present in over 50 countries and is recommended by over 100,000 dermatologists worldwide. It provides a unique range of daily skincare developed for every skin type, from newborns to cancer patients, from UV protection to repairing severely fragilized skin. La Roche-Posay’s formulas are developed with exclusive Selenium-rich thermal spring water, due to its antioxidant and soothing properties.
          </p>
          <p>
            Developed using a strict formulation charter with a minimal number of ingredients at optimal concentrations, La Roche-Posay products undergo stringent clinical testing for efficacy and safety, even on sensitive skin. La Roche-Posay understands that skin health has a profound impact on overall wellbeing and works alongside the medical community to advance dermatology and pioneer new approaches to care. Committed to the skin we live in and the planet we live on. Since 2023, all products are manufactured in factories using 100% renewable energy.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="scientific-grid-container" style={{ marginTop: '0', paddingTop: '80px', paddingBottom: '120px' }}>
          <div className="scientific-header">
            <h3>AT THE CORE OF OUR BRAND</h3>
            <p>LA ROCHE-POSAY</p>
          </div>
          
          <div className="scientific-grid">
            <div className="sg-item">
              <h4>FACTORY</h4>
              <div className="sg-reveal">
                <p>CO2 neutral since 2018.</p>
                <p>100% renewable energy.</p>
              </div>
            </div>
            <div className="sg-item">
              <h4>INGREDIENTS</h4>
              <div className="sg-reveal">
                <p>75% from nature or recycled materials.</p>
                <p>50% recycled or biobased packaging.</p>
              </div>
            </div>
            <div className="sg-item">
              <h4>THERMAL SPRING WATER</h4>
              <div className="sg-reveal">
                <p>A unique thermal spring water with therapeutic properties.</p>
              </div>
            </div>
            <div className="sg-item">
              <h4>COMPLEMENTARY THERAPY</h4>
              <div className="sg-reveal">
                <p>For all common dermatology consultations.</p>
              </div>
            </div>
            <div className="sg-item">
              <h4>PROVEN EFFICACY</h4>
              <div className="sg-reveal">
                <p>Clinically proven tolerance and efficacy on all skin types.</p>
              </div>
            </div>
            <div className="sg-item">
              <h4>SCIENTIFIC RESEARCH</h4>
              <div className="sg-reveal">
                <p>At the cutting-edge of scientific research on skin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
