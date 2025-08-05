import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  selectedCategory: null,
  subcategories: [],
  selectedSubcategory: null,
  listings: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Categories actions
    getCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    getCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Selected category actions
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      // Reset subcategory when category changes
      state.selectedSubcategory = null;
      state.subcategories = [];
      state.listings = [];
    },

    // Subcategories actions
    getSubcategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getSubcategoriesSuccess(state, action) {
      state.loading = false;
      state.subcategories = action.payload;
      state.error = null;
    },
    getSubcategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Selected subcategory actions
    setSelectedSubcategory(state, action) {
      state.selectedSubcategory = action.payload;
      // Reset listings when subcategory changes
      state.listings = [];
    },

    // Listings actions
    getListingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getListingsSuccess(state, action) {
      state.loading = false;
      state.listings = action.payload;
      state.error = null;
    },
    getListingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear error
    clearError(state) {
      state.error = null;
    },

    // Reset state
    resetCategories(state) {
      return initialState;
    },
  },
});

export const {
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
  clearError,
  resetCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
