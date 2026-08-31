import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <img src="/BLUE LOGO.png" alt="La Roche-Posay" />
          </div>
          <p>Living Lab Nigeria 2026. The definitive dermatological experience.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="#lab-journey">The Lab</a>
          <a href="#science">Science</a>
          <a href="#programme">Programme</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-col">
          <h4>Join Us</h4>
          <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Register Now</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 La Roche-Posay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
