import React from 'react';

const VendorOtpStep = ({ otp, setOtp, timer, inputs, handleOtpChange, handleOtpKeyDown, onVerify, onResend }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-2xl font-bold text-center mb-4">Vendor OTP Verification</h2>
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-6 text-center">
      <p className="text-sm text-purple-700">Vendor Portal: Enter any 6-digit number for testing (e.g., 123456)</p>
    </div>
    <div className="flex space-x-4 mb-6">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          type="text"
          maxLength={1}
          value={otp[i]}
          onChange={e => handleOtpChange(e, i)}
          onKeyDown={e => handleOtpKeyDown(e, i)}
          className="w-12 md:w-14 h-20 text-2xl text-center border border-gray-200 rounded-xl bg-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
          autoFocus={i === 0}
        />
      ))}
    </div>
    <div className="text-center text-gray-600 text-sm mb-2 font-semibold">{timer} Sec</div>
    <div className="text-center text-gray-600 text-sm mb-2 cursor-pointer hover:underline font-semibold" onClick={onResend}>Resend Code</div>
    <div className="text-center text-gray-600 text-sm mb-6 cursor-pointer hover:underline font-semibold">Vendor Support</div>
    <button
      className="w-full py-2 rounded-2xl btn-primary-mobile text-white font-semibold shadow hover:from-pink-600 hover:to-pink-700 transition-all duration-200 text-lg"
      onClick={onVerify}
    >
      Verify Vendor Account
    </button>
  </div>
);

export default VendorOtpStep;
