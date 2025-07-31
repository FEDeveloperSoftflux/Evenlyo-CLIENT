import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  services: [],
  bookings: [],
  earnings: {
    total: 0,
    monthly: 0,
    pending: 0,
  },
  analytics: {
    views: 0,
    bookings: 0,
    rating: 0,
  },
  notifications: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setServices(state, action) {
      state.services = action.payload;
    },
    addService(state, action) {
      state.services.push(action.payload);
    },
    updateService(state, action) {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
      }
    },
    removeService(state, action) {
      state.services = state.services.filter(service => service.id !== action.payload);
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
    setEarnings(state, action) {
      state.earnings = { ...state.earnings, ...action.payload };
    },
    setAnalytics(state, action) {
      state.analytics = { ...state.analytics, ...action.payload };
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
    clearVendor(state) {
      return initialState;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setServices,
  addService,
  updateService,
  removeService,
  setBookings,
  addBooking,
  updateBooking,
  setEarnings,
  setAnalytics,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  setLoading,
  setError,
  clearVendor,
} = vendorSlice.actions;

export default vendorSlice.reducer;
