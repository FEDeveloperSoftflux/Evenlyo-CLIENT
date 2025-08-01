import React, { useState, useRef } from 'react';
import VendorVerificationStep from './VendorVerificationStep';
import VendorOtpStep from './VendorOtpStep';
import VendorVerificationSuccess from './VendorVerificationSuccess';

const VendorVerificationModal = ({ isOpen, onClose, onContinue, onSuccess, successTitle = 'Vendor Verified!', successMessage = 'Your vendor account has been verified successfully.' }) => {
  const [step, setStep] = useState(1); // 1: verify, 2: otp, 3: success
  const [activeTab, setActiveTab] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  React.useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setActiveTab('phone');
    setPhone('');
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
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

  const handleContinue = () => {
    if (activeTab === 'email' && onContinue) {
      onContinue(email);
    } else if (activeTab === 'phone' && onContinue) {
      onContinue(phone);
    }
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl relative">
        {step === 1 && (
          <VendorVerificationStep
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            onBack={onClose}
            onContinue={handleContinue}
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
            onVerify={() => setStep(3)}
            onResend={() => setTimer(30)}
          />
        )}
        {step === 3 && (
          <VendorVerificationSuccess
            title={successTitle}
            message={successMessage}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default VendorVerificationModal;
