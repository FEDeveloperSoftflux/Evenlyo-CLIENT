import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCategories, setSelectedCategory, setSelectedSubcategory, fetchSubcategories } from '../store/slices/categoriesSlice';

const Categories = ({ hideText = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.categories.subcategories);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const selectedSubcategory = useSelector((state) => state.categories.selectedSubcategory);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchSubcategories(category));
  };

  const handleSubcategoryClick = (subcategory) => {
    dispatch(setSelectedSubcategory(subcategory));
    navigate(`/listings?category=${selectedCategory}&subcategory=${subcategory}`);
  };

  if (loading.categories) {
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
        {t('error_occurred')}
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-16 bg-gray-50" id="categories">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {!hideText && (
          <div className="text-center mb-responsive">
            <h2 className="text-responsive-h2 text-gray-900">
              {t('explore_categories')}
            </h2>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCategoryClick(category)}
            >
              <img 
                src={category.image || '/default-category.svg'} 
                alt={category.name} 
                className="w-12 h-12 mb-2" 
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Subcategories Grid */}
        {selectedCategory && !loading.subcategories && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {subcategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <img 
                  src={subcategory.image || '/default-subcategory.svg'} 
                  alt={subcategory.name} 
                  className="w-12 h-12 mb-2" 
                />
                <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                <p className="text-gray-600">{subcategory.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
