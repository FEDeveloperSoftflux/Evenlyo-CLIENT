import api from '../../services/api';
import googleAuthService from '../../services/googleAuth';
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

// Google Sign In
export const signInWithGoogle = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const result = await googleAuthService.signInWithGoogle();
    if (result.success) {
      dispatch(loginSuccess({ user: result.user }));
      return { success: true, user: result.user };
    } else {
      dispatch(loginFailure(result.error));
      return { success: false, error: result.error };
    }
  } catch (error) {
    const message = error.message || 'Google sign-in failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Google Sign In with Redirect (for mobile)
export const signInWithGoogleRedirect = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    await googleAuthService.signInWithGoogleRedirect();
    // The redirect will happen, result will be handled after page reload
  } catch (error) {
    const message = error.message || 'Google redirect sign-in failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Handle Google Redirect Result
export const handleGoogleRedirectResult = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const result = await googleAuthService.getRedirectResult();
    if (result.success) {
      dispatch(loginSuccess({ user: result.user }));
      return { success: true, user: result.user };
    } else {
      dispatch(loginFailure(result.error));
      return { success: false, error: result.error };
    }
  } catch (error) {
    const message = error.message || 'Google redirect result failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Enhanced Logout (includes Google sign out)
export const logoutUserComplete = () => async (dispatch) => {
  try {
    await googleAuthService.signOut();
  } catch (error) {
    console.error('Complete logout error:', error);
  } finally {
    dispatch(logout());
  }
};
