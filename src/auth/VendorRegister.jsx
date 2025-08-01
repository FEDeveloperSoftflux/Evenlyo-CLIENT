import React, { useState, useRef } from 'react';
import UploadIcon from '../assets/icons/Upload.svg';
import OtpStep from './OtpStep';
import VerificationSuccess from './VerificationSuccess'

// Import assets
import entertainIcon from '../assets/icons/entertain.svg';
import foodIcon from '../assets/icons/food.svg';
import decorationIcon from '../assets/icons/decoration.svg';
import partyTentIcon from '../assets/icons/partytent.svg';
import staffIcon from '../assets/icons/staff.svg';
import subcategory1Icon from '../assets/icons/subcategory1.svg';
import subcategory2Icon from '../assets/icons/subcategory2.svg';
import subcategory3Icon from '../assets/icons/subcategory3.svg';
import tableIcon from '../assets/icons/Table.svg';
import ledIcon from '../assets/icons/LED.svg';
import chandelierIcon from '../assets/icons/Chandelier.svg';;

const VendorRegister = ({ onClose, onSwitchToClient }) => {
  const [step, setStep] = useState(1);
  const [verificationType, setVerificationType] = useState('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    accountType: '',
    email: '',
    cninc: '',
    firstName: '',
    lastName: '',
    phone: '',
    category: '',
    businessName: '',
    businessType: '',
    businessRegistration: null,
    businessLicense: null,
    taxDocument: null,
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  // When showSuccessModal becomes true, auto-close after 2 seconds
  React.useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setVerificationComplete(true);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubCategoryToggle = (subCategory) => {
    setSelectedSubCategories(prev => {
      if (prev.includes(subCategory)) {
        return prev.filter(item => item !== subCategory);
      } else {
        return [...prev, subCategory];
      }
    });
  };

  const sendOTP = () => {
    setOtpSent(true);
    console.log(`OTP sent to ${verificationType === 'phone' ? formData.phone : formData.email}`);
  };



  const getTotalSteps = () => {
    return formData.accountType === 'personal' ? 6 : 7;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSteps = getTotalSteps();
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else if (step === totalSteps) {
      // Last step - show OTP modal for verification
      setShowOtpModal(true);
    }
  };

  const renderStepIndicator = () => {
    const personalSteps = [
      { num: 1, label: 'Account Type' },
      { num: 2, label: 'Personal Info' },
      { num: 3, label: "Category's" },
      { num: 4, label: 'Security' },
      { num: 5, label: 'Verification' },
    ];

    const businessSteps = [
      { num: 1, label: 'Account Type' },
      { num: 2, label: 'Business Info' },
      { num: 3, label: "Category's" },
      { num: 4, label: 'Gallery' },
      { num: 5, label: 'Security' },
      { num: 6, label: 'Verification' },
    ];

    const steps = formData.accountType === 'personal' ? personalSteps : businessSteps;

    // Calculate indicator step (hide subcategory step from indicator)
    let indicatorStep = step;
    if (step === 4) indicatorStep = 3; // Subcategory is still part of Category's (not completed yet)
    if (step > 4) indicatorStep = step - 1; // Shift steps after subcategory (Category's now shows as completed)

    // If verification is complete, mark the last step as done
    const verificationStepNum = steps[steps.length - 1].num;
    const isVerificationDone = verificationComplete;

    return (
      <>
        {/* Mobile/Tablet: Only show step numbers */}
        <div className="flex items-center justify-center mb-6 sm:mb-18 md:hidden">
          <div className="flex items-center space-x-2">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.num}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm
                  ${
                    (indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum))
                      ? 'bg-primary-600 text-white border-primary-600 animate-pulse'
                      : indicatorStep === stepItem.num
                      ? 'bg-white text-primary-600 border-primary-600'
                      : 'bg-white text-gray-400 border-gray-300'
                  }
                `}>
                  {(indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum)) ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepItem.num
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 h-0.5
                    ${(indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum)) ? 'bg-primary-500' : 'bg-gray-300'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Desktop: Show all steps */}
        <div className="hidden md:block mb-6 sm:mb-18 w-full">
          <div className="flex items-center justify-between w-full">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.num}>
                <div className="flex flex-col items-center flex-shrink-0 relative">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-semibold text-xs sm:text-sm
                    ${
                      (indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum))
                        ? 'bg-primary-600 text-white border-primary-600 animate-pulse'
                        : indicatorStep === stepItem.num
                        ? 'bg-white text-primary-600 border-primary-600'
                        : 'bg-white text-black-400 border-black'
                    }
                  `}>
                    {(indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum)) ? (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepItem.num
                    )}
                  </div>
                  <div className="absolute top-full mt-2 flex flex-col items-center">
                    <span className={`text-xs sm:text-xs font-medium text-center whitespace-nowrap ${
                      (indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum)) ? 'text-primary-600' : indicatorStep === stepItem.num ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      {stepItem.label}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-2
                    ${(indicatorStep > stepItem.num || (isVerificationDone && stepItem.num === verificationStepNum)) ? 'bg-primary-500' : 'bg-gray-300'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  };

  const categories = [
    {
      id: 'entertainment',
      name: 'Entertainment & Attractions',
      icon: entertainIcon,
      subcategories: ['DJ', 'Live Band', 'Photo Booth']
    },
    {
      id: 'food',
      name: 'Food & Drinks',
      icon: foodIcon,
      subcategories: ['Catering', 'Food Trucks', 'Bartenders']
    },
    {
      id: 'decoration',
      name: 'Decoration & Styling',
      icon: decorationIcon,
      subcategories: ['Floral Design', 'Event Styling', 'Decorations']
    },
    {
      id: 'locations',
      name: 'Locations & Party Tents',
      icon: partyTentIcon,
      subcategories: ['Venues', 'Party Tents', 'Outdoor Spaces']
    },
    {
      id: 'staff',
      name: 'Staff & Services',
      icon: staffIcon,
      subcategories: ['Event Staff', 'Security', 'Coordination']
    }
  ];

  const [selectedCategories, setSelectedCategories] = useState([categories[0].name]);

  // Add this mapping function near the top of the component (after categories definition is a good spot)
  const subcategoryIcons = {
    'DJ': subcategory1Icon,
    'Live Band': subcategory2Icon,
    'Photo Booth': subcategory3Icon,
    'Catering': foodIcon,
    'Food Trucks': foodIcon,
    'Bartenders': foodIcon,
    'Floral Design': tableIcon,
    'Event Styling': ledIcon,
    'Decorations': chandelierIcon,
    'Venues': partyTentIcon,
    'Party Tents': partyTentIcon,
    'Outdoor Spaces': partyTentIcon,
    'Event Staff': staffIcon,
    'Security': staffIcon,
    'Coordination': staffIcon,
    // Add more as needed, or use unique SVGs for each
  };
  const getSubcategoryIcon = (subcategory) => {
    return subcategoryIcons[subcategory] || subcategory1Icon;
  };

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 mt-4">Create Your Vendor Account</h2>
        <p className="text-sm sm:text-base text-gray-800 mb-6 sm:mb-10">Welcome to <span className="font-bold">Evenlyo</span> Management. Please<br/> Select Your Account Type</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, accountType: 'personal' }))}
          className={`px-10 py-10 border-2 rounded-2xl text-center transition-all shadow-md bg-white w-full sm:w-64
            ${formData.accountType === 'personal'
              ? 'border-primary-600'
              : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-3 shadow">
            <img src="/assets/Person.svg" alt="Personal Account" className="w-7 h-7" style={{ filter: 'invert(18%) sepia(98%) saturate(7492%) hue-rotate(303deg) brightness(99%) contrast(105%)' }} />
          </div>
          <h3 className="font-semibold text-gray-900 text-base">Personal Account</h3>
        </button>
        
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, accountType: 'business' }))}
          className={`px-10 py-10 border-2 rounded-2xl text-center transition-all shadow-md bg-white w-full sm:w-64
            ${formData.accountType === 'business'
              ? 'border-primary-600'
              : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-3 shadow">
            <img src="/assets/icons/Mail.svg" alt="Business Account" className="w-7 h-7" />
          </div>
          <h3 className="font-semibold text-gray-900 text-base">Business Account</h3>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {formData.accountType === 'business' ? 'Business Information' : 'Your Personal Info'}
        </h2>
      </div>
      
      {formData.accountType === 'business' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Email Address</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Company Email Address"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode || '+23'}
                onChange={handleInputChange}
                className="px-2 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                style={{ maxWidth: 90 }}
              >
                <option value="+23">+23</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                type="text"
                name="companyNumber"
                value={formData.companyNumber || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0000*****"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Company Address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="URL"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Solo</label>
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: 'teamType', value: 'solo' } })}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                  ${formData.teamType === 'solo' ? 'bg-gray-50 border-primary-400' : 'bg-gray-50 border-gray-100 opacity-60'}
                `}
                tabIndex={0}
              >
                <span className="text-gray-500">Single</span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${formData.teamType === 'solo' ? 'border-pink-500' : 'border-gray-300'}`}
                >
                  {formData.teamType === 'solo' && <span className="w-3 h-3 bg-pink-500 rounded-full block"></span>}
                </span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Team</label>
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: 'teamType', value: 'team' } })}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                  ${formData.teamType === 'team' ? 'bg-gray-50 border-primary-400' : 'bg-gray-50 border-gray-100 opacity-60'}
                `}
                tabIndex={0}
              >
                <span className="text-gray-500">Team</span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${formData.teamType === 'team' ? 'border-pink-500' : 'border-gray-300'}`}
                >
                  {formData.teamType === 'team' && <span className="w-3 h-3 bg-pink-500 rounded-full block"></span>}
                </span>
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">Select</label>
            <div className="w-full">
              <select
                name="teamSize"
                value={formData.teamSize || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-500 text-base appearance-none ${formData.teamType === 'solo' ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={{ boxShadow: 'none' }}
                required={formData.teamType === 'team'}
                disabled={formData.teamType === 'solo'}
              >
                <option value="">1–5</option>
                <option value="1-5">1–5</option>
                <option value="6-10">6–10</option>
                <option value="11-20">11–20</option>
                <option value="21+">21+</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter Your First Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter Your Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode || '+23'}
                  onChange={handleInputChange}
                  className="px-2 py-3 rounded-l-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ maxWidth: 90 }}
                >
                  <option value="+23">+23</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-r-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0000******"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter Your City"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter Your Postal Code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter Your Address"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">CNIC / Passport Details</label>
            <input
              type="text"
              name="cninc"
              value={formData.cninc || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter Your Details"
              required
            />
          </div>
        </>
      )}
      
    </div>
  );

  // Combined Category + Subcategory step (Step 3 for both personal and business)
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        {/* Category Selection */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Category's</h2>
        </div>
        
        <div className="grid grid-cols-3 grid-rows-2 gap-6 justify-items-center max-w-md mx-auto mb-6">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setSelectedCategories(prev =>
                  prev.includes(category.name)
                    ? prev.filter(name => name !== category.name)
                    : [...prev, category.name]
                );
                setSelectedSubCategories([]);
              }}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                selectedCategories.includes(category.name) ? 'transform scale-105' : 'hover:scale-102'
              }`}
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center mb-2 transition-all duration-300 ${
                  selectedCategories.includes(category.name)
                    ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 border-white shadow-category'
                    : 'bg-white border-gray-200 hover:border-primary-300 shadow-card'
                }`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${
                    selectedCategories.includes(category.name) ? 'filter brightness-0 invert' : ''
                  }`}
                />
              </div>
              <span
                className={`text-xs sm:text-sm font-medium text-center max-w-20 sm:max-w-28 leading-tight transition-all duration-300 ${
                  selectedCategories.includes(category.name) ? 'text-primary-500 font-semibold' : 'text-gray-700'
                }`}
              >
                {category.name}
              </span>
            </div>
          ))}
          
          <div className="col-span-3 flex justify-center gap-6">
            {categories.slice(3, 5).map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategories(prev =>
                    prev.includes(category.name)
                      ? prev.filter(name => name !== category.name)
                      : [...prev, category.name]
                  );
                  setSelectedSubCategories([]);
                }}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  selectedCategories.includes(category.name) ? 'transform scale-105' : 'hover:scale-102'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center mb-2 transition-all duration-300 ${
                    selectedCategories.includes(category.name)
                      ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 border-white shadow-category'
                      : 'bg-white border-gray-200 hover:border-primary-300 shadow-card'
                  }`}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${
                      selectedCategories.includes(category.name) ? 'filter brightness-0 invert' : ''
                    }`}
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium text-center max-w-20 sm:max-w-28 leading-tight transition-all duration-300 ${
                    selectedCategories.includes(category.name) ? 'text-primary-500 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Subcategory step (Step 4 for both personal and business)
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Subcategories</h2>
      </div>
      {selectedCategories.length === 0 ? (
        <div className="text-center text-red-500">Please select at least one category first.</div>
      ) : (
        selectedCategories.map((catName) => {
          const cat = categories.find(c => c.name === catName);
          if (!cat) return null;
          return (
            <div key={cat.id} className="mb-4 bg-gray-100 rounded-xl p-2">
              <div className="font-semibold mb-2">{cat.name}</div>
              <div className="flex flex-wrap gap-2">
                {cat.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    type="button"
                    onClick={() => handleSubCategoryToggle(subcategory)}
                    className={`px-4 py-2 rounded-2xl text-md font-medium transition-all duration-300 flex items-center space-x-4 ${
                      selectedSubCategories.includes(subcategory)
                        ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-500'
                    }`}
                  >
                    <img
                      src={getSubcategoryIcon(subcategory)}
                      alt={subcategory}
                      className="w-10 h-10 bg-white rounded-lg"
                    />
                    <span>{subcategory}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  // Gallery step (Step 5 for business only)
  const renderStep5Business = () => (
    <div className="space-y-8">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery</h2>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-shrink-0 w-20 h-30 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
          <label htmlFor="banner-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
            <img src={UploadIcon} alt="Upload" className="w-7 h-7 mb-1" />
          </label>
        </div>
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
          <label htmlFor="banner-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-6">
            <img src={UploadIcon} alt="Upload" className="w-7 h-7 mb-2" />
            <span className="text-gray-400 text-sm">Click to upload Banner</span>
            <input id="banner-upload" name="banner" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 mb-4 min-h-[90px]">
        <label htmlFor="work-images-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-6">
          <img src="/assets/Upload.svg" alt="Upload" className="w-7 h-7 mb-2" />
          <span className="text-gray-400 text-sm">Click to upload work images</span>
          <input id="work-images-upload" name="workImages" type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 mb-4 min-h-[90px]">
        <label htmlFor="work-video-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-6">
          <img src="/assets/Upload.svg" alt="Upload" className="w-7 h-7 mb-2" />
          <span className="text-gray-400 text-sm">Click to upload work Video</span>
          <input id="work-video-upload" name="workVideo" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );

  // Security step (Step 6 for business only)
  const renderStep6Business = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Security</h2>
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Set Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label className="block text-base font-medium text-gray-800 mb-2">Re - Enter Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );

  // Security step for Personal accounts (Step 5)
  const renderStep5Personal = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Security</h2>
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">Set Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label className="block text-base font-medium text-gray-800 mb-2">Re - Enter Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-1 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
          placeholder="Enter Your Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );

  // Verification step (Step 6 for personal, Step 7 for business)
  const renderVerificationStep = () => (
    <>
      {(!showSuccessModal && !verificationComplete) && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Verification</h2>
          <div className="relative flex mb-6 bg-gray-100 rounded-full p-1 h-12">
            {/* Sliding pill background */}
            <span
              className="absolute top-1 left-1 h-10 w-1/2 rounded-full btn-primary-mobile shadow transition-all duration-300"
              style={{
                transform: verificationType === 'phone' ? 'translateX(0%)' : 'translateX(100%)',
              }}
            />
            <button
              className={`flex-1 z-10 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${
                verificationType === 'phone' ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => setVerificationType('phone')}
            >
              Phone Number
            </button>
            <button
              className={`flex-1 z-10 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${
                verificationType === 'email' ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => setVerificationType('email')}
            >
              Email Address
            </button>
          </div>
          {verificationType === 'phone' ? (
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-800 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300 "
                placeholder="Enter Your Phone Number"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-800 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all duration-300"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          )}
        </div>
      )}
    </>
  );

  // OTP Handlers for focus management
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
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl relative max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col items-center justify-center">
          {/* If success modal, show only success, else show normal content */}
          {showSuccessModal ? (
            <>
              <VerificationSuccess
                title="Successfully Verified!"
                message=""
              />
            </>
          ) : (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 w-full">
                {/* Step Indicator */}
                {renderStepIndicator()}
                {/* Form Content */}
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && formData.accountType === 'business' && renderStep5Business()}
                {step === 5 && formData.accountType === 'personal' && renderStep5Personal()}
                {step === 6 && formData.accountType === 'business' && renderStep6Business()}
                {step === 6 && formData.accountType === 'personal' && renderVerificationStep()}
                {step === 7 && formData.accountType === 'business' && renderVerificationStep()}
                <form onSubmit={handleSubmit}>
                  {/* Navigation Buttons */}
                  <div className="flex flex-row justify-end gap-3 mt-6 sm:mt-8">
                    <button
                      type="button"
                      onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                      className="px-4 sm:px-6 py-2 border rounded-xl transition-colors btn-secondary-mobile"
                    >
                      {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      disabled={step === 1 && !formData.accountType}
                      className="px-4 sm:px-6 py-2 btn-primary-mobile text-white font-bold rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {step === getTotalSteps() ? 'Verify' : 'Next'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8  max-w-md relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <OtpStep
              otp={otp}
              setOtp={setOtp}
              timer={30}
              inputs={otpInputs}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              onVerify={() => {
                setShowOtpModal(false);
                setShowSuccessModal(true);
              }}
              onResend={() => setOtp(['', '', '', '', '', ''])}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VendorRegister;