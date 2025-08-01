import React from "react";
import { useTranslation } from 'react-i18next';
import QR from '../assets/images/QR.png';

const AdvancedBookingSystem = () => {
  const { t } = useTranslation();
  
  return (
    <section id="advance-booking" className="px-2 xs:px-4 sm:px-6 md:px-8 bg-white border-t border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-10 items-center">
          {/* Right Side - QR Code and Features (on mobile, image on top) */}
          <div className="flex justify-center items-center h-full md:order-2 order-1 w-full md:pr-8">
            <div className="flex flex-col justify-center items-center w-full h-full bg-white">
              <img
                src={QR}
                alt="QR Code"
                className="w-80 h-40 xs:w-48 xs:h-48 sm:w-80 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling &&
                    (e.target.nextSibling.style.display = "flex");
                }}
              />
            </div>
          </div>

          {/* Left Side - Content */}
          <div className="space-y-2 md:pl-8 md:pr-8 break-words md:order-1 order-2 text-left flex flex-col md:items-start mb-4">
            {/* Key Features Label */}
            <span className="self-start inline-block px-3 py-1 mb-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              {t('key_features')}
            </span>
            <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 leading-tight mb-2">
              <span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,236,188,0) 85%, #FFECBC 85%)",
                  borderRadius: "6px",
                  padding: "0 4px",
                  display: "inline-block",
                }}
              >
                {t('advanced_booking_system')}
              </span>
            </h2>
            <p className="text-sm xs:text-base text-gray-600 leading-normal mb-4">
              {t('booking_system_description_1')}
              <span className="font-bold text-gray-900">
                {t('booking_system_description_2')}
              </span>
              {t('booking_system_description_3')}
              <span className="font-bold text-gray-900">
                {t('booking_system_description_4')}
              </span>
              .
            </p>
            <button
              className="inline-flex items-center justify-center px-4 xs:px-4 py-2 rounded-lg font-medium text-base mt-2"
              style={{
                background: "#FFEDF0",
                color: "#F91942",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#ffe0e7")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#FFEDF0")}
            >
              {t('booking_guide_video')}
              <span className="ml-2 text-lg">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedBookingSystem;
