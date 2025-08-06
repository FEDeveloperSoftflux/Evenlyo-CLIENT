import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingsService from '../../services/listingsService';

// Async thunks
export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (subcategoryId) => {
    const result = await listingsService.getListingsBySubCategory(subcategoryId);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.listings;
  }
);

export const searchListings = createAsyncThunk(
  'listings/searchListings',
  async (searchTerm) => {
    const result = await listingsService.searchListings(searchTerm);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.listings;
  }
);

const initialState = {
  listings: [],
  loading: false,
  error: null,
  searchTerm: '',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    // Listings actions
    clearListingsError: (state) => {
      state.error = null;
    },
    resetListings: () => {
      return initialState();
    },
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        state.error = null;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        state.error = null;
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearListingsError, resetListings, getListingsStart,
  getListingsSuccess,
  getListingsFailure,
  clearError,
  resetCategories,
  setSearchTerm,
} = listingsSlice.actions;
export default listingsSlice.reducer;
