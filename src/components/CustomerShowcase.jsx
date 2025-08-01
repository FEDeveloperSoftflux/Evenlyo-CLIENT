import React, { useState, useEffect, useRef } from 'react'

// Import assets
import customerShowcase1 from '../assets/images/customershowcase1.png';
import customerShowcase2 from '../assets/images/customershowcase2.png';
import customerShowcase3 from '../assets/images/customershowcase3.png';;

const CustomerShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  
  // Multiple copies of images for smooth infinite scroll
  const showcaseImages = [
    customerShowcase1,
    customerShowcase2,
    customerShowcase3
  ];
  
  // Create multiple copies for smooth infinite scroll
  const extendedImages = [...showcaseImages, ...showcaseImages, ...showcaseImages];
  const totalSlides = showcaseImages.length;
  const totalExtendedSlides = extendedImages.length;
  
  // Auto-scroll with smooth continuous movement
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // Reset to beginning when reaching the end of extended images
        if (nextSlide >= totalExtendedSlides) {
          return totalSlides; // Reset to the second set for seamless loop
        }
        return nextSlide;
      });
    }, 2000); // Faster transition for smoother feel
    
    return () => clearInterval(interval);
  }, [isAutoScrolling, totalSlides, totalExtendedSlides]);
  
  // Handle seamless reset when reaching the end
  useEffect(() => {
    if (currentSlide >= totalSlides * 2) {
      // After a brief moment, reset to the beginning without animation
      setTimeout(() => {
        setCurrentSlide(totalSlides);
      }, 500);
    }
  }, [currentSlide, totalSlides]);
  
  const goToSlide = (index) => {
    setIsAutoScrolling(false);
    setCurrentSlide(index + totalSlides); // Offset to middle set
    setTimeout(() => setIsAutoScrolling(true), 5000); // Resume auto-scroll after 5 seconds
  };
  
  // Calculate progress for dot animation
  const getProgressForSlide = (slideIndex) => {
    const adjustedCurrent = currentSlide % totalSlides;
    const progress = adjustedCurrent === slideIndex ? 1 : 0;
    return progress;
  };
  
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
            Customer Showcase
          </h2>
          <p className="text-gray-600 text-lg">
            Check out some well-made websites that are{' '}
            <span className="font-semibold text-gray-900">built with Listeo</span>
            <span className="text-yellow-500 ml-1">😊</span>
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Images Container */}
          <div className="overflow-hidden rounded-2xl" ref={scrollContainerRef}>
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentSlide * 100) / totalExtendedSlides}%)`,
                width: `${totalExtendedSlides * 100}%`
              }}
            >
              {extendedImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative flex-shrink-0"
                  style={{ width: `${100 / totalExtendedSlides}%` }}
                >
                  <div className=" relative h-96 lg:h-[500px] overflow-hidden rounded-2xl">
                    <img 
                      src={image} 
                      alt={`Customer showcase ${(index % totalSlides) + 1}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Enhanced gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20"></div>

                    {/* Side gradients */}
                    <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white/50 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-s h-full bg-gradient-to-l from-white/50 to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Navigation Dots with Progress */}
          <div className="flex justify-center mt-8 space-x-3">
            {showcaseImages.map((_, index) => {
              const isActive = (currentSlide % totalSlides) === index;
              const progress = getProgressForSlide(index);
              
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                >
                  {/* Outer ring */}
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-black bg-black' 
                      : 'border-black hover:border-black'
                  }`}>
                    {/* Inner dot */}
                    <div className={`absolute inset-0.5 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-black scale-100' 
                        : 'bg-gray-300 scale-0 group-hover:scale-75 group-hover:bg-gray-400'
                    }`} />
                    
                    {/* Progress ring */}
                    <div className="absolute inset-0 rounded-full">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 16 16">
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className={`transition-all duration-700 ${
                            isActive ? 'text-black' : 'text-transparent'
                          }`}
                          strokeDasharray="37.7"
                          strokeDashoffset={37.7 * (1 - progress)}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Showcase {index + 1}
                  </div>
                </button>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CustomerShowcase;
