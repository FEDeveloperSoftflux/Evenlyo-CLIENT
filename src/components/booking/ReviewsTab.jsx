import React, { useState } from 'react';

const ReviewsTab = () => {
  const reviews = [
    {
      id: 1,
      name: "Areeba Khan",
      text: "DJ RayBeatz absolutely lit up our mehndi night. The playlist was perfectly tailored, and everyone was on the dance floor. Highly recommended!",
      rating: 5,
      timeAgo: "1 Month Ago",
      avatar: "/assets/jaydeep.png"
    },
    {
      id: 2,
      name: "Usman Malik",
      text: "He arrived early, setup professionally, and the vibe was amazing. Would give 5 stars if volume could've been a bit higher outdoors.",
      rating: 5,
      timeAgo: "1 Month Ago",
      avatar: "/assets/jaydeep.png"
    },
    {
      id: 3,
      name: "Nadia Rizvi",
      text: "He knew exactly when to switch the mood. The energy never dropped. Even our parents were dancing by the end!",
      rating: 5,
      timeAgo: "1 Month Ago",
      avatar: "/assets/jaydeep.png"
    },
    {
      id: 4,
      name: "Hassan Zafar",
      text: "This DJ was on another level. Lights, sound, interaction — everything was top-tier. Definitely booking again!",
      rating: 5,
      timeAgo: "1 Month Ago",
      avatar: "/assets/jaydeep.png"
    },
    {
      id: 5,
      name: "Zainab Iftikhar",
      text: "The sound was crystal clear. He even took guest song requests and mixed them in live. 10/10 experience.",
      rating: 5,
      timeAgo: "1 Month Ago",
      avatar: "/assets/jaydeep.png"
    }
  ];

  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Reviews</h2>

      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="inline-flex items-center px-6 py-3 bg-gradient-brand text-white rounded-2xl hover:bg-pink-600 transition-colors font-medium"
        >
          {showAllReviews ? 'Show Less Reviews' : 'Show All Reviews'}
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${showAllReviews ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewsTab;
