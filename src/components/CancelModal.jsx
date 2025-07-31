import React from "react";

const CancelModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto mx-2">
        <button
          className="absolute top-4 right-4 bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">Cancel Booking</h2>
        <div className="mb-6 h-16 bg-pink-50 rounded-xl" />
        <label className="block mb-2 font-medium">Additional Details</label>
        <textarea className="w-full mb-8 p-4 rounded-xl bg-gray-100 min-h-[160px]" rows={6} placeholder="Details" />
        <button
          className="w-full py-3 rounded-2xl btn-primary-mobile text-white font-bold text-lg shadow-lg"
          onClick={onConfirm || onClose}
        >
          Cancel Confirmation
        </button>
      </div>
    </div>
  );
};

export default CancelModal; 