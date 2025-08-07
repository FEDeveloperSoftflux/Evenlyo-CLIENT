import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      // Defensive check to ensure only arrays are stored
      state.listings = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    setListingsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearListingsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setListings,
  setListingsLoading,
  setListingsError,
  clearListingsError,
} = listingsSlice.actions;

export default listingsSlice.reducer;
