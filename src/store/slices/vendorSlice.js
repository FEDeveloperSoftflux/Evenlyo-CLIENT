import { createSlice } from '@reduxjs/toolkit';
import { getVendorsByCategory } from '../../services/vendorService';
import { getVendorsByDetails } from '../../services/vendorService';


const initialState = {

  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setVendors: (state, action) => {
      // Defensive check to ensure only arrays are stored
      state.vendors = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setVendors,
  setLoading,
  setError,
  clearError,

} = vendorSlice.actions;

export default vendorSlice.reducer;



export const fetchAllVendorsByCategory = (categoryId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await getVendorsByCategory(categoryId);
    if (result.success) {
      dispatch(setVendors(result.vendors));

      dispatch(setLoading(false));
    } else {
      dispatch(setError(result.error));
    }
  } catch (error) {
    dispatch(setError('An unexpected error occurred'));
  }
}



export const fetchVendorsByDetails = (vendorId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await getVendorsByDetails(vendorId);
    if (result.success) {
      dispatch(setVendors(result.vendor));
      dispatch(setLoading(false));
    } else {
      dispatch(setError(result.error));
    }
  } catch (error) {
    dispatch(setError('An unexpected error occurred'));
  }
}