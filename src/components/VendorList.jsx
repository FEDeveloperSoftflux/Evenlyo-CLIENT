import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

// Import assets
import vendor1Png from '../assets/images/Vendor1.png';
import vendor2Png from '../assets/images/Vendor2.png';
import vendor3Png from '../assets/images/Vendor3.png';;

const VendorList = ({ selectedCategory }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const vendors = [
    // Entertainment & Attractions
    {
      id: 1,
      name: "Pulse Events & Entertainment",
      logo: "/assets/Vendor1.png",
      services: "DJs, Sound & Lighting, Live Bands, MCs",
      location: "Los Angeles, CA",
      coverage: "Greater Los Angeles, Orange County",
      whyChoose: "With over 500 successful events and 5-star ratings, we bring professionalism and energy to every show.",
      rating: 5,
      phone: "(123) 456-7890",
      email: "pulse@entertainment.com",
      category: "Entertainment & Attractions",
    },
    {
      id: 2,
      name: "PartyStar Performers",
      logo: "/assets/Vendor2.png",
      services: "Magicians, Dancers, Clowns, Kids Entertainment",
      location: "Austin, TX",
      coverage: "Austin, San Antonio, Houston",
      whyChoose: "Fun and engaging acts tailored for all age groups. 300+ kid parties served with joy!",
      rating: 4.8,
      phone: "(512) 222-3344",
      email: "booking@partystar.com",
      category: "Entertainment & Attractions",
    },
    {
      id: 3,
      name: "Midnight Beats",
      logo: "/assets/Vendor3.png",
      services: "EDM DJs, Light Shows, Laser Displays",
      location: "Las Vegas, NV",
      coverage: "Nevada, California",
      whyChoose: "We specialize in turning up the night — full EDM packages with immersive lighting!",
      rating: 4.9,
      phone: "(702) 888-7777",
      email: "info@midnightbeats.com",
      category: "Entertainment & Attractions",
    },

    // Food & Drinks
    {
      id: 4,
      name: "Gourmet Bites Catering",
      logo: "/assets/Vendor3.png",
      services: "Buffets, Plated Dinners, Bartending, Desserts",
      location: "New York, NY",
      coverage: "NYC, Long Island, New Jersey",
      whyChoose: "Award-winning chefs and 100+ customizable menus for weddings, corporate, and private events.",
      rating: 4.8,
      phone: "(212) 555-1234",
      email: "catering@gourmetbites.com",
      category: "Food & Drinks",
    },
    {
      id: 5,
      name: "Sip & Serve Bar Co.",
      logo: "/assets/Vendor2.png",
      services: "Mocktails, Mixology, Bartenders, Beverage Stations",
      location: "Chicago, IL",
      coverage: "Chicagoland & Suburbs",
      whyChoose: "Stylish bar setups with signature cocktails and pro mixologists to elevate your party.",
      rating: 4.7,
      phone: "(312) 111-9090",
      email: "cheers@sipserve.com",
      category: "Food & Drinks",
    },
    {
      id: 6,
      name: "Flavors of Joy",
      logo: "/assets/Vendor1.png",
      services: "Cultural Cuisines, Food Trucks, Buffet Setup",
      location: "San Francisco, CA",
      coverage: "Bay Area & Napa Valley",
      whyChoose: "From Indian to Italian, we bring authentic taste with vibrant presentations.",
      rating: 4.9,
      phone: "(415) 404-2020",
      email: "orders@flavorsofjoy.com",
      category: "Food & Drinks",
    },

    // Decoration & Styling
    {
      id: 7,
      name: "Blissful Moments Decor",
      logo: "/assets/Vendor2.png",
      services: "Floral Arrangements, Backdrops, Drapery, Centerpieces",
      location: "Miami, FL",
      coverage: "Miami-Dade, Broward, Palm Beach",
      whyChoose: "Creative decorators turning venues into dreamy experiences. Over 300 weddings styled.",
      rating: 4.9,
      phone: "(305) 789-1010",
      email: "decor@blissfulmoments.com",
      category: "Decoration & Styling",
    },
    {
      id: 8,
      name: "Elegant Themes & Touches",
      logo: "/assets/Vendor1.png",
      services: "Themed Decor, Custom Props, Lighting",
      location: "Seattle, WA",
      coverage: "Washington State",
      whyChoose: "From fairytales to modern minimalism — we design it all with flair and perfection.",
      rating: 4.8,
      phone: "(206) 444-1212",
      email: "themes@eleganttouches.com",
      category: "Decoration & Styling",
    },
    {
      id: 9,
      name: "EventArtistry",
      logo: "/assets/Vendor3.png",
      services: "Stage Styling, Wedding Mandaps, Cultural Decor",
      location: "Atlanta, GA",
      coverage: "Georgia & Carolinas",
      whyChoose: "Experts in ethnic and theme-based décor with cultural sensitivity and high-end finishing.",
      rating: 4.9,
      phone: "(678) 232-3434",
      email: "hello@eventartistry.com",
      category: "Decoration & Styling",
    },

    // Locations & Party Tents
    {
      id: 10,
      name: "Elite Event Venues",
      logo: "/assets/Vendor3.png",
      services: "Indoor & Outdoor Venues, Banquet Halls, Gardens",
      location: "Chicago, IL",
      coverage: "Chicagoland Area",
      whyChoose: "Versatile spaces for weddings, conferences, and galas — fully managed and customizable.",
      rating: 4.7,
      phone: "(312) 456-7890",
      email: "venues@eliteevents.com",
      category: "Locations & Party Tents",
    },
    {
      id: 11,
      name: "Tentify Rentals",
      logo: "/assets/Vendor2.png",
      services: "Luxury Tents, Furniture Rentals, Heaters, Lighting",
      location: "Houston, TX",
      coverage: "Texas Statewide",
      whyChoose: "Elegant tents and complete outdoor setup solutions for any guest count.",
      rating: 4.8,
      phone: "(713) 999-8181",
      email: "bookings@tentify.com",
      category: "Locations & Party Tents",
    },
    {
      id: 12,
      name: "Skyline Rooftop Spaces",
      logo: "/assets/Vendor1.png",
      services: "Rooftop Venues, Bar Spaces, City Views",
      location: "New York, NY",
      coverage: "Manhattan, Brooklyn, Queens",
      whyChoose: "Premium skyline venues with included amenities, perfect for luxury events.",
      rating: 4.9,
      phone: "(917) 456-7777",
      email: "events@skylineview.com",
      category: "Locations & Party Tents",
    },

    // Staff & Services
    {
      id: 13,
      name: "Pro Event Staffing",
      logo: "/assets/Vendor1.png",
      services: "Wait Staff, Security, Clean-Up Crew, Ushers",
      location: "Dallas, TX",
      coverage: "Dallas-Fort Worth Metroplex",
      whyChoose: "Fully trained professionals ensuring your event runs smoothly from start to finish.",
      rating: 4.6,
      phone: "(972) 321-4567",
      email: "staffing@proevent.com",
      category: "Staff & Services",
    },
    {
      id: 14,
      name: "Golden Hands Hospitality",
      logo: "/assets/Vendor2.png",
      services: "Valet, Greeters, Kitchen Helpers, On-Demand Staff",
      location: "Phoenix, AZ",
      coverage: "Arizona & Las Vegas",
      whyChoose: "Elite service crew with hospitality training and punctuality you can count on.",
      rating: 4.8,
      phone: "(480) 777-2323",
      email: "team@goldenhands.com",
      category: "Staff & Services",
    },
    {
      id: 15,
      name: "Event Angels",
      logo: "/assets/Vendor3.png",
      services: "Bridal Assistants, Event Managers, Tech Crew",
      location: "San Diego, CA",
      coverage: "California South Coast",
      whyChoose: "We go beyond staff — we manage chaos gracefully so you can enjoy stress-free celebrations.",
      rating: 4.9,
      phone: "(858) 123-4567",
      email: "info@eventangels.com",
      category: "Staff & Services",
    },
  ];

  const filteredVendors = selectedCategory
    ? vendors.filter((v) => v.category === selectedCategory)
    : vendors;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-orange-400 text-lg">
        ★
      </span>
    ));
  };

  return (
    <section id="vendor-feature" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          {t('related_vendors')}
        </h2>

        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-6">
          {filteredVendors.length === 0 ? (
            <div className="text-center text-gray-500 py-12 text-lg font-medium">
              No vendors found for this category.
            </div>
          ) : (
            filteredVendors.map((vendor, index) => (
              <div
                key={vendor.id}
                onClick={() => navigate(`/vendor/${vendor.id}`)}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border-gradient-brand relative cursor-pointer"
              >
                {/* Available Status Pill */}
                <div className="absolute right-4 top-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Available
                </div>
                {/* Left Section - Logo and Details */}
                <div className="flex items-center space-x-6 flex-1">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <img
                      src={vendor.logo}
                      alt={vendor.name}
                      className="w-40 h-40 rounded-lg"
                    />
                  </div>

                  {/* Vendor Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center">
                        {renderStars(vendor.rating)}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Services:</span>{" "}
                        {vendor.services}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {vendor.location}
                      </p>
                      <p className="text-gray-500">{vendor.coverage}</p>
                      <p className="mt-2">
                        <span className="font-medium text-gray-700">
                          Why Choose Us:
                        </span>{" "}
                        {vendor.whyChoose}
                        <span className="text-primary-500 ml-1 cursor-pointer hover:underline font-medium">
                          View Profile
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Contact Information */}
                <div className="text-right text-sm text-gray-600 flex-shrink-0 ml-6">
                  <p className="font-bold text-gray-900 mb-3">
                    Contact Information
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end space-x-1">
                      <span>📞</span>
                      <span className="font-medium">Call:</span>
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-1">
                      <span>📧</span>
                      <span className="font-medium">Email:</span>
                      <span>{vendor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile & Tablet Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 md:gap-6">
          {filteredVendors.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12 text-lg font-medium">
              No vendors found for this category.
            </div>
          ) : (
            filteredVendors.map((vendor, index) => (
              <div
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col cursor-pointer"
                onClick={() => navigate(`/vendor/${vendor.id}`)}
              >
                {/* Vendor Image */}
                <img src={vendor.logo} alt={vendor.name} className=" ml-5 mr-5 w-70 h-60 mt-2 mb-2 " />

                <div className="p-4 flex-1 flex flex-col">
                  {/* Name & Discount */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-lg whitespace-nowrap">
                      • 20% OFF
                    </span>
                  </div>
                  {/* Coverage/Location */}
                  <div className="text-gray-500 text-sm mb-2">{vendor.coverage}</div>
                  {/* Location */}
                  <div className="text-xs mb-2"><span className="font-bold">Location:</span> {vendor.location}</div>
                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-2">
                  <span className="font-bold text-xs">Services:</span>
                    {vendor.services.split(',').map((service, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{service.trim()}</span>
                    ))}
                    <span className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded-full cursor-pointer">See All</span>
                  </div>
                  {/* Why Choose Us */}
                  <div className="text-xs text-gray-600 mb-2">
                    <span className="font-medium text-gray-700">Why Chose Us :</span>
                    {vendor.whyChoose}
                    <span className="text-pink-500 ml-1 cursor-pointer hover:underline font-medium">View More</span>
                  </div>
                  {/* Rating & Reviews and CTA Button */}
                  <div className="flex items-center justify-between gap- mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="text-yellow-400">★★★★</span>
                      <span className="font-semibold text-gray-800">4.8</span>
                      <span>(127 reviews)</span>
                    </div>
                    <button className="btn-primary-mobile  text-white font-bold py-2 px-8 rounded-lg whitespace-nowrap">View Profile</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorList;
