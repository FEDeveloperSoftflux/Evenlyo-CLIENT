import categoriesService from '../../services/categoriesService';
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  getSubcategoriesStart,
  getSubcategoriesSuccess,
  getSubcategoriesFailure,
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
// Search categories
export const searchCategories = (searchTerm) => async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const result = await categoriesService.searchCategories(searchTerm);
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

