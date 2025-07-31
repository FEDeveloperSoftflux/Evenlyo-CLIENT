import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CustomerSupportModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Support message:', message);
    // Reset form and close modal
    setMessage('');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-brand px-4 sm:px-6 py-4 relative">
          <div className="pr-10">
            <h2 className="text-white text-lg sm:text-xl font-semibold text-center leading-tight">
              {t('fill_out_form_queries')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 group touch-target"
            aria-label="Close modal"
          >
            <img 
              src="/assets/close.svg" 
              alt="Close" 
              className="w-3 h-3 group-hover:scale-110 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div>
              <input
                type="email"
                value="support@evnlyo.com"
                readOnly
                className="w-full px-4 py-3 text-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-not-allowed text-sm sm:text-base"
                placeholder="support@evnlyo.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('message_placeholder')}
                rows={6}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm sm:text-base placeholder-gray-400 min-h-[120px] sm:min-h-[150px]"
                required
              />
            </div>

            {/* Send Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-gradient-brand text-white px-4 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base flex items-center space-x-2 hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 touch-target"
              >
                <img 
                  src="/assets/send.svg" 
                  alt="Send" 
                  className="w-4 h-4"
                />
                <span>{t('send_button')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportModal;
