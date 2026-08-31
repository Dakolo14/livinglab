import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageCTA from '../components/sections/PageCTA';
import './SciencePage.css';

const SCIENCE_FEATURES = [
  {
    id: '01',
    title: 'UVMUNE 400',
    subtitle: 'The Ultimate UV Filter',
    desc: 'Our latest scientific breakthrough in UV protection. Mexoryl 400 is our first UV filter that protects against ultra-long UVA rays, the most insidious rays that penetrate the deepest into the skin.',
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '02',
    title: 'MELASYL',
    subtitle: 'Pigmentation Interception',
    desc: 'After 18 years of research, Melasyl represents a paradigm shift. It intercepts excess melanin before it forms visible dark spots, respecting the natural skin tone.',
    imageUrl: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '03',
    title: 'AQUA POSAE FILIFORMIS',
    subtitle: 'Microbiome Rebalancing',
    desc: 'A patented active ingredient grown in our thermal spring water. It helps rebalance the skin microbiome to space out flare-ups of severe dryness and soothe the skin.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  }
];

const SciencePage: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="science-page">
        <section className="science-hero">
          <div className="science-hero-content">
            <h4 className="science-eyebrow">DERMATOLOGICAL EXCELLENCE</h4>
            <h1 className="science-title">THE SCIENCE OF<br />LA ROCHE-POSAY</h1>
            <p className="science-subtitle">
              Decades of research. Countless clinical trials. Discover the patented molecules and breakthrough formulations that make our products the #1 dermatologist-recommended skincare brand worldwide.
            </p>
          </div>
        </section>

        <section className="science-features-section">
          {SCIENCE_FEATURES.map((feature, index) => (
            <div key={feature.id} className={`science-feature-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="science-feature-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB', color: '#9CA3AF', fontWeight: 'bold', letterSpacing: '2px', fontSize: '1.5rem' }}>
                [ CLINICAL VISUAL ]
              </div>
              <div className="science-feature-content">
                <div className="science-feature-num">{feature.id}</div>
                <h2>{feature.title}</h2>
                <h4>{feature.subtitle}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <PageCTA 
          title="HEAR FROM THE SCIENTISTS"
          description="Join our leading researchers and dermatologists as they unpack these breakthroughs live at the Living Lab Nigeria 2026."
        />
      </main>

      <Footer />
    </>
  );
};

export default SciencePage;
