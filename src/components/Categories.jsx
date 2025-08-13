import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import api from "../store/api";
import { endPoints } from "../constants/api";

const Categories = ({ selectedCategory, setSelectedCategory, setVendors, setVendorsLoading, hideText = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const catRes = await api.get(endPoints.categories.all);
        const categoriesData = catRes.data.data || [];
        setCategories(categoriesData);

        // Set default selected category if not already set
        if (!selectedCategory && categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          const categoryName = getName(firstCategory);
          setSelectedCategory && setSelectedCategory(categoryName);
          setSelectedCategoryId(firstCategory._id || firstCategory.id);
        } else if (selectedCategory) {
          // Find the selected category ID
          const foundCategory = categoriesData.find(cat => getName(cat) === selectedCategory);
          if (foundCategory) {
            setSelectedCategoryId(foundCategory._id || foundCategory.id);
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategoryId) return;

      try {
        const subcatRes = await api.get(endPoints.subcategories.byCategory(selectedCategoryId));
        const subcategoriesData = subcatRes.data.data || [];
        setSubcategories(subcategoriesData);

        // Set first subcategory as default
        if (subcategoriesData.length > 0 && !selectedSubcategory) {
          setSelectedSubcategory(getName(subcategoriesData[0]));
        }

        console.log("Subcategories for category:", subcategoriesData);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId]);

  // Fetch listings when category or subcategory changes
  useEffect(() => {
    const fetchListings = async () => {
      if (!selectedCategoryId) return;
      
      try {
        // Build query parameters for filter endpoint
        const queryParams = new URLSearchParams();
        queryParams.append('categoryId', selectedCategoryId);
        
        // Add subcategory if one is selected
        if (selectedSubcategory) {
          const foundSubcategory = subcategories.find(subcat => getName(subcat) === selectedSubcategory);
          if (foundSubcategory) {
            const subcategoryId = foundSubcategory._id || foundSubcategory.id;
            queryParams.append('subCategoryId', subcategoryId);
          }
        }
        
        // Add sorting and pagination
        queryParams.append('sortBy', 'rating');
        queryParams.append('sortOrder', 'desc');
        queryParams.append('limit', '12');
        
        const listRes = await api.get(`${endPoints.listings.filter}?${queryParams.toString()}`);
        const listingsData = listRes.data.data || [];
        setListings(listingsData);
        
        console.log("Listings for category/subcategory:", listingsData);
        console.log("API endpoint used:", `${endPoints.listings.filter}?${queryParams.toString()}`);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        console.error("Error details:", err.response?.data || err.message);
        setListings([]);
      }
    };

    fetchListings();
  }, [selectedCategoryId, selectedSubcategory, subcategories]);

  // Fetch vendors by category
  useEffect(() => {
    const fetchVendorsByCategory = async () => {
      if (!selectedCategoryId || !setVendors || !setVendorsLoading) return;

      try {
        setVendorsLoading(true);
        console.log("Fetching vendors for category ID:", selectedCategoryId);
        const vendorRes = await api.get(endPoints.vendors.byCategory(selectedCategoryId));
        const vendorsData = vendorRes.data.data || vendorRes.data || [];
        console.log("Raw vendor API response:", vendorRes.data);
        console.log("Processed vendors data:", vendorsData);
        setVendors(vendorsData);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
        console.error("API endpoint used:", endPoints.vendors.byCategory(selectedCategoryId));
        setVendors([]);
      } finally {
        setVendorsLoading(false);
      }
    };

    fetchVendorsByCategory();
  }, [selectedCategoryId, setVendors, setVendorsLoading]);

  const getName = (item) => {
    if (!item) return "No Name";

    // Handle different name formats - ensure we always return a string
    if (typeof item.name === "string") {
      return item.name;
    }
    
    if (item.name && typeof item.name === "object") {
      // Prioritize English, then Dutch, then first available value
      if (item.name.en && typeof item.name.en === "string") {
        return item.name.en;
      }
      if (item.name.nl && typeof item.name.nl === "string") {
        return item.name.nl;
      }
      // If name is an object but doesn't have en/nl, try to get first value
      const firstKey = Object.keys(item.name)[0];
      if (firstKey && typeof item.name[firstKey] === "string") {
        return item.name[firstKey];
      }
    }

    // Check other possible string fields
    if (typeof item.title === "string") return item.title;
    if (typeof item.label === "string") return item.label;
    if (typeof item.categoryName === "string") return item.categoryName;
    if (typeof item.subcategoryName === "string") return item.subcategoryName;
    
    // Handle if title is also an object
    if (item.title && typeof item.title === "object") {
      if (item.title.en && typeof item.title.en === "string") return item.title.en;
      if (item.title.nl && typeof item.title.nl === "string") return item.title.nl;
    }
    
    return "No Name";
  };

  const getIcon = (item) => {
    if (!item) return null;

    console.log('getIcon called with item:', item);

    // Handle different icon formats
    if (typeof item.icon === "string" && item.icon.trim() !== '') {
      // If it's a URL or path, return it
      if (item.icon.includes('/') || item.icon.includes('.')) {
        return item.icon;
      }
      // If it's just an emoji or text, return it
      return item.icon;
    }

    // Check for other possible icon fields
    return item.iconUrl || item.image || null;
  };

  const handleCategoryClick = (category) => {
    const categoryName = getName(category);
    const categoryId = category._id || category.id;
    console.log("Category clicked:", categoryName, "ID:", categoryId);

    setSelectedCategory && setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(getName(subcategory));
  };

  // Get current subcategories for selected category
  const getCurrentSubcategories = () => {
    return subcategories || [];
  };

  // Filter listings for selected subcategory
  const filteredListings = listings.filter(listing => {
    if (!selectedSubcategory) return true;
    // You can add more sophisticated filtering here based on your data structure
    return true;
  });

  // Determine how many listings to show on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 448;
  let listingsToShow = filteredListings;
  if (!showAllVendors && filteredListings.length > 3) {
    listingsToShow = isMobile ? filteredListings.slice(0, 3) : filteredListings;
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {t("error_occurred")}: {error}
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {!hideText && (
          <div className="text-center mb-responsive">
            <h2 className="text-responsive-h2 text-gray-900">
              Explore <span className="text-primary-500">Categories</span>
            </h2>
          </div>
        )}

        {/* Category Icons */}
        {!hideText && (
          <div
            className="grid grid-cols-3 gap-y-6 gap-x-2 justify-items-center mb-responsive md:flex md:justify-center md:items-start md:gap-y-0 md:gap-x-0 md:space-x-8 md:overflow-visible md:pb-0"
          >
            {/* First row: first 3 categories */}
            {categories.slice(0, 3).map((category) => (
              <div
                key={category._id || category.id}
                onClick={() => handleCategoryClick(category)}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 min-w-max ${selectedCategory === getName(category) ? 'transform scale-105' : 'hover:scale-102'
                  }`}
              >
                <div
                  className={`category-card-mobile sm:category-card-desktop border-4 transition-all duration-300 ${selectedCategory === getName(category)
                    ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 border-white shadow-category'
                    : 'bg-white border-gray-200 hover:border-primary-300 shadow-card'
                    }`}
                >
                  {(() => {
                    const iconSrc = getIcon(category);
                    if (iconSrc && (iconSrc.includes('/') || iconSrc.includes('.'))) {
                      // It's an image URL/path
                      return (
                        <img
                          src={iconSrc}
                          alt={getName(category)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${selectedCategory === getName(category) ? 'filter brightness-0 invert' : ''
                            }`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'inline';
                          }}
                        />
                      );
                    } else if (iconSrc) {
                      // It's an emoji or text
                      return (
                        <span className={`text-2xl ${selectedCategory === getName(category) ? 'filter brightness-0 invert' : ''
                          }`}>{iconSrc}</span>
                      );
                    } else {
                      // Fallback
                      return (
                        <span className={`text-2xl ${selectedCategory === getName(category) ? 'filter brightness-0 invert' : ''
                          }`}>📁</span>
                      );
                    }
                  })()}
                  <span className="text-2xl hidden">📁</span>
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium text-center max-w-20 sm:max-w-28 leading-tight transition-all duration-300 ${selectedCategory === getName(category) ? 'text-primary-500 font-semibold' : 'text-gray-700'
                    }`}
                >
                  {getName(category)}
                </span>
              </div>
            ))}
            {/* Second row: remaining categories, centered on mobile */}
            {categories.length > 3 && (
              <div className="col-span-3 flex justify-center gap-x-4 md:col-span-1 md:flex-none md:justify-start md:gap-x-8">
                {categories.slice(3).map((category) => (
                  <div
                    key={category._id || category.id}
                    onClick={() => handleCategoryClick(category)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 min-w-max ${selectedCategory === getName(category) ? 'transform scale-105' : 'hover:scale-102'
                      }`}
                  >
                    <div
                      className={`category-card-mobile sm:category-card-desktop border-4 transition-all duration-300 ${selectedCategory === getName(category)
                        ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 border-white shadow-category'
                        : 'bg-white border-gray-200 hover:border-primary-300 shadow-card'
                        }`}
                    >
                      {category.icon ? (
                        <img
                          src={category.icon}
                          alt={getName(category)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${selectedCategory === getName(category) ? 'filter brightness-0 invert' : ''
                            }`}
                        />
                      ) : (
                        <span className={`text-2xl ${selectedCategory === getName(category) ? 'filter brightness-0 invert' : ''
                          }`}>📁</span>
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium text-center max-w-20 sm:max-w-28 leading-tight transition-all duration-300 ${selectedCategory === getName(category) ? 'text-primary-500 font-semibold' : 'text-gray-700'
                        }`}
                    >
                      {getName(category)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subcategory Pills */}
        {!hideText && (
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-responsive flex-wrap gap-2">
            {getCurrentSubcategories().map((subcategory) => (
              <button
                key={subcategory._id || subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${selectedSubcategory === getName(subcategory)
                  ? 'bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-500'
                  }`}
              >
                {(() => {
                  const iconSrc = getIcon(subcategory);
                  if (iconSrc && (iconSrc.includes('/') || iconSrc.includes('.'))) {
                    // It's an image URL/path
                    return (
                      <img
                        src={iconSrc}
                        alt={getName(subcategory)}
                        className="w-8 h-8 bg-white rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                    );
                  } else if (iconSrc) {
                    // It's an emoji or text
                    return <span className="text-lg">{iconSrc}</span>;
                  } else {
                    // Fallback
                    return <span className="text-lg">📂</span>;
                  }
                })()}
                <span className="text-lg hidden">📂</span>
                <span>{getName(subcategory)}</span>
              </button>
            ))}
            <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-full text-primary-500 hover:bg-primary-50 text-sm font-medium transition-colors">
              See All
            </button>
          </div>
        )}

        {/* Listings Section Title */}
        {!hideText && (
          <div className="text-center mb-responsive">
            <h3 className="text-responsive-h2 text-gray-900 mb-2">
              All {selectedSubcategory || 'Listings'} <span className="text-gray-400">({filteredListings.length})</span>
            </h3>
            <p className="text-responsive-body text-gray-600">
              Start to book {selectedSubcategory || 'services'} for your <span className="font-semibold text-primary-500">Event</span> Because everything is on place
            </p>
          </div>
        )}

        {/* Listings Cards */}
        {selectedCategory && (
          <div className="mb-10">
            <div className="mb-6">
              {listingsToShow.length === 0 ? (
                <div className="text-center text-gray-500 py-8 text-lg">
                  Not Available😌
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {listingsToShow.map(listing => (
                    <div key={listing._id || listing.id} className="card-mobile vendor-card-desktop">
                      {/* Listing Image */}
                      <div className="relative image-container-mobile sm:image-container-desktop bg-gradient-to-br from-gray-200 to-gray-300">
                        <img
                          src={listing.featuredImage || `/src/assets/icons/categorycard.svg`}
                          alt={listing.title || 'Service'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 hidden items-center justify-center">
                          <span className="text-gray-500 text-sm">Service Image</span>
                        </div>
                      </div>

                      {/* Listing Details */}
                      <div className="space-mobile-sm sm:p-5">
                        {/* Vendor Avatar and Name */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <img
                              src="/src/assets/icons/Profile.svg"
                              alt="Provider"
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <span className="text-black-600 text-sm font-medium">
                              {(() => {
                                // Handle vendorName field safely
                                if (typeof listing.vendorName === 'string') return listing.vendorName;
                                if (listing.vendorName && typeof listing.vendorName === 'object') {
                                  return listing.vendorName.en || listing.vendorName.nl || Object.values(listing.vendorName)[0] || 'Service Provider';
                                }
                                return 'Service Provider';
                              })()} 
                            </span>
                          </div>
                          <span className="text-green-600 text-sm font-medium bg-green-100 rounded-lg px-2">
                            • Available
                          </span>
                        </div>

                        <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">{getName(listing) || 'Service'}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm mb-4">
                          {typeof listing.description === 'string' ? listing.description : 'Professional service for your events...'}
                        </p>

                        {/* Listing Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium">Location:</span>
                            <span className="ml-2">{typeof listing.location === 'string' ? listing.location : 'Available Citywide'}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium">Category:</span>
                            <span className="ml-2">
                              {(() => {
                                // Handle category field safely
                                if (typeof listing.category === 'string') return listing.category;
                                if (typeof listing.subCategory === 'string') return listing.subCategory;
                                // If they're objects, try to get string values
                                if (listing.category && typeof listing.category === 'object') {
                                  return listing.category.en || listing.category.nl || Object.values(listing.category)[0] || 'General Service';
                                }
                                if (listing.subCategory && typeof listing.subCategory === 'object') {
                                  return listing.subCategory.en || listing.subCategory.nl || Object.values(listing.subCategory)[0] || 'General Service';
                                }
                                return 'General Service';
                              })()} 
                            </span>
                          </div>
                        </div>

                        {/* Rating and Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">⭐</span>
                            <span className="ml-1 font-semibold text-gray-900">
                              {listing.rating || '4.5'}/5
                            </span>
                            <span className="text-xs text-gray-500 ml-1">({listing.ratingCount || '0'} reviews)</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {listing.pricingPerEvent || 'Quote on request'}
                            </div>
                          </div>
                        </div>

                        {/* Book Now Button */}
                        <button
                          className="btn-primary-mobile w-full touch-button"
                          onClick={() => {
                            const listingId = listing._id || listing.id;
                            console.log('Navigating to booking with listing:', { listingId, listing });
                            navigate(`/booking/${listingId}`);
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center hidden md:block">
          <button className="px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300">
            View All →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
