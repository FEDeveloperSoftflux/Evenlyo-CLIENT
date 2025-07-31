import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // { id, name, email, role: 'client'|'vendor'|'admin' }
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  setUser, 
  clearError 
} = authSlice.actions;

export default authSlice.reducer;
