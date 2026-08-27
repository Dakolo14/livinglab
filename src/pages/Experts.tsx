import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import './Experts.css';

const EXPERTS = [
  {
    id: 1,
    name: 'Dr. Chantal Rouvray',
    credentials: 'MD, PhD',
    title: 'Global Head of Clinical Dermatology',
    bio: 'Pioneered breakthrough research in ceramide synthesis and epidermal barrier recovery. Leads the global initiative for pediatric skin protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    specialty: 'Barrier Repair & Pediatrics'
  },
  {
    id: 2,
    name: 'Dr. Alistair Vance',
    credentials: 'FAAD',
    title: 'Lead Photoprotection Researcher',
    bio: 'Recognized worldwide for his contributions to UV filtration technology. Chief architect behind the Netlock® environmental defense mechanism.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    specialty: 'Sun Science & Photoprotection'
  },
  {
    id: 3,
    name: 'Dr. Amina Okoro',
    credentials: 'MD, Board Certified',
    title: 'Microbiome & Microbiota Specialist',
    bio: 'Focuses on the delicate balance of skin flora. Her clinical trials have reshaped modern approaches to severe acne management and rosacea.',
    imageUrl: 'https://images.unsplash.com/photo-1594824436951-7f12bc417531?auto=format&fit=crop&w=600&q=80',
    specialty: 'Acne Lab & Microbiome'
  },
  {
    id: 4,
    name: 'Prof. Julian Beraud',
    credentials: 'PhD',
    title: 'Director of Hyperpigmentation Studies',
    bio: 'Key developer of the Melasyl Revolution protocol. His decades of work have established the new clinical standard in treating persistent dark spots.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    specialty: 'Pigmentation & Melasyl'
  },
  {
    id: 5,
    name: 'Dr. Sarah Lin',
    credentials: 'MD, FAAD',
    title: 'AI Diagnostics Integration Lead',
    bio: 'Bridges the gap between clinical dermatology and artificial intelligence, developing next-generation diagnostic tools for early detection.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    specialty: 'Future Dermatology & AI'
  },
  {
    id: 6,
    name: 'Dr. Marcus Webb',
    credentials: 'MD',
    title: 'Clinical Operations Director',
    bio: 'Oversees global clinical trials ensuring strict adherence to La Roche-Posay\'s rigorous safety and efficacy standards.',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-702804a945aa?auto=format&fit=crop&w=600&q=80',
    specialty: 'Clinical Operations'
  }
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
            <h4 className="experts-eyebrow">WORLD-CLASS EXPERTISE</h4>
            <h1 className="experts-title">MEET THE<br />CLINICAL EXPERTS</h1>
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
