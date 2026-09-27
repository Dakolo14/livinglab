import React from 'react';
import Header from '../components/layout/Header';
import Products from '../components/sections/Products';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';
import SEO from '../components/layout/SEO';

const ProductsPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Products | Living Lab Nigeria 2026" 
        description="Discover the La Roche-Posay clinical innovations showcased at Living Lab Nigeria 2026, including Anthelios and Mela B3."
      />
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <Products />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default ProductsPage;
