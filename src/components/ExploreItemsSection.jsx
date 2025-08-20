import React, { useState } from "react";

const allDummyItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/200x150?text=Item+1",
    title: "Elegant Vase",
    description: "A beautiful decorative vase for your event table.",
    price: 29.99,
    wishlisted: false,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200x150?text=Item+2",
    title: "LED Fairy Lights",
    description: "String lights to add a magical touch to your venue.",
    price: 14.5,
    wishlisted: false,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/200x150?text=Item+3",
    title: "Table Centerpiece",
    description: "Elegant centerpiece for wedding or party tables.",
    price: 45.0,
    wishlisted: false,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/200x150?text=Item+4",
    title: "Party Balloons",
    description: "Colorful balloons for all occasions.",
    price: 9.99,
    wishlisted: false,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/200x150?text=Item+5",
    title: "Disposable Plates",
    description: "Eco-friendly plates for easy cleanup.",
    price: 12.0,
    wishlisted: false,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/200x150?text=Item+6",
    title: "Event Candles",
    description: "Scented candles to set the mood.",
    price: 7.5,
    wishlisted: false,
  },
];

const initialItems = allDummyItems.slice(0, 3);


function ExploreItemsSection() {
  const [items, setItems] = useState(initialItems);
  const [viewAll, setViewAll] = useState(false);

  const toggleWishlist = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, wishlisted: !item.wishlisted } : item
      )
    );
  };

  const handleViewAll = () => {
    setItems(allDummyItems);
    setViewAll(true);
  };

  return (
    <section id="explore-items-section" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 text-lg py-12">No items found.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary-600">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="focus:outline-none"
                    aria-label="Add to wishlist"
                  >
                    {item.wishlisted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#f43f5e" viewBox="0 0 24 24" className="w-7 h-7">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f43f5e" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 19.071A8.966 8.966 0 0112 21c2.21 0 4.21-.805 5.879-2.121M16.95 7.05a5 5 0 00-7.07 0l-.88.88-.88-.88a5 5 0 00-7.07 7.07l.88.88L12 21.35l7.07-7.07.88-.88a5 5 0 00-7.07-7.07z" />
                      </svg>
                    )}
                  </button>
                </div>
                <button className="btn-primary-mobile w-full py-2 rounded-xl font-semibold text-white text-lg transition-colors hover:bg-primary-700">
                  Buy Now
                </button>
              </div>
            ))
          )}
        </div>
        {!viewAll && (
          <div className="flex justify-center mt-10">
            <button
              className="btn-primary-mobile px-8 py-3 rounded-xl font-semibold text-white text-base transition-colors hover:bg-primary-700"
              onClick={handleViewAll}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploreItemsSection;
