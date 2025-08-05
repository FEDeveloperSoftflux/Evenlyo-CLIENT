import api from './api';
import { endPoints } from '../constants/api';

class AuthService {
  constructor() {
    // Set up axios to include credentials (cookies) with requests
    this.setupAxiosDefaults();
  }

  setupAxiosDefaults() {
    // Ensure cookies are sent with every request
    api.defaults.withCredentials = true;

    // Set up response interceptor for handling token expiration
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, try to refresh
          try {
            const refreshResult = await this.refreshToken();
            if (refreshResult.success) {
              // Retry the original request
              return api(error.config);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.clearUserData();
            if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Save user data to localStorage for persistence across page reloads
  saveUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }

  // Get stored user data
  getStoredUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      this.clearUserData();
      return null;
    }
  }

  // Check if user is authenticated (has valid session)
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Clear user data from localStorage
  clearUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }
  // Login with email and password
  async login(credentials) {
    try {
      const response = await api.post(endPoints.auth.login, credentials);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
        status: error.response?.status
      };
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await api.post(endPoints.auth.register, userData);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
        status: error.response?.status
      };
    }
  }

  // Send OTP for registration/login/reset
  async sendOtp(data) {
    try {
      const response = await api.post(endPoints.auth.sendOtp, data);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send OTP',
        status: error.response?.status
      };
    }
  }

  // Verify OTP
  async verifyOtp(otpData) {
    try {
      const response = await api.post(endPoints.auth.verifyOtp, otpData);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message,
        token: response.data.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'OTP verification failed',
        status: error.response?.status
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await api.post(endPoints.auth.forgotPassword, { email });
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send reset email',
        status: error.response?.status
      };
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await api.post(endPoints.auth.resetPassword, resetData);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to reset password',
        status: error.response?.status
      };
    }
  }

  // Change password (for logged-in users)
  async changePassword(passwordData) {
    try {
      const response = await api.post(endPoints.auth.changePassword, passwordData);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to change password',
        status: error.response?.status
      };
    }
  }

  // Logout
  async logout() {
    try {
      const response = await api.post(endPoints.auth.logout);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed',
        status: error.response?.status
      };
    }
  }

  // Validate session
  async validateSession() {
    try {
      const response = await api.get(endPoints.auth.me);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        isValid: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Session validation failed',
        status: error.response?.status
      };
    }
  }

  // // Refresh token
  // async refreshToken() {
  //   try {
  //     const response = await api.post(endPoints.auth.refreshToken);
  //     return {
  //       success: true,
  //       data: response.data,
  //       token: response.data.token
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.response?.data?.message || 'Token refresh failed',
  //       status: error.response?.status
  //     };
  //   }
  // }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get(endPoints.profile.get);
      return {
        success: true,
        data: response.data,
        user: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get profile',
        status: error.response?.status
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put(endPoints.profile.update, profileData);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile',
        status: error.response?.status
      };
    }
  }
}

// Export singleton instance
export default new AuthService();
