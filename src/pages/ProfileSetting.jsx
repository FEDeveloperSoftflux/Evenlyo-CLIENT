import React, { useState } from 'react';
import ResponsiveHeader from '../components/Header';
import Footer from '../components/Footer'

function ProfileSetting() {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    push: false,
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [securityData, setSecurityData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Handle form submission or navigation to next step
    console.log('Form data:', formData);
  };

  // Add this function to handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // You can handle the file upload logic here
      console.log('Selected file:', file);
      // Optionally, update state if you want to preview or store the file
    }
  };

  const handleToggle = (type) => {
    setNotificationPrefs((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSaveNotificationPrefs = () => {
    localStorage.setItem('notificationPrefs', JSON.stringify(notificationPrefs));
    setSaveMessage('Preferences saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleSavePersonal = () => {
    localStorage.setItem('personalData', JSON.stringify(formData));
    setSaveMessage('Preferences saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleSecurityInputChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSecurity = () => {
    localStorage.setItem('securityData', JSON.stringify(securityData));
    setSaveMessage('Preferences saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

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
    className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${
      activeTab === 'personal'
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
    className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${
      activeTab === 'security'
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
    className={`flex-shrink-0 min-w-max md:flex-1 py-3 px-2 transition-all duration-200 font-medium z-10 whitespace-nowrap rounded-xl text-sm md:text-base ${
      activeTab === 'notification'
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
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-500 text-sm">Update your Personal Details</p>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-left mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                <label htmlFor="banner-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-6">
            <img src="/assets/Upload.svg" alt="Upload" className="w-7 h-7 " />

            <input id="upload" name="banner" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
                </div>

              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ijdmenta@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSavePersonal}
                className="btn-primary-mobile text-white px-8 py-2 rounded-xl hover:bg-pink-600 transition-colors font-medium"
              >
                Save
              </button>
            </div>
            {saveMessage && (
              <div className="absolute bottom-20 right-8 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm animate-fade-in">
                {saveMessage}
              </div>
            )}
          </div>
        )}

        {/* Security Details Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Deatils</h2>
              <p className="text-gray-500 text-sm">Update your Security Details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={securityData.oldPassword}
                  onChange={handleSecurityInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={securityData.newPassword}
                  onChange={handleSecurityInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSaveSecurity}
                className="btn-primary-mobile text-white px-8 py-2 rounded-xl hover:bg-pink-600 transition-colors font-medium"
              >
                Save
              </button>
            </div>
            {saveMessage && (
              <div className="absolute bottom-20 right-8 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm animate-fade-in">
                {saveMessage}
              </div>
            )}
          </div>
        )}

        {/* Notification Details Tab */}
        {activeTab === 'notification' && (
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Setting</h2>
              <p className="text-gray-500 text-sm">Update your Security Details</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="flex items-center justify-between py-6">
                <div>
                  <div className="font-semibold text-lg text-black">Email notification</div>
                  <div className="text-gray-400 text-sm">Get notified when orders are completed</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('email')}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${notificationPrefs.email ? 'btn-primary-mobile' : 'bg-gray-200'}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${notificationPrefs.email ? 'translate-x-5' : 'translate-x-0'}`}
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
                  onClick={() => handleToggle('push')}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${notificationPrefs.push ? 'btn-primary-mobile' : 'bg-gray-200'}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${notificationPrefs.push ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button
                className="btn-primary-mobile text-white px-8 py-2 rounded-xl hover:bg-pink-600 transition-colors font-medium"
                onClick={handleSaveNotificationPrefs}
              >
                Save
              </button>
            </div>
            {saveMessage && (
              <div className="absolute bottom-20 right-8 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm animate-fade-in">
                {saveMessage}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default ProfileSetting;
