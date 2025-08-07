import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  searchResults: [],
  selectedCategory: null,
  subcategories: [],
  selectedSubcategory: null,
  loading: {
    categories: false,
    subcategories: false,
    search: false,
  },
  error: null,
  searchTerm: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = Array.isArray(action.payload) ? action.payload : [];
      state.loading.categories = false;
      state.error = null;
    },
    setCategoriesLoading: (state, action) => {
      state.loading.categories = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.error = action.payload;
      state.loading.categories = false;
    },
    setSearchResults: (state, action) => {
      state.searchResults = Array.isArray(action.payload) ? action.payload : [];
      state.loading.search = false;
      state.error = null;
    },
    setSearchLoading: (state, action) => {
      state.loading.search = action.payload;
    },
    setSearchError: (state, action) => {
      state.error = action.payload;
      state.loading.search = false;
    },
    setSubcategories: (state, action) => {
      // Defensive check to ensure only arrays are stored
      state.subcategories = Array.isArray(action.payload) ? action.payload : [];
      state.loading.subcategories = false;
      state.error = null;
    },
    setSubcategoriesLoading: (state, action) => {
      state.loading.subcategories = action.payload;
    },
    setSubcategoriesError: (state, action) => {
      state.error = action.payload;
      state.loading.subcategories = false;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = null;
      state.subcategories = [];
    },
    setSelectedSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setSubcategories,
  setSubcategoriesLoading,
  setSubcategoriesError,
  setSelectedCategory,
  setSelectedSubcategory,
  setSearchTerm,
  clearError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
