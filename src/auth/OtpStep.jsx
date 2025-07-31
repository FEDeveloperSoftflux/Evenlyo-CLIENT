import React from 'react';

const OtpStep = ({ otp, setOtp, timer, inputs, handleOtpChange, handleOtpKeyDown, onVerify, onResend }) => (
  <div className="flex flex-col items-center  ">
    <h2 className="text-2xl font-bold text-center mb-8">Enter OTP Code</h2>
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
          className="w-12 md:w-14 h-20 text-2xl text-center border border-gray-200 rounded-xl bg-gray-200 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          autoFocus={i === 0}
        />
      ))}
    </div>
    <div className="text-center text-gray-600 text-sm mb-2 font-semibold">{timer} Sec</div>
    <div className="text-center text-gray-600 text-sm mb-2 cursor-pointer hover:underline font-semibold " onClick={onResend}>Resend Code</div>
    <div className="text-center text-gray-600 text-sm mb-6 cursor-pointer hover:underline font-semibold">Call Request</div>
    <button
      className="w-full py-2 rounded-2xl btn-primary-mobile  text-white font-semibold shadow hover:from-pink-600 hover:to-pink-700 transition-all duration-200 text-lg"
      onClick={onVerify}
    >
      Verify Now
    </button>
  </div>
);

export default OtpStep; 