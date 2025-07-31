import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

// Import assets
import brandLogo from '../assets/icons/brand.svg';;

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm md:text-base">
          {/* About Section */}
          <div className="space-y-4">
            <img src={brandLogo} alt="Evenlyo Brand" className="h-7 w-auto" />
            <ul className="space-y-2 text-base">
              <li><a href="#" className="text-gray-700 hover:text-gray-900">About AXT Transportation</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Story Hub/Newsroom</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Investors</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Corporate Social Responsibility</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Global Locations</a></li>
            </ul>
          </div>

          {/* Mobile: Discover & Support Resources side by side */}
          <div className="block md:hidden col-span-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Discover Section */}
              <div className="space-y-4">
                <h3 className="text-base md:text-xl font-semibold">Discover</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Industry</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Products</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Services</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Success Stories</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Resource Library</a></li>
                </ul>
              </div>
              {/* Support Resources */}
              <div className="space-y-4">
                <h3 className="text-base md:text-xl font-semibold">Support Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Support and Downloads</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact Support</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Request a Repair</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Product Warranty Information</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Developer Portal</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-gray-900">Report a Potential Security Vulnerability or Concern</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop: Discover Section */}
          <div className="hidden md:block space-y-4">
            <h3 className="text-base md:text-xl font-semibold">Discover</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Industry</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Products</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Services</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Success Stories</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Resource Library</a></li>
            </ul>
          </div>

          {/* Desktop: Support Resources */}
          <div className="hidden md:block space-y-4">
            <h3 className="text-base md:text-xl font-semibold">Support Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Support and Downloads</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact Support</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Request a Repair</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Product Warranty Information</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Developer Portal</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Report a Potential Security Vulnerability or Concern</a></li>
            </ul>
          </div>

          {/* Connect with our team */}
          <div className="space-y-4">
            <h3 className="text-base md:text-xl font-semibold">Connect with our team</h3>
            <p className="text-sm md:text-base  font-semibold">Stay up to date with AXT Transportation.</p>
            <p className="text-sm md:text-base text-gray-700">Sign up for our newsletter.</p>
            <button className="btn-primary-mobile text-white px-6 py-2 rounded-2xl transition-colors" onClick={() => navigate('/register')}>
              Register Now
            </button>
            <p className="text-xs md:text-sm text-gray-600 mt-4">
              Manage Contact Preferences
            </p>
            <div className="flex space-x-3 mt-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.734-.593-1.326-1.324-1.326z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117c-1.863-.504-9.391-.504-9.391-.504s-7.527 0-9.391.504a2.994 2.994 0 0 0-2.107 2.117c-.504 1.863-.504 5.754-.504 5.754s0 3.891.504 5.754a2.994 2.994 0 0 0 2.107 2.117c1.863.504 9.391.504 9.391.504s7.527 0 9.391-.504a2.994 2.994 0 0 0 2.107-2.117c.504-1.863.504-5.754.504-5.754s0-3.891-.504-5.754zm-13.498 9.568v-7.568l6.545 3.784-6.545 3.784z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        

        {/* Legal and Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-center md:flex-row md:space-x-6 md:items-center">
              <div className="flex flex-row space-x-2 md:space-x-6 text-[14px] md:text-xs text-gray-600 ">
                <a href="#" className="hover:text-gray-900">Legal</a>
                <span className="hidden md:inline">|</span>
                <a href="#" className="hover:text-gray-900">Terms of Use</a>
                <span className="hidden md:inline">|</span>
                <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              </div>
              <div className="mt-1 md:mt-0 text-center text-[14px] md:text-xs text-gray-600 ">
                <a href="#" className="hover:text-gray-900">Supply Chain Transparency</a>
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-gray-600 mt-2 md:mt-0 text-center md:text-left">
              ©2025 Zebra Technologies Corp. and/or its affiliates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
