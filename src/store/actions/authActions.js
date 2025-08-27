import authService from '../../services/authService';
import googleAuthService from '../../services/googleAuth';
import { loginStart, loginSuccess, loginFailure, logout, setUser } from '../slices/authSlice';

import { endPoints } from '../../constants/api';

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const result = await authService.login(credentials);
    if (result.success) {
      authService.saveUserData(result.user);
      dispatch(loginSuccess({ user: result.user }));
      return { success: true, user: result.user };
    } else {
      dispatch(loginFailure(result.error));
      return { success: false, error: result.error };
    }
  } catch (error) {
    const message = error.message || 'Login failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Register user
export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const result = await authService.register(userData);
    dispatch(loginSuccess({ user: result.data.user }));
    return { success: true, user: result.data.user };
  } catch (error) {
    const message = error.result?.data?.message || 'Registration failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Fetch current user from backend (using cookie)
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    // First, try to validate the session with the backend
    const result = await authService.validateSession();
    if (result.success && result.user) {
      // Session is valid, save user data and update state
      authService.saveUserData(result.user);
      dispatch(loginSuccess({ user: result.user }));
      return { success: true, user: result.user };
    }
    //else {
    //   // Session validation failed, check localStorage for previous session
    //   const storedUser = authService.getStoredUser();
    //   if (storedUser && authService.isAuthenticated()) {
    //     // We have stored user data, but need to verify it's still valid
    //     // For now, we'll trust the stored data, but you might want to
    //     // implement additional validation
    //     dispatch(loginSuccess({ user: storedUser }));
    //     return { success: true, user: storedUser };
    //   } 
    else {
      // No valid session or stored data
      authService.clearUserData();
      return { success: false };
    }

  } catch (error) {
    // Network error or server error
    console.log('Session validation failed:', error.message);

    // Check if we have stored user data to fall back on
    const storedUser = authService.getStoredUser();
    if (storedUser && authService.isAuthenticated()) {
      dispatch(loginSuccess({ user: storedUser }));
      return { success: true, user: storedUser };
    }

    // Clear any invalid data
    authService.clearUserData();
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
  } catch (error) {
    // Even if logout API fails, clear local state
    console.error('Logout API error:', error);
  } finally {
    dispatch(logout());
    authService.clearUserData();
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await authService.forgotPassword(email);
    if (response.success) {
      return { success: true, message: response.data.message };
    } else {
      const message = response.error || 'Failed to send reset email';
      return { success: false, error: message };
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send reset email';
    return { success: false, error: message };
  }
};

// Reset password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.resetPassword, { token, password });
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

// Send OTP for registration
export const sendOtp = (userData) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.sendOtp, userData);
    return { success: true, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send OTP';
    return { success: false, error: message };
  }
};

// Verify OTP for registration
export const verifyOtp = (otpData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post(endPoints.auth.verifyOtp, otpData);
    dispatch(loginSuccess({ user: response.data.user }));
    return { success: true, user: response.data.user, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'OTP verification failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Send OTP for login (if enabled)
export const sendLoginOtp = (email) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.sendOtp, { email, type: 'login' });
    return { success: true, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send login OTP';
    return { success: false, error: message };
  }
};

// Verify login OTP
export const verifyLoginOtp = (otpData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post(endPoints.auth.verifyOtp, { ...otpData, type: 'login' });
    dispatch(loginSuccess({ user: response.data.user }));
    return { success: true, user: response.data.user };
  } catch (error) {
    const message = error.response?.data?.message || 'Login OTP verification failed';
    dispatch(loginFailure(message));
    return { success: false, error: message };
  }
};

// Send OTP for password reset
export const sendPasswordResetOtp = (email) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.sendOtp, { email, type: 'reset' });
    return { success: true, message: response.data.message, resetToken: response.data.resetToken };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send reset OTP';
    return { success: false, error: message };
  }
};

// Verify password reset OTP
export const verifyPasswordResetOtp = (otpData) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.verifyOtp, { ...otpData, type: 'reset' });
    return { success: true, message: response.data.message, resetToken: response.data.resetToken };
  } catch (error) {
    const message = error.response?.data?.message || 'Reset OTP verification failed';
    return { success: false, error: message };
  }
};

// Change password (for logged in users)
export const changePassword = (passwordData) => async (dispatch) => {
  try {
    const response = await api.post(endPoints.auth.changePassword, passwordData);
    return { success: true, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to change password';
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
