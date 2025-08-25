import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { submitSupportTicketThunk, resetSupportState } from '../store/slices/supportSlice';



const issueOptions = [
  { value: '', label: 'Select issue type...' },
  { value: 'Account Issues', label: 'Account Issues' },
  { value: 'Booking Problems', label: 'Booking Problems' },
  { value: 'Payment Issues', label: 'Payment Issues' },
  { value: 'Technical Support', label: 'Technical Support' },
  { value: 'Service Quality', label: 'Service Quality' },
  { value: 'Refund Request', label: 'Refund Request' },
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Other', label: 'Other' },
];



const CustomerSupportModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [issue, setIssue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.support);



  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      dispatch(resetSupportState());
      setMessage('');
      setIssue('');

    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitSupportTicketThunk({
      issueRelatedto: issue,
      details: message,
    }));
    // Handle form submission here
    // console.log('Support message:', message);
    // // Reset form and close modal
    // setMessage('');
    // onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleBackdropClick}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
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

            {/* Issue Select Field */}
            <div>
              <select
                value={issue}
                onChange={e => setIssue(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              >
                {issueOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
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

            {/* Success/Error Message */}
            {success && (
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm font-medium mb-2">
                {t('support_ticket_success') || 'Your support ticket was submitted successfully.'}
              </div>
            )}
            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm font-medium mb-2">
                {error}
              </div>
            )}

            {/* Send Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading || !issue || !message.trim()}
                className="bg-gradient-brand text-white px-4 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base flex items-center space-x-2 hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 touch-target"
              >
                <img
                  src="../assets/icons/send.svg"
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
