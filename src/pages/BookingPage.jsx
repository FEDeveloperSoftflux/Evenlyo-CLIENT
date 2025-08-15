import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingCalendar from "../components/booking/BookingCalendar";
import GalleryTab from "../components/booking/GalleryTab";
import ReviewsTab from "../components/booking/ReviewsTab";
import MoreDJCards from "../components/booking/MoreDJCards";
import ResponsiveHeader from "../components/Header";
import Footer from "../components/Footer";
import api from "../store/api";
import { endPoints } from "../constants/api";

const BookingPage = () => {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [vendorData, setVendorData] = useState(null);
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!listingId) {
        setError('Missing listing information');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        console.log('Fetching listing details for ID:', listingId);

        // First, fetch the listing details
        const listingResponse = await api.get(endPoints.listings.byId(listingId));
        const listing = listingResponse.data.data || listingResponse.data;

        if (!listing) {
          throw new Error('Listing not found');
        }

        console.log('Listing data received:', listing);
        setListingData(listing);

        // Extract vendor ID from listing
        const extractedVendorId = listing.vendor._id;
        // || listing.vendorId || listing.vendorDetails?._id || listing.vendorDetails?.id;

        if (!extractedVendorId) {
          console.error('No vendor ID found in listing:', listing);
          throw new Error('Vendor information not available for this listing');
        }

        console.log('Extracted vendor ID:', extractedVendorId);
        setVendorId(extractedVendorId);

        // Now fetch vendor details using the vendor details endpoint
        try {
          const vendorResponse = await api.get(endPoints.vendors.byDetails(extractedVendorId));
          const vendorInfo = vendorResponse.data || vendorResponse.data;

          console.log('Vendor data received:', vendorInfo);
          setVendorData({
            vendor: vendorInfo.vendor || vendorInfo,
            listings: vendorInfo.listings || []
          });
        } catch (vendorError) {
          console.warn('Failed to fetch vendor details, continuing with listing data only:', vendorError);
          // Don't throw error here, we can still proceed with just listing data
          setVendorData({ vendor: null, listings: [] });
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError(err.message || 'Failed to load booking data');
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [listingId]);

  const tabs = [
    { id: 'details', label: 'Details', icon: '/assets/book-details.svg' },
    { id: 'gallery', label: 'Gallery', icon: '/assets/book-gallery.svg' },
    { id: 'reviews', label: 'Reviews', icon: '/assets/book-review.svg' }
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Loading booking details...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-lg font-medium">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Please try refreshing the page or go back to listings.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Listings
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'details':
        return (
          <BookingCalendar
            vendorData={vendorData}
            listingData={listingData}
            vendorId={vendorId}
            listingId={listingId}
          />
        );
      case 'gallery':
        return <GalleryTab listingData={listingData} />;
      case 'reviews':
        return <ReviewsTab vendorData={vendorData} listingData={listingData} />;
      default:
        return (
          <BookingCalendar
            vendorData={vendorData}
            listingData={listingData}
            vendorId={vendorId}
            listingId={listingId}
          />
        );
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
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-gradient-brand text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                >
                  <img
                    src={tab.icon}
                    alt={tab.label}
                    className={`w-4 h-4 ${activeTab === tab.id ? 'filter brightness-0 invert' : ''
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
