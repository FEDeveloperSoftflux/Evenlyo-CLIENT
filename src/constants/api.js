/**
 * API Headers
 */
export const apiHeaders = {
  application_json: 'application/json',
  multipart_data: 'multipart/form-data',
  text_plain: 'text/plain',
  application_form_urlencoded: 'application/x-www-form-urlencoded',
};

/**
 * HTTP Request Types
 */
export const requestType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * API Endpoints
 */
export const endPoints = {
  // Authentication endpoints
  auth: {
    login: 'client/login',
    register: 'client/register',
    logout: 'client/logout',
    refreshToken: 'client/refresh-token',
    sendOtp: 'client/send-otp',
    verifyOtp: 'client/verify-otp',
    forgotPassword: 'client/forgot-password',
    resetPassword: 'client/reset-password',
    changePassword: 'client/change-password',
    validateSession: 'client/validate-session',
  },

  // Client profile endpoints
  profile: {
    get: 'client/profile',
    update: 'client/profile',
    uploadAvatar: 'client/profile/avatar',
    deleteAccount: 'client/profile/delete',
    getPreferences: 'client/profile/preferences',
    updatePreferences: 'client/profile/preferences',
  },

  // Booking endpoints
  bookings: {
    create: 'client/bookings',
    all: 'client/bookings',
    byId: (id) => `client/bookings/${id}`,
    cancel: (id) => `client/bookings/${id}/cancel`,
    reschedule: (id) => `client/bookings/${id}/reschedule`,
    review: (id) => `client/bookings/${id}/review`,
    messages: (id) => `client/bookings/${id}/messages`,
    invoice: (id) => `client/bookings/${id}/invoice`,
    timeline: (id) => `client/bookings/${id}/timeline`,
    upcoming: 'client/bookings/upcoming',
    history: 'client/bookings/history',
  },

  // Vendor discovery endpoints
  vendors: {
    search: 'client/vendors/search',
    byId: (id) => `client/vendors/${id}`,
    categories: 'client/vendors/categories',
    featured: 'client/vendors/featured',
    nearby: 'client/vendors/nearby',
    reviews: (id) => `client/vendors/${id}/reviews`,
    availability: (id) => `client/vendors/${id}/availability`,
    packages: (id) => `client/vendors/${id}/packages`,
    gallery: (id) => `client/vendors/${id}/gallery`,
  },

  // Category endpoints
  categories: {
    all: 'client/categories',
    byId: (id) => `client/categories/${id}`,
    subcategories: (id) => `client/categories/${id}/subcategories`,
    vendors: (id) => `client/categories/${id}/vendors`,
  },

  // Events endpoints
  events: {
    create: 'client/events',
    all: 'client/events',
    byId: (id) => `client/events/${id}`,
    update: (id) => `client/events/${id}`,
    delete: (id) => `client/events/${id}`,
    guests: (id) => `client/events/${id}/guests`,
    addGuest: (id) => `client/events/${id}/guests`,
    timeline: (id) => `client/events/${id}/timeline`,
  },

  // Wishlist endpoints
  wishlist: {
    get: 'client/wishlist',
    add: 'client/wishlist',
    remove: (id) => `client/wishlist/${id}`,
    clear: 'client/wishlist/clear',
  },

  // Cart endpoints
  cart: {
    get: 'client/cart',
    add: 'client/cart',
    update: (id) => `client/cart/${id}`,
    remove: (id) => `client/cart/${id}`,
    clear: 'client/cart/clear',
    checkout: 'client/cart/checkout',
  },

  // Payment endpoints
  payments: {
    process: 'client/payments/process',
    verify: 'client/payments/verify',
    refund: (id) => `client/payments/${id}/refund`,
    history: 'client/payments/history',
    methods: 'client/payments/methods',
    addMethod: 'client/payments/methods',
    removeMethod: (id) => `client/payments/methods/${id}`,
  },

  // Review endpoints
  reviews: {
    create: 'client/reviews',
    byVendor: (vendorId) => `client/reviews/vendor/${vendorId}`,
    byClient: 'client/reviews/my-reviews',
    update: (id) => `client/reviews/${id}`,
    delete: (id) => `client/reviews/${id}`,
    helpful: (id) => `client/reviews/${id}/helpful`,
  },

  // Notification endpoints
  notifications: {
    all: 'client/notifications',
    markRead: (id) => `client/notifications/${id}/read`,
    markAllRead: 'client/notifications/mark-all-read',
    delete: (id) => `client/notifications/${id}`,
    settings: 'client/notifications/settings',
  },

  // Support endpoints
  support: {
    tickets: 'client/support/tickets',
    createTicket: 'client/support/tickets',
    ticketById: (id) => `client/support/tickets/${id}`,
    addMessage: (id) => `client/support/tickets/${id}/messages`,
    closeTicket: (id) => `client/support/tickets/${id}/close`,
    faq: 'client/support/faq',
    contactInfo: 'client/support/contact',
  },

  // Blog endpoints
  blog: {
    posts: 'client/blog/posts',
    postById: (id) => `client/blog/posts/${id}`,
    categories: 'client/blog/categories',
    featured: 'client/blog/posts/featured',
    search: 'client/blog/search',
    comments: (postId) => `client/blog/posts/${postId}/comments`,
    addComment: (postId) => `client/blog/posts/${postId}/comments`,
  },

  // Search endpoints
  search: {
    global: 'client/search',
    vendors: 'client/search/vendors',
    events: 'client/search/events',
    suggestions: 'client/search/suggestions',
    filters: 'client/search/filters',
  },

  // Location endpoints
  locations: {
    cities: 'client/locations/cities',
    areas: (cityId) => `client/locations/cities/${cityId}/areas`,
    nearby: 'client/locations/nearby',
    popular: 'client/locations/popular',
  },

  // General endpoints
  general: {
    settings: 'client/settings',
    terms: 'client/terms',
    privacy: 'client/privacy',
    about: 'client/about',
    contact: 'client/contact',
  },
};

/**
 * API Response Status Codes
 */
export const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * API Error Messages
 */
export const errorMessages = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

/**
 * Default API Configuration
 */
export const apiConfig = {
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};
