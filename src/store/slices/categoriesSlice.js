import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoriesService';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const result = await categoryService.getCategories();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.categories;
  }
);

export const searchCategories = createAsyncThunk(
  'categories/searchCategories',
  async (searchTerm) => {
    const result = await categoryService.getCategoriesBySearch(searchTerm);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.categories;
  }
);

export const fetchSubcategories = createAsyncThunk(
  'categories/fetchSubcategories',
  async (categoryId) => {
    const result = await categoryService.getSubCategoriesByCategory(categoryId);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.subCategories;
  }
);

const initialState = {
  categories: [],
  searchResults: [],
  selectedCategory: null,
  subcategories: [],
  selectedSubcategory: null,
  loading: {
    categories: false,
    subcategories: false,
    search: false
  },
  error: null,
  searchTerm: ''
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error = action.error.message;
      })
      .addCase(searchCategories.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading.subcategories = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading.subcategories = false;
        state.subcategories = action.payload;
        state.error = null;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading.subcategories = false;
        state.error = action.error.message;
      });
  }
});

export const {
  setSelectedCategory,
  setSelectedSubcategory,
  setSearchTerm,
  clearError
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
