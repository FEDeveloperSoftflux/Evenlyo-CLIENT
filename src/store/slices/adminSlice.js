import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  users: [],
  vendors: [],
  clients: [],
  bookings: [],
  analytics: {
    totalUsers: 0,
    totalBookings: 0,
    revenue: 0,
    activeVendors: 0,
  },
  reports: [],
  settings: {},
  notifications: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setVendors(state, action) {
      state.vendors = action.payload;
    },
    setClients(state, action) {
      state.clients = action.payload;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setAnalytics(state, action) {
      state.analytics = { ...state.analytics, ...action.payload };
    },
    setReports(state, action) {
      state.reports = action.payload;
    },
    addReport(state, action) {
      state.reports.push(action.payload);
    },
    setSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
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
    clearAdmin(state) {
      return initialState;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setUsers,
  addUser,
  updateUser,
  removeUser,
  setVendors,
  setClients,
  setBookings,
  setAnalytics,
  setReports,
  addReport,
  setSettings,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  setLoading,
  setError,
  clearAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
