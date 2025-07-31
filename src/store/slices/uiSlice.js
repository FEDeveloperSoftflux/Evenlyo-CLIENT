import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  notifications: [],
  modals: {
    forgotPassword: false,
    customerSupport: false,
    registration: false,
  },
  theme: 'light',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    openModal(state, action) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action) {
      state.modals[action.payload] = false;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    clearUI(state) {
      state.loading = false;
      state.notifications = [];
      state.modals = {
        forgotPassword: false,
        customerSupport: false,
        registration: false,
      };
    },
  },
});

export const {
  setLoading,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  setTheme,
  setLanguage,
  clearUI,
} = uiSlice.actions;

export default uiSlice.reducer;
