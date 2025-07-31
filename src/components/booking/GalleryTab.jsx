import React, { useState } from 'react'


const GalleryTab = () => {
  const galleryImages = [
    { id: 1, src: '/assets/book-img.png', alt: 'DJ John Main' },
    { id: 2, src: '/assets/book-img2.png', alt: 'DJ Event 1' },
    { id: 3, src: '/assets/book-img3.png', alt: 'DJ Event 2' },
    { id: 4, src: '/assets/book-img4.png', alt: 'DJ Event 3' },
  ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Image Selector - Vertical on desktop, no scroll */}
      <div className="flex flex-row lg:flex-col gap-3 lg:gap-4">
        {galleryImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={`w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl cursor-pointer shadow-md transition-all hover:shadow-lg ${selectedImage.id === image.id ? 'ring-2 ring-pink-500 scale-105' : 'hover:ring-2 hover:ring-gray-300'
              }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] lg:min-h-[500px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <img src="/assets/DJProfile.png" alt="DJ Profile" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0  transform -skew-y-6 scale-110" style={{ zIndex: 1 }}></div>
        </div>

      </div>
    </div>
  );
};

export default GalleryTab;

