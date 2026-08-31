import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import './Experts.css';

const EXPERTS = [
  { id: 1, name: 'Name', title: 'Role' },
  { id: 2, name: 'Name', title: 'Role' },
  { id: 3, name: 'Name', title: 'Role' },
  { id: 4, name: 'Name', title: 'Role' },
  { id: 5, name: 'Name', title: 'Role' },
  { id: 6, name: 'Name', title: 'Role' }
];

const Experts: React.FC = () => {
  useEffect(() => {
    // Basic animation triggers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.expert-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      
      <main className="experts-page">
        <section className="experts-hero">
          <div className="experts-hero-content">
            <h1 className="experts-title">MEET THE<br />SPEAKERS</h1>
            <p className="experts-subtitle">
              Pioneers in dermatology. Get exclusive access to the minds shaping the future of clinical skin science, UV protection, and barrier repair.
            </p>
          </div>
        </section>

        <section className="experts-grid-section">
          <div className="experts-grid-container">
            {EXPERTS.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB', color: '#9CA3AF', fontWeight: 'bold', letterSpacing: '1px' }}>
                  [ EXPERT PHOTO ]
                </div>
                <div className="expert-info">
                  <h3 className="expert-name">{expert.name}</h3>
                  <p className="expert-title">{expert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PageCTA 
          title="JOIN THE EXPERTS"
          description="Register now to secure your spot in these exclusive clinical sessions."
        />
      </main>

      <Footer />
    </>
  );
};

export default Experts;
