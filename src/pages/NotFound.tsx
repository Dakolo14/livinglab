import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist." 
      />
      <Header />
      <main className="not-found-page">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <p>The formulation you are looking for does not exist in our current lab registry.</p>
          <Link to="/" className="btn-primary">RETURN TO HOME</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
