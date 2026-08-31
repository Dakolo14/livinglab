import React from 'react';
import './PageCTA.css';

interface PageCTAProps {
  title: string;
  description: string;
  buttonText?: string;
  backgroundImageUrl?: string;
}

const PageCTA: React.FC<PageCTAProps> = ({ 
  title, 
  description, 
  buttonText = "Register Now",
  backgroundImageUrl = "https://images.unsplash.com/photo-1576091160550-2173eca9e5f9?auto=format&fit=crop&w=2000&q=80"
}) => {
  return (
    <section className="page-cta" style={{ backgroundImage: `url("${backgroundImageUrl}")` }}>
      <div className="cta-overlay"></div>
      <div className="cta-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button 
          className="btn-primary" 
          onClick={() => window.dispatchEvent(new Event('open-registration'))}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default PageCTA;
