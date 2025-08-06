import api from './api';
import { endPoints } from '../constants/api';

// Listings Service
class ListingsService {
  // Get all listings
  async getAllListings() {
    try {
      const response = await api.get(endPoints.listings.all);
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
  // Get listing by ID
  async getListingById(id) {
    try {
      const response = await api.get(endPoints.listings.byId(id));
      return {
        success: true,
        listing: response.data.listing,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load listing',
      };
    }
  }
  // Search listings
  async searchListings(query) {
    try {
      const response = await api.post(endPoints.listings.search, { query });
      return {
        success: true,
        listings: response.data.listings,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search listings',
      };
    }
  }
  // Get featured listings
  async getFeaturedListings() {
    try {
      const response = await api.get(endPoints.listings.featured);
      return {
        success: true,
        listings: response.data.listings,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load featured listings',
      };
    }
  }
  // Get popular listings
  async getPopularListings() {
    try {
      const response = await api.get(endPoints.listings.popular);
      return {
        success: true,
        listings: response.data.listings,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load popular listings',
      };
    }
  }
  // Get listings by vendor ID
  async getListingsByVendor(vendorId) {
    try {
      const response = await api.get(endPoints.listings.byVendor(vendorId));
      return {
        success: true,
        listings: response.data.listings,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load listings by vendor',
      };
    }
  }
  // // Get listings by service type
  // async getListingsByServiceType(type) {
  //   try {
  //     const response = await api.get(endPoints.listings.byServiceType(type));
  //     return {
  //       success: true,
  //       listings: response.data.listings,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.response?.data?.message || 'Failed to load listings by service type',
  //     };
  //   }
  // }
  // Get availability for a listing
  async getListingAvailability(id) {
    try {
      const response = await api.get(endPoints.listings.availability(id));
      return {
        success: true,
        availability: response.data.availability,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load listing availability',
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
  // Get listings by subcategory ID
  async getListingsBySubCategory(subCategoryId) {
    try {
      const response = await api.post('/listings/subcategory', { subCategoryId });
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


export default new ListingsService();
