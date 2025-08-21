import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import { fetchCurrentUser } from '../store/actions/authActions';
import { useTranslation } from 'react-i18next';
import CustomerSupportModal from "./CustomerSupportModal";

// Import assets
import brandLogo from '../assets/icons/brand.svg';
import ratingsIcon from '../assets/icons/ratings.svg';
import globeIcon from '../assets/icons/globe.svg';
import cartIcon from '../assets/icons/Cart.svg';
import bellIcon from '../assets/icons/Bell.svg';
import profileIcon from '../assets/icons/Profile.svg';
import bookingIcon from '../assets/icons/Booking.svg';
import settingIcon from '../assets/icons/Setting.svg';
import logoutIcon from '../assets/icons/Logout.svg';

function ResponsiveHeader() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('advance-booking');
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  // Always fetch user info on mount (for cookie-based session restore)
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  // Notification dropdown state
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const notificationRef = useRef(null);

  const notifications = useSelector((state) => state.notifications.list);

  const [isSupportOpen, setIsSupportOpen] = useState(false);


  // Click-away listener for profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Define languages array before any usage
  const languages = [
    { code: "en", name: "English" },
    { code: "nl", name: "Dutch" },
  ];

  // Language change handler
  const changeLanguage = (langCode, langName) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('evenlyo-language', langCode);
    setSelectedLanguage(langName);
    setIsLanguageOpen(false);
  };

  // Initialize selected language based on current i18n language
  useEffect(() => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    if (currentLang) {
      setSelectedLanguage(currentLang.name);
    }
  }, [i18n.language]);

  const navigationItems = [
    { name: t('home'), href: "/" },
    { name: t('features'), href: "/features" },
    { name: t('customer_support'), href: "#support" },
    { name: t('blog'), href: "/blog" },
    { name: t('pricing'), href: "/pricing" },
  ];

  // Get current path for active nav
  const currentPath = window.location.pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target)
      ) {
        setIsFeaturesOpen(false);
      }
    }
    if (isFeaturesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFeaturesOpen]);

  const featuresRef = React.useRef(null);

  return (
    <>
      <header className="bg-white border-b border-gray-100 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section - Logo and Rating */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="flex items-center">
              <a href="/">
                <img
                  src={brandLogo}
                  alt="Evenlyo Logo"
                  className="h-6 w-auto sm:h-8"
                />
              </a>
            </div>
            <div className="hidden lg:flex items-center">
              <img
                src={ratingsIcon}
                alt="Ratings"
                className="h-12 w-16 lg:h-16 lg:w-20"
              />
            </div>
          </div>

          {/* Center Navigation - Desktop Only */}
          <nav className="nav-desktop flex items-center space-x-6 relative md:hidden sm:hidden lg:flex">
            {navigationItems.map((item) => {
              const isActive = item.href === currentPath;
              if (item.name === t('customer_support')) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIsSupportOpen(true)}
                    className={`relative font-medium text-subtitle-6 transition-colors pb-1 group text-gray-600 hover:text-primary-500`}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>
                );
              }
              return item.name === t('features') ? (
                <div
                  key={item.name}
                  className="relative"
                  ref={featuresRef}
                >
                  <button
                    type="button"
                    onClick={() => setIsFeaturesOpen((open) => !open)}
                    className={`relative font-medium text-subtitle-6 transition-colors pb-1 group-hover:text-primary-500 ${isActive
                      ? "text-gray-900 hover:text-primary-500"
                      : "text-gray-600 hover:text-primary-500"
                      }`}
                  >
                    {item.name}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full transition-transform duration-300 ${isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                      }`}></div>
                  </button>
                  {/* Dropdown */}
                  {isFeaturesOpen && (
                    <div className="absolute left-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
                      <ul className="py-2 px-1">
                        <li>
                          <a
                            href="/#advance-booking"
                            className={`block px-4 py-2 text-sm font-medium rounded-xl transition-colors ${selectedFeature === 'advance-booking' ? 'btn-primary-mobile text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => { setSelectedFeature('advance-booking'); setIsFeaturesOpen(false); }}
                          >
                            {t('advanced_booking_system')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/#vendor-feature"
                            className={`block px-6 py-2 text-sm font-medium rounded-xl transition-colors ${selectedFeature === 'vendor-feature' ? 'btn-primary-mobile text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => { setSelectedFeature('vendor-feature'); setIsFeaturesOpen(false); }}
                          >
                            {t('vendor_services')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/#reviews"
                            className={`block px-6 py-2 text-sm font-medium rounded-xl transition-colors ${selectedFeature === 'reviews' ? 'btn-primary-mobile text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => { setSelectedFeature('reviews'); setIsFeaturesOpen(false); }}
                          >
                            {t('reviews')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/#faq"
                            className={`block px-6 py-2 text-sm font-medium rounded-xl transition-colors ${selectedFeature === 'faq' ? 'btn-primary-mobile text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => { setSelectedFeature('faq'); setIsFeaturesOpen(false); }}
                          >
                            {t('faq')}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium text-subtitle-6 transition-colors pb-1 group ${isActive
                    ? "text-gray-900 hover:text-primary-500"
                    : "text-gray-600 hover:text-primary-500"
                    }`}
                >
                  {item.name}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full transition-transform duration-300 ${isActive
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                    }`}></div>
                </a>
              );
            })}
          </nav>

          {/* Right Section - Language, Auth, and Mobile Menu */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Selector - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors relative">
              <img src={globeIcon} alt="Language" className="h-4 w-4" />
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-sm text-gray-700 font-medium"
              >
                <span>{selectedLanguage}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isLanguageOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code, lang.name)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button - Only show if logged in */}
            {isLoggedIn && (
              <button
                className="relative flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-none hover:shadow-md transition-all border-none focus:outline-none"
                onClick={() => window.location.href = '/add-to-cart'}
                aria-label="Cart"
              >
                <img src={cartIcon} alt="Cart" className="w-4 h-6" />
              </button>
            )}
            {/* Notification Button - Only show if logged in */}
            {isLoggedIn && (
              <div className="relative" ref={notificationRef}>
                <button
                  className="relative flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-none hover:shadow-md transition-all border-none focus:outline-none"
                  aria-label="Notifications"
                  onClick={() => setNotificationDropdownOpen((open) => !open)}
                >
                  {/* Bell Icon SVG */}
                  <img src={bellIcon} alt="Notifications" className="w-5 h-5 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {/* Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div
                    className="absolute z-50 p-4 animate-fade-in max-w-[calc(100vw-1rem)] mx-1 bg-white rounded-2xl shadow-2xl border border-gray-100 mt-2
                      left-1/2 -translate-x-1/2 w-full max-w-xs
                      lg:right-0 lg:left-auto lg:translate-x-0 lg:w-80"
                    style={{ minWidth: '240px' }}
                  >
                    <div className="font-semibold text-lg mb-2 text-gray-900">{t('notifications')}</div>
                    <ul className="divide-y divide-gray-100 mb-3">
                      {notifications.map((notif) => {
                        const text = notif.text.toLowerCase();
                        let onClick = () => { };
                        if (text.includes('message')) {
                          onClick = () => { window.location.href = '/chat/1'; };
                        } else if (text.includes('booking')) {
                          onClick = () => { window.location.href = '/bookings'; };
                        } else if (text.includes('invoice')) {
                          onClick = () => { window.location.href = '/settings'; };
                        } else if (text.includes('event reminder')) {
                          onClick = () => { window.location.href = '/bookings'; };
                        }
                        return (
                          <li
                            key={notif.id}
                            className="py-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-50 rounded transition"
                            onClick={onClick}
                            tabIndex={0}
                            role="button"
                            onKeyDown={e => { if (e.key === 'Enter') onClick(); }}
                          >
                            {notif.text}
                          </li>
                        );
                      })}
                    </ul>
                    <a
                      href="/notifications"
                      className="block w-full text-center py-2 rounded-xl bg-gradient-brand text-white font-semibold hover:bg-primary-600 transition-colors text-sm"
                    >
                      {t('see_all')}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Profile dropdown if logged in, else register/signin button */}
            {isLoggedIn && (
              <div className="relative flex items-center" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen((open) => !open)}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={profileIcon}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-pink-400 object-cover shadow-md transition-transform hover:scale-105"
                  />
                </button>
                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-70 lg:w-80 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 z-50 p-3 sm:p-6 flex flex-col items-center animate-fade-in max-w-[calc(100vw-1rem)] mx-1 sm:mx-0" style={{ minWidth: '240px' }}>
                    {/* Profile Card */}
                    <img
                      src={profileIcon}
                      alt="Profile"
                      className="h-12 w-12 sm:h-20 sm:w-20 rounded-full border-2 border-red-600 object-cover shadow mb-2 sm:mb-3"
                    />
                    <div className="text-center mb-1">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user && user.fullName ? user.fullName : 'User'}</div>
                    </div>
                    {/* Menu */}
                    <div className="w-full mt-3 sm:mt-6 flex flex-col gap-1.5 sm:gap-2">
                      <a href="/bookings" className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-gray-500 hover:bg-gray-50 transition-all text-sm sm:text-lg">
                        {/* Calendar Icon */}
                        <img src={bookingIcon} alt="Booking Icon" className="w-4 h-4 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                        <span className="truncate">{t('all_bookings')}</span>
                      </a>
                      <a href="/settings" className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-gray-500 hover:bg-gray-50 transition-all text-sm sm:text-lg">
                        {/* Settings Icon */}
                        <img src={settingIcon} alt="Settings Icon" className="w-4 h-4 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                        <span className="truncate">{t('setting')}</span>
                      </a>
                      <button
                        onClick={async () => {
                          try {
                            await import('../store/api').then(({ default: api }) => api.post('/auth/logout'));
                          } catch (e) { }
                          dispatch(logoutAction());
                          window.location.href = '/';
                        }}
                        className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-gray-500 hover:bg-gray-50 transition-all text-sm sm:text-lg w-full text-left"
                      >
                        {/* Logout Icon */}
                        <img src={logoutIcon} alt="Logout Icon" className="w-4 h-4 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                        <span className="truncate">{t('log_out')}</span>
                      </button>
                    </div>
                  </div>
                )}
                {/* Optional: Add backdrop for mobile to close dropdown when clicking outside */}
                {profileDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40 sm:hidden"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                )}
              </div>
            )}
            {!isLoggedIn && (
              <button
                className="hidden lg:flex btn-primary-mobile text-sm lg:text-base py-2 px-3 lg:py-3 lg:px-4 items-center space-x-2"
                onClick={() => (window.location.href = '/login')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 lg:h-5 lg:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <circle cx="12" cy="8" r="4" strokeWidth="2" fill="white" />
                  <path
                    d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('sign_in_register')}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden touch-target text-gray-600 hover:text-primary-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-mobile" onClick={toggleMobileMenu}></div>
          <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-xl mobile-menu-slide ${isMobileMenuOpen ? 'open' : ''
            }`}>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-accent-pink">
                <img src={brandLogo} alt="Evenlyo Logo" className="h-6 w-auto" />
                <button
                  onClick={toggleMobileMenu}
                  className="touch-target text-gray-600 hover:text-primary-500 transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-50"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 py-6">
                {navigationItems.map((item, index) => {
                  if (item.name === t('customer_support')) {
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => { setIsSupportOpen(true); toggleMobileMenu(); }}
                        className={`mobile-menu-item block px-6 py-4 text-lg font-medium transition-all duration-300 w-full text-left flex items-center space-x-3 text-gray-700 hover:text-primary-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent hover:border-r-4 hover:border-primary-200`}
                      >
                        <span className="text-primary-500 opacity-60">•</span>
                        <span>{item.name}</span>
                      </button>
                    );
                  }
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`mobile-menu-item block px-6 py-4 text-lg font-medium transition-all duration-300 w-full text-left flex items-center space-x-3 ${item.active
                        ? "text-primary-500 bg-gradient-to-r from-primary-50 to-transparent border-r-4 border-primary-500 font-semibold"
                        : "text-gray-700 hover:text-primary-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent hover:border-r-4 hover:border-primary-200"
                        }`}
                      onClick={toggleMobileMenu}
                    >
                      <span className="text-primary-500 opacity-60">•</span>
                      <span>{item.name}</span>
                    </a>
                  )
                })}
                {/* Cart Button - Only show if logged in (Mobile) */}
                {false && (
                  <button
                    className="mobile-menu-item block w-full text-left px-6 py-4 text-lg font-medium transition-all duration-300 text-gray-700 hover:text-primary-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent hover:border-r-4 hover:border-primary-200 flex items-center"
                    onClick={() => { window.location.href = '/add-to-cart'; toggleMobileMenu(); }}
                  >
                    <img src={cartIcon} alt="Cart" className="w-5 h-5 mr-3" />
                    <span>Cart</span>
                  </button>
                )}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-6 ">
                {/* Language Selector */}
                <div className="flex items-center space-x-3 px-4 py-3 border border-gray-300 rounded-xl mb-6 bg-white hover:border-primary-300 transition-colors">
                  <img src={globeIcon} alt="Language" className="h-5 w-5 opacity-70" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => {
                      const selectedLang = languages.find(lang => lang.name === e.target.value);
                      if (selectedLang) {
                        changeLanguage(selectedLang.code, selectedLang.name);
                      }
                    }}
                    className="flex-1 bg-transparent text-sm text-gray-700 outline-none font-medium"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Sign In Button - Only show if not logged in */}
                {!isLoggedIn && (
                  <button
                    className="btn-primary-mobile w-full rounded-2xl flex items-center justify-center space-x-3 py-3 text-md font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      window.location.href = "/login"
                      toggleMobileMenu();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <circle cx="12" cy="8" r="4" strokeWidth="2" fill="white" />
                      <path
                        d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t('sign_in_register')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomerSupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}

export default ResponsiveHeader;
