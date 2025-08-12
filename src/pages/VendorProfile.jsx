import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, Phone, Mail, Users, MapPin, Eye } from "lucide-react"
import api from '../services/api';
import { endPoints } from '../constants/api';

// Import assets (fallback images)
import profileIcon from '../assets/icons/Profile.svg';
import djImage from '../assets/images/DJ.png';
import bannerImage from '../assets/images/Banner.png';
import vendor1Png from '../assets/images/Vendor1.png';
import vendor2Png from '../assets/images/Vendor2.png';
import vendor3Png from '../assets/images/Vendor3.png';

const profiles = [
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

const dummyBanner = "/assets/Banner.png";
const dummyFollowers = "10k followers";
const dummyEmployees = "200-500 employees";
const dummyRole = "Coach in Organization Name";
const dummyLocation = "Via Camilla Cavour, Florence(Fl), Tuscany, Italy";
const dummyPersonName = "Asima Khan";

const tabList = [
  { key: "about", label: "About", icon: <span className="font-bold">&#9679;</span> },
  { key: "reviews", label: "Reviews", icon: <span className="font-bold">&#9733;</span> },
  { key: "book", label: "Book Item", icon: <span className="font-bold">&#128197;</span> },
];

const VendorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [ProfileData, setProfileData] = useState(null);
  const [vendorListings, setVendorListings] = useState([]);
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to extract text from multilingual objects
  const getLocalizedText = (textObj, fallback = 'N/A') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object') {
      const currentLang = 'en'; // Default to English for now
      return textObj[currentLang] || textObj.en || textObj.nl || Object.values(textObj)[0] || fallback;
    }
    return fallback;
  };

  // UI state
  const [activeTab, setActiveTab] = useState("about");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllDJs, setShowAllDJs] = useState(false);
  const [showAllBands, setShowAllBands] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch vendor profile data
  useEffect(() => {
    const fetchVendorProfile = async () => {
      if (!id) {
        setError('Vendor ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch vendor profile data
        const profileResponse = await api.get(endPoints.vendors.byDetails(id));
        setProfileData(profileResponse.data.data);

        // Fetch popular listings
        try {
          const popularResponse = await api.get(endPoints.listings.popular);
          // Filter popular listings by vendor ID if needed, or use all popular listings
          const allPopular = popularResponse.data.data || popularResponse.data || [];
          setPopularListings(allPopular.slice(0, 6)); // Limit to 6 popular items
        } catch (popularErr) {
          console.log('No popular listings found:', popularErr);
          setPopularListings([]);
        }

      } catch (err) {
        console.error('Error fetching vendor profile:', err);
        if (err.response?.status === 404) {
          setError('Vendor not found');
        } else if (err.response?.status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load vendor profile. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dummy reviews data (now 7 reviews)
  const reviews = [
    {
      name: "Areeba Khan",
      text: "DJ RayBeatz absolutely lit up our mehndi night. The playlist was perfectly tailored, and everyone was on the dance floor. Highly recommended!",
      stars: 5,
      time: "1 Month Ago",
      highlight: false,
    },
    {
      name: "Usman Malik",
      text: "He arrived early, setup professionally, and the vibe was amazing. Would give 5 stars if volume could've been a bit higher outdoors.",
      stars: 4,
      time: "1 Month Ago",
      highlight: true,
    },
    {
      name: "Nadia Rizvi",
      text: "He knew exactly when to switch the mood. The energy never dropped. Even our parents were dancing by the end!",
      stars: 5,
      time: "1 Month Ago",
      highlight: false,
    },
    {
      name: "Hassan Zafar",
      text: "This DJ was on another level. Lights, sound, interaction — everything was top-tier. Definitely booking again!",
      stars: 5,
      time: "1 Month Ago",
      highlight: false,
    },
    {
      name: "Zainab Iftikhar",
      text: "The sound was crystal clear. He even took guest song requests and mixed them live. 10/10 experience.",
      stars: 5,
      time: "1 Month Ago",
      highlight: false,
    },
    // Extra reviews for 'Show All'
    {
      name: "Ali Raza",
      text: "Professional and friendly. The event went smoothly and everyone enjoyed the music selection.",
      stars: 5,
      time: "2 Months Ago",
      highlight: false,
    },
    {
      name: "Sara Ahmed",
      text: "Great experience overall. Would recommend for any event!",
      stars: 4,
      time: "2 Months Ago",
      highlight: false,
    },
  ];

  // Fallback images for when API doesn't provide them
  const getFallbackLogo = () => {
    const fallbackLogos = [vendor1Png, vendor2Png, vendor3Png];
    return fallbackLogos[Math.floor(Math.random() * fallbackLogos.length)];
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading vendor profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No vendor data
  if (!ProfileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20 text-xl text-gray-500">No vendor data available.</div>
      </div>
    );
  }

  // Use API data with fallbacks
  const profile = {
    ...ProfileData,
    // Extract name from personalInfo
    name: ProfileData.userDetails?.name || dummyPersonName,
    // Extract business name as secondary option
    businessName: ProfileData.businessDetails?.businessName || '',

    // Extract other fields with fallbacks
    logo: ProfileData.businessDetails?.profileImage || getFallbackLogo(),
    banner: ProfileData.businessDetails?.bannerImage || bannerImage,
    rating: ProfileData.businessDetails?.rating || 4.5,
    totalReviews: ProfileData.businessDetails?.reviews || 0,
    phone: ProfileData.businessDetails?.phone || 'Not provided',
    email: ProfileData.businessDetails?.email || 'Not provided',
    location: ProfileData.businessDetails?.location || dummyLocation,
    description: ProfileData.businessDetails?.description || '',
    services: ProfileData.category?.subCategory?.map(cat => getLocalizedText(cat.name)).join(', ') || dummyRole,
    employees: ProfileData.businessDetails?.employees || dummyEmployees,
    followers: ProfileData.businessDetails?.followers || dummyFollowers,
    whyChooseUs: ProfileData.businessDetails?.whyChooseUs || dummyFollowers,

    // Add ID for routing
    id: ProfileData._id
  };

  // Helper to group listings by subCategory (with fallback)
  const groupListingsBySubcategory = (listings) => {
    const grouped = {};
    listings.forEach(listing => {
      const subCat = getLocalizedText(listing.subCategory, 'Other');
      if (!grouped[subCat]) grouped[subCat] = [];
      grouped[subCat].push(listing);
    });
    return grouped;
  };

  // Use fetched listings data with fallback to ProfileData
  const listings = vendorListings.length > 0 ? vendorListings : (ProfileData.listings || []);
  const popular = popularListings.length > 0 ? popularListings : (ProfileData.popularListings || []);
  const groupedListings = groupListingsBySubcategory(listings);

  return (
    <div className="min-h-screen bg-gray-50" >
      {/* Header */}
      < Header />

      {/* Hero Section */}
      < div className="bg-white text-gray-900 pt-0 pb-8 sm:pb-10 lg:pb-12 max-w-7xl mx-auto px-4  md:pb-12 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] relative shadow-lg mt-5" >
        {/* Banner Image */}
        <div className="w-full h-48 sm:h-64 rounded-t-2xl sm:rounded-t-3xl lg:rounded-t-[2rem] overflow-hidden" >
          <img
            src={profile.banner}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
        </div >
        {/* Overlapping Logo and Info Row */}
        <div className="relative z-10" >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-5 text-center md:text-left">
            {/* Logo and Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end w-full md:w-auto">
              <div className="flex-shrink-0">
                <div className="w-26 h-24 md:w-40 md:h-40 rounded-4xl shadow-lg overflow-hidden  -mt-16 md:-mt-16 mx-auto md:mx-0">
                  <img
                    src={profile.logo}
                    alt={profile.businessName || profile.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {profile.businessName || profile.name}
                </div>
                <div className="text-sm text-gray-500 font-medium mb-4">{profile.services || dummyRole}</div>
                <div className="text-xs text-gray-500 flex flex-col md:flex-row flex-wrap items-center gap-1 md:gap-2">
                  <span>{profile.location || dummyLocation}</span>
                  <span className="hidden md:inline mx-1 ">•</span>
                  <span>{profile.followers || dummyFollowers}</span>
                  <span className="hidden md:inline mx-1">•</span>
                  <span>{profile.employees || dummyEmployees}</span>
                </div>
              </div>
            </div>
            {/* Contact & Rating */}
            <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>Call: {profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>Email: {profile.email}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 justify-center md:justify-end">
                <span>{profile.rating}</span>
                <span className="flex items-center">
                  {[...Array(Math.round(profile.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </span>
              </div>
            </div>
          </div>
          {/* Contact Me Button */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6 flex flex-col md:flex-row items-center gap-3">
            <button className="btn-primary-mobile text-white font-semibold px-8 py-3 rounded-2xl shadow-md hover:from-pink-600 hover:to-primary-600 transition-all w-full md:w-auto"
              onClick={() => navigate(`/chat/${profile.id}`)}
            >
              Contact Me!
            </button>
            <button className="w-10 h-10 flex  justify-center rounded-full bg-gray-100 text-gray-400 text-xl font-bold">...</button>
          </div>
        </div >
      </div >



      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mt-20 justify-items-center" >
        {
          isMobile ? (
            <div className="w-full overflow-x-auto" >
              <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
                className="w-full"
              >
                <SwiperSlide className="!w-auto">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === "about"
                      ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                      : "text-gray-700 hover:text-pink-600 bg-gray-100"
                      }`}
                  >
                    <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                      <img src={activeTab === 'about' ? '../assets/icons/AboutActive.svg' : '../assets/icons/About.svg'} alt="About Icon" className="w-6 h-6 inline-block align-middle" />
                    </div>
                    <span>About</span>
                  </button>
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === "reviews"
                      ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                      : "text-gray-700 hover:text-pink-600 bg-gray-100"
                      }`}
                  >
                    <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                      <img src={activeTab === 'reviews' ? '../assets/icons/StarActive.svg' : '../assets/icons/Star.svg'} alt="Star Icon" className="w-6 h-6 inline-block align-middle" />
                    </div>
                    <span>Reviews</span>
                  </button>
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                  <button
                    onClick={() => setActiveTab("book")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === "book"
                      ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                      : "text-gray-700 hover:text-pink-600 bg-gray-100"
                      }`}
                  >
                    <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                      <img src={activeTab === 'book' ? '../assets/icons/MusicActive.svg' : '../assets/icons/Music.svg'} alt="Music Icon" className="w-6 h-6 inline-block align-middle" />
                    </div>
                    <span>Book Item</span>
                  </button>
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                  <button
                    onClick={() => setActiveTab("popular")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === "popular"
                      ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                      : "text-gray-700 hover:text-pink-600 bg-gray-100"
                      }`}
                  >
                    <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                      <img src={activeTab === 'popular' ? '../assets/icons/PopularActive.svg' : '../assets/icons/Popular.svg'} alt="Popular Icon" className="w-6 h-6 inline-block align-middle" />
                    </div>
                    <span>Popular Items</span>
                  </button>
                </SwiperSlide>
              </Swiper>
            </div>
          ) : (
            <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="flex flex-nowrap space-x-1 bg-gray-100 p-1 rounded-2xl min-w-max">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`flex items-center space-x-2 px-4 md:px-8 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeTab === "about"
                    ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                    : "text-gray-700 hover:text-pink-600"
                    }`}
                >
                  <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                    <img src={activeTab === 'about' ? '../assets/icons/AboutActive.svg' : '../assets/icons/About.svg'} alt="About Icon" className="w-6 h-6 inline-block align-middle" />
                  </div>
                  <span>About</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex items-center space-x-2 px-4 md:px-8 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeTab === "reviews"
                    ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                    : "text-gray-700 hover:text-pink-600"
                    }`}
                >
                  <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                    <img src={activeTab === 'reviews' ? '../assets/icons/StarActive.svg' : '../assets/icons/Star.svg'} alt="Star Icon" className="w-6 h-6 inline-block align-middle" />
                  </div>
                  <span>Reviews</span>
                </button>
                <button
                  onClick={() => setActiveTab("book")}
                  className={`flex items-center space-x-2 px-4 md:px-8 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeTab === "book"
                    ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                    : "text-gray-700 hover:text-pink-600"
                    }`}
                >
                  <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                    <img src={activeTab === 'book' ? '../assets/icons/MusicActive.svg' : '../assets/icons/Music.svg'} alt="Music Icon" className="w-6 h-6 inline-block align-middle" />
                  </div>
                  <span>Book Item</span>
                </button>
                <button
                  onClick={() => setActiveTab("popular")}
                  className={`flex items-center space-x-2 px-4 md:px-8 py-2 rounded-2xl font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeTab === "popular"
                    ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md"
                    : "text-gray-700 hover:text-pink-600"
                    }`}
                >
                  <div className="bg-white p-1 rounded-xl mr-2 flex items-center justify-center">
                    <img src={activeTab === 'popular' ? '../assets/icons/PopularActive.svg' : '../assets/icons/Popular.svg'} alt="Popular Icon" className="w-6 h-6 inline-block align-middle" />
                  </div>
                  <span>Popular Items</span>
                </button>
              </div>
            </div>
          )}
      </div >

      {/* Tab Content */}
      < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16" >
        {activeTab === "about" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <div className="absolute top-8 right-6 bg-green-100 text-green-700 px-2 md:px-4 py-1 md:py-2 rounded-full font-semibold text-xs md:text-sm">
              • 20% OFF
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">About {profile.name}</h3>
            <div className="mb-2">
              <span className="block font-semibold text-gray-900 text-sm mb-1">Description</span>
              <span className="text-gray-700 text-sm">{profile.description || "No description available."}</span>
            </div>
            <div className="mb-2 mt-3">
              <span className="block font-semibold text-gray-900 text-sm mb-1">Why Choose Us:</span>
              <span className="text-gray-700 text-sm">{profile.whyChooseUs || "No details provided."}</span>
            </div>
            <div className="mt-4">
              <span className="block font-semibold text-gray-900 text-sm mb-1">Services</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.keys(groupedListings).map(subCat => (
                  <span key={subCat} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{subCat}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">All Reviews</h3>
            <div className="flex flex-col gap-3 mb-8">
              {(showAllReviews ? reviews : reviews.slice(0, 5)).map((review, idx) => (
                <div
                  key={idx}
                  className={`flex items-start justify-between gap-4 p-4 rounded-2xl ${review.highlight ? "bg-gray-50" : ""}`}
                >
                  <div className="flex-1">
                    <div className={`font-semibold text-gray-900 mb-1 ${review.highlight ? "text-base" : "text-sm"}`}>{review.name}</div>
                    <div className="text-gray-700 text-sm md:text-base leading-snug">{review.text}</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[90px]">
                    <div className="flex items-center mb-1">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">{review.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="border-2 border-pink-500 text-pink-500 font-semibold rounded-2xl px-6 py-2 text-sm hover:bg-pink-50 transition flex items-center gap-2"
                onClick={() => setShowAllReviews((prev) => !prev)}
              >
                {showAllReviews ? "Show Less" : "Show All Reviews"} <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "book" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {Object.keys(groupedListings).length > 0 ? (
              <>
                {Object.keys(groupedListings).map(subCat => (
                  <div key={subCat} className="mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">List Of {subCat}</h3>
                    <p className="text-gray-500 text-sm mb-4">Start to book {subCat} for your Event. Because everything is in place!</p>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                      {groupedListings[subCat].map((listing, idx) => (
                        <div key={listing._id || listing.id || idx} className="bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
                          <img src={listing.featuredImage || djImage} alt={listing.title} className="w-full h-40 object-cover rounded-t-2xl" />
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <img src={profileIcon} alt={profile.name} className="w-6 h-6 rounded-full" />
                                <span className="text-xs font-medium text-gray-700">{profile.name}</span>
                              </span>
                              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">• Available</span>
                            </div>
                            <h4 className="font-bold text-base text-gray-900 mb-1">{listing.title}</h4>
                            <p className="text-gray-600 text-xs mb-2">{listing.description}</p>
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <span className="font-semibold text-yellow-400 mr-1">{listing.rating || "4.5"}</span>
                              <span>★</span>
                              <span className="ml-2">{listing.pricingPerEvent || "Quote on request"}</span>
                            </div>
                            <button
                              className="mt-auto btn-primary-mobile w-full text-white font-bold py-2 px-4 rounded-lg"
                              onClick={() => navigate('/bookingpage')}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Fallback for listings without subCategory */}
                {listings.filter(listing => !listing.subCategory).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Other Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                      {listings.filter(listing => !listing.subCategory).map((listing, idx) => (
                        <div key={listing._id || listing.id || idx} className="bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
                          <img src={listing.featuredImage || djImage} alt={listing.title} className="w-full h-40 object-cover rounded-t-2xl" />
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <img src={profileIcon} alt={profile.name} className="w-6 h-6 rounded-full" />
                                <span className="text-xs font-medium text-gray-700">{profile.name}</span>
                              </span>
                              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">• Available</span>
                            </div>
                            <h4 className="font-bold text-base text-gray-900 mb-1">{listing.title}</h4>
                            <p className="text-gray-600 text-xs mb-2">{listing.description}</p>
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <span className="font-semibold text-yellow-400 mr-1">{listing.rating || "4.5"}</span>
                              <span>★</span>
                              <span className="ml-2">{listing.pricingPerEvent || "Quote on request"}</span>
                            </div>
                            <button
                              className="mt-auto btn-primary-mobile w-full text-white font-bold py-2 px-4 rounded-lg"
                              onClick={() => navigate('/bookingpage')}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Available</h3>
                <p className="text-gray-500">This vendor hasn't added any services yet. Check back later!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "popular" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Popular Items</h3>
            <p className="text-gray-500 text-sm mb-4">Check out our most popular items!</p>
            {popular.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {popular.map((listing, idx) => (
                  <div key={listing._id || listing.id || idx} className="bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
                    <img src={listing.featuredImage || djImage} alt={listing.title} className="w-full h-40 object-cover rounded-t-2xl" />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-2">
                          <img src={profileIcon} alt={profile.name} className="w-6 h-6 rounded-full" />
                          <span className="text-xs font-medium text-gray-700">{profile.name}</span>
                        </span>
                        <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">• Available</span>
                      </div>
                      <h4 className="font-bold text-base text-gray-900 mb-1">{listing.title}</h4>
                      <p className="text-gray-600 text-xs mb-2">{listing.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span className="font-semibold text-yellow-400 mr-1">{listing.rating || "4.5"}</span>
                        <span>★</span>
                        <span className="ml-2">{listing.pricingPerEvent || "Quote on request"}</span>
                      </div>
                      <button
                        className="mt-auto btn-primary-mobile w-full text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => navigate('/bookingpage')}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Popular Items Yet</h3>
                <p className="text-gray-500">Popular items will appear here as they gain traction. Check back soon!</p>
              </div>
            )}
          </div>
        )}
      </div >

      {/* Footer */}
      < Footer />
    </div >
  );
};

export default VendorProfile;
