import api from '../../services/api';
import { loginStart, loginSuccess, loginFailure, logout, setUser } from '../slices/authSlice';

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/auth/login', credentials);
    dispatch(loginSuccess({ user: response.data.user }));
    return { success: true, user: response.data.user };
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Register user
export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/auth/register', userData);
    dispatch(loginSuccess({ user: response.data.user }));
    return { success: true, user: response.data.user };
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Fetch current user from backend (using cookie)
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await api.get('/auth/me');
    if (response.data && response.data.user) {
      dispatch(loginSuccess({ user: response.data.user }));
      return { success: true, user: response.data.user };
    }
  } catch (error) {
    // Not logged in or error - silent fail
    return { success: false };
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Even if logout API fails, clear local state
    console.error('Logout API error:', error);
  } finally {
    dispatch(logout());
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send reset email';
    return { success: false, error: message };
  }
};

// Reset password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    const response = await api.post('/auth/reset-password', { token, password });
    return { success: true, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to reset password';
    return { success: false, error: message };
  }
};

// Update user profile
export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    dispatch(setUser(response.data.user));
    return { success: true, user: response.data.user };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update profile';
    return { success: false, error: message };
  }
};
