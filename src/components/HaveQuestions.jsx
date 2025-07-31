import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const HaveQuestions = () => {
  const { t } = useTranslation();
  // Remove useNavigate and navigation handlers
  // Add FAQ state and logic from LoginPage.jsx
  const [activeAccordion, setActiveAccordion] = useState(null);
  const faqItems = [
    {
      question: t('faq_ongoing_fees_q'),
      answer: t('faq_ongoing_fees_a'),
    },
    {
      question: t('faq_support_q'),
      answer: t('faq_support_a'),
    },
    {
      question: t('faq_real_contact_q'),
      answer: t('faq_real_contact_a'),
    },
    {
      question: t('faq_plugins_q'),
      answer: t('faq_plugins_a'),
    },
    {
      question: t('faq_airbnb_q'),
      answer: t('faq_airbnb_a'),
    },
    {
      question: t('faq_locations_q'),
      answer: t('faq_locations_a'),
    },
    {
      question: t('faq_trial_q'),
      answer: t('faq_trial_a'),
    },
  ];
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
          {t('have_questions')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Check out our comprehensive FAQ section or contact our support team.
        </p>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h4 className="text-base font-medium text-gray-900">
                    {item.question}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      activeAccordion === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-4 text-gray-600">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaveQuestions;
