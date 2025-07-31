import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ForgotPasswordModal from '../auth/ForgotPasswordModal';
import VerificationModal from '../auth/VerificationModal';
import VerificationSuccess from '../auth/VerificationSuccess';
import { useDispatch } from 'react-redux';
import api from '../store/api';

import { useTranslation } from 'react-i18next'

// Import assets
import heroImage from '../assets/images/hero-img.png';;

const Register = () => {
  const { t } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState(null)
  {/*const [showRegistrationModal, setShowRegistrationModal] = useState(false)*/}
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [pendingRegistration, setPendingRegistration] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState('');
  const otpInputs = React.useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Check if email is already registered
    try {
      const res = await api.post('/auth/check-email', { email: formData.email });
      if (res.data.exists) {
        setError('Email is already registered. Please use another email or login.');
        return;
      }
    } catch (err) {
      // If endpoint not found or error, fallback to allow registration
      if (err.response && err.response.data && err.response.data.exists) {
        setError('Email is already registered. Please use another email or login.');
        return;
      }
    }
    setPendingRegistration({ ...formData });
    setVerificationEmail(formData.email);
    setShowVerificationModal(true);
  };

  // OTP timer effect
  React.useEffect(() => {
    if (!otpModalOpen) return;
    setOtpTimer(30);
    const interval = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpModalOpen]);

  // Handler for VerificationModal's Continue (send OTP)
  const handleVerificationContinue = async (email) => {
    setError(null);
    try {
      await api.post('/auth/send-otp', { email });
      setVerificationEmail(email);
      setOtp(['', '', '', '', '', '']);
      setOtpTimer(30);
      setShowVerificationModal(false);
      setOtpModalOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (idx < 5 && val) {
      otpInputs.current[idx + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpInputs.current[idx - 1].focus();
    }
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleVerifyOtp = async () => {
    setError(null);
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    try {
      await api.post('/auth/verify-otp-register', {
        ...pendingRegistration,
        email: verificationEmail,
        otp: enteredOtp
      });
      setOtpModalOpen(false);
      setShowVerificationModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    try {
      await api.post('/auth/send-otp', { email: verificationEmail });
      setOtp(['', '', '', '', '', '']);
      setOtpTimer(30);
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const faqItems = [
    {
      question: t('faq_ongoing_fees_q'),
      answer: t('faq_ongoing_fees_a')
    },
    {
      question: t('faq_support_q'),
      answer: t('faq_support_a')
    },
    {
      question: t('faq_real_contact_q'),
      answer: t('faq_real_contact_a')
    },
    {
      question: t('faq_plugins_q'),
      answer: t('faq_plugins_a')
    },
    {
      question: t('faq_airbnb_q'),
      answer: t('faq_airbnb_a')
    },
    {
      question: t('faq_locations_q'),
      answer: t('faq_locations_a')
    },
    {
      question: t('faq_trial_q'),
      answer: t('faq_trial_a')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Hero Section with Registration Form */}
      <section 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center bg-gray-900"
        style={{
          backgroundImage: `url('heroImage'), linear-gradient(135deg, #1f2937 0%, #374151 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero Background Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side - Hero Content */}
            <div className="lg:col-span-7 text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('welcome_to_evenlyo')}
                <br />
                <span className="text-white">Evenlyo</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                {t('welcome_description')}
                <br />
                {t('vendor_question')}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="btn-primary-mobile text-white font-semibold px-8 py-3 rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  {t('back')}
                </button>
              </div>
            </div>

            {/* Right Side - Registration Form (Half Outside) */}
            <div className="lg:col-span-5 relative">
              {/* Registration Form Card - Extended beyond hero section */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform lg:translate-y-16 lg:mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('register')}</h2>
                  <p className="text-gray-600">
                    {t('welcome_to_management_register')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('first_name')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_first_name')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('last_name')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_last_name')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('email_address')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_email')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact_number')}
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_contact_number')}
                      required
                    />
                  </div>
                  {/* Removed old Phone field, now using contactNumber */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_address')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('password')}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('enter_password')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('confirm_password')}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                      placeholder={t('confirm_password_placeholder')}
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary-mobile text-white font-semibold py-3 rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    {t('register')}
                  </button>
                </form>

                {/* Social Registration */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">{t('or_continue_with')}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button type="button" className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-500 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t('google')}
                    </button>

                    <button type="button" className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-600 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      {t('linkedin')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {t('faqs')}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t('questions_happy_answer')}</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h4 className="text-base font-medium text-gray-900">{item.question}</h4>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Registration Modal 
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ClientRegistrationForm onClose={() => setShowRegistrationModal(false)} />
          </div>
        </div>
      )}*/}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)} 
        onContinue={() => { setShowForgotPasswordModal(false); setShowOtpModal(true); }}
      />

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl relative">
            <h2 className="text-2xl font-bold text-center mb-8">Enter OTP Code</h2>
            <div className="flex space-x-4 mb-6 justify-center">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={el => (otpInputs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={otp[i]}
                  onChange={e => handleOtpChange(e, i)}
                  onKeyDown={e => handleOtpKeyDown(e, i)}
                  className="w-12 md:w-14 h-20 text-2xl text-center border border-gray-200 rounded-xl bg-gray-200 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <div className="text-center text-gray-600 text-sm mb-2 font-semibold">{otpTimer} Sec</div>
            <div className="text-center text-gray-600 text-sm mb-2 cursor-pointer hover:underline font-semibold " onClick={handleResendOtp}>Resend Code</div>
            <button
              className="w-full py-2 rounded-2xl btn-primary-mobile  text-white font-semibold shadow hover:from-pink-600 hover:to-pink-700 transition-all duration-200 text-lg"
              onClick={handleVerifyOtp}
            >
              Verify Now
            </button>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
          </div>
        </div>
      )}

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onContinue={handleVerificationContinue}
        email={verificationEmail}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <VerificationSuccess
          title="Registration Complete!"
          message={"Your account has been registered and verified.\nRedirecting to login..."}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/login');
          }}
        />
      )}
    </div>
  )
}

export default Register 