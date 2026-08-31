import React, { useEffect } from 'react';
import '../../pages/Experts.css'; 

const EXPERTS = [
  { id: 1, name: 'Name', title: 'Role' },
  { id: 2, name: 'Name', title: 'Role' },
  { id: 3, name: 'Name', title: 'Role' }
];

const SpeakersPreview: React.FC = () => {
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
    <section className="experts-grid-section" style={{ paddingTop: '80px', backgroundColor: '#ffffff', paddingBottom: '80px' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, color: '#111827', textTransform: 'uppercase' }}>Our Speakers</h2>
      </div>
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
  );
};

export default SpeakersPreview;
