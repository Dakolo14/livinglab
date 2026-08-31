import React, { useState } from 'react';
import './FAQ.css';

const FAQS = [
  {
    question: "Who can attend Living Lab Nigeria 2026?",
    answer: "The event is exclusively for registered dermatologists, skincare professionals, and invited industry partners."
  },
  {
    question: "How do I register for the event?",
    answer: "You can click the 'Register Now' button on our website to submit your professional details. All registrations are subject to approval."
  },
  {
    question: "Is there a virtual attendance option?",
    answer: "No, the Living Lab is a fully immersive, hands-on physical experience in Nigeria. We do not offer virtual streaming."
  },
  {
    question: "What should I bring to the laboratory sessions?",
    answer: "Please bring your registration confirmation and professional ID. All lab materials and protective gear will be provided on-site."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
