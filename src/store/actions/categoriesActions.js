import api from "../api";
import { endPoints } from "../../constants/api";
import {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
  setSubcategories,
  setSubcategoriesLoading,
  setSubcategoriesError,
  setSelectedCategory,
  setSelectedSubcategory,
} from "../slices/categoriesSlice";

// Fetch all categories
export const fetchCategories = () => async (dispatch) => {
  dispatch(setCategoriesLoading(true));
  try {
    const response = await api.get(endPoints.categories.all);
    console.log("Categories API response:", response.data);
    dispatch(setCategories(response.data.categories || []));
  } catch (error) {
    console.error("Categories fetch error:", error);
    dispatch(setCategoriesError(error.message || "Failed to fetch categories"));
  }
};

// Fetch subcategories by category
export const fetchSubcategories = (category) => async (dispatch) => {
  console.log("Fetching subcategories for category:", category);
  dispatch(setSelectedCategory(category));
  dispatch(setSubcategoriesLoading(true));
  try {
    const response = await api.get(
      endPoints.subcategories.byCategory(category._id)
    );
    console.log("Subcategories API response:", response.data);
    console.log("Subcategories data:", response.data.subcategories);
    dispatch(setSubcategories(response.data.subcategories || []));
  } catch (error) {
    console.error("Subcategories fetch error:", error);
    dispatch(
      setSubcategoriesError(error.message || "Failed to fetch subcategories")
    );
  }
};

// Select subcategory
export const selectSubcategory = (subcategory) => (dispatch) => {
  dispatch(setSelectedSubcategory(subcategory));
};
