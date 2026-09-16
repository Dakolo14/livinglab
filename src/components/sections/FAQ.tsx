import React, { useState } from 'react';
import './FAQ.css';

const FAQS = [
  {
    question: "What is La Roche-Posay Living Lab?",
    answer: "La Roche-Posay Living Lab is an immersive skincare experience that brings the brand’s science and innovation to life. Through interactive experiences, product discovery and conversations with skincare experts, guests can explore the science behind skin health and La Roche-Posay’s dermatologist-backed solutions."
  },
  {
    question: "Why is La Roche-Posay bringing Living Lab to Nigeria?",
    answer: "Living Lab creates an opportunity to make skincare science more accessible and relevant to Nigerian consumers. It allows people to engage with the brand beyond the product, better understand their skin concerns and experience the research and innovation behind La Roche-Posay firsthand."
  },
  {
    question: "What can guests expect at Living Lab?",
    answer: "Guests will move through different experience zones exploring La Roche-Posay’s key skincare innovations, participate in interactive demonstrations, discover products, speak with dermatologists and skincare experts, and experience the brand’s approach to skin health in a more hands-on way."
  },
  {
    question: "What skin concerns will Living Lab explore?",
    answer: "The experience will cover concerns including hyperpigmentation and dark spots, acne-prone skin, sun protection, sensitive and vulnerable skin, skin barrier repair and other everyday skin health needs."
  },
  {
    question: "Which La Roche-Posay products will be featured?",
    answer: "Living Lab will spotlight key La Roche-Posay franchises including Mela B3, Anthelios, Effaclar, Cicaplast and Lipikar, with dedicated Innovation Corners allowing guests to learn more about the products and the science behind them."
  },
  {
    question: "Will dermatologists be available at the event?",
    answer: "Yes. Dermatologists and skincare experts will be part of the Living Lab experience, providing credible skin education, consultation corners, and helping guests better understand their individual skin needs."
  },
  {
    question: "Will guests be able to try or purchase products?",
    answer: "Yes. Product discovery and trial will form part of the experience, and a dedicated La Roche-Posay Pop-Up Store will give guests the opportunity to explore and purchase selected products."
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
