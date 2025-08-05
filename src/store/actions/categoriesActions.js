import categoriesService from '../../services/categoriesService';
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  setSelectedCategory,
  getSubcategoriesStart,
  getSubcategoriesSuccess,
  getSubcategoriesFailure,
  setSelectedSubcategory,
  getListingsStart,
  getListingsSuccess,
  getListingsFailure,
} from '../slices/categoriesSlice';

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const result = await categoriesService.getCategories();
    if (result.success) {
      dispatch(getCategoriesSuccess(result.categories));
    } else {
      dispatch(getCategoriesFailure(result.error));
    }
  } catch (error) {
    dispatch(getCategoriesFailure(error.message));
  }
};

// Fetch subcategories by category
export const fetchSubCategoriesByCategory = (categoryId) => async (dispatch) => {
  dispatch(getSubcategoriesStart());
  try {
    const result = await categoriesService.getSubCategoriesByCategory(categoryId);
    if (result.success) {
      dispatch(getSubcategoriesSuccess(result.subCategories));
    } else {
      dispatch(getSubcategoriesFailure(result.error));
    }
  } catch (error) {
    dispatch(getSubcategoriesFailure(error.message));
  }
};

// Fetch listings by category
export const fetchListingsByCategory = (categoryId) => async (dispatch) => {
  dispatch(getListingsStart());
  try {
    const result = await categoriesService.getListingsByCategory(categoryId);
    if (result.success) {
      dispatch(getListingsSuccess(result.listings));
    } else {
      dispatch(getListingsFailure(result.error));
    }
  } catch (error) {
    dispatch(getListingsFailure(error.message));
  }
};
