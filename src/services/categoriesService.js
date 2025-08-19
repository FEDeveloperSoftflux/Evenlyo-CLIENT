import api from './api';
import { endPoints, requestType } from '../constants/api';
import Api from './index';
// Categories Service
class CategoriesService {
  // Get all categories
  async getCategories() {
    try {
      const response = await api.get(endPoints.categories.all);
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
  // Get category by ID
  async getCategoryById(id) {
    try {
      const response = await api.get(endPoints.categories.byId(id));
      return {
        success: true,
        category: response.data.category,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load category',
      };
    }
  }

  async getCategoriesBySearch(searchTerm) {
    try {
      const response = await api.get(endPoints.categories.bySearch(searchTerm));
      return {
        success: true,
        categories: response.data.categories,
      };
    }
    catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search categories',
      };
    }
  }


  // Get all subcategories
  async getSubCategories() {
    try {
      const response = await api.get(endPoints.subcategories.all);
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
  // Get subcategory by ID
  async getSubCategoryById(id) {
    try {
      const response = await api.get(endPoints.subcategories.byId(id));
      return {
        success: true,
        subCategory: response.data.subCategory,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load subcategory',
      };
    }
  }


  // Get subcategories by category ID
  async getSubCategoriesByCategory(categoryId) {
    try {
      const response = await api.get(endPoints.categories.subcategories(categoryId));
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
}

export default new CategoriesService();


export const getCategories = () => {
  return Api(endPoints.categories.all, null, requestType.GET);
}

export const getSubCategories = () => {
  return Api(endPoints.categories.all, null, requestType.GET);
}