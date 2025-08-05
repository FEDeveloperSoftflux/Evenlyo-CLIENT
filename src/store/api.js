
import axios from 'axios';

// Use Vite environment variable for API base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
});

// Always send cookies (for HTTP-only cookie auth)
api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
