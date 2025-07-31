import React, { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from 'react-i18next';
import Footer from "../components/Footer";
import CustomerSupportModal from "../components/CustomerSupportModal";

function Support() {
const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
question: t('faq_recurring_fees_q'),
answer: t('faq_recurring_fees_a'),
    },
    {
question: t('faq_support_q'),
answer: t('faq_support_a'),
    },
    {
question: t('faq_domains_q'),
answer: t('faq_domains_a'),
    },
    {
question: t('faq_plugins_q'),
answer: t('faq_plugins_a'),
    },
    {
question: t('faq_backend_options_q'),
answer: t('faq_backend_options_a'),
    },
    {
      question: t('faq_presale_q'),
      answer: t('faq_presale_a'),
    },
    {
      question: t('faq_value_theme_q'),
      answer: t('faq_value_theme_a'),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="bg-[#FCF6D8] text-[#7E700D] px-3 py-1 rounded-full text-sm font-bold">
            {t('faq')}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
            {t('questions_happy_answer')}
          </h1>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-800 font-medium">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
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
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Customer Support Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-40"
      >
        <img
          src="/assets/customer-icon.svg"
          alt="Customer Support"
          className="w-8 h-8 filter brightness-0 invert"
        />
      </button>

      {/* Customer Support Modal */}
      <CustomerSupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Support;
