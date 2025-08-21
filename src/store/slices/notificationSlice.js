import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const notif = {
        id: Date.now(),
        text: action.payload.text,
      };
      state.list.unshift(notif); // newest first
    },
    setNotifications: (state, action) => {
      state.list = action.payload;
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const { addNotification, setNotifications, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
