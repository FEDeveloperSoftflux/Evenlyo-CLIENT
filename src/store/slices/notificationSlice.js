import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notificationService";

// Initial state for notifications
const initialState = {
  list: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.list = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    markOneRead(state, action) {
      const id = action.payload;
      const notif = state.list.find((n) => n._id === id);
      if (notif) notif.isRead = true;
    },
    markAllRead(state) {
      state.list.forEach((n) => (n.isRead = true));
    },
    clearNotifications(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setNotifications,
  setLoading,
  setError,
  markOneRead,
  markAllRead,
  clearNotifications,
} = notificationSlice.actions;


export const loadNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetchNotifications();
    dispatch(setNotifications(res));
  } catch (err) {
    dispatch(setError(err.message || "Failed to load notifications"));
  }
};

export const markNotificationAsRead = (id) => async (dispatch) => {
  try {
    await markNotificationRead(id);
    dispatch(markOneRead(id));
  } catch (err) {
    dispatch(setError(err.message || "Failed to mark notification as read"));
  }
};

export const markAllNotificationsAsRead = () => async (dispatch) => {
  try {
    await markAllNotificationsRead();
    dispatch(markAllRead());
  } catch (err) {
    dispatch(setError(err.message || "Failed to mark all as read"));
  }
};

// Selectors
export const selectNotifications = (state) => Array.isArray(state.notifications.list) ? state.notifications.list : [];
export const selectLoading = (state) => state.notifications.loading;
export const selectError = (state) => state.notifications.error;

export default notificationSlice.reducer;
