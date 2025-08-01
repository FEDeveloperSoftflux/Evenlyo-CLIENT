import React, { useState } from "react";
import VendorRegister from "../auth/VendorRegister";

// Import assets
import locationIcon from '../assets/icons/location.svg';
import calendarIcon from '../assets/icons/calender.svg';
import timeIcon from '../assets/icons/time.svg';
import searchButtonIcon from '../assets/icons/search.svg';
import heroImage from '../assets/images/hero-img.png';;

function ResponsiveHero() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vendorModalOpen, setVendorModalOpen] = useState(false);

  const handleJoinFree = () => {
    window.location.href = "/login";
  };

  const handleBecomeVendor = () => {
    setVendorModalOpen(true);
  };

  const closeVendorModal = () => {
    setVendorModalOpen(false);
  };
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-gray-900"
      style={{
        backgroundImage: `url('heroImage'), linear-gradient(135deg, #1f2937 0%, #374151 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-responsive py-responsive">
        {/* Main Heading */}
        <div className="text-center mb-responsive">
          <h1 className="text-responsive-h1 mb-4">
            Book DJs, Food Trucks &{" "}
            <span className="text-white">Venues</span>
          </h1>
          <h2 className="text-responsive-h2">
            <span className="text-white">Fast, Easy</span>
            {" & "}
            <span className="text-white">Without Hassle</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-16 w-full max-w-md sm:max-w-none sm:w-auto">
          <button 
            onClick={handleJoinFree}
            className="btn-primary-mobile touch-button w-full sm:w-auto text-responsive-body font-bold"
          >
            Sign In
          </button>
          <button 
            onClick={handleBecomeVendor}
            className="btn-secondary-mobile touch-button w-full sm:w-auto text-responsive-body font-bold border-white text-white hover:bg-white hover:text-gray-900"
          >
            Become a Vendor
          </button>
        </div>

        {/* Search Form */}
        <div className="w-full container-7xl bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Type of Events */}
            <div className="sm:col-span-1">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Type Of Events
              </label>
              <div className="relative">
                <img
                  src="/assets/events.svg"
                  alt="Events"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10"
                />
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="select-mobile pl-10 pr-10 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">Select Events</option>
                  <option value="dj">DJ Services</option>
                  <option value="food-truck">Food Trucks</option>
                  <option value="venue">Venues</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
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
              </div>
            </div>

            {/* Search Location */}
            <div className="sm:col-span-1">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Search location
              </label>
              <div className="relative">
                <img
                  src={locationIcon}
                  alt="Location"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10"
                />
                <input
                  type="text"
                  placeholder="Search your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-mobile pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Date */}
            <div className="sm:col-span-1 lg:col-span-1">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Date
              </label>
              <div className="relative">
                <img
                  src={calendarIcon}
                  alt="Calendar"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10"
                />
                <input
                  type="date"
                  placeholder="Search your Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-mobile pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Time */}
            <div className="sm:col-span-1 lg:col-span-1">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Time
              </label>
              <div className="relative">
                <img
                  src={timeIcon}
                  alt="Time"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10"
                />
                <input
                  type="time"
                  placeholder="Search your Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input-mobile pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button className="btn-primary-mobile touch-button w-full flex items-center justify-center space-x-2">
                <img
                  src={searchButtonIcon}
                  alt="Search"
                  className="h-4 w-4"
                />
                <span className="font-bold">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vendor Modal */}
      {vendorModalOpen && (
        <VendorRegister
          onClose={closeVendorModal}
          onSwitchToClient={closeVendorModal}
        />
      )}
    </section>
  );
}

export default ResponsiveHero;
