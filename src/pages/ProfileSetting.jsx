import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResponsiveHeader from '../components/Header';
import Footer from '../components/Footer';
import { endPoints } from '../constants/api';
import { apiService } from '../services';
import authService from '../services/authService';
import ProfileIcon from '../assets/icons/Profile.svg'

function ProfileSetting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    contactNumber: '',
    address: {
      city: '',
      postalCode: '',
      fullAddress: ''
    },
    userType: '',
    language: 'english'
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tempAddress, setTempAddress] = useState({
    city: '',
    postalCode: '',
    fullAddress: ''
  });

  // Utility functions
  const showMessage = (message, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 5000);
    } else {
      setSaveMessage(message);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Session verification using cookie-based auth
  const verifySession = async () => {
    try {
      // Check if user is marked as authenticated in localStorage
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        console.log('No authentication found in localStorage');
        navigate('/login');
        return false;
      }

      // Validate session with backend (uses HTTP-only cookies)
      const result = await authService.validateSession();
      if (!result.success) {
        console.log('Session validation failed:', result.error);
        authService.clearUserData();
        navigate('/login');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session verification failed:', error);
      authService.clearUserData();
      navigate('/login');
      return false;
    }
  };

  // Fetch personal information
  const fetchPersonalInfo = async () => {
    try {
      const response = await apiService.get(endPoints.settings.getPersonalInfo);
      if (response.data?.success) {
        setPersonalInfo(response.data.data);
        setTempAddress(response.data.data.address);
        if (response.data.data.profileImage) {
          setProfileImagePreview(response.data.data.profileImage.startsWith('http')
            ? response.data.data.profileImage
            : `${apiService.baseURL}${response.data.data.profileImage}`);
        }
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
      showMessage('Failed to load personal information', true);
    }
  };

  // Fetch notification settings
  const fetchNotifications = async () => {
    try {
      const response = await apiService.get(endPoints.settings.getNotifications);
      if (response.data?.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      showMessage('Failed to load notification settings', true);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const sessionValid = await verifySession();
      if (sessionValid) {
        await Promise.all([fetchPersonalInfo(), fetchNotifications()]);
      }
      setLoading(false);
    };

    initializeData();
  }, []);

  // Contact number change handler
  const handleContactNumberChange = (e) => {
    const newContactNumber = e.target.value;
    setPersonalInfo(prev => ({ ...prev, contactNumber: newContactNumber }));
  };

  // Save personal info
  const savePersonalInfo = async () => {
    try {
      const response = await apiService.put(endPoints.settings.updateProfile, {
        contactNumber: personalInfo.contactNumber,
        language: personalInfo.language,
        address: personalInfo.address
      });
      if (response.data?.success) {
        showMessage('Profile information updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile info:', error);
      showMessage('Failed to update profile information', true);
    }
  };

  // Handle address modal
  const handleOpenAddressModal = () => {
    setTempAddress(personalInfo.address);
    setModalOpen(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setTempAddress(prev => ({ ...prev, [name]: value }));
  };

  const saveAddress = async () => {
    try {
      const response = await apiService.put(endPoints.settings.updateProfile, {
        address: tempAddress
      });
      if (response.data?.success) {
        setPersonalInfo(prev => ({ ...prev, address: tempAddress }));
        setModalOpen(false);
        showMessage('Address updated successfully');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      showMessage('Failed to update address', true);
    }
  };

  // Language change handler
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setPersonalInfo(prev => ({ ...prev, language: newLanguage }));
  };

  // Profile picture upload handler
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setProfileImagePreview(e.target?.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      // Use putFormData method which handles FormData properly
      const response = await apiService.putFormData(endPoints.settings.updateProfilePicture, formData);

      if (response.data?.success) {
        setPersonalInfo(prev => ({ ...prev, profileImage: response.data.data.profileImage }));
        showMessage('Profile picture updated successfully');
      } else {
        throw new Error(response.data?.message || 'Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      showMessage('Failed to update profile picture', true);
      // Revert preview on error
      setProfileImagePreview(personalInfo.profileImage ? (personalInfo.profileImage.startsWith('http') ? personalInfo.profileImage : `${apiService.baseURL}${personalInfo.profileImage}`) : null);
    }
  };

  // Password form handlers
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async () => {
    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      showMessage('Please fill in both password fields', true);
      return;
    }

    try {
      const response = await apiService.put(endPoints.settings.updatePassword, passwordForm);
      if (response.data?.success) {
        setPasswordForm({ oldPassword: '', newPassword: '' });
        showMessage('Password updated successfully');
      } else {
        throw new Error(response.data?.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      showMessage(error.response?.data?.message || error.message || 'Failed to update password', true);
    }
  };

  // Notification handlers
  const handleNotificationToggle = async (type) => {
    const newValue = !notifications[type];

    // Update UI immediately
    setNotifications(prev => ({ ...prev, [type]: newValue }));

    try {
      const response = await apiService.put(endPoints.settings.updateNotifications, {
        [type]: newValue
      });
      if (response.data?.success) {
        showMessage('Notification settings updated');
      }
    } catch (error) {
      console.error('Error updating notifications:', error);
      // Revert the toggle on error
      setNotifications(prev => ({ ...prev, [type]: !newValue }));
      showMessage('Failed to update notification settings', true);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="mr-4 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Setting</h1>
            <p className="text-sm text-gray-500">You can view your Setting</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative flex flex-row overflow-x-auto flex-nowrap md:flex-row w-full bg-[#fcfcfc] rounded-xl p-2 mb-8 gap-3">
          {/* Sliding Indicator for desktop only */}
          <div
            className="hidden md:block absolute top-2 left-0 h-[calc(100%-16px)] rounded-2xl z-0 transition-all duration-300 btn-primary-mobile"
            style={{
              width: '33.3333%',
              transform: `translateX(${activeTab === 'personal' ? '0%' : activeTab === 'security' ? '100%' : '200%'})`,
              boxShadow: '0 2px 8px 0 rgba(236,72,153,0.15)'
            }}
          />
          {/* Tab Buttons */}
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${activeTab === 'personal'
              ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white md:bg-transparent'
              : 'text-gray-400'
              }`}
            style={{
              background: activeTab === 'personal' && window.innerWidth < 768
                ? 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)'
                : 'transparent'
            }}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${activeTab === 'security'
              ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white md:bg-transparent'
              : 'text-gray-400'
              }`}
            style={{
              background: activeTab === 'security' && window.innerWidth < 768
                ? 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)'
                : 'transparent'
            }}
          >
            Security Details
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${activeTab === 'notification'
              ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white md:bg-transparent'
              : 'text-gray-400'
              }`}
            style={{
              background: activeTab === 'notification' && window.innerWidth < 768
                ? 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)'
                : 'transparent'
            }}
          >
            Notification Details
          </button>
        </div>

        {/* Personal Information Form */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-500 text-sm">Update your Personal Details</p>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-left mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <img src={ProfileIcon} alt="Default Profile" className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  readOnly
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  readOnly
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail Address</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  readOnly
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={personalInfo.contactNumber}
                    onChange={handleContactNumberChange}
                    placeholder="Phone number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={personalInfo.address.fullAddress}
                    readOnly
                    placeholder="Your address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={handleOpenAddressModal}
                    className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                  >
                    Edit Address
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language Preference</label>
                <select
                  value={personalInfo.language}
                  onChange={handleLanguageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="dutch">Dutch</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={savePersonalInfo}
                className="px-8 py-2 rounded-xl font-medium text-white transition-colors"
                style={{
                  background: 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(180deg, #E31B95 0%, #C817AE 50%, #B015A0 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)';
                }}
              >
                Save Changes
              </button>
            </div>

            {/* Messages */}
            {saveMessage && (
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {saveMessage}
              </div>
            )}
            {errorMessage && (
              <div className="absolute bottom-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* Security Details Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Details</h2>
              <p className="text-gray-500 text-sm">Update your Security Details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handlePasswordSubmit}
                className="btn-primary-mobile text-white px-8 py-2 rounded-xl hover:bg-pink-600 transition-colors font-medium"
              >
                Update Password
              </button>
            </div>
            {saveMessage && (
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {saveMessage}
              </div>
            )}
            {errorMessage && (
              <div className="absolute bottom-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* Notification Details Tab */}
        {activeTab === 'notification' && (
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
              <p className="text-gray-500 text-sm">Manage your notification preferences</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="flex items-center justify-between py-6">
                <div>
                  <div className="font-semibold text-lg text-black">Email notification</div>
                  <div className="text-gray-400 text-sm">Get notified when orders are completed</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationToggle('emailNotifications')}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${notifications.emailNotifications ? 'btn-primary-mobile' : 'bg-gray-200'}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${notifications.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between py-6">
                <div>
                  <div className="font-semibold text-lg text-black">Push notification</div>
                  <div className="text-gray-400 text-sm">Notifications for new user registrations</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationToggle('pushNotifications')}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${notifications.pushNotifications ? 'btn-primary-mobile' : 'bg-gray-200'}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${notifications.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
            {saveMessage && (
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {saveMessage}
              </div>
            )}
            {errorMessage && (
              <div className="absolute bottom-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-xl shadow text-sm fade-in-mobile">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* Address Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" onClick={() => setModalOpen(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit Address</h3>
                      <div className="mt-2 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            value={tempAddress.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={tempAddress.postalCode}
                            onChange={handleAddressChange}
                            placeholder="Postal Code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                          <textarea
                            name="fullAddress"
                            value={tempAddress.fullAddress}
                            onChange={handleAddressChange}
                            placeholder="Full Address"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={saveAddress}
                    className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 btn-primary-mobile text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProfileSetting;
