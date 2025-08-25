import Api from "./index";
import { endPoints, requestType } from "../constants/api";

class AuthService {

  setupAxiosDefaults() {
    // Ensure cookies are sent with every request
    Api.defaults.withCredentials = true;

    // Set up response interceptor - NO REDIRECTS
    Api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Just clear user data, no redirects
          this.clearUserData();
        }
        return Promise.reject(error);
      }
    );
  }

  // Save user data to localStorage for persistence across page reloads
  saveUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");
  }

  // Get stored user data
  getStoredUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      this.clearUserData();
      return null;
    }
  }

  // Check if user is authenticated (has valid session)
  isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
  }

  // Clear user data from localStorage
  clearUserData() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("clientUser");
    localStorage.removeItem("clientToken");
  }
  // Login with email and password
  async login(credentials) {
    try {
      const response = await Api(
        endPoints.auth.login,
        credentials,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
        status: error.response?.status,
      };
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await Api(
        endPoints.auth.register,
        userData,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
        status: error.response?.status,
      };
    }
  }

  // Send OTP for registration/login/reset
  async sendOtp(data) {
    try {
      const response = await Api(
        endPoints.auth.sendOtp,
        data,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to send OTP",
        status: error.response?.status,
      };
    }
  }

  // Verify OTP
  async verifyOtp(otpData) {
    try {
      const response = await Api(
        endPoints.auth.verifyOtp,
        otpData,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message,
        token: response.data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "OTP verification failed",
        status: error.response?.status,
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await Api(
        endPoints.auth.forgotPassword,
        { email },
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to send reset email",
        status: error.response?.status,
      };
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await Api(
        endPoints.auth.resetPassword,
        resetData,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to reset password",
        status: error.response?.status,
      };
    }
  }

  // Change password (for logged-in users)
  async changePassword(passwordData) {
    try {
      const response = await Api(
        endPoints.auth.changePassword,
        passwordData,
        requestType.POST
      );
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to change password",
        status: error.response?.status,
      };
    }
  }

  // Logout
  async logout() {
    try {
      const response = await Api(endPoints.auth.logout, {}, requestType.POST);
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Logout failed",
        status: error.response?.status,
      };
    }
  }

  // Validate session
  async validateSession() {
    try {
      const response = await Api(endPoints.auth.me, null, requestType.GET);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        isValid: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Session validation failed",
        status: error.response?.status,
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
      const response = await Api(endPoints.profile.get, requestType.GET);
      return {
        success: true,
        data: response.data,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get profile",
        status: error.response?.status,
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await Api(
        endPoints.profile.update,
        profileData,
        requestType.PUT
      );
      return {
        success: true,
        data: response.data,
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update profile",
        status: error.response?.status,
      };
    }
  }
}

// Export singleton instance
export default new AuthService();
