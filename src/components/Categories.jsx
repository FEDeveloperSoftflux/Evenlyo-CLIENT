import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../store/api";

const Categories = ({ hideText = false }) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const catRes = await api.get("categories");
        const subcatRes = await api.get("subcategories");
        const listRes = await api.get("listings");

        // Convert objects to arrays for mapping
        setCategories(Object.values(catRes.data || {}));
        setSubcategories(Object.values(subcatRes.data || {}));
        setListings(Object.values(listRes.data || {}));
        setLoading(false);

        // Debug logs
        console.log("Categories:", catRes.data);
        console.log("Subcategories:", subcatRes.data);
        console.log("Listings:", listRes.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <section
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-16 bg-gray-50"
      id="categories"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {!hideText && (
          <div className="text-center mb-responsive">
            <h2 className="text-responsive-h2 text-gray-900">
              {t("explore_categories")}
            </h2>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id || category.id}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <img
                  src={category.image || "/default-category.svg"}
                  alt={category.name || "Category"}
                  className="w-12 h-12 mb-2"
                />
                <h3 className="text-lg font-semibold">
                  {category.name || "No Name"}
                </h3>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No categories found
            </div>
          )}
        </div>

        {/* Subcategories Grid */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <div
                  key={subcategory._id || subcategory.id}
                  className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={subcategory.image || "/default-subcategory.svg"}
                    alt={subcategory.name || "Subcategory"}
                    className="w-12 h-12 mb-2"
                  />
                  <h3 className="text-lg font-semibold">
                    {subcategory.name || "No Name"}
                  </h3>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No subcategories found
              </div>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <div
                  key={listing._id || listing.id}
                  className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={listing.image || "/default-listing.svg"}
                    alt={listing.title || "Listing"}
                    className="w-12 h-12 mb-2"
                  />
                  <h3 className="text-lg font-semibold">
                    {listing.title || "No Title"}
                  </h3>
                  <p className="text-gray-600">
                    {listing.description || "No Description"}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No listings found
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
