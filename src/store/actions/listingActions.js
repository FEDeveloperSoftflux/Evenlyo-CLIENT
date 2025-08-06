import listingsService from '../../services/listingsService';
import {
  getListingsStart,
  getListingsSuccess,
  getListingsFailure,
} from '../slices/listingsSlice';



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
