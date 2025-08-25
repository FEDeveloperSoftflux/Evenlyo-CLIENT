import api from "./api";
import { endPoints } from "../constants/api";


class VendorService {
  async getVendorsByCategory(categoryId) {
    try {
      const response = await api.get(endPoints.vendors.byCategory(categoryId));
      return {
        success: true,
        vendors: response.data.vendors,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to load listings",
      };
    }
  }

  async getVendorsByDetails(vendorId) {
    try {
      const response = await api.get(endPoints.vendors.byDetails(vendorId));
      return {
        success: true,
        vendor: response.data.vendor,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to load vendor details",
      };
    }
  }
};

export default new VendorService();

export const { getVendorsByCategory } = new VendorService();
export const { getVendorsByDetails } = new VendorService();
