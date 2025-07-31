import React from 'react';

const RequestSuccessModal = ({ isOpen, onClose, onTrackBooking }) => {
  if (!isOpen) return null;

  const handleTrackBooking = () => {
    onClose();
    onTrackBooking();
  };

  const handleBackToListing = () => {
    onClose();
  };

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText('BK-20250709-3733');
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full">
        {/* Content */}
        <div className="p-8 text-left space-y-6 relative">
          {/* Close Button (moved here) */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-6 mr-4 w-10 h-10 bg-gradient-brand text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Message */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Request Sent Successfully!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your request has been sent to<br />
              vendor <span className="font-semibold">#VENDOR-2024-001</span>. Please wait for their<br />
              confirmation.
            </p>
          </div>

          {/* Add Location Section */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Location </h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">BK-20250709-3733</span>
              <button
                onClick={handleCopyBookingId}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleBackToListing}
              className="flex-1 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              Back to Listing
            </button>
            <button
              onClick={handleTrackBooking}
              className="flex-1 py-2 bg-gradient-brand text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Track Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccessModal;
