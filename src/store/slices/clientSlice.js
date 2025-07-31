import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  bookings: [],
  favorites: [],
  notifications: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    updateBooking(state, action) {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload };
      }
    },
    removeBooking(state, action) {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload);
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    markNotificationAsRead(state, action) {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearClient(state) {
      return initialState;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setBookings,
  addBooking,
  updateBooking,
  removeBooking,
  setFavorites,
  addFavorite,
  removeFavorite,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  setLoading,
  setError,
  clearClient,
} = clientSlice.actions;

export default clientSlice.reducer;
