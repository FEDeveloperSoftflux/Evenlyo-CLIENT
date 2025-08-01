import React from 'react';

const VendorVerificationStep = ({ activeTab, setActiveTab, phone, setPhone, email, setEmail, onBack, onContinue }) => (
  <>
    <h2 className="text-2xl font-bold text-center mb-4">Vendor Account Verification</h2>
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-6 text-center">
      <p className="text-sm text-purple-700">Vendor Portal: Enter your business email address for verification</p>
    </div>
    <div className="relative flex mb-6 bg-gray-100 rounded-full p-1 h-12">
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
        Business Phone
      </button>
      <button
        className={`flex-1 z-10 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${
          activeTab === 'email' ? 'text-white' : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('email')}
      >
        Business Email
      </button>
    </div>
    {activeTab === 'phone' ? (
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Business Phone Number</label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Business Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
    ) : (
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Business Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Business Email Address"
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

export default VendorVerificationStep;
