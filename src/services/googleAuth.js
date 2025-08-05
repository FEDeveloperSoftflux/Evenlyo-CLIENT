// src/services/googleAuth.js
import { auth, googleProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import api from './api';

class GoogleAuthService {
  constructor() {
    this.auth = auth;
    this.provider = googleProvider;
  }

  // Sign in with Google using popup
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;

      // Get the Firebase ID token
      const idToken = await user.getIdToken();

      // Send the token to your backend for verification and user creation/login
      const response = await this.sendTokenToBackend(idToken, user);

      return {
        success: true,
        user: response.user,
        firebaseUser: user
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Sign in with Google using redirect (better for mobile)
  async signInWithGoogleRedirect() {
    try {
      await signInWithRedirect(this.auth, this.provider);
      // The redirect will happen, so we don't return anything here
    } catch (error) {
      console.error('Google redirect sign-in error:', error);
      throw error;
    }
  }

  // Get redirect result after page reload
  async getRedirectResult() {
    try {
      const result = await getRedirectResult(this.auth);
      if (result) {
        const user = result.user;
        const idToken = await user.getIdToken();
        const response = await this.sendTokenToBackend(idToken, user);

        return {
          success: true,
          user: response.user,
          firebaseUser: user
        };
      }
      return { success: false, error: 'No redirect result' };
    } catch (error) {
      console.error('Redirect result error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Send Firebase ID token to your backend
  async sendTokenToBackend(idToken, firebaseUser) {
    try {
      const response = await api.post('/auth/google', {
        idToken,
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          // photoURL: firebaseUser.photoURL,
          // emailVerified: firebaseUser.emailVerified
        }
      }, { withCredentials: true });

      return response.data;
    } catch (error) {
      console.error('Backend authentication error:', error);
      throw new Error(error.response?.data?.message || 'Backend authentication failed');
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(this.auth);
      // Also sign out from your backend
      await api.post('/auth/logout', {}, { withCredentials: true });
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  // Get error message
  getErrorMessage(error) {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Popup was blocked. Please allow popups and try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact support.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email but different credentials.';
      default:
        return error.message || 'An error occurred during sign-in. Please try again.';
    }
  }
}

// Export a singleton instance
export default new GoogleAuthService();
