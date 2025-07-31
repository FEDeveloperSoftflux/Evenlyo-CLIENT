import React, { useState } from 'react';

function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-5xl focus:outline-none   ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

const ReviewModal = ({ open, onClose, onSubmit, booking }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return; // Require at least 1 star
    onSubmit({ rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in mx-2 md:mx-0">
      <button
          className="absolute top-4 right-4 bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-900">Rate Your Booking</h2>
        <p className="text-sm text-gray-500 mb-4">How was your experience with this booking?</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <StarRating value={rating} onChange={setRating} />
            {rating === 0 && <span className="text-sm mt-2 text-red-500 mt-1">Please select a rating</span>}
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows={4}
            placeholder="Write your review (optional)"
            value={review}
            onChange={e => setReview(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-3 py-2 btn-secondary-mobile rounded-2xl bg-white-100  hover:bg-pink-100 text-sm"
              onClick={onClose}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded-2xl btn-primary-mobile text-white font-semibold hover:bg-pink-600 disabled:opacity-50 text-sm"
              disabled={rating === 0}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 