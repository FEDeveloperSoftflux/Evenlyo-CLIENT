import api from "../api";
import { endPoints } from "../../constants/api";
import {
  setListings,
  setListingsLoading,
  setListingsError,
} from "../slices/listingsSlice";

// Fetch listings by category
export const fetchListingsByCategory = (categoryId) => async (dispatch) => {
  console.log("Fetching listings for category:", categoryId);
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.byCategory(categoryId));
    console.log("Listings API response:", response.data);
    dispatch(setListings(response.data || []));
  } catch (error) {
    console.error("Listings fetch error:", error);
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
// Fetch listings by subcategory
export const fetchListingsBySubcategory =
  (subcategoryId) => async (dispatch) => {
    dispatch(setListingsLoading(true));
    try {
      const response = await api.get(
        endPoints.listings.bySubCategory(subcategoryId)
      );
      dispatch(setListings(response.data || []));
    } catch (error) {
      dispatch(setListingsError(error.message || "Failed to fetch listings"));
    }
  };
// Fetch listings by vendor
export const fetchListingsByVendor = (vendorId) => async (dispatch) => {
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.byVendor(vendorId));
    dispatch(setListings(response.data || []));
  } catch (error) {
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
// Fetch listings by service type
export const fetchListingsByServiceType = (type) => async (dispatch) => {
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.byServiceType(type));
    dispatch(setListings(response.data || []));
  } catch (error) {
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
// Fetch listings by availability
export const fetchListingsByAvailability = (id) => async (dispatch) => {
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.availability(id));
    dispatch(setListings(response.data || []));
  } catch (error) {
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
// Fetch all listings
export const fetchAllListings = () => async (dispatch) => {
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.all);
    dispatch(setListings(response.data || []));
  } catch (error) {
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
// Fetch listings by search query
export const fetchListingsBySearch = (query) => async (dispatch) => {
  dispatch(setListingsLoading(true));
  try {
    const response = await api.get(endPoints.listings.search(query));
    dispatch(setListings(response.data || []));
  } catch (error) {
    dispatch(setListingsError(error.message || "Failed to fetch listings"));
  }
};
