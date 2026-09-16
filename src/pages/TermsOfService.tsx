import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import './Policy.css';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEO title="Terms of Service" description="Living Lab Nigeria 2026 Terms of Service" canonicalUrl="/terms-of-service" />
      <Header />
      <main className="policy-page">
        <div className="policy-container">
          <div className="policy-header">
            <h1 className="policy-title">TERMS OF SERVICE</h1>
            <p className="policy-last-updated">Last Updated: September 2025</p>
          </div>
          <div className="policy-content">
            <h2>1. Agreement to Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and La Roche-Posay ("we," "us" or "our"), concerning your access to and use of the Living Lab Nigeria 2026 website and event registration.</p>

            <h2>2. Event Eligibility & Verification</h2>
            <p>Living Lab Nigeria 2026 is an exclusive event curated strictly for verified dermatologists, medical professionals, and certified clinical skincare experts. By submitting a registration request, you warrant that:</p>
            <ul>
              <li>All professional registration information you submit is truthful, accurate, and current.</li>
              <li>You actively practice in a certified medical or clinical capacity.</li>
              <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
            </ul>
            <p>We reserve the right to deny registration, revoke event passes, or request further medical licensing documentation at our sole discretion.</p>

            <h2>3. Event Conduct</h2>
            <p>Attendees are expected to maintain professional conduct throughout the event. We reserve the right to remove any attendee from the premises who is deemed to be acting in a disruptive, unprofessional, or unsafe manner, without liability or refund (if applicable).</p>

            <h2>4. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site and the event materials (including but not limited to presentations, formulations, proprietary research, and clinical data) are our proprietary property and are protected by copyright, trademark, and other intellectual property laws. You may not distribute, modify, or commercially exploit these materials without our express written consent.</p>

            <h2>5. Modifications and Interruptions</h2>
            <p>We reserve the right to change, modify, or remove the contents of the Site or the event schedule at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the event or Site.</p>

            <h2>6. Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of Nigeria. La Roche-Posay and yourself irrevocably consent that the courts of Nigeria shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
            
            <h2>7. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or event, or to receive further information regarding use of the Site, please contact us at legal@laroche-posay.ng.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
