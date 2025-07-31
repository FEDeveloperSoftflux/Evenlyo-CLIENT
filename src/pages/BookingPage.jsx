import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCalendar from "../components/booking/BookingCalendar";
import GalleryTab from "../components/booking/GalleryTab";
import ReviewsTab from "../components/booking/ReviewsTab";
import MoreDJCards from "../components/booking/MoreDJCards";
import ResponsiveHeader from "../components/Header";
import Footer from "../components/Footer";

const BookingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const tabs = [
    { id: 'details', label: 'Details', icon: '/assets/book-details.svg' },
    { id: 'gallery', label: 'Gallery', icon: '/assets/book-gallery.svg' },
    { id: 'reviews', label: 'Reviews', icon: '/assets/book-review.svg' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <BookingCalendar />;
      case 'gallery':
        return <GalleryTab />;
      case 'reviews':
        return <ReviewsTab />;
      default:
        return <BookingCalendar />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveHeader />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-lg inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-brand text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src={tab.icon} 
                    alt={tab.label} 
                    className={`w-4 h-4 ${
                      activeTab === tab.id ? 'filter brightness-0 invert' : ''
                    }`} 
                  />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content mb-8">
            {renderTabContent()}
          </div>
        </div>
        
        {/* Always visible MoreDJ Cards */}
        <MoreDJCards />
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
