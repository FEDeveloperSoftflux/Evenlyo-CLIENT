import React, { useState } from 'react';
import Story1 from '../assets/images/success1.png';
import Story2 from '../assets/images/success2.png';

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  
  const stories = [
    {
      id: 1,
      title: "I am non-techie person but making website with Listeo was a breeze",
      content: "I tried another directory theme before Listeo and the support was shockingly poor and unprofessional. But with Listeo the support is unbeatable! Huge thanks to Lukas and Mateusz — nothing compares to getting expert help directly from the theme developers!",
      author: "Sina Pérez",
      country: "Mexico",
      flag: "🇲🇽",
      avatar: Story1,
      bgColor: "bg-red-400"
    },
    {
      id: 2,
      title: "Great and reliable theme to help you grow your business or idea!",
      content: "I wanted to create a portal focusing on non-traditional places and accommodation in Slovakia - luxuryhideaways.sk. Listeo helped me create a portal that is fast, clear, and this template saved me a lot of time waiting for programmers!",
      author: "Matúš Záhorec",
      country: "Slovakia",
      flag: "🇸🇰",
      avatar: Story2,
      bgColor: "bg-green-400"
    }
  ];
  
  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };
  
  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };
  
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Success Stories <span className="text-red-500">❤️</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Check <span className="font-semibold text-gray-900">real reviews from our customers</span> across the world.{' '}
            <span className="text-yellow-500">😊</span>
          </p>
        </div>
        
        {/* Stories Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevStory}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 lg:w-12 lg:h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
          >
            <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextStory}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 lg:w-12 lg:h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
          >
            <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Mobile: Show only current story */}
          <div className="block lg:hidden mx-4">
            {stories.length > 0 && (
              <div
                key={stories[currentStory].id}
                className={`relative bg-gray-50 rounded-2xl p-8 transition-all duration-500 opacity-100 transform translate-y-0`}
              >
                {/* Colored background spill effect using pseudo-element */}
                <div 
                  className={`absolute -top-4 -left-4 w-24 h-24 ${stories[currentStory].bgColor} rounded-full opacity-20 blur-2xl`}
                ></div>
                {/* Avatar with colored background */}
                <div className="relative mb-6">
                  <div className={`absolute -top-2 -left-2 w-16 h-16 ${stories[currentStory].bgColor} rounded-full opacity-30 blur-lg`}></div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={stories[currentStory].avatar} 
                      alt={stories[currentStory].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {stories[currentStory].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {stories[currentStory].content}
                  </p>
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{stories[currentStory].author}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-1">{stories[currentStory].flag}</span>
                        {stories[currentStory].country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Show all stories in grid */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 mx-16">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`relative bg-gray-50 rounded-2xl p-8 transition-all duration-500 ${
                  index === currentStory ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-4'
                }`}
              >
                {/* Colored background spill effect using pseudo-element */}
                <div 
                  className={`absolute -top-4 -left-4 w-24 h-24 ${story.bgColor} rounded-full opacity-20 blur-2xl`}
                ></div>
                {/* Avatar with colored background */}
                <div className="relative mb-6">
                  <div className={`absolute -top-2 -left-2 w-16 h-16 ${story.bgColor} rounded-full opacity-30 blur-lg`}></div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={story.avatar} 
                      alt={story.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {story.content}
                  </p>
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{story.author}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-1">{story.flag}</span>
                        {story.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
