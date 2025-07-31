import React, { useState } from 'react';

const ClientRegistrationForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [verificationType, setVerificationType] = useState('phone');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendOTP = () => {
    setOtpSent(true);
    console.log(`OTP sent to ${verificationType === 'phone' ? formData.phone : formData.email}`);
  };

  const verifyOTP = () => {
    if (otp === '1234') {
      setStep(step + 1);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Client registration:', formData);
      onClose();
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: 'Personal Info' },
      { num: 2, label: 'Verification' },
      { num: 3, label: 'Success' }
    ];

    return (
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((stepItem, index) => (
          <div key={stepItem.num} className="flex items-center min-w-max">
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${
              step >= stepItem.num 
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-600' 
                : step === stepItem.num
                ? 'bg-white text-pink-600 border-pink-600'
                : 'bg-white text-gray-400 border-gray-300'
            }`}>
              {step > stepItem.num ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepItem.num
              )}
            </div>
            <span className={`ml-2 text-xs font-medium ${
              step >= stepItem.num ? 'text-pink-600' : 'text-gray-400'
            }`}>
              {stepItem.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                step > stepItem.num ? 'bg-pink-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Join Evenlyo as a client and start booking amazing services</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex">
            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3 mr-2" />
              <span className="text-sm">+1</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="Create a password"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification</h2>
        <p className="text-gray-600">Verify your account to continue</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => setVerificationType('phone')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              verificationType === 'phone'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Phone Number
          </button>
          <button
            type="button"
            onClick={() => setVerificationType('email')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              verificationType === 'email'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Email Address
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
          <div className="flex">
            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3 mr-2" />
              <span className="text-sm">+1</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="0000*****"
              disabled={otpSent}
            />
          </div>
        </div>

        {!otpSent ? (
          <button
            type="button"
            onClick={sendOTP}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Send OTP
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-center"
                placeholder="Enter 4-digit OTP"
                maxLength={4}
              />
            </div>
            <button
              type="button"
              onClick={verifyOTP}
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Successfully Verified!</h2>
        <p className="text-gray-600 mb-8">Your account has been created and verified successfully. You can now start booking services on Evenlyo.</p>
        <button
          type="button"
          onClick={onClose}
          className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Start Booking
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="flex items-center px-6 py-3 border-2 border-pink-500 text-pink-500 font-semibold rounded-full hover:bg-pink-50 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {step < 3 && (
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              {step === 2 ? 'Complete' : 'Next'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ClientRegistrationForm;
