import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import './Policy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEO title="Privacy Policy" description="Living Lab Nigeria 2026 Privacy Policy" canonicalUrl="/privacy-policy" />
      <Header />
      <main className="policy-page">
        <div className="policy-container">
          <div className="policy-header">
            <h1 className="policy-title">PRIVACY POLICY</h1>
            <p className="policy-last-updated">Last Updated: September 2025</p>
          </div>
          <div className="policy-content">
            <h2>1. Introduction</h2>
            <p>Welcome to the Living Lab Nigeria 2026 registration platform. La Roche-Posay (L'Oréal) respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website and register for the event.</p>
            
            <h2>2. The Data We Collect About You</h2>
            <p>To verify your eligibility as a professional and manage your event registration, we may collect, use, store, and transfer the following data:</p>
            <ul>
              <li><strong>Identity Data:</strong> Full name, professional title.</li>
              <li><strong>Contact Data:</strong> Professional email address, telephone number.</li>
              <li><strong>Professional Data:</strong> Medical ID, clinic/practice name, and specialty.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location.</li>
            </ul>

            <h2>3. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To register you as a verified attendee for Living Lab Nigeria 2026.</li>
              <li>To send you important logistical updates, itinerary changes, and event passes.</li>
              <li>To provide you with post-event materials, clinical summaries, and relevant product information (only if you have explicitly opted in).</li>
              <li>To comply with a legal or regulatory obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>

            <h2>5. Data Retention</h2>
            <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Specifically for event management, your data will be retained for up to 12 months post-event, unless you opt-in to ongoing communications.</p>

            <h2>6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing. To exercise these rights, please contact our Data Protection Officer at privacy@laroche-posay.ng.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
