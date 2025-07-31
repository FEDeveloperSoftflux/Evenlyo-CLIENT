import React from 'react';

const VerificationStep = ({ activeTab, setActiveTab, phone, setPhone, email, setEmail, onBack, onContinue }) => (
  <>
    <h2 className="text-2xl font-bold text-center mb-8">Verification</h2>
    <div className="relative flex mb-6 bg-gray-100 rounded-full p-1 h-12 ">
      {/* Sliding pill background */}
      <span
        className="absolute top-1 left-1 h-10 w-1/2 rounded-full btn-primary-mobile shadow transition-all duration-300"
        style={{
          transform: activeTab === 'phone' ? 'translateX(0%)' : 'translateX(100%)',
        }}
      />
      <button
        className={`flex-1 z-10 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${
          activeTab === 'phone' ? 'text-white' : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('phone')}
      >
        Phone Number
      </button>
      <button
        className={`flex-1 z-10 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${
          activeTab === 'email' ? 'text-white' : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('email')}
      >
        Email Address
      </button>
    </div>
    {activeTab === 'phone' ? (
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Phone Number</label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300 "
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
    ) : (
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
    )}
    <div className="flex justify-end gap-4 mt-8">
      <button
        className="flex items-center px-6 py-2 rounded-xl font-semibold btn-secondary-mobile transition-all duration-200 focus:outline-none focus:ring-0"
        onClick={onBack}
      >
        <span className="mr-2">&#8592;</span> Back
      </button>
      <button
        className="px-8 py-2 rounded-xl btn-primary-mobile text-white font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-0"
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  </>
);

export default VerificationStep; 