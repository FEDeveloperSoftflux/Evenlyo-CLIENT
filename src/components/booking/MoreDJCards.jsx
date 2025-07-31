import React from 'react'

// Import assets

const MoreDJCards = () => {
  const djCards = [
    {
      id: 1,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 2,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 3,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 4,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 5,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 6,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    },
    {
      id: 7,
      name: "DJ Ray Vibes",
      tagline: "Jaydeep",
      location: "Los Angeles, CA",
      experience: "15 years",
      rating: 4.9,
      totalRatings: 5,
      price: 300,
      priceUnit: "Per Event",
      available: true,
      image: "/assets/book-img.png",
      avatarImage: "/assets/jaydeep.png",
      description: "Known for electrifying energy and seamless transitions. DJ Ray brings..."
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            More DJ <span className="text-gray-500">({djCards.length})</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start to book DJ for your <span className="text-pink-500 font-semibold">Event</span> Because everything is on place
          </p>
        </div>

        {/* DJ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {djCards.map((dj) => (
            <div key={dj.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Card Image */}
              <div className="relative">
                <img
                  src={dj.image}
                  alt={dj.name}
                  className="w-full h-48 object-cover"
                />
                {/* Availability Badge */}
                {dj.available && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    ✓ Available
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* DJ Info with Avatar */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={dj.avatarImage}
                    alt={dj.tagline}
                    className="w-8 h-8 rounded-full object-cover border-2 border-pink-200"
                  />
                  <span className="text-sm font-medium text-gray-600">{dj.tagline}</span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-1">{dj.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dj.description}</p>

                {/* Location & Experience */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Location:</span>
                    <span>{dj.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Experience:</span>
                    <span>{dj.experience}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(dj.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {dj.rating} / {dj.totalRatings}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${dj.price}</span>
                    <span className="text-sm text-gray-600 ml-1">{dj.priceUnit}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button className="w-full btn-primary-mobile rounded-2xl text-white font-medium py-3 px-4  transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-6 py-2 bg-white border-2 border-pink-500 text-pink-500 font-medium rounded-2xl hover:bg-pink-50 transition-colors duration-200">
            View All
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreDJCards;
