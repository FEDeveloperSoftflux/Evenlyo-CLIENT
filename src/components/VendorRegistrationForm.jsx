import React, { useState } from 'react';

const VendorRegistrationForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [verificationType, setVerificationType] = useState('phone');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    category: '',
    subcategory: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    businessWebsite: '',
    teamSize: '',
    companySize: 'solo',
    banner: null,
    workImages: [],
    workVideo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (name, files) => {
    if (name === 'workImages') {
      setFormData(prev => ({ ...prev, [name]: [...prev[name], ...Array.from(files)] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const sendOTP = () => {
    // Simulate OTP sending
    setOtpSent(true);
    console.log(`OTP sent to ${verificationType === 'phone' ? formData.phone : formData.email}`);
  };

  const verifyOTP = () => {
    // Simulate OTP verification
    if (otp === '1234') {
      setStep(step + 1);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < getMaxSteps()) {
      setStep(step + 1);
    } else {
      console.log('Vendor registration:', formData);
      onClose();
    }
  };

  const getMaxSteps = () => {
    return formData.accountType === 'business' ? 7 : 5;
  };

  const renderStepIndicator = () => {
    const businessSteps = [
      { num: 1, label: 'Account Type' },
      { num: 2, label: 'Business Info' },
      { num: 3, label: "Category's" },
      { num: 4, label: 'Gallery' },
      { num: 5, label: 'Security' },
      { num: 6, label: 'Verification' }
    ];

    const personalSteps = [
      { num: 1, label: 'Account Type' },
      { num: 2, label: 'Personal Info' },
      { num: 3, label: "Category's" },
      { num: 4, label: 'Verification' }
    ];

    const steps = formData.accountType === 'business' ? businessSteps : personalSteps;

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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Vendor Account</h2>
        <p className="text-gray-600 mb-8">Welcome to <span className="font-semibold">Evenlyo</span> Management. Please Select Your Account Type</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, accountType: 'personal' }))}
          className={`p-6 border-2 rounded-xl text-center transition-all ${
            formData.accountType === 'personal'
              ? 'border-pink-600 bg-pink-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-base">Personal Account</h3>
        </button>
        
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, accountType: 'business' }))}
          className={`p-6 border-2 rounded-xl text-center transition-all ${
            formData.accountType === 'business'
              ? 'border-pink-600 bg-pink-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-base">Business Account</h3>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (formData.accountType === 'business') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Business Info</h2>
            <p className="text-gray-600">Please provide your business details</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Email Address</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                placeholder="Company Email Address"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
            <div className="flex">
              <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3 mr-2" />
                <span className="text-sm">+23</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="tel"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                placeholder="0000*****"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Company Address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
            <input
              type="url"
              name="businessWebsite"
              value={formData.businessWebsite}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="URL"
            />
          </div>
          
          <div>
            <div className="flex items-center space-x-8 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="companySize"
                  value="solo"
                  checked={formData.companySize === 'solo'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Solo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="companySize"
                  value="team"
                  checked={formData.companySize === 'team'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Team</span>
              </label>
            </div>
            
            {formData.companySize === 'team' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                >
                  <option value="">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21+">21+</option>
                </select>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-gray-600">Please provide your personal details</p>
          </div>
          
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
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Enter your phone number"
              required
            />
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
        </div>
      );
    }
  };

  const renderStep3 = () => {
    const categories = [
      {
        id: 'entertainment',
        name: 'Entertainment & Attractions',
        icon: '🎵',
        subcategories: ['DJ', 'Live Band', 'Photo Booth']
      },
      {
        id: 'food',
        name: 'Food & Drinks',
        icon: '🍽️',
        subcategories: ['Catering', 'Food Trucks', 'Bartenders']
      },
      {
        id: 'decoration',
        name: 'Decoration & Styling',
        icon: '🎨',
        subcategories: ['Floral Design', 'Event Styling', 'Decorations']
      },
      {
        id: 'locations',
        name: 'Locations & Party Tents',
        icon: '🏢',
        subcategories: ['Venues', 'Party Tents', 'Outdoor Spaces']
      },
      {
        id: 'staff',
        name: 'Staff & Services',
        icon: '👥',
        subcategories: ['Event Staff', 'Security', 'Coordination']
      },
      {
        id: 'photography',
        name: 'Photography & Videography',
        icon: '📸',
        subcategories: ['Wedding Photography', 'Event Photography', 'Videography']
      }
    ];

    const selectedCategory = categories.find(cat => cat.id === formData.category);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Category</h2>
          <p className="text-gray-600">Choose your business category and subcategory</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, category: category.id, subcategory: '' }))}
              className={`p-4 border-2 rounded-xl text-center transition-all ${
                formData.category === category.id
                  ? 'border-pink-600 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Subcategory</h3>
            <div className="grid grid-cols-3 gap-3">
              {selectedCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, subcategory }))}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    formData.subcategory === subcategory
                      ? 'border-pink-600 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900 text-sm">{subcategory}</h4>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => {
    if (formData.accountType === 'business') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery</h2>
            <p className="text-gray-600">Upload your work samples</p>
          </div>
          
          <div className="space-y-6">
            {/* Banner Upload */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-32 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Click to upload</p>
                </div>
              </div>
              <div className="col-span-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-32 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Click to upload Banner</p>
                </div>
              </div>
            </div>

            {/* Work Images Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">Click to upload work images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload('workImages', e.target.files)}
                className="hidden"
                id="workImages"
              />
              <label htmlFor="workImages" className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                Choose Files
              </label>
            </div>

            {/* Work Video Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h2z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">Click to upload work Video</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload('workVideo', e.target.files)}
                className="hidden"
                id="workVideo"
              />
              <label htmlFor="workVideo" className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                Choose Video
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return renderVerificationStep();
    }
  };

  const renderStep5 = () => {
    if (formData.accountType === 'business') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Security</h2>
            <p className="text-gray-600">Set up your account security</p>
          </div>
          
          <div className="space-y-4">
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
          </div>
        </div>
      );
    } else {
      return renderSuccessStep();
    }
  };

  const renderStep6 = () => {
    if (formData.accountType === 'business') {
      return renderVerificationStep();
    } else {
      return renderSuccessStep();
    }
  };

  const renderStep7 = () => {
    return renderSuccessStep();
  };

  const renderVerificationStep = () => (
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
              <span className="text-sm">+23</span>
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

  const renderSuccessStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Successfully Verified!</h2>
        <p className="text-gray-600 mb-8">Your account has been created and verified successfully. You can now start using Evenlyo.</p>
        <button
          type="button"
          onClick={onClose}
          className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Get Started
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
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
        {step === 7 && renderStep7()}

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
          
          {step < getMaxSteps() && (
            <button
              type="submit"
              disabled={step === 1 && !formData.accountType}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === getMaxSteps() - 1 ? 'Continue' : 'Next'}
            </button>
          )}
          
          {step === getMaxSteps() && (
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              Complete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VendorRegistrationForm;
