import React, { useState, useRef } from 'react';
import VendorVerificationStep from './VendorVerificationStep';
import VendorOtpStep from './VendorOtpStep';
import VendorVerificationSuccess from './VendorVerificationSuccess';
import api from '../store/api';

const VendorForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: verify, 2: otp, 3: reset, 4: success
  const [activeTab, setActiveTab] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setActiveTab('phone');
    setPhone('');
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setPassword('');
    setConfirmPassword('');
  }, [isOpen]);

  React.useEffect(() => {
    if (step !== 2 || !isOpen) return;
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, isOpen]);

  React.useEffect(() => {
    if (step === 4 && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen, onClose]);

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (idx < 5 && val) {
      inputs.current[idx + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  if (!isOpen) return null;

  const handleVerificationContinue = () => {
    setError(null);
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setStep(2);
  };

  const handleOtpVerify = () => {
    setError(null);
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setStep(3);
  };

  const handleResendOtp = () => {
    setError(null);
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
  };

  const handleResetPassword = () => {
    setError(null);
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl relative max-h-[90vh] overflow-y-auto mx-2">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {step === 1 && (
          <VendorVerificationStep
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            onBack={onClose}
            onContinue={handleVerificationContinue}
          />
        )}
        {step === 2 && (
          <VendorOtpStep
            otp={otp}
            setOtp={setOtp}
            timer={timer}
            inputs={inputs}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            onVerify={handleOtpVerify}
            onResend={handleResendOtp}
          />
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Re-Set Password</h2>
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-800 mb-2">Enter New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
                placeholder="Enter Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="block text-base font-medium text-gray-800 mb-2">Re-Enter Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-8 py-2 rounded-xl btn-primary-mobile text-white font-semibold shadow transition-all duration-200"
                onClick={handleResetPassword}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <VendorVerificationSuccess title="Password Changed!" message="Your password has been updated successfully." />
        )}
      </div>
    </div>
  );
};

export default VendorForgotPasswordModal;

