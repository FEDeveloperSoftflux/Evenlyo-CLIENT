import axios from 'axios';
import store from '../store';

// API base URL - can be configured via environment variables (Vite uses import.meta.env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Always send cookies for HTTP-only cookie auth
    config.withCredentials = true;
    
    // Add any additional headers if needed
    const state = store.getState();
    if (state.auth.user) {
      // Could add additional auth headers if needed
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - could dispatch logout action
      store.dispatch({ type: 'auth/logout' });
      // Prevent infinite redirect loop if already on /login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;