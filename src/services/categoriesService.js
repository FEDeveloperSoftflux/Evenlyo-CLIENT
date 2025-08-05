import api from './api';

// Categories Service
class CategoriesService {
  // Get all categories
  async getCategories() {
    try {
      const response = await api.get('/categories');
      return {
        success: true,
        categories: response.data.categories,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load categories',
      };
    }
  }

  // Get subcategories by category ID
  async getSubCategoriesByCategory(categoryId) {
    try {
      const response = await api.get(`/subcategories/category/${categoryId}`);
      return {
        success: true,
        subCategories: response.data.subCategories,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load subcategories',
      };
    }
  }

  // Get listings by category ID
  async getListingsByCategory(categoryId) {
    try {
      const response = await api.post('/listings/category', { categoryId });
      return {
        success: true,
        listings: response.data.listings,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load listings',
      };
    }
  }
}

export default new CategoriesService();
